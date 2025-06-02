
import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BriefcaseBusiness, Heart, PenBox, LogOut, Settings, User, Mail, GraduationCap, Building, FileText } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Header() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [search, setSearch] = useSearchParams();
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
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
    setSuccessMessage("You have been logged out successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleManageAccount = () => {
    setShowAccountModal(true);
  };

  const handleProfileUpdate = (updatedData) => {
    dispatch(updateUserProfile(updatedData));
    setSuccessMessage("Profile updated successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
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
          <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Hirrd
          </span>
        </Link>

        <div className="flex gap-4 cursor-pointer items-center">
          {!user && (
            <Button variant="outline" onClick={() => setShowSignIn(true)}>
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
                      <BriefcaseBusiness size={16} /> My Jobs
                    </Link>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  {user?.role === "student" && (
                    <Link to="/student-profile-jobs" className="flex items-center gap-2">
                      <BriefcaseBusiness size={16} /> My Applications
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

      {/* Success Message Banner */}
      {successMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50">
          {successMessage}
        </div>
      )}

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


////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Account Management Modal Component
function AccountManagementModal({ user, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    profilePhoto: user?.profile?.profilePhoto || "",
    resume: user?.profile?.resume || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills || "",
  });
  
  const [isEditing, setIsEditing] = useState(false);

  const [profilePhotoFile, setProfilePhotoFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onUpdate(formData);
  //   setIsEditing(false);
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Create FormData object
  const formPayload = new FormData();
  
  // Append text fields
  formPayload.append('fullname', formData.fullname);
  formPayload.append('email', formData.email);
  formPayload.append('bio', formData.bio);
  
  if (user?.role === 'student') {
    formPayload.append('resume', formData.resume);
  }
  
  // If a new profile photo was selected
  if (profilePhotoFile) {
    formPayload.append('file', profilePhotoFile);
  }
  
  onUpdate(formPayload);
  setIsEditing(false);
};
  
  // const handleFileUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     // Simulate file upload
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       setFormData(prev => ({
  //         ...prev,
  //         profilePhoto: event.target.result
  //       }));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };


  

const handleFileUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    setProfilePhotoFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData(prev => ({
        ...prev,
        profilePhoto: event.target.result
      }));
    };
    reader.readAsDataURL(file);
  }
};
  return (
    <div 
      className="fixed inset-0 text-lg flex items-center justify-center bg-black bg-opacity-50 z-50 p-4"
      onClick={onClose} 
    >
      <div 
        className=" border-2 rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <User className="text-blue-600" size={24} />
              Manage Account
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3 flex flex-col items-center">
              <div className="relative group">
                <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                  <AvatarImage 
                    src={formData.profilePhoto || "https://via.placeholder.com/150"} 
                    alt="Profile"
                  />
                  <AvatarFallback className="bg-blue-100 text-4xl">
                    {user?.fullname?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <label 
                    htmlFor="profile-upload"
                    className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <span className="text-white text-sm text-center px-2">Change Photo</span>
                    <input 
                      type="file" 
                      id="profile-upload" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleFileUpload}
                    />
                  </label>
                )}
              </div>
              
              <div className="mt-4 text-center">
                <h3 className="text-xl font-semibold">{formData.fullname}</h3>
                <p className="text-gray-600">{user?.role === "student" ? "Student" : "Recruiter"}</p>
              </div>
              
              {user?.role === "student" && formData.resume && (
                <div className="mt-4">
                  <a 
                    href={formData.resume} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:underline"
                  >
                    <FileText size={16} />
                    View Resume
                  </a>
                </div>
              )}
            </div>
            
            <div className="md:w-2/3">
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="fullname">Full Name</Label>
                    <Input
                      id="fullname"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Tell us about yourself..."
                      className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                  </div>
                  
                  {user?.role === "student" && (
                    <div>
                      <Label htmlFor="resume">Resume</Label>
                      <Input
                        id="resume"
                        name="resume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setFormData(prev => ({
                              ...prev,
                              resume: URL.createObjectURL(file)
                            }));
                          }
                        }}
                      />

                    </div>
                  )}
                  
                  <div className="flex gap-2 pt-4">
                    <Button type="submit">Save Changes</Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <User className="text-blue-600" size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-500">Full Name</h4>
                      <p className="font-medium">{formData.fullname}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Mail className="text-blue-600" size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-500">Email Address</h4>
                      <p className="font-medium">{formData.email}</p>
                    </div>
                  </div>
                  
                  {user?.role === "student" && (
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <GraduationCap className="text-blue-600" size={18} />
                      </div>
                      <div>
                        <h4 className="text-sm text-gray-500">Role</h4>
                        <p className="font-medium">Student</p>
                      </div>
                    </div>
                  )}
                  
                  {user?.role === "recruiter" && (
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <Building className="text-blue-600" size={18} />
                      </div>
                      <div>
                        <h4 className="text-sm text-gray-500">Role</h4>
                        <p className="font-medium">Recruiter</p>
                      </div>
                    </div>
                  )}
                  
                  {formData.bio && (
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <FileText className="text-blue-600" size={18} />
                      </div>
                      <div>
                        <h4 className="text-sm text-gray-500">Bio</h4>
                        <p className="font-medium">{formData.bio}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="pt-6">
                    <Button onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
