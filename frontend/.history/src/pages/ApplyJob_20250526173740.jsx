

// import { Button } from "@/components/ui/button";
// import { useDispatch } from "react-redux";
// import { applyForJob } from "@/redux/slices/applicationSlice";
// import { toast } from "sonner";
// import { useEffect, useState } from "react";

// export const ApplyJob = ({ job, user, applied }) => {
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(false);
//   const [hasApplied, setHasApplied] = useState(applied);
//   const [buttonClicked, setButtonClicked] = useState(false);

//   useEffect(() => {
//     const token = getCookie("token");
//     console.log("Token from cookie:", token);
//   }, []);

//   const handleApply = async () => {
//     // If already applied, just show message
//     if (hasApplied) {
//       setButtonClicked(true);
//       toast.warning("You've already applied for this job.");
//       return;
//     }

//     if (!job._id || !user?._id) {
//       console.log("Invalid job or user ID", { jobId: job._id, userId: user?._id });
//       return toast.error("Invalid job or user ID");
//     }

//     console.log("Apply button clicked for job:", job._id);

//     try {
//       setLoading(true);

//       const res = await dispatch(
//         applyForJob({ jobId: job._id, userId: user._id })
//       ).unwrap();

//       console.log("Dispatch result:", res);
//       toast.success("Application submitted successfully!");
//       setHasApplied(true); // Mark as applied
//     } catch (error) {
//       console.error("Dispatch error:", error);
//       toast.error(error?.message || "Failed to apply");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔒 If job is closed
//   if (!job.isOpen) {
//     return (
//       <div className="rounded-lg shadow p-4 text-center text-red-600 bg-red-50">
//         This job is closed for applications.
//       </div>
//     );
//   }

//   return (
//     <div className="rounded-lg shadow p-6">
//       <h2 className="text-xl font-semibold mb-4">Apply Now</h2>
//       <Button
//         onClick={handleApply}
//         disabled={loading}
//         className="w-full"
//         variant={hasApplied ? "secondary" : "default"}
//       >
//         {loading
//           ? "Applying..."
//           : hasApplied
//           ? buttonClicked
//             ? "You've already applied"
//             : "Applied"
//           : "Apply Now"}
//       </Button>
//     </div>
//   );
// };

// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(";").shift();
//   return null;
// }


import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { applyForJob } from "@/redux/slices/applicationSlice";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/router";

export const ApplyJob = ({ job }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Get user from Redux store instead of prop
  const { user } = useSelector((state) => state.auth);
  // Check if user has already applied
  const hasApplied = job?.applications?.some(
    app => app.applicant === user?._id || app.applicant?._id === user?._id
  );

  const handleApply = async () => {
    // Redirect to login if not authenticated
    if (!user) {
      toast.warning("Please login to apply for jobs");
      return router.push("/login");
    }

    if (hasApplied) {
      return toast.info("You've already applied for this position");
    }

    if (!job._id) {
      return toast.error("Invalid job information");
    }

    try {
      setLoading(true);
      
      // Dispatch with only jobId - user info comes from auth token
      const result = await dispatch(applyForJob(job._id)).unwrap();
      
      toast.success(result.message || "Application submitted successfully!");
      
      // Optional: Log application details for debugging
      console.log("Application details:", {
        jobId: job._id,
        applicant: user._id,
        applicantName: user.name,
        applicantEmail: user.email
      });
      
    } catch (error) {
      toast.error(error?.message || "Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  if (!job.isOpen) {
    return (
      <div className="rounded-lg shadow p-4 text-center text-red-600 bg-red-50">
        This position is no longer accepting applications
      </div>
    );
  }

  return (
    <div className="rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Apply Now</h2>
      
      <Button
        onClick={handleApply}
        disabled={loading || hasApplied}
        className="w-full"
        variant={hasApplied ? "secondary" : "default"}
      >
        {loading 
          ? "Submitting..." 
          : hasApplied 
            ? "✓ Applied" 
            : "Apply Now"}
      </Button>
      
      {hasApplied && (
        <p className="mt-2 text-sm text-green-600 text-center">
          Application submitted successfully
        </p>
      )}
    </div>
  );
};