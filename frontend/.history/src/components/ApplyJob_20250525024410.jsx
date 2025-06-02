

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BarLoader } from "react-spinners";
import * as z from "zod";

// Validation schema
const schema = z.object({
  experience: z.number().min(0, "Experience must be at least 0").int(),
  skills: z.string().min(1, "Skills are required"),
  education: z.enum(["Intermediate", "Graduate", "Post Graduate"], {
    message: "Education is required",
  }),
  resume: z
    .any()
    .refine(
      (file) =>
        file?.[0] &&
        ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file[0].type),
      { message: "Only PDF or Word documents are allowed" }
    ),
});

export function ApplyJob() {
  // Simulating passed props for "hiring open" and "not applied"
  const user = { name: "Test User" };
  const job = {
    title: "Frontend Developer",
    isOpen: true,
    company: { name: "OpenAI" },
  };
  const applied = false;

  const [isOpen, setIsOpen] = useState(false);
  const [loadingApply, setLoadingApply] = useState(false);
  const [errorApply, setErrorApply] = useState(null);
  const [hasApplied, setHasApplied] = useState(applied);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    setLoadingApply(true);
    setErrorApply(null);

    setTimeout(() => {
      const success = Math.random() < 0.8;
      if (success) {
        setHasApplied(true);
        setIsOpen(false);
        reset();
      } else {
        setErrorApply({ message: "Failed to apply. Try again." });
      }
      setLoadingApply(false);
    }, 1500);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button
          size="lg"
          variant={job?.isOpen && !hasApplied ? "blue" : "destructive"}
          disabled={!job?.isOpen || hasApplied}
        >
          {job?.isOpen ? (hasApplied ? "Applied" : "Apply") : "Hiring Closed"}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            Apply for {job?.title} at {job?.company?.name}
          </DrawerTitle>
          <DrawerDescription>Fill in the application form below.</DrawerDescription>
        </DrawerHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 p-4 pb-0"
          noValidate
        >
          <Input
            type="number"
            placeholder="Years of Experience"
            {...register("experience", { valueAsNumber: true })}
            disabled={loadingApply}
          />
          {errors.experience && (
            <p className="text-red-500 text-sm">{errors.experience.message}</p>
          )}

          <Input
            type="text"
            placeholder="Skills (Comma Separated)"
            {...register("skills")}
            disabled={loadingApply}
          />
          {errors.skills && (
            <p className="text-red-500 text-sm">{errors.skills.message}</p>
          )}

          <Controller
            name="education"
            control={control}
            render={({ field }) => (
              <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                {["Intermediate", "Graduate", "Post Graduate"].map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={option} />
                    <Label htmlFor={option}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          />
          {errors.education && (
            <p className="text-red-500 text-sm">{errors.education.message}</p>
          )}

          <Input
            type="file"
            accept=".pdf, .doc, .docx"
            {...register("resume")}
            disabled={loadingApply}
          />
          {errors.resume && (
            <p className="text-red-500 text-sm">{errors.resume.message}</p>
          )}

          {errorApply?.message && (
            <p className="text-red-500 text-sm">{errorApply.message}</p>
          )}
          {loadingApply && <BarLoader width="100%" color="#36d7b7" />}

          <Button type="submit" variant="blue" size="lg" disabled={loadingApply}>
            Apply
          </Button>
        </form>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" disabled={loadingApply}>
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}



