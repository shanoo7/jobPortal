// src/components/Header.jsx
import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BriefcaseBusiness, Heart, PenBox, LogOut, Settings, User, Mail, GraduationCap, Building, FileText, Tag } from "lucide-react";
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
import { toast } from "sonner";
import { InfoBlock } from "./InfoBlock";

function Header() {
  // ... (keep all existing Header component code exactly as is)
}

function AccountManagementModal({ user, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    profilePhoto: user?.profile?.profilePhoto || "",
    resume: user?.profile?.resume || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [resumePreview, setResumePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formPayload = new FormData();
    formPayload.append('fullname', formData.fullname);
    formPayload.append('email', formData.email);
    formPayload.append('bio', formData.bio);
    formPayload.append('skills', formData.skills);
    
    if (user?.role === 'student') {
      if (resumeFile) {
        formPayload.append('resume', resumeFile);
      } else if (formData.resume && !formData.resume.startsWith('blob:')) {
        formPayload.append('resume', formData.resume);
      }
    }
    
    if (profilePhotoFile) {
      formPayload.append('file', profilePhotoFile);
    }
    
    try {
      await onUpdate(formPayload);
      // Clear temporary preview after successful upload
      if (resumePreview) {
        URL.revokeObjectURL(resumePreview);
        setResumePreview(null);
      }
      setIsEditing(false);
    } catch (error) {
      toast.error(error.message || "Failed to update profile");
    }
  };

  const handleProfilePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhotoFile(file);
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

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
      // Create preview URL but don't store it in formData
      const previewUrl = URL.createObjectURL(file);
      setResumePreview(previewUrl);
    }
  };

  // Clean up blob URLs when component unmounts
  useEffect(() => {
    return () => {
      if (resumePreview) {
        URL.revokeObjectURL(resumePreview);
      }
    };
  }, [resumePreview]);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 text-lg" onClick={onClose}>
      <div className="rounded-xl border-2 shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <User className="text-blue-600" size={24} />
              Manage Account
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
              &times;
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3 text-center space-y-4">
              <div className="relative group w-fit mx-auto">
                <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                  <AvatarImage src={formData.profilePhoto || "https://via.placeholder.com/150"} alt="Profile" />
                  <AvatarFallback className="bg-blue-100 text-4xl">
                    {user?.fullname?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <label htmlFor="profile-upload" className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-sm text-center px-2">Change</span>
                    <input type="file" id="profile-upload" className="hidden" accept="image/*" onChange={handleProfilePhotoUpload} />
                  </label>
                )}
              </div>

              <div>
                <h3 className="text-xl font-semibold">{formData.fullname}</h3>
                <p className="text-gray-600 capitalize">{user?.role}</p>
              </div>

              {user?.role === "student" && (
                <div>
                  <a 
                    href={resumePreview || formData.resume} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center justify-center gap-1"
                  >
                    <FileText size={16} />
                    {resumePreview ? "Preview New Resume" : "View Resume"}
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
                      className="w-full h-20 rounded-md border px-3 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <Label htmlFor="skills">Skills</Label>
                    <Input
                      id="skills"
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      placeholder="JavaScript, React, Node.js, etc."
                    />
                    <p className="text-xs text-gray-500 mt-1">Separate skills with commas</p>
                  </div>

                  {formData.skills && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.skills.split(',').filter(Boolean).map((skill, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  )}

                  {user?.role === "student" && (
                    <div>
                      <Label htmlFor="resume">Resume</Label>
                      <Input
                        id="resume"
                        name="resume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeUpload}
                      />
                      {resumePreview && (
                        <p className="text-xs text-green-500 mt-1">New resume selected (click Preview above)</p>
                      )}
                      {formData.resume && !resumePreview && (
                        <p className="text-xs text-gray-500 mt-1">Current resume exists</p>
                      )}
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <Button type="submit">Save Changes</Button>
                    <Button variant="outline" onClick={() => {
                      if (resumePreview) {
                        URL.revokeObjectURL(resumePreview);
                        setResumePreview(null);
                      }
                      setIsEditing(false);
                    }}>
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <InfoBlock icon={<User className="text-blue-600" size={18} />} label="Full Name" value={formData.fullname} />
                  <InfoBlock icon={<Mail className="text-blue-600" size={18} />} label="Email" value={formData.email} />
                  {formData.bio && <InfoBlock icon={<FileText className="text-blue-600" size={18} />} label="Bio" value={formData.bio} />}
                  {formData.skills && (
                    <InfoBlock
                      icon={<Tag className="text-blue-600" size={18} />}
                      label="Skills"
                      value={formData.skills.split(',').map(s => s.trim()).filter(Boolean).join(', ')}
                    />
                  )}
                  <div className="pt-4">
                    <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
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