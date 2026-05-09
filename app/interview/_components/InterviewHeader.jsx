import React from 'react';
import Image from 'next/image';

function InterviewHeader() {
  return (
    <header className="w-full bg-white shadow px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Image
          src="/logo.png"
          alt="Logo"
          width={160}
          height={80}
          className="object-contain"
        />
      </div>
    </header>
  );
}

export default InterviewHeader;
