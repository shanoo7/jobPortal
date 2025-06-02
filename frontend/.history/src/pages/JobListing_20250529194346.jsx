import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import {
  fetchAllJobs,
  saveJob,
  unsaveJob,
} from "@/redux/slices/jobSlice";
import JobCard from "@/components/JobCard";

const JobListing = () => {
  const dispatch = useDispatch();

  const { allJobs, savedJobIds, loading, error } = useSelector((state) => state.job);
  const { user } = useSelector((state) => state.auth); // 👈 get logged-in user

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("all");
  const [company, setCompany] = useState("all");

  useEffect(() => {
    dispatch(fetchAllJobs({ search, location, company }));
  }, [dispatch, search, location, company]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchAllJobs({ search, location, company }));
  };

  const handleClearFilters = () => {
    setSearch("");
    setLocation("all");
    setCompany("all");
    dispatch(fetchAllJobs({ search: "", location: "all", company: "all" }));
  };

  const isSaved = (jobId) => savedJobIds.includes(jobId);

  const handleSaveToggle = (job) => {
    if (isSaved(job._id)) {
      dispatch(unsaveJob(job._id));
    } else {
      dispatch(saveJob(job));
    }
  };

  // Final filtered list
  const filteredJobs = (allJobs || []).filter((job) => {
    const matchesSearch =
      search.trim() === "" || job.title.toLowerCase().includes(search.toLowerCase());
    const matchesLocation = location === "all" || job.location === location;
    const matchesCompany = company === "all" || job.company?.name === company;

    // If recruiter, only show jobs posted by them
    const isOwnJob =
      user?.role === "recruiter"
        ? job.created_by === user._id
        : true;

    return matchesSearch && matchesLocation && matchesCompany && isOwnJob;
  });

  return (
    <div>
      {user?.role === "recruiter" ? (
        <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
          Your Posted Jobs
        </h1>
      )
        : (
          <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
            Find Your Dream Job
          </h1>
        )
      }

      <form
        onSubmit={handleSearchSubmit}
        className="h-14 flex flex-row w-full gap-2 items-center mb-3"
      >
        <Input
          type="text"
          placeholder="Search Jobs by Title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-full flex-1 px-4 text-md"
        />
      </form>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <Select onValueChange={setLocation} value={location}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Delhi">Delhi</SelectItem>
              <SelectItem value="Mumbai">Mumbai</SelectItem>
              <SelectItem value="Bangalore">Bangalore</SelectItem>
              <SelectItem value="Hyderabad">Hyderabad</SelectItem>
              <SelectItem value="Noida">Noida</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select onValueChange={setCompany} value={company}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Google">Google</SelectItem>
              <SelectItem value="Amazon">Amazon</SelectItem>
              <SelectItem value="Microsoft">Microsoft</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button
          onClick={handleClearFilters}
          className="sm:w-1/2"
          variant="destructive"
        >
          Clear Filters
        </Button>
      </div>

      {loading && <p className="text-center text-gray-500">Loading jobs...</p>}
      {error && <p className="text-center text-red-500">Failed to load jobs: {error}</p>}

      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              isSaved={isSaved(job._id)}
              onSaveToggle={() => handleSaveToggle(job)}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default JobListing;

