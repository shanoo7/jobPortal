import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Briefcase, MapPinIcon, Globe } from "lucide-react";
import { fetchJobById, updateJobStatus } from "@/redux/slices/jobSlice";
import { StatusSelector } from "./StatusSelector";
import { toast } from "sonner";
import { ApplyJob } from "./ApplyJob";

export default function JobPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleJob: job, loading, error } = useSelector((state) => state.job);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchJobById(id));
  }, [dispatch, id]);

  const isRecruiter = useMemo(() => {
    return user?.role === "recruiter" && (
      job?.created_by?._id === user?._id ||
      job?.created_by === user?._id
    );
  }, [job?.created_by, user?._id, user?.role]);

  const hasApplied = useMemo(() => {
    return job?.applications?.some(
      app => app.applicant === user?._id || app.applicant?._id === user?._id
    );
  }, [job?.applications, user?._id]);

  const handleStatusChange = async (value) => {
    try {
      await dispatch(
        updateJobStatus({ jobId: job._id, status: value === "open" })
      ).unwrap();
      toast.success(`Job marked as ${value}`);
      dispatch(fetchJobById(id));
    } catch (err) {
      toast.error(err || "Failed to update job status");
    }
  };

  const jobStatusBadge = job?.isOpen ? (
    <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
      <span className="mr-1">✓</span> Open
    </div>
  ) : (
    <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-800 text-sm font-medium">
      <span className="mr-1">✗</span> Closed
    </div>
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="h-48 bg-gray-100 rounded mb-4"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-600 bg-red-50 rounded shadow">
        Error: {error.message || "Failed to load job"}
      </div>
    );
  }

  if (!job?._id) {
    return <div className="text-center p-8">This job is no longer available.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header: Title + Company */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold">{job.title}</h1>

          {job.company && (
            <img
              src={job?.company}
              alt={`${job.company} logo`}
              className="h-12 mt-4 object-contain"
            />
          )}

          <h2 className="text-xl font-semibold mt-2">
            {job?.company || "Company"}
          </h2>
        </div>

        {isRecruiter ? (
          <StatusSelector
            value={job.isOpen ? "open" : "closed"}
            onChange={handleStatusChange}
          />
        ) : jobStatusBadge}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="md:col-span-2 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Job Details</h2>

          {/* Detail Grid: 2 items per row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-gray-700">
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-5 w-5" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              <span>{job.website}</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              <span>{job.applications?.length || 0} Applicants</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-600">Experience:</span>
              <span>{job.experienceLevel || "N/A"} years</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-600">Salary:</span>
              <span>₹{job.salary || "Not disclosed"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-600">Job Type:</span>
              <span>{job.jobType || "Full-time"}</span>
            </div>
          </div>

          {/* Description */}
          <h3 className="font-semibold mb-2 text-gray-800">About the Job</h3>
          <p className="prose max-w-none text-gray-700 mb-6 whitespace-pre-line">
            {job.description}
          </p>

          {/* Requirements */}
          <h3 className="font-semibold mb-2 text-gray-800">Requirements</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            {job.requirements?.length > 0 ? (
              job.requirements.map((req, i) => (
                <li key={i} className="whitespace-pre-line">{req}</li>
              ))
            ) : (
              <li>No specific requirements listed</li>
            )}
          </ul>
        </div>

        {/* Right Sidebar */}
        <div className="md:col-span-1 space-y-4">
          {!isRecruiter && (
            <ApplyJob job={job} user={user} applied={hasApplied} />
          )}
        </div>
      </div>
    </div>
  );
}
