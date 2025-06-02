
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BarLoader } from "react-spinners";
import JobCard from "@/components/JobCard";
import { getLikedJobs } from "@/redux/slices/authSlice";

const SavedJobs = () => {
  const dispatch = useDispatch();
  const { user, likedJobs, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(getLikedJobs());
    }
  }, [dispatch, user]);

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-medium">Please login to view saved jobs</h2>
      </div>
    );
  }

  if (loading) {
    return <div className="flex justify-center mt-8"><BarLoader width={"100%"} color="#36d7b7" /></div>;
  }

  return (
    <div className="w-full min-h-screen">
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Saved Jobs
      </h1>

      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {likedJobs.length > 0 ? (
          likedJobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
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
