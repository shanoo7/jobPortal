import { Building, FileText, GraduationCap, Mail, Phone, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useState } from "react";
import { Input } from "./ui/input";

export function AccountManagementModal({ user, onClose, onUpdate }) {
    const [formData, setFormData] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        profilePhoto: user?.profile?.profilePhoto || "",
        resume: user?.profile?.resume || "",
        resumeName: user?.profile?.resumeName || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(", ") || "",
    });

    const [isEditing, setIsEditing] = useState(false);
    const [profilePhotoFile, setProfilePhotoFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateUrl = (url) => {
        if (!url) return true; // Allow empty
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting with data:', formData);
        setIsSubmitting(true);

        try {
            // Validate resume URL if provided
            if (formData.resume && !validateUrl(formData.resume)) {
                toast.error("Please enter a valid URL for your resume");
                return;
            }

            const payload = {
                fullname: formData.fullname,
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                bio: formData.bio,
                skills: formData.skills,
                resume: formData.resume,
                resumeName: formData.resumeName || "Resume"
            };

            let formPayload;
            if (profilePhotoFile) {
                formPayload = new FormData();
                Object.entries(payload).forEach(([key, value]) => {
                    formPayload.append(key, value);
                });
                formPayload.append('file', profilePhotoFile);
            } else {
                formPayload = payload;
            }

            await onUpdate(formPayload);
            toast.success("Profile updated successfully!");
            setIsEditing(false);
            setProfilePhotoFile(null);
        } catch (error) {
            console.error("Update error:", error);
            toast.error(error.response?.data?.message || "Failed to update profile");
        } finally {
            setIsSubmitting(false);
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

    const handleCancel = () => {
        setIsEditing(false);
        setProfilePhotoFile(null);
        setFormData({
            fullname: user?.fullname || "",
            email: user?.email || "",
            phoneNumber: user?.phoneNumber || "",
            profilePhoto: user?.profile?.profilePhoto || "",
            resume: user?.profile?.resume || "",
            resumeName: user?.profile?.resumeName || "",
            bio: user?.profile?.bio || "",
            skills: user?.profile?.skills?.join(", ") || "",
        });
    };

    return (
        <div  className="fixed inset-0 text-lg flex items-center justify-center bg-black bg-opacity-50 z-50 p-4" onClick={onClose}>
            <div className="border-2 rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <User className="text-blue-600" size={24} />
                            Manage Account
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 text-2xl"
                        >
                            &times;
                        </button>
                    </div>

                    <div  className="flex flex-col md:flex-row gap-6">
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
                                            onChange={handleProfilePhotoUpload}
                                        />
                                    </label>
                                )}
                            </div>

                            <div  className="mt-4 text-center">
                                <h3 className="text-xl font-semibold">{formData.fullname}</h3>
                                <p className="text-gray-600">{user?.role === "student" ? "Student" : "Recruiter"}</p>
                            </div>

                            {user?.role === "student" && (
                                <div className="mt-4 flex flex-col gap-2 w-full">
                                    <div className="flex items-center gap-2 justify-center">
                                        <FileText size={16} />
                                        <span className="font-medium">
                                            {formData.resumeName || (formData.resume ? "My Resume" : "No Resume")}
                                        </span>
                                    </div>
                                    {formData.resume && (
                                        <div className="flex gap-2 justify-center">
                                            <a
                                                href={formData.resume}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline text-sm"
                                            >
                                                View
                                            </a>
                                            <a
                                                href={formData.resume}
                                                download={formData.resumeName || "resume"}
                                                className="text-blue-600 hover:underline text-sm"
                                            >
                                                Download
                                            </a>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div style={{
    maxHeight: '80vh',
    overflowY: 'auto',
    scrollbarWidth: 'thin', // Firefox only
    scrollbarColor: 'rgba(59, 130, 246, 0.7) #f3f4f6', // thumb + track
  }} className="md:w-2/3">
                            {isEditing ? (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <Label className="mb-2" htmlFor="fullname">Full Name</Label>
                                        <Input
                                            id="fullname"
                                            name="fullname"
                                            value={formData.fullname}
                                            onChange={handleChange}
                                            placeholder="Enter your full name"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <Label className="mb-2" htmlFor="email">Email Address</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <Label className="mb-2" htmlFor="phoneNumber">Phone Number</Label>
                                        <Input
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            placeholder="Enter your phone number"
                                        />
                                    </div>

                                    <div>
                                        <Label className="mb-2" htmlFor="bio">Bio</Label>
                                        <textarea
                                            id="bio"
                                            name="bio"
                                            value={formData.bio}
                                            onChange={handleChange}
                                            placeholder="Tell us about yourself..."
                                            className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                        />
                                    </div>

                                    <div>
                                        <Label className="mb-2" htmlFor="skills">Skills</Label>
                                        <Input
                                            id="skills"
                                            name="skills"
                                            value={formData.skills}
                                            onChange={handleChange}
                                            placeholder="JavaScript, React, Node.js, etc."
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Separate skills with commas</p>
                                    </div>

                                    {user?.role === "student" && (
                                        <div className="space-y-2">
                                            <Label className="mb-2" htmlFor="resume">Resume URL</Label>
                                            <Input
                                                id="resume"
                                                name="resume"
                                                type="url"
                                                value={formData.resume}
                                                onChange={handleChange}
                                                placeholder="https://drive.google.com/..."
                                            />
                                            {formData.resume && !validateUrl(formData.resume) && (
                                                <p className="text-sm text-red-500">Please enter a valid URL</p>
                                            )}

                                            <Label className="mb-2" htmlFor="resumeName">Resume Display Name</Label>
                                            <Input
                                                id="resumeName"
                                                name="resumeName"
                                                value={formData.resumeName}
                                                onChange={handleChange}
                                                placeholder="My Resume 2023"
                                            />
                                        </div>
                                    )}

                                    <div className="flex gap-2 pt-4">
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting ||
                                                (formData.resume && !validateUrl(formData.resume))
                                            }
                                        >
                                            {isSubmitting ? "Saving..." : "Save Changes"}
                                        </Button>
                                        <Button
                                            variant="outline"
                                            type="button"
                                            onClick={handleCancel}
                                            disabled={isSubmitting}
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

                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-blue-100 rounded-full">
                                            <Phone className="text-blue-600" size={18} />
                                        </div>
                                        <div>
                                            <h4 className="text-sm text-gray-500">Phone Number</h4>
                                            <p className="font-medium">{formData.phoneNumber || "Not provided"}</p>
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

                                    {formData.skills && (
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 bg-blue-100 rounded-full">
                                                <FileText className="text-green-600" size={18} />
                                            </div>
                                            <div>
                                                <h4 className="text-sm text-gray-500">Skills</h4>
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {formData.skills.split(',').filter(Boolean).map((skill, index) => (
                                                        <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                                            {skill.trim()}
                                                        </span>
                                                    ))}
                                                </div>
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