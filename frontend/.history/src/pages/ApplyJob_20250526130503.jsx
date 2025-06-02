// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { useDispatch } from "react-redux";
// import { applyForJob } from "@/redux/slices/applicationSlice";

// export const ApplyJob = ({ job, user, applied }) => {
//   const dispatch = useDispatch();

//   const handleApply = async () => {
//     try {
//       await dispatch(applyForJob(job._id)).unwrap();
//       toast.success("Application submitted successfully!");
//     } catch (err) {
//       toast.error(err || "Failed to apply for job");
//     }
//   };

//   return (
//     <div className=" rounded-lg shadow p-6">
//       <h2 className="text-xl font-semibold mb-4">Apply for this Job</h2>
//       {applied ? (
//         <div className="text-center py-4">
//           <p className="text-green-600 font-medium">
//             You've already applied for this position
//           </p>
//         </div>
//       ) : job.isOpen ? (
//         <Button 
//           onClick={handleApply}
//           className="w-full"
//           disabled={!user}
//         >
//           {user ? "Apply Now" : "Login to Apply"}
//         </Button>
//       ) : (
//         <Button className="w-full" disabled>
//           Applications Closed
//         </Button>
//       )}
//     </div>
//   );
// };


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { applyForJob } from "@/redux/slices/applicationSlice";
import { DoorOpen, DoorClosed } from "lucide-react";

export const ApplyJob = ({ job, user, applied }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleApply = async () => {
    if (!job?.isOpen) {
      toast.warning("This job is no longer accepting applications");
      return;
    }

    if (!user) {
      toast.warning("Please login to apply");
      return;
    }

    setIsLoading(true);
    try {
      const result = await dispatch(applyForJob(job._id)).unwrap();
      toast.success(result.message || "Application submitted successfully!");
    } catch (err) {
      toast.error(err.message || "Failed to submit application");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Apply for this Job</h2>
      
      <div className="flex items-center gap-2 mb-4">
        {job.isOpen ? (
          <>
            <DoorOpen className="h-4 w-4 text-green-500" />
            <span className="text-green-600">Accepting Applications</span>
          </>
        ) : (
          <>
            <DoorClosed className="h-4 w-4 text-red-500" />
            <span className="text-red-600">Applications Closed</span>
          </>
        )}
      </div>

      {applied ? (
        <div className="text-center py-2">
          <p className="text-green-600 font-medium">
            ✓ You've successfully applied
          </p>
          <p className="text-sm text-gray-500 mt-1">
            The recruiter will review your application
          </p>
        </div>
      ) : (
        <Button
          onClick={handleApply}
          className="w-full"
          disabled={!job.isOpen || isLoading}
          loading={isLoading}
        >
          {job.isOpen ? "Apply Now" : "Applications Closed"}
        </Button>
      )}
    </div>
  );
};