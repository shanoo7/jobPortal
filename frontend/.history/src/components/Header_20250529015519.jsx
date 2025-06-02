

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
          <img src="https://cdn-icons-png.flaticon.com/512/17215/17215332.png" className="h-15" alt="Hirrd Logo" />
        </Link>

        <div className="flex gap-4 cursor-pointer items-center">
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
