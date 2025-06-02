
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApplicantsByJobId } from '@/redux/slices/applicationSlice';
import { toast } from 'sonner'; // Add toast import

import {
  
  deleteJob,
  updateJobStatus,
  updateJob,
  fetchAdminJobs,
} from "@/redux/slices/jobSlice";
import { Button } from "@/components/ui/button";
import EditJobModal from "@/components/EditJobModal";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import ApplicationsModal from "@/components/ApplicationsModal";


const MyJobs = () => {
  const dispatch = useDispatch();
  const { allAdminJobs, isLoading } = useSelector((state) => state.job);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applications, setApplications] = useState(null);
  const [modalType, setModalType] = useState(""); // 'edit', 'delete', 'applications'


const user = useSelector((state) => state.auth.user);
console.log("Current user:", user); // 👀 This should show the token
useEffect(() => {
  dispatch(fetchAdminJobs());
}, [dispatch]);


  const handleEdit = (job) => {
    console.log("Editing job:", job);
    setSelectedJob(job);
    setModalType("edit");
  };

  const handleDelete = (job) => {
     console.log("Deleting job:", job);
    setSelectedJob(job);
    setModalType("delete");
  };

  // const handleApplications = async (job) => {
  //   // setApplications(job.applications || []);
  //   // setModalType("applications");
  //   try {
  //     // Dispatch the action to fetch applicants
  //     const result = await dispatch(fetchApplicantsByJobId(job._id)).unwrap();
  //     setApplications(result);
  //     setModalType("applications");
  //   } catch (error) {
  //     console.error("Failed to fetch applicants:", error);
  //     toast.error("Failed to load applicants");
  //   }
  
  // };

  // const handleApplications = async (job) => {
  //   try {
  //     // Dispatch the action to fetch applicants
  //     const result = await dispatch(fetchApplicantsByJobId(job._id)).unwrap();
  //     setApplications(result || []); // Ensure we always have an array
  //     setModalType("applications");
  //   } catch (error) {
  //     console.error("Failed to fetch applicants:", error);
  //     toast.error("Failed to load applicants");
  //     setApplications([]); // Set empty array on error
  //   }
  // };

  const handleApplications = async (job) => {
  try {
    
    const result = await dispatch(fetchApplicantsByJobId(job._id)).unwrap();
    setApplications(result);
    setModalType("applications");
  } catch (error) {
    console.error("Failed to fetch applicants:", error);
    toast.error("Failed to load applicants"); // Now using imported toast
  }
};


  const handleCloseModal = () => {
    setSelectedJob(null);
    setApplications(null);
    setModalType("");
  };


  //EDIT
  // const handleSaveEdit = (updatedJob) => {
  //   dispatch(updateJob(updatedJob));
  //   handleCloseModal();
  // };

//   const handleSaveEdit = (updatedJob) => {
//   dispatch(updateJob({ id: updatedJob._id, updatedData: updatedJob }));
//   handleCloseModal();
// };

// const handleSaveEdit = (updatedJob) => {
//   const { _id, ...rest } = updatedJob; // extract ID and rest of data
//   dispatch(updateJob({ id: _id, updatedData: rest }));
//   handleCloseModal();
// };

const handleSaveEdit = (updatedJob) => {
  const { _id, ...updatedData } = updatedJob; // extract _id from updatedJob

  if (!_id) {
    console.error("Missing job ID in updatedJob:", updatedJob);
    return;
  }

  dispatch(updateJob({ id: _id, updatedData }));
  handleCloseModal();
};




  const handleConfirmDelete = (jobId) => {
    dispatch(deleteJob(jobId));
    handleCloseModal();
  };

  const handleToggleStatus = (job) => {
    dispatch(updateJobStatus({ jobId: job._id, isOpen: !job.isOpen }));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">My Posted Jobs</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : !allAdminJobs || allAdminJobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <div className="space-y-4">
          {allAdminJobs.map((job) => (
            <div
              key={job._id}
              className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between"
            >
              <div>
                <h2 className="text-xl font-bold">{job.title}</h2>
                <p className="text-gray-600">{job.location}</p>
                <p className="text-sm mt-1">
                  Status:{" "}
                  <span className={job.isOpen ? "text-green-600" : "text-red-600"}>
                    {job.isOpen ? "Open" : "Closed"}
                  </span>
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex flex-wrap gap-2">

                <Button onClick={() => handleEdit(job)}>Edit</Button>
                <Button variant="destructive" onClick={() => handleDelete(job)}>Delete</Button>
                <Button onClick={() => handleToggleStatus(job)}>
                  {job.isOpen ? "Close" : "Reopen"}
                </Button>
                <Button onClick={() => handleApplications(job)}>View Applicants</Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      {modalType === "edit" && selectedJob && (
        <EditJobModal job={selectedJob} onClose={handleCloseModal} onSave={handleSaveEdit} />
      )}
      {modalType === "delete" && selectedJob && (
        <DeleteConfirmationModal
          job={selectedJob}
          onClose={handleCloseModal}
          onDelete={handleConfirmDelete}
        />
      )}
      {console.log("object",applications,job._id)}
      {modalType === "applications" && applications && (
        <ApplicationsModal applications={applications} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default MyJobs;

