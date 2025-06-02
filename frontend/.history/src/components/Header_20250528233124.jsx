
// // // import { useEffect, useState } from "react";
// // // import { Link, useSearchParams } from "react-router-dom";
// // // import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";

// // // // Dummy Button component
// // // const DummyButton  = ({ children, variant = "default", className = "", onClick }) => {
// // //   const baseStyles =
// // //     "px-4 py-2 rounded font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2";
// // //   const variants = {
// // //     default: "bg-blue-600 text-white hover:bg-blue-700",
// // //     outline: "border border-blue-600 text-blue-600 hover:bg-blue-100",
// // //     destructive: "bg-red-600 text-white hover:bg-red-700",
// // //   };
// // //   return (
// // //     <button
// // //       onClick={onClick}
// // //       className={`${baseStyles} ${variants[variant]} ${className}`}
// // //       type="button"
// // //     >
// // //       {children}
// // //     </button>
// // //   );
// // // };

// // // // Dummy UserButton component
// // // const UserButton = ({ children }) => {
// // //   const [open, setOpen] = useState(false);
// // //   return (
// // //     <div className="relative inline-block text-left">
// // //       <button
// // //         onClick={() => setOpen(!open)}
// // //         className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center"
// // //         aria-haspopup="true"
// // //         aria-expanded={open}
// // //       >
// // //         U
// // //       </button>
// // //       {open && (
// // //         <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
// // //           {children}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // // Dummy UserButton.MenuItems
// // // UserButton.MenuItems = ({ children }) => <div>{children}</div>;

// // // // Dummy UserButton.Link
// // // UserButton.Link = ({ label, labelIcon, href }) => (
// // //   <a
// // //     href={href}
// // //     className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700 "
// // //   >
// // //     {labelIcon}
// // //     {label}
// // //   </a>
// // // );

// // // // Dummy UserButton.Action
// // // UserButton.Action = ({ label }) => (
// // //   <button
// // //     onClick={() => alert("Manage Account clicked")}
// // //     className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
// // //   >
// // //     {label}
// // //   </button>
// // // );

// // // // Dummy SignIn modal
// // // const SignIn = ({ onClose }) => (
// // //   <div className="bg-white rounded p-6 max-w-sm w-full">
// // //     <h2 className="text-xl mb-4">Dummy Sign In</h2>
// // //     <p>This is a dummy sign-in modal.</p>
// // //     <DummyButton  onClick={onClose} className="mt-4">
// // //       Close
// // //     </DummyButton>
// // //   </div>
// // // );

// // // function Header ()  {
// // //   const [showSignIn, setShowSignIn] = useState(false);
// // //   const [search, setSearch] = useSearchParams();

// // //   // Dummy user state: null = signed out; else user object with role
// // //   const [user, setUser] = useState(null);

// // //   useEffect(() => {
// // //     if (search.get("sign-in")) {
// // //       setShowSignIn(true);
// // //     }
// // //   }, [search]);

// // //   // For testing: simulate user sign-in after 1 second
// // //   useEffect(() => {
// // //     const timer = setTimeout(() => {
// // //       setUser({
// // //         id: "user_123",
// // //         role: "recruiter", // try "student" or null
// // //       });
// // //     }, 1000);
// // //     return () => clearTimeout(timer);
// // //   }, []);

// // //   const handleOverlayClick = (e) => {
// // //     if (e.target === e.currentTarget) {
// // //       setShowSignIn(false);
// // //       setSearch({});
// // //     }
// // //   };

// // //   const handleSignOut = () => {
// // //     setUser(null);
// // //   };

// // //   return (
// // //     <>
// // //       <nav className="py-4 flex justify-between items-center">
// // //         <Link to="/">
// // //           <img src="/logo.png" className="h-20" alt="Hirrd Logo" />
// // //         </Link>

// // //         <div className="flex gap-8">
// // //           {!user && (
// // //             <DummyButton  variant="outline" onClick={() => setShowSignIn(true)}>
// // //               Login
// // //             </DummyButton>
// // //           )}

// // //           {user && (
// // //             <>
// // //               {user.role === "recruiter" && (
// // //                 <Link to="/post-job">
// // //                   <DummyButton  variant="destructive" className="rounded-full">
// // //                     <PenBox size={20} className="mr-2" />
// // //                     Post a Job
// // //                   </DummyButton>
// // //                 </Link>
// // //               )}

