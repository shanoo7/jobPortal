import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MDEditor from "@uiw/react-md-editor";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BarLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { postJob } from "@/redux/slices/jobSlice";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  requirements: z.string().min(1, "Requirements are required"),
  salary: z.coerce.number().min(0, "Salary must be positive"),
  experienceLevel: z.coerce.number().min(0, "Experience must be positive"),
  location: z.string().min(1, "Location is required"),
  jobType: z.string().min(1, "Job type is required"),
  position: z.coerce.number().min(1, "At least 1 position required"),
  company: z.string().min(1, "Company name is required"),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  logo: z.string().url("Invalid URL").optional().or(z.literal(""))
});

const locations = [
  "Maharashtra", "Karnataka", "Tamil Nadu", "Delhi",
  "Gujarat", "West Bengal", "Remote"
];

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship", "Remote"];

export default function PostJob() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.job);
  const { user } = useSelector((state) => state.auth);
  const [isLoaded, setIsLoaded] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      requirements: "",
      salary: "",
      experienceLevel: "",
      location: "",
      jobType: "",
      position: "",
      company: "",
      website: "",
      logo: ""
    }
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const onSubmit = async (data) => {
    try {
      const requirementsArray = data.requirements
        .split('\n')
        .map(item => item.trim())
        .filter(item => item.length > 0);

      const jobData = {
        ...data,
        requirements: requirementsArray,
        salary: Number(data.salary),
        experienceLevel: Number(data.experienceLevel),
        position: Number(data.position),
        created_by: user._id
      };

      console.log("Submitting job:", jobData);

      const result = await dispatch(postJob(jobData)).unwrap();

      toast.success("Job posted successfully!");
      reset();
    } catch (error) {
      console.error("Job posting error:", error);
      toast.error(error.message || "Failed to post job");

      // Log backend validation errors if available
      if (error.requiredFields) {
        console.log("Missing fields:", error.requiredFields);
      }
    }
  };

  if (!isLoaded) return <BarLoader width="100%" color="#36d7b7" />;
  if (!user) return <p className="text-center text-red-500">Please login to continue</p>;
  if (user.role !== "recruiter") return <p className="text-center text-red-500">Recruiters only</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Post a Job</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Job Title */}
        <div>
          <Input className="rounded" placeholder="Job Title*" {...register("title")} />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        {/* Company Name */}
        <div>
          <Input className="rounded" placeholder="Company Name*" {...register("company")} />
          {errors.company && <p className="text-red-500 text-sm">{errors.company.message}</p>}
        </div>

        {/* Job Description */}
        <div>
          <Textarea className="rounded" placeholder="Job Description*" {...register("description")} rows={4} />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        {/* Requirements */}
        <div>
          <label className="block text-sm font-medium mb-2">Requirements*</label>
          <Controller
            name="requirements"
            control={control}
            render={({ field }) => (
              <MDEditor
                value={field.value}
                onChange={field.onChange}
                height={200}
              />
            )}
          />
          {errors.requirements && <p className="text-red-500 text-sm">{errors.requirements.message}</p>}
        </div>

        {/* Salary and Experience */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input className="rounded" type="number" placeholder="Salary*" {...register("salary")} />
            {errors.salary && <p className="text-red-500 text-sm">{errors.salary.message}</p>}
          </div>
          <div>
            <Input className="rounded" type="number" placeholder="Experience (Years)*" {...register("experienceLevel")} />
            {errors.experienceLevel && <p className="text-red-500 text-sm">{errors.experienceLevel.message}</p>}
          </div>
        </div>

        {/* Position, Location, Job Type */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Input v type="number" placeholder="Positions Available*" {...register("position")} />
            {errors.position && <p className="text-red-500 text-sm">{errors.position.message}</p>}
          </div>

          <div>
            <Controller
            className="rounded"
              name="location"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Location*" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((loc) => (
                      <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
          </div>

          <div>
            <Controller
            className="rounded"
              name="jobType"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Job Type*" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.jobType && <p className="text-red-500 text-sm">{errors.jobType.message}</p>}
          </div>
        </div>

        {/* Website and Logo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input className="rounded" placeholder="Company Website" {...register("website")} />
            {errors.website && <p className="text-red-500 text-sm">{errors.website.message}</p>}
          </div>
          <div>
            <Input className="rounded" placeholder="Logo URL" {...register("logo")} />
            {errors.logo && <p className="text-red-500 text-sm">{errors.logo.message}</p>}
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-center">
            {typeof error === "string" ? error : "Failed to post job"}
          </div>
        )}

        <Button
          type="submit"
          className="w-full mt-6 rounded "
          disabled={loading}
        >
          {loading ? <BarLoader color="#ffffff" width={80} /> : "Post Job"}
        </Button>
      </form>
    </div>
  );
}

