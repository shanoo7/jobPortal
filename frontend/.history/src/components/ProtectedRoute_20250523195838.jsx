// // // // import React from 'react'

// // // // function ProtectedRoute() {
// // // //   return (
// // // //     <div>
// // // //       <h1>protected route</h1>
// // // //     </div>
// // // //   )
// // // // }

// // // // export default ProtectedRoute

// // // import React, { useState, useEffect } from "react";
// // // import { Navigate, useLocation } from "react-router-dom";

// // // // Dummy useUser hook to simulate Clerk behavior
// // // function useUser ()  {
// // //   // Change these states to test different scenarios:
// // //   const [isLoaded, setIsLoaded] = useState(false);
// // //   const [isSignedIn, setIsSignedIn] = useState(false);
// // //   const [user, setUser] = useState(undefined);

// // //   useEffect(() => {
// // //     // Simulate async user loading
// // //     setTimeout(() => {
// // //       setIsLoaded(true);
// // //       setIsSignedIn(true);
// // //       setUser({
// // //         unsafeMetadata: {
// // //           role: "student", // change to null/undefined to test redirect to onboarding
// // //         },
// // //       });
// // //     }, 1000);
// // //   }, []);

// // //   return { isLoaded, isSignedIn, user };
// // // };

// // // const ProtectedRoute = ({ children }) => {
// // //   const { isSignedIn, isLoaded, user } = useUser();
// // //   const location = useLocation();
// // //   const { pathname } = location;

// // //   if (isLoaded && !isSignedIn && isSignedIn !== undefined) {
// // //     return <Navigate to="/?sign-in=true" />;
// // //   }

// // //   if (
// // //     user !== undefined &&
// // //     !user?.unsafeMetadata?.role &&
// // //     pathname !== "/onboarding"
// // //   )
// // //     return <Navigate to="/onboarding" />;

// // //   return children;
// // // };

// // // // Dummy components for demonstration
// // // const Home = () => <h2>Home - Public</h2>;
// // // const Dashboard = () => <h2>Dashboard - Protected Content</h2>;
// // // const Onboarding = () => <h2>Onboarding Page - Set your role</h2>;

// // // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// // // const AppDemo = () => {
// // //   return (
// // //     <Router>
// // //       <Routes>
// // //         <Route path="/" element={<Home />} />
// // //         <Route
// // //           path="/dashboard"
// // //           element={
// // //             <ProtectedRoute>
// // //               <Dashboard />
// // //             </ProtectedRoute>
// // //           }
// // //         />
// // //         <Route path="/onboarding" element={<Onboarding />} />
// // //       </Routes>
// // //     </Router>
// // //   );
// // // };

// // // export default AppDemo;

// // // import { useLocation, Navigate, Outlet } from "react-router-dom";
// // // import { useState, useEffect } from "react";

// // // // Dummy useUser hook
// // // function useUser() {
// // //   const [isLoaded, setIsLoaded] = useState(false);
// // //   const [isSignedIn, setIsSignedIn] = useState(false);
// // //   const [user, setUser] = useState(undefined);

// // //   useEffect(() => {
// // //     setTimeout(() => {
// // //       setIsLoaded(true);
// // //       setIsSignedIn(true);
// // //       setUser({
// // //         unsafeMetadata: {
// // //           role: "student", // try null to simulate onboarding redirection
// // //         },
// // //       });
// // //     }, 1000);
// // //   }, []);

// // //   return { isLoaded, isSignedIn, user };
// // // }

// // // const ProtectedRoute = () => {
// // //   const { isSignedIn, isLoaded, user } = useUser();
// // //   const location = useLocation();

// // //   if (!isLoaded) return null; // Or a spinner

// // //   if (!isSignedIn) {
// // //     return <Navigate to="/?sign-in=true" state={{ from: location }} />;
// // //   }

// // //   if (!user?.unsafeMetadata?.role && location.pathname !== "/onboarding") {
// // //     return <Navigate to="/onboarding" />;
// // //   }

// // //   return <Outlet />;
// // // };

// // // export default ProtectedRoute;


// // import { useLocation, Navigate, Outlet } from "react-router-dom";
// // import { useState, useEffect } from "react";

// // // Dummy useUser hook
// // function useUser() {
// //   const [isLoaded, setIsLoaded] = useState(false);
// //   const [isSignedIn, setIsSignedIn] = useState(false);
// //   const [user, setUser] = useState(undefined);

// //   useEffect(() => {
// //     setTimeout(() => {
// //       setIsLoaded(true);
// //       setIsSignedIn(true);
// //       setUser({
// //         unsafeMetadata: {
// //           role: "student", // test with null to simulate onboarding
// //         },
// //       });
// //     }, 1000); // Simulate loading delay
// //   }, []);

// //   return { isLoaded, isSignedIn, user };
// // }

// // const ProtectedRoute = () => {
// //   const { isSignedIn, isLoaded, user } = useUser();
// //   const location = useLocation();

// //   // ✅ Wait until user is loaded
// //   if (!isLoaded) {
// //     return <div className="p-4 text-center">Loading...</div>; // optional: spinner
// //   }

// //   // ❌ Not signed in → redirect to sign-in
// //   if (!isSignedIn) {
// //     return <Navigate to="/?sign-in=true" state={{ from: location }} />;
// //   }

// //   // ❌ Signed in, but no role → go to onboarding
// //   if (!user?.unsafeMetadata?.role && location.pathname !== "/onboarding") {
// //     return <Navigate to="/onboarding" replace />;
// //   }

// //   // ✅ Everything fine → render nested route
// //   return <Outlet />;
// // };

// // export default ProtectedRoute;


// import { Navigate, Outlet, useLocation } from "react-router-dom";

// // 💡 Manually controlled flags — set these as needed
// const isLoaded = true;           // Change to false to simulate loading
// const isSignedIn = true;         // Change to false to simulate not logged in
// const hasRole = true;            // Change to false to simulate missing role

// const ProtectedRoute = () => {
//   const location = useLocation();

//   if (!isLoaded) {
//     return <div className="p-4 text-center">Loading...</div>; // or a loader
//   }

//   if (!isSignedIn) {
//     return <Navigate to="/?sign-in=true" state={{ from: location }} replace />;
//   }

//   if (!hasRole && location.pathname !== "/onboarding") {
//     return <Navigate to="/onboarding" replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;


// src/components/PrivateRoute.jsx
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const { user } = useSelector((state) => state.auth);

  return user ? <Outlet /> : <Navigate to="/?sign-in=true" replace />;
};

export default PrivateRoute;


