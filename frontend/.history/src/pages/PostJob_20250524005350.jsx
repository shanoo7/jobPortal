import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
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

// Validation schema
const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  location: z.string().min(1, { message: "Select a location" }),
  companyId: z.string().min(1, { message: "Select a company" }),
  requirements: z.string().min(1, { message: "Requirements are required" }),
  salary: z
    .coerce
    .number({ invalid_type_error: "Salary must be a number" })
    .min(0),
  experience: z
    .coerce
    .number({ invalid_type_error: "Experience must be a number" })
    .min(0),
  jobType: z.string().min(1, { message: "Select a Job Type" }),
  position: z
    .coerce
    .number({ invalid_type_error: "Position must be a number" })
    .min(0),
});

const dummyCompanies = [
  { id: "60d5f9b4f9d7b814c89c44a1", name: "Acme Corp" },
  { id: "60d5f9b4f9d7b814c89c44a2", name: "Beta LLC" },
  { id: "60d5f9b4f9d7b814c89c44a3", name: "Gamma Inc" },
];

const dummyStates = [
  "Maharashtra",
  "Karnataka",
  "Tamil Nadu",
  "Delhi",
  "Gujarat",
  "West Bengal",
];

const dummyJobTypes = ["Full-time", "Part-time", "Contract", "Internship"];

function PostJob() {
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
    defaultValues: {
      title: "",
      description: "",
      requirements: "", // markdown string
      salary: 0,
      location: dummyStates[0],
      jobType: dummyJobTypes[0],
      experience: 0,
      position: 0,
      companyId: dummyCompanies[0].id,
    },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!user) {
    return (
      <div className="text-center text-red-500 font-bold">
        Please login to continue.
      </div>
    );
  }

  if (user.role !== "recruiter") {
    return (
      <div className="text-center text-red-500 font-bold">
        Access denied. Recruiters only.
      </div>
    );
  }

  const onSubmit = async (data) => {
    // Convert requirements from markdown string to array of trimmed lines
    const requirementsArray = data.requirements
      .split("\n")
      .map((r) => r.trim())
      .filter(Boolean);

    const payload = {
      title: data.title,
      description: data.description,
      requirements: requirementsArray, // MUST be an array of strings
      salary: Number(data.salary) || 0,
      experience: Number(data.experience) || 0,
      location: data.location,
      jobType: data.jobType,
      position: Number(data.position) || 0,
      companyId: data.companyId,
      created_by: user._id || user.id,
    };

    console.log("Payload to post:", payload); // <-- Debug output

    /*
    // Uncomment below to test with hardcoded payload ignoring form inputs:
    const testPayload = {
      title: "Test Job",
      description: "This is a test job description",
      requirements: ["Requirement 1", "Requirement 2", "Requirement 3"],
      salary: 50000,
      experience: 2,
      location: dummyStates[0],
      jobType: dummyJobTypes[0],
      position: 1,
      companyId: dummyCompanies[0].id,
      created_by: user._id || user.id,
    };
    console.log("Test payload:", testPayload);
    */

    try {
      // Use either payload or testPayload here:
      const resultAction = await dispatch(postJob(payload));
      if (postJob.fulfilled.match(resultAction)) {
        alert("Job posted successfully!");
        reset();
      } else {
        alert(
          typeof resultAction.payload === "string"
            ? resultAction.payload
            : JSON.stringify(resultAction.payload)
        );
      }
    } catch (err) {
      console.error(err);
      alert("Failed to post job due to an error.");
    }
  };

  if (!isLoaded) {
    return <BarLoader width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="gradient-title font-extrabold text-5xl sm:text-7xl text-center pb-8">
        Post a Job
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input placeholder="Job Title" {...register("title")} />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}

        <Textarea placeholder="Job Description" {...register("description")} />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}

        <Controller
          name="requirements"
          control={control}
          render={({ field }) => (
            <MDEditor
              {...field}
              height={150}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        {errors.requirements && (
          <p className="text-red-500 text-sm">{errors.requirements.message}</p>
        )}

        <div className="flex flex-wrap gap-4">
          <Input
            type="number"
            placeholder="Salary"
            {...register("salary", { valueAsNumber: true })}
          />
          {errors.salary && (
            <p className="text-red-500 text-sm">{errors.salary.message}</p>
          )}

          <Input
            type="number"
            placeholder="Experience Level (years)"
            {...register("experience", { valueAsNumber: true })}
          />
          {errors.experience && (
            <p className="text-red-500 text-sm">{errors.experience.message}</p>
          )}

          <Input
            type="number"
            placeholder="Position"
            {...register("position", { valueAsNumber: true })}
          />
          {errors.position && (
            <p className="text-red-500 text-sm">{errors.position.message}</p>
          )}
        </div>

        <div className="flex gap-4 flex-wrap">
          {/* Location Select */}
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <div>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Job Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {dummyStates.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.location && (
                  <p className="text-red-500 text-sm">{errors.location.message}</p>
                )}
              </div>
            )}
          />

          {/* Company Select */}
          <Controller
            name="companyId"
            control={control}
            render={({ field }) => (
              <div>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {dummyCompanies.map(({ id, name }) => (
                        <SelectItem key={id} value={id}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.companyId && (
                  <p className="text-red-500 text-sm">{errors.companyId.message}</p>
                )}
              </div>
            )}
          />

          {/* Job Type Select */}
          <Controller
            name="jobType"
            control={control}
            render={({ field }) => (
              <div>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {dummyJobTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.jobType && (
                  <p className="text-red-500 text-sm">{errors.jobType.message}</p>
                )}
              </div>
            )}
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm">
            {typeof error === "string" ? error : JSON.stringify(error)}
          </p>
        )}
        {loading && <BarLoader width={"100%"} color="#36d7b7" />}

        <Button type="submit" variant="blue" size="lg" className="mt-4">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default PostJob;
