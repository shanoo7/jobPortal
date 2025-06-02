/* eslint-disable react/prop-types */
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { BarLoader } from "react-spinners";

const schema = z.object({
  name: z.string().min(1, { message: "Company name is required" }),
  logo: z
    .any()
    .refine(
      (file) =>
        file[0] &&
        (file[0].type === "image/png" || file[0].type === "image/jpeg"),
      {
        message: "Only Images are allowed",
      }
    ),
});

function AddCompanyDrawer({ fetchCompanies }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [loadingAddCompany, setLoadingAddCompany] = useState(false);
  const [errorAddCompany, setErrorAddCompany] = useState(null);
  const [open, setOpen] = useState(false);

  const onSubmit = (data) => {
    setErrorAddCompany(null);
    setLoadingAddCompany(true);

    // Simulate network delay for adding company
    setTimeout(() => {
      setLoadingAddCompany(false);
      fetchCompanies(); // simulate refresh
      reset();
      setOpen(false);
    }, 1500);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button type="button" size="sm" variant="secondary">
          Add Company
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add a New Company</DrawerTitle>
        </DrawerHeader>
        <form className="flex flex-col gap-4 p-4 pb-0" onSubmit={handleSubmit(onSubmit)}>
          {/* Company Name */}
          <Input placeholder="Company name" {...register("name")} />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          {/* Company Logo */}
          <Input
            type="file"
            accept="image/png, image/jpeg"
            className="file:text-gray-500"
            {...register("logo")}
          />
          {errors.logo && <p className="text-red-500">{errors.logo.message}</p>}

          {errorAddCompany && (
            <p className="text-red-500">{errorAddCompany.message}</p>
          )}

          {loadingAddCompany && <BarLoader width={"100%"} color="#36d7b7" />}

          {/* Add Button */}
          <Button
            type="submit"
            variant="destructive"
            className="w-40"
            disabled={loadingAddCompany}
          >
            Add
          </Button>
        </form>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button type="button" variant="secondary" disabled={loadingAddCompany}>
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AddCompanyDrawer;
