import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
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
import { logoutUser, updateUserProfile } from "@/redux/slices/authSlice";
import AuthForm from "./AuthForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { AccountManagementModal } from "./AccountManagementModal";

function Header() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [search, setSearch] = useSearchParams();
  const [showAccountModal, setShowAccountModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    toast.success("You have been logged out successfully!");
    navigate("/");
  };

  const handleManageAccount = () => {
    setShowAccountModal(true);
  };

  const handleProfileUpdate = (updatedData) => {
    dispatch(updateUserProfile(updatedData));
    toast.success("Profile updated successfully!");
  };

  return (
    <>
      <nav className="py-4 flex justify-between items-center border-b px-4">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/17215/17215332.png"
            className="h-10"
            alt="Hirrd Logo"
          />
        </Link>

        <div className="flex gap-4 cursor-pointer items-center">
          {!user && (
            <Button className=" cursor-pointer" variant="outline" onClick={() => setShowSignIn(true)}>
              Login
            </Button>
          )}

          {user?.role === "recruiter" && (
            <Link to="/post-job">
              <Button variant="destructive" className="rounded-full cursor-pointer flex items-center">
                <PenBox size={20} className="mr-2" />
                Post a Job
              </Button>
            </Link>
          )}

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-10 h-10 cursor-pointer rounded-full p-0">
                  <Avatar>
                    <AvatarImage
                      src={user?.profile?.profilePhoto || "https://via.placeholder.com/150"}
                      alt="User Avatar"
                    />
                    <AvatarFallback className="bg-blue-100">
                      {user?.fullname?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user?.profile?.profilePhoto || "https://via.placeholder.com/150"}
                    />
                    <AvatarFallback className="bg-blue-100 text-sm">
                      {user?.fullname?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user?.fullname}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  {user?.role === "recruiter" && (
                    <Link to="/my-jobs" className="flex items-center gap-2">
                      <BriefcaseBusiness size={16} /> My Post
                    </Link>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  {user?.role === "student" && (
                    <Link to="/student-profile-jobs" className="flex items-center gap-2">
                      <BriefcaseBusiness size={16} /> My Job
                    </Link>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/saved-jobs" className="flex items-center gap-2">
                    <Heart size={16} /> Saved Jobs
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleManageAccount}>
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

      {showAccountModal && (
        <AccountManagementModal
          user={user}
          onClose={() => setShowAccountModal(false)}
          onUpdate={handleProfileUpdate}
        />
      )}
    </>
  );
}


export default Header;