// // //               <UserButton>
// // //                 <UserButton.MenuItems>
// // //                   <UserButton.Link
// // //                     label="My Jobs"
// // //                     labelIcon={<BriefcaseBusiness size={15} />}
// // //                     href="/my-jobs"
// // //                   />
// // //                   <UserButton.Link
// // //                     label="Saved Jobs"
// // //                     labelIcon={<Heart size={15} />}
// // //                     href="/saved-jobs"
// // //                   />
// // //                   <UserButton.Action label="Manage Account" />
// // //                   <UserButton.Action label="Sign Out" onClick={handleSignOut} />
// // //                 </UserButton.MenuItems>
// // //               </UserButton>
// // //             </>
// // //           )}
// // //         </div>
// // //       </nav>

// // //       {showSignIn && (
// // //         <div
// // //           className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
// // //           onClick={handleOverlayClick}
// // //         >
// // //           <SignIn onClose={() => setShowSignIn(false)} />
// // //         </div>
// // //       )}
// // //     </>
// // //   );
// // // };

// // // export default Header;


// // import { useEffect } from "react";
// // import { Link } from "react-router-dom";
// // import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";
// // import { useSelector, useDispatch } from "react-redux";
// // import { logoutUser } from "../redux/slices/authSlice";

// // import { Button } from "@/components/ui/button"; // your actual button component
// // // import { UserButton } from "@/components/UserButton"; // your real reusable dropdown

// // function Header() {
// //   const dispatch = useDispatch();
// //   const { user } = useSelector((state) => state.auth);

// //   const handleSignOut = () => {
// //     dispatch(logoutUser());
// //   };

// //   return (
// //     <nav className="py-4 flex justify-between items-center">
// //       <Link to="/">
// //         <img src="/logo.png" className="h-20" alt="Hirrd Logo" />
// //       </Link>

// //       <div className="flex gap-8">
// //         {!user && (
// //           <Link to="/login">
// //             <Button variant="outline">Login</Button>
// //           </Link>
// //         )}

// //         {user && (
// //           <>
// //             {user.role === "recruiter" && (
// //               <Link to="/post-job">
// //                 <Button variant="destructive" className="rounded-full">
// //                   <PenBox size={20} className="mr-2" />
// //                   Post a Job
// //                 </Button>
// //               </Link>
// //             )}

// //             <UserButton>
// //               <UserButton.MenuItems>
// //                 <UserButton.Link
// //                   label="My Jobs"
// //                   labelIcon={<BriefcaseBusiness size={15} />}
// //                   href="/my-jobs"
// //                 />
// //                 <UserButton.Link
// //                   label="Saved Jobs"
// //                   labelIcon={<Heart size={15} />}
// //                   href="/saved-jobs"
// //                 />
// //                 <UserButton.Action label="Manage Account" />
// //                 <UserButton.Action label="Sign Out" onClick={handleSignOut} />
// //               </UserButton.MenuItems>
// //             </UserButton>
// //           </>
// //         )}
// //       </div>
// //     </nav>
// //   );
// // }

// // export default Header;

// import { useEffect, useState } from "react";
// import { Link, useSearchParams } from "react-router-dom";
// import { BriefcaseBusiness, Heart, PenBox, LogOut, Settings } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuLabel,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
// } from "@/components/ui/dropdown-menu";

// const SignIn = ({ onClose }) => (
//   <div className=" bg-amber-400 rounded p-6 max-w-sm w-full">
//     <h2 className="text-xl mb-4">Dummy Sign In</h2>
//     <p>This is a dummy sign-in modal.</p>
//     <Button onClick={onClose} className="mt-4">
//       Close
//     </Button>
//   </div>
// );

// function Header() {
//   const [showSignIn, setShowSignIn] = useState(false);
//   const [search, setSearch] = useSearchParams();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     if (search.get("sign-in")) {
//       setShowSignIn(true);
//     }
//   }, [search]);

