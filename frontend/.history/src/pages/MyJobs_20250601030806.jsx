import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApplicantsByJobId } from '@/redux/slices/applicationSlice';
import { toast } from 'sonner'; // Add toast import

import {

  deleteJob,
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


  const { user } = useSelector((state) => state.auth);
  console.log('Current user token:', user?.token); 
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

  const handleApplications = async (job) => {
    try {
      console.log('Fetching applicants for job:', job._id);
      const result = await dispatch(fetchApplicantsByJobId(job._id)).unwrap();
      console.log('Applicants fetched:', result);
      setApplications(result);
      setModalType("applications");
    } catch (error) {
      console.error("Failed to fetch applicants:", error);
      toast.error(error || "Failed to load applicants");
    }
  };


  const handleCloseModal = () => {
    setSelectedJob(null);
    setApplications(null);
    setModalType("");
  };


  //EDIT


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

                <Button className="cursor-pointer" onClick={() => handleEdit(job)}>Edit</Button>
                <Button className="cursor-pointer" variant="destructive" onClick={() => handleDelete(job)}>Delete</Button>
                {/* <Button onClick={() => handleToggleStatus(job)}>
                  {job.isOpen ? "Close" : "Reopen"}
                </Button> */}
                <Button className="cursor-pointer" onClick={() => handleApplications(job)}>View Applicants</Button>
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
      {console.log("object", applications)}
      {modalType === "applications" && applications && (
        <ApplicationsModal applications={applications} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default MyJobs;

