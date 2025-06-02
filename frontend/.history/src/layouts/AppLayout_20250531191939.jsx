import Header from '@/components/Header'
import { getLikedJobs } from '@/redux/slices/authSlice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom'

function AppLayout() {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(getLikedJobs());
    }
  }, [dispatch, user]);
  return (
    <div>
      <div className='grid-background'></div>
      <main className=' min-h-screen container mx-auto'>
        <Header />
        <Outlet />
        <footer className='text-center text-gray-500 py-4'>
          &copy; {new Date().getFullYear()} my job portal. All rights reserved.
        </footer>
      </main>

    </div>
  )
}

export default AppLayout