//   // Simulate login
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setUser({
//         id: "user_123",
//         role: "student", // try "student" or null
//       });
//     }, 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   const handleOverlayClick = (e) => {
//     if (e.target === e.currentTarget) {
//       setShowSignIn(false);
//       setSearch({});
//     }
//   };

//   const handleSignOut = () => {
//     setUser(null);
//   };

//   return (
//     <>
//       <nav className="py-4 flex justify-between items-center">
//         <Link to="/">
//           <img src="/logo.png" className="h-20" alt="Hirrd Logo" />
//         </Link>

//         <div className="flex gap-4 items-center">
//           {!user && (
//             <Button variant="outline" onClick={() => setShowSignIn(true)}>
//               Login
//             </Button>
//           )}

//           {user && user.role === "recruiter" && (
//             <Link to="/post-job">
//               <Button variant="destructive" className="rounded-full flex items-center">
//                 <PenBox size={20} className="mr-2" />
//                 Post a Job
//               </Button>
//             </Link>
//           )}

//           {user && (
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="outline" className="w-10 h-10 rounded-full p-0">
//                   U
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent className="w-56">
//                 <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem asChild>
//                   <Link to="/my-jobs" className="flex items-center gap-2">
//                     <BriefcaseBusiness size={16} /> My Jobs
//                   </Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem asChild>
//                   <Link to="/saved-jobs" className="flex items-center gap-2">
//                     <Heart size={16} /> Saved Jobs
//                   </Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem onClick={() => alert("Manage Account")}>
//                   <Settings size={16} className="mr-2" /> Manage Account
//                 </DropdownMenuItem>
//                 <DropdownMenuItem onClick={handleSignOut}>
//                   <LogOut size={16} className="mr-2" /> Sign Out
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           )}
//         </div>
//       </nav>

//       {showSignIn && (
//         <div
//           className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
//           onClick={handleOverlayClick}
//         >
//           <SignIn onClose={() => setShowSignIn(false)} />
//         </div>
//       )}
//     </>
//   );
// }

// export default Header;


import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BriefcaseBusiness, Heart, PenBox, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { logoutUser } from "@/redux/slices/authSlice";
import AuthForm from "./AuthForm";
// import { logoutUser } from "@/redux/slices/authSlice";

// const SignIn = ({ onClose }) => (
//   <div className=" bg-amber-400 rounded p-6 max-w-sm w-full">
//     <h2 className="text-xl mb-4">Dummy Sign In</h2>
//     <p>This is a dummy sign-in modal.</p>
//     <Button onClick={onClose} className="mt-4">
//       Close
//     </Button>
//   </div>
// );

function Header() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [search, setSearch] = useSearchParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  };

  const handleSignOut = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link to="/">
          <img src="https://cdn-icons-png.flaticon.com/512/17215/17215332.png" className="h-20" alt="Hirrd Logo" />
        </Link>

        <div className="flex gap-4 items-center">
          {!user && (
            <Button variant="outline" onClick={() => setShowSignIn(true)}>
              Login
            </Button>
          )}

          {user?.role === "recruiter" && (
            <Link to="/post-job">
              <Button variant="destructive" className="rounded-full flex items-center">
                <PenBox size={20} className="mr-2" />
                Post a Job
              </Button>
            </Link>
          )}

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-10 h-10 rounded-full p-0">
                  <img
  src={user?.profile?.profilePhoto}
  alt="User Avatar"
  className="w-10 h-10 rounded-full object-cover"
/>

                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/my-jobs" className="flex items-center gap-2">
                    <BriefcaseBusiness size={16} /> My Jobs
                  </Link>
                </DropdownMenuItem>
                 <DropdownMenuItem asChild>
                  <Link to="/student-profile-jobs" className="flex items-center gap-2">
                    <BriefcaseBusiness size={16} /> student My Jobs
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/saved-jobs" className="flex items-center gap-2">
                    <Heart size={16} /> Saved Jobs
                  </Link>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => alert("Manage Account")}>
                  <Settings size={16} className="mr-2" /> Manage Account
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut size={16} className="mr-2" /> Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>

      {/* {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={handleOverlayClick}
        >
          <SignIn onClose={() => setShowSignIn(false)} />
        </div>
      )} */}

      {showSignIn && (
  <div
    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    onClick={handleOverlayClick}
  >
    <AuthForm onClose={() => {
      setShowSignIn(false);
      setSearch({});
    }} />
  </div>
)}

    </>
  );
}

export default Header;
