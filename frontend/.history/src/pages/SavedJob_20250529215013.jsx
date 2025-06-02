

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BarLoader } from "react-spinners";
import JobCard from "@/components/JobCard";
import { fetchAllJobs, unsaveJob } from "@/redux/slices/jobSlice";

const SavedJobs = () => {
  const dispatch = useDispatch();
  const { savedJobIds, allJobs, loading } = useSelector((state) => state.job);

  useEffect(() => {
    dispatch(fetchAllJobs());
  }, [dispatch]);

  // Match saved job IDs with full job objects
  const savedJobs = Array.isArray(allJobs)
    ? allJobs.filter((job) => savedJobIds.includes(job._id))
    : [];

  const handleUnsave = (jobId) => {
    dispatch(unsaveJob(jobId));
  };

  if (loading) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="w-full min-h-screen">
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Saved Jobs
      </h1>

      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {savedJobs.length > 0 ? (
          savedJobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              isSaved={true}
              onSaveToggle={() => handleUnsave(job._id)}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No Saved Jobs
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;
