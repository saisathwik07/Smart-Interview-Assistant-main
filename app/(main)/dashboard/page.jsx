'use client'
import React from 'react'
import CreateOptions from './_components/CreateOptions'
import LatestInterviewList from './_components/LatestInterviewList'
import WelcomeContainer from './_components/WelcomeContainer'
import DashboardAnalytics from './_components/DashboardAnalytics'
import { motion } from 'framer-motion'

function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <WelcomeContainer />
      <h2 className='my-6 font-bold text-xl text-foreground'>Quick Actions</h2>
      <CreateOptions />
      <DashboardAnalytics />
      <LatestInterviewList />
    </motion.div>
  )
}
export default Dashboard