import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { applyForJob } from "@/redux/slices/applicationSlice";
import { toast } from "sonner";
import { useEffect, useState } from "react";
// import StudentProfile from "./StudentProfile";

export const ApplyJob = ({ job, user, applied }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [hasApplied, setHasApplied] = useState(applied);
  const [buttonClicked, setButtonClicked] = useState(false);


  useEffect(() => {
    const token = getCookie("token");
    console.log("Token from cookie:", token);
  }, []);

  const handleApply = async () => {
    // If already applied, just show message
    if (hasApplied) {
      setButtonClicked(true);
      toast.warning("You've already applied for this job...");
      return;
    }

    if (!job._id || !user?._id) {
      console.log("Invalid job or user ID", { jobId: job._id, userId: user?._id });
      return toast.error("Invalid job or user ID");
    }

    console.log("Apply button clicked for job:", job._id);

    try {
      setLoading(true);

      const res = await dispatch(
        applyForJob({ jobId: job._id, userId: user._id })
      ).unwrap();

      console.log("Dispatch result:", res);
      toast.success("Application submitted successfully!");
      setHasApplied(true); // Mark as applied
    } catch (error) {
      console.error("Dispatch error:", error);
      toast.error(error?.message || "Failed to apply");
    } finally {
      setLoading(false);
    }
  };

  // 🔒 If job is closed
  if (!job.isOpen) {
    return (
      <div className="rounded-lg shadow p-4 text-center text-red-600 bg-red-50">
        This job is closed for applications.
      </div>
    );
  }

  return (
    <div className="rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Apply Now</h2>
      <Button
        onClick={handleApply}
        disabled={loading}
        className="w-full"
        variant={hasApplied ? "secondary" : "default"}
      >
        {loading
          ? "Applying..."
          : hasApplied
            ? buttonClicked
              ? "You've already applied"
              : "Applied"
            : "Apply Now"}
      </Button>

      {/* <StudentProfile/> */}

      {hasApplied && (
        <p className="mt-2 text-sm text-gray-500">
          You have already applied for this job.
        </p>
      )}
    </div>
  );
};

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}
