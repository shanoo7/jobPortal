import Header from '@/components/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'

function AppLayout() {
  return (
    <div>
      <div className='grid-background'></div>
      <main className=' min-h-screen container mx-auto'>
        <Header/>
        <Outlet />
        <footer className='text-center text-gray-500 py-4 h-[100vh]'> 
          &copy; {new Date().getFullYear()} my job portal. All rights reserved.
        </footer>
      </main>

    </div>
  )
}

export default AppLayout
