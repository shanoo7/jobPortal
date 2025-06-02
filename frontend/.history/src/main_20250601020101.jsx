import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import AppLayout from './layouts/AppLayout'
import ProtectedRoute from './components/ProtectedRoute'
import JobListing from './pages/JobListing'
import Job from './pages/Job'
import PostJob from './pages/PostJob'
import SavedJob from './pages/SavedJob'
import MyJobs from './pages/MyJobs'
import { ThemeProvider } from './components/ui/theme-provider'
import { Provider } from 'react-redux'
import store, { persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { ApplyJob } from './pages/ApplyJob'
import StudentProfile from './pages/StudentProfile'
import { Toaster } from 'sonner'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>

      {/* Public route */}
      <Route index element={<LandingPage />} />

      {/* Protected Routes - wrap all private pages inside this */}
      <Route element={<ProtectedRoute />}>
        <Route path="job-listing" element={<JobListing />} />
        <Route path="post-job" element={<PostJob />} />
        <Route path="saved-job" element={<SavedJob />} />
        <Route path="my-jobs" element={<MyJobs />} />
        <Route path="student-profile-jobs" element={< StudentProfile />} />
        <Route path="job/:id" element={<Job />} />
        <Route path="applyjob" element={<ApplyJob />} />
        <Route path="saved-jobs" element={<SavedJob />} />
      </Route>
    </Route>
  )
);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster />
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
        </ThemeProvider>
      </PersistGate>
    </Provider>

  </StrictMode>,
)
