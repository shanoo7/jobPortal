"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { loginUser, registerUser } from "@/redux/slices/authSlice";
import { toast } from "sonner";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// Zod schemas
const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["student", "recruiter"], "Role is required"),
});

const signupSchema = z.object({
  fullname: z.string().min(2, "Fullname must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  phoneNumber: z.string().min(10, "Phone must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["student", "recruiter"], "Role is required"),
  avatar: z
    .any()
    .refine((fileList) => fileList instanceof FileList && fileList.length > 0, {
      message: "Profile picture is required",
    }),
});

const AuthForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState("login");
  const [filePreview, setFilePreview] = useState("");

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "student",
    },
  });

  const signupForm = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullname: "",
      email: "",
      phoneNumber: "",
      password: "",
      role: "student",
      avatar: undefined,
    },
  });

  const handleLogin = async (data) => {
    try {
      const res = await dispatch(loginUser(data)).unwrap();
      toast.success(res.message || "Login successful");
      onClose?.();
    } catch (err) {
      toast.error(err?.message || "Login failed");
    }
  };

  const handleSignup = async (data) => {
    try {
      const formData = new FormData();
      formData.append("fullname", data.fullname);
      formData.append("email", data.email);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("password", data.password);
      formData.append("role", data.role);
      formData.append("file", data.avatar[0]); // Proper file upload

      const res = await dispatch(registerUser(formData)).unwrap();
      toast.success(res.message || "Signup successful");
      onClose?.();
    } catch (err) {
      toast.error(err?.message || "Signup failed");
    }
  };

  return (
    <div className="rounded p-6 w-full max-w-md shadow">
      <Tabs defaultValue="login" value={tab} onValueChange={setTab}>
        <TabsList className="w-full mb-4">
          <TabsTrigger value="login" className="w-1/2 cursor-pointer">Login</TabsTrigger>
          <TabsTrigger value="signup" className="w-1/2 cursor-pointer">Sign Up</TabsTrigger>
        </TabsList>

        {/* Login Tab */}
        <TabsContent value="login">
          <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input {...loginForm.register("email")} />
              {loginForm.formState.errors.email && (
                <p className="text-sm text-red-500">{loginForm.formState.errors.email.message}</p>
              )}
            </div>
            <div>
              <Label>Password</Label>
              <Input type="password" {...loginForm.register("password")} />
              {loginForm.formState.errors.password && (
                <p className="text-sm text-red-500">{loginForm.formState.errors.password.message}</p>
              )}
            </div>
            <div>
              <Label>Role</Label>
              <select {...loginForm.register("role")} className="w-full border rounded px-2 py-1">
                <option value="student">Student</option>
                <option value="recruiter">Recruiter</option>
              </select>
            </div>
            <Button type="submit" className="w-full cursor-pointer">Login</Button>
          </form>
        </TabsContent>

        {/* Signup Tab */}
        <TabsContent value="signup">
          <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-4">
            <div>
              <Label>Full Name</Label>
              <Input {...signupForm.register("fullname")} />
              {signupForm.formState.errors.fullname && (
                <p className="text-sm text-red-500">{signupForm.formState.errors.fullname.message}</p>
              )}
            </div>
            <div>
              <Label>Email</Label>
              <Input {...signupForm.register("email")} />
              {signupForm.formState.errors.email && (
                <p className="text-sm text-red-500">{signupForm.formState.errors.email.message}</p>
              )}
            </div>
            <div>
              <Label>Phone Number</Label>
              <Input {...signupForm.register("phoneNumber")} />
              {signupForm.formState.errors.phoneNumber && (
                <p className="text-sm text-red-500">{signupForm.formState.errors.phoneNumber.message}</p>
              )}
            </div>
            <div>
              <Label>Password</Label>
              <Input type="password" {...signupForm.register("password")} />
              {signupForm.formState.errors.password && (
                <p className="text-sm text-red-500">{signupForm.formState.errors.password.message}</p>
              )}
            </div>
            <div>
              <Label>Role</Label>
              <select {...signupForm.register("role")} className="w-full border rounded px-2 py-1">
                <option value="student">Student</option>
                <option value="recruiter">Recruiter</option>
              </select>
            </div>
            <div>
              <Label>Profile Picture</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const fileList = e.target.files;
                  if (fileList && fileList.length > 0) {
                    signupForm.setValue("avatar", fileList, {
                      shouldValidate: true,
                    });
                    setFilePreview(URL.createObjectURL(fileList[0]));
                  }
                }}
              />
              {signupForm.formState.errors.avatar && (
                <p className="text-sm text-red-500">{signupForm.formState.errors.avatar.message}</p>
              )}
              {filePreview && (
                <img
                  src={filePreview}
                  alt="Preview"
                  className="h-16 mt-2 rounded object-cover"
                />
              )}
            </div>
            <Button type="submit" className="w-full cursor-pointer">Sign Up</Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthForm;


