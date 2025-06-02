

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { BarLoader } from "react-spinners";
// import JobCard from "@/components/JobCard";
// import { fetchAllJobs, unsaveJob } from "@/redux/slices/jobSlice";

// const SavedJobs = () => {
//   const dispatch = useDispatch();
//   const { savedJobIds, allJobs, loading } = useSelector((state) => state.job);

//   useEffect(() => {
//     dispatch(fetchAllJobs());
//   }, [dispatch]);

//   // Match saved job IDs with full job objects
//   const savedJobs = Array.isArray(allJobs)
//     ? allJobs.filter((job) => savedJobIds.includes(job._id))
//     : [];

//   const handleUnsave = (jobId) => {
//     dispatch(unsaveJob(jobId));
//   };

//   if (loading) {
//     return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
//   }

//   return (
//     <div className="w-full min-h-screen">
//       <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
//         Saved Jobs
//       </h1>

//       <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {savedJobs.length > 0 ? (
//           savedJobs.map((job) => (
//             <JobCard
//               key={job._id}
//               job={job}
//               isSaved={true}
//               onSaveToggle={() => handleUnsave(job._id)}
//             />
//           ))
//         ) : (
//           <div className="col-span-full text-center text-gray-500">
//             No Saved Jobs
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SavedJobs;


import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BarLoader } from "react-spinners";
import JobCard from "@/components/JobCard";
import { getLikedJobs } from "@/redux/slices/authSlice"; // Changed import

const SavedJobs = () => {
  const dispatch = useDispatch();
  
  // Get liked jobs from auth state
  const { likedJobs, loading } = useSelector((state) => state.auth);
 useEffect(() => {
    if (user) {
      dispatch(getLikedJobs());
    }
  }, [dispatch, user]);

  // Show message when not logged in
  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-medium">Please login to view saved jobs</h2>
      </div>
    );
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
              isSaved={true}
              onSaveToggle={() => dispatch(unlikeJob(job._id))}
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
