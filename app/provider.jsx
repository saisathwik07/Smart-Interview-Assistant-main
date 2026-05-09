"use client";
import { UserDetailContext } from '@/context/UserDetailContext';
import { supabase } from '@/services/supabaseClient';
import React, { useState, useContext, useEffect} from "react";

function Provider({ children }) {
  const [user,setUser]=useState(null);

  useEffect(() => {
    CreateNewuser();
  }, []);
  
  const CreateNewuser = async () => {
    try {
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();

      if (authError || !authUser) {
        // Check if user is in guest mode
        const isGuest = document.cookie.includes('guest_session=true');
        if (isGuest) {
          setUser({ name: 'Guest User', email: 'guest@aicruiter.app', picture: null, isGuest: true });
        }
        return;
      }

      const { data: existingUsers, error: fetchError } = await supabase
        .from('Users')
        .select('*')
        .eq('email', authUser.email);

      if (fetchError) {
        console.error('Fetch error:', fetchError);
        return;
      }

      if (!existingUsers?.length) {
        const { data: insertedUsers, error: insertError } = await supabase
          .from('Users')
          .insert([
            {
              name: authUser.user_metadata?.name,
              email: authUser.email,
              picture: authUser.user_metadata?.picture
            }
          ])
          .select();

        if (insertError) {
          console.error('Insert error:', insertError);
          return;
        }

        setUser(insertedUsers?.[0]);
      } else {
        setUser(existingUsers[0]);
      }
    } catch (err) {
      console.error('Error in CreateNewuser:', err);
    }
  };

  return (
    <UserDetailContext.Provider value={{ user, setUser }}>
      <div>{children}</div>
    </UserDetailContext.Provider>
  );

}
export default Provider;

export const useUser = () => {
  const context = useContext(UserDetailContext);
  return context?.user;
};
