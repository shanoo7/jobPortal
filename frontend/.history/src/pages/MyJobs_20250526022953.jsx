// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { BarLoader } from "react-spinners";
// import { FaEdit, FaTrash, FaFileAlt, FaTimes } from "react-icons/fa";
// import { Dialog } from "@headlessui/react";
// import { 
//   fetchAdminJobs,
//   updateJobStatus,
//   deleteJob,
//   updateJob
// } from "../redux/slices/jobSlice";
// import { format } from "date-fns";

// const EditJobModal = ({ job, onClose, onSave }) => {
//   const [formData, setFormData] = useState({
//     title: job?.title || "",
//     location: job?.location || "",
//     isOpen: job?.isOpen || true
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave({
//       ...formData,
//       isOpen: formData.isOpen === "open" // Convert to boolean
//     });
//   };

//   return (
//     <Dialog open={!!job} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
//       <div className="flex items-center justify-center min-h-screen">
//         <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        
//         <div className="relative bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 text-white">
//           <h3 className="text-2xl font-bold mb-4">Edit Job Posting</h3>
//           <form onSubmit={handleSubmit}>
//             <div className="space-y-4">
//               <div>
//                 <label className="block mb-2">Job Title</label>
//                 <input
//                   type="text"
//                   value={formData.title}
//                   onChange={(e) => setFormData({...formData, title: e.target.value})}
//                   className="w-full px-3 py-2 bg-gray-700 rounded"
//                   required
//                 />
//               </div>
              
//               <div>
//                 <label className="block mb-2">Location</label>
//                 <input
//                   type="text"
//                   value={formData.location}
//                   onChange={(e) => setFormData({...formData, location: e.target.value})}
//                   className="w-full px-3 py-2 bg-gray-700 rounded"
//                   required
//                 />
//               </div>
              
//               <div>
//                 <label className="block mb-2">Status</label>
//                 <select
//                   value={formData.isOpen ? "open" : "closed"}
//                   onChange={(e) => setFormData({...formData, isOpen: e.target.value === "open"})}
//                   className="w-full px-3 py-2 bg-gray-700 rounded"
//                 >
//                   <option value="open">Open</option>
//                   <option value="closed">Closed</option>
//                 </select>
//               </div>
//             </div>
            
//             <div className="mt-6 flex justify-end space-x-3">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
//               >
//                 Save Changes
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </Dialog>
//   );
// };

// const DeleteConfirmationModal = ({ job, onClose, onConfirm }) => {
//   return (
//     <Dialog open={!!job} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
//       <div className="flex items-center justify-center min-h-screen">
//         <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        
//         <div className="relative bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 text-white">
//           <h3 className="text-2xl font-bold mb-4">Confirm Delete</h3>
//           <p className="mb-6">
//             Are you sure you want to delete the job post: 
//             <span className="font-semibold text-red-400 ml-1">{job?.title}</span>?
//           </p>
          
//           <div className="flex justify-end space-x-3">
//             <button
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={() => {
//                 onConfirm();
//                 onClose();
//               }}
//               className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
//             >
//               Confirm Delete
//             </button>
//           </div>
//         </div>
//       </div>
//     </Dialog>
//   );
// };

// const ApplicationsModal = ({ applications, onClose }) => {
//   return (
//     <Dialog open={!!applications} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
//       <div className="flex items-center justify-center min-h-screen">
//         <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        
//         <div className="relative bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 text-white">
//           <div className="flex justify-between items-center mb-6">
//             <h3 className="text-2xl font-bold">Job Applications</h3>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-gray-700 rounded-full"
//             >
//               <FaTimes className="text-xl" />
//             </button>
//           </div>
          
//           <div className="space-y-4 max-h-96 overflow-y-auto">
//             {applications?.length > 0 ? (
//               applications.map((application) => (
//                 <div key={application._id} className="p-4 bg-gray-700 rounded">
//                   <h4 className="font-semibold">{application.applicant?.name}</h4>
//                   <p className="text-gray-300">{application.applicant?.email}</p>
//                   <p className="text-sm mt-2">
//                     Applied on: {format(new Date(application.createdAt), "dd MMM yyyy")}
//                   </p>
//                   {application.resume && (
//                     <a 
//                       href={application.resume} 
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-400 hover:underline mt-2 block"
//                     >
//                       View Resume
//                     </a>
//                   )}
//                 </div>
//               ))
//             ) : (
//               <p className="text-center py-4">No applications found</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </Dialog>
//   );
// };

// const MyJobs = () => {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const { allAdminJobs, loading } = useSelector((state) => state.job);
  
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [actionType, setActionType] = useState(null);

//   useEffect(() => {
//     if (user?.role === "recruiter") {
//       dispatch(fetchAdminJobs());
//     }
//   }, [user, dispatch]);

//   const handleUpdateJob = async (updatedData) => {
//     if (selectedJob) {
//       await dispatch(updateJob({
//         id: selectedJob._id,
//         updatedData: {
//           title: updatedData.title,
//           location: updatedData.location,
//           isOpen: updatedData.isOpen
//         }
//       }));
//       setSelectedJob(null);
//       setActionType(null);
//     }
//   };

//   const handleDeleteJob = async () => {
//     if (selectedJob) {
//       await dispatch(deleteJob(selectedJob._id));
//       setSelectedJob(null);
//       setActionType(null);
//     }
//   };

//   if (loading) {
//     return <BarLoader className="mb-4" width="100%" color="#36d7b7" />;
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8 text-white">
//       <h1 className="gradient-title font-extrabold text-5xl sm:text-7xl text-center pb-8">
//         {user?.role === "candidate" ? "My Applications" : "My Jobs"}
//       </h1>

//       {user?.role === "recruiter" ? (
//         allAdminJobs.length > 0 ? (
//           <div className="space-y-4">
//             {allAdminJobs.map((job) => (
//               <div key={job._id} className="p-4 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-750 transition">
//                 <div className="flex justify-between items-start">
//                   <div className="flex-1">
//                     <h3 className="text-xl font-bold mb-2">{job.title}</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
//                       <div>
//                         <p>Posted: {format(new Date(job.createdAt), "dd MMM yyyy")}</p>
//                         <p>Location: {job.location}</p>
//                       </div>
//                       <div>
//                         <p>Applications: {job.applications?.length || 0}</p>
//                         <p>
//                           Status:{" "}
//                           <span className={job.isOpen ? "text-green-400" : "text-red-400"}>
//                             {job.isOpen ? "OPEN" : "CLOSED"}
//                           </span>
//                         </p>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="flex space-x-3 ml-4">
//                     <button
//                       onClick={() => {
//                         setSelectedJob(job);
//                         setActionType("view-applications");
//                       }}
//                       className="p-2 bg-blue-600 rounded hover:bg-blue-700"
//                     >
//                       <FaFileAlt />
//                     </button>
                    
//                     <button
//                       onClick={() => {
//                         setSelectedJob(job);
//                         setActionType("edit");
//                       }}
//                       className="p-2 bg-yellow-600 rounded hover:bg-yellow-700"
//                     >
//                       <FaEdit />
//                     </button>
                    
//                     <button
//                       onClick={() => {
//                         setSelectedJob(job);
//                         setActionType("delete");
//                       }}
//                       className="p-2 bg-red-600 rounded hover:bg-red-700"
//                     >
//                       <FaTrash />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-center text-lg py-12">No jobs created yet</p>
//         )
//       ) : (
//         <div className="text-center text-lg">
//           <p>My Applications UI here...</p>
//         </div>
//       )}

//       {/* Modals */}
//       <EditJobModal
//         job={actionType === "edit" ? selectedJob : null}
//         onClose={() => {
//           setSelectedJob(null);
//           setActionType(null);
//         }}
//         onSave={handleUpdateJob}
//       />

//       <DeleteConfirmationModal
//         job={actionType === "delete" ? selectedJob : null}
//         onClose={() => {
//           setSelectedJob(null);
//           setActionType(null);
//         }}
//         onConfirm={handleDeleteJob}
//       />

//       <ApplicationsModal
//         applications={actionType === "view-applications" ? selectedJob?.applications : null}
//         onClose={() => {
//           setSelectedJob(null);
//           setActionType(null);
//         }}
//       />
//     </div>
//   );
// };

// export default MyJobs;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { BarLoader } from "react-spinners";
// import { FaEdit, FaTrash, FaFileAlt, FaTimes } from "react-icons/fa";
// import { Dialog } from "@headlessui/react";
// import { format } from "date-fns";

// import {
//   fetchAdminJobs,
//   updateJob,
//   deleteJob,
// } from "../redux/slices/jobSlice";

// // --- Edit Modal ---
// const EditJobModal = ({ job, onClose, onSave }) => {
//   const [formData, setFormData] = useState({
//     title: job?.title || "",
//     location: job?.location || "",
//     isOpen: job?.isOpen || true,
//   });

//   useEffect(() => {
//     if (job) {
//       setFormData({
//         title: job.title,
//         location: job.location,
//         isOpen: job.isOpen,
//       });
//     }
//   }, [job]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave({ ...formData });
//   };

//   if (!job) return null;

//   return (
//     <Dialog open={!!job} onClose={onClose} className="fixed inset-0 z-50">
//       <div className="flex items-center justify-center min-h-screen">
//         <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

//         <div className="relative bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 text-white z-50">
//           <h3 className="text-2xl font-bold mb-4">Edit Job</h3>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block mb-1">Title</label>
//               <input
//                 type="text"
//                 className="w-full px-3 py-2 bg-gray-700 rounded"
//                 value={formData.title}
//                 onChange={(e) =>
//                   setFormData({ ...formData, title: e.target.value })
//                 }
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-1">Location</label>
//               <input
//                 type="text"
//                 className="w-full px-3 py-2 bg-gray-700 rounded"
//                 value={formData.location}
//                 onChange={(e) =>
//                   setFormData({ ...formData, location: e.target.value })
//                 }
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-1">Status</label>
//               <select
//                 className="w-full px-3 py-2 bg-gray-700 rounded"
//                 value={formData.isOpen ? "open" : "closed"}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     isOpen: e.target.value === "open",
//                   })
//                 }
//               >
//                 <option value="open">Open</option>
//                 <option value="closed">Closed</option>
//               </select>
//             </div>
//             <div className="flex justify-end space-x-3 pt-4">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
//               >
//                 Save
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </Dialog>
//   );
// };

// // --- Delete Modal ---
// const DeleteConfirmationModal = ({ job, onClose, onConfirm }) => {
//   if (!job) return null;

//   return (
//     <Dialog open={!!job} onClose={onClose} className="fixed inset-0 z-50">
//       <div className="flex items-center justify-center min-h-screen">
//         <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

//         <div className="relative bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 text-white z-50">
//           <h3 className="text-2xl font-bold mb-4">Confirm Delete</h3>
//           <p className="mb-6">
//             Are you sure you want to delete{" "}
//             <span className="text-red-400 font-semibold">{job.title}</span>?
//           </p>
//           <div className="flex justify-end space-x-3">
//             <button
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={() => {
//                 onConfirm();
//                 onClose();
//               }}
//               className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       </div>
//     </Dialog>
//   );
// };

// // --- Applications Modal ---
// const ApplicationsModal = ({ job, onClose }) => {
//   const applications = job?.applications;

//   if (!applications) return null;

//   return (
//     <Dialog open={!!applications} onClose={onClose} className="fixed inset-0 z-50">
//       <div className="flex items-center justify-center min-h-screen">
//         <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
//         <div className="relative bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 text-white z-50">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-2xl font-bold">Job Applications</h3>
//             <button onClick={onClose}>
//               <FaTimes />
//             </button>
//           </div>
//           <div className="space-y-4 max-h-96 overflow-y-auto">
//             {applications.length > 0 ? (
//               applications.map((app) => (
//                 <div key={app._id} className="bg-gray-700 p-4 rounded">
//                   <h4 className="font-semibold">{app.applicant?.name}</h4>
//                   <p className="text-gray-300">{app.applicant?.email}</p>
//                   <p className="text-sm">
//                     Applied on: {format(new Date(app.createdAt), "dd MMM yyyy")}
//                   </p>
//                   {app.resume && (
//                     <a
//                       href={app.resume}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-400 hover:underline mt-2 block"
//                     >
//                       View Resume
//                     </a>
//                   )}
//                 </div>
//               ))
//             ) : (
//               <p>No applications found.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </Dialog>
//   );
// };

// // --- Main Component ---
// const MyJobs = () => {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const { allAdminJobs, loading } = useSelector((state) => state.job);

//   const [selectedJob, setSelectedJob] = useState(null);
//   const [actionType, setActionType] = useState(null);

//   useEffect(() => {
//     if (user?.role === "recruiter") {
//       dispatch(fetchAdminJobs());
//     }
//   }, [dispatch, user?.role]);

//   const handleUpdateJob = async (updatedData) => {
//     await dispatch(
//       updateJob({
//         id: selectedJob._id,
//         updatedData,
//       })
//     );
//     setSelectedJob(null);
//     setActionType(null);
//   };

//   const handleDeleteJob = async () => {
//     await dispatch(deleteJob(selectedJob._id));
//     setSelectedJob(null);
//     setActionType(null);
//   };

//   if (loading) {
//     return <BarLoader width="100%" color="#36d7b7" />;
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8 text-white">
//       <h1 className="text-5xl font-bold text-center mb-8">
//         {user?.role === "candidate" ? "My Applications" : "My Jobs"}
//       </h1>

//       {user?.role === "recruiter" ? (
//         allAdminJobs?.length > 0 ? (
//           <div className="space-y-4">
//             {allAdminJobs.map((job) => (
//               <div
//                 key={job._id}
//                 className="bg-gray-800 p-4 rounded shadow flex justify-between items-start"
//               >
//                 <div className="flex-1">
//                   <h3 className="text-xl font-bold mb-1">{job.title}</h3>
//                   <p className="text-sm text-gray-400">
//                     Posted: {format(new Date(job.createdAt), "dd MMM yyyy")}
//                   </p>
//                   <p className="text-sm">Location: {job.location}</p>
//                   <p className="text-sm">
//                     Status:{" "}
//                     <span
//                       className={job.isOpen ? "text-green-400" : "text-red-400"}
//                     >
//                       {job.isOpen ? "Open" : "Closed"}
//                     </span>
//                   </p>
//                   <p className="text-sm">Applications: {job.applications?.length}</p>
//                 </div>
//                 <div className="flex space-x-2 ml-4">
//                   <button
//                     className="p-2 bg-blue-600 rounded hover:bg-blue-700"
//                     onClick={() => {
//                       setSelectedJob(job);
//                       setActionType("view");
//                     }}
//                   >
//                     <FaFileAlt />
//                   </button>
//                   <button
//                     className="p-2 bg-yellow-600 rounded hover:bg-yellow-700"
//                     onClick={() => {
//                       setSelectedJob(job);
//                       setActionType("edit");
//                     }}
//                   >
//                     <FaEdit />
//                   </button>
//                   <button
//                     className="p-2 bg-red-600 rounded hover:bg-red-700"
//                     onClick={() => {
//                       setSelectedJob(job);
//                       setActionType("delete");
//                     }}
//                   >
//                     <FaTrash />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-center">No jobs created yet.</p>
//         )
//       ) : (
//         <div className="text-center">My Applications UI here...</div>
//       )}

//       {/* Modals */}
//       <EditJobModal
//         job={actionType === "edit" ? selectedJob : null}
//         onClose={() => {
//           setSelectedJob(null);
//           setActionType(null);
//         }}
//         onSave={handleUpdateJob}
//       />
//       <DeleteConfirmationModal
//         job={actionType === "delete" ? selectedJob : null}
//         onClose={() => {
//           setSelectedJob(null);
//           setActionType(null);
//         }}
//         onConfirm={handleDeleteJob}
//       />
//       <ApplicationsModal
//         job={actionType === "view" ? selectedJob : null}
//         onClose={() => {
//           setSelectedJob(null);
//           setActionType(null);
//         }}
//       />
//     </div>
//   );
// };

// export default MyJobs;




import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
// import EditJobModal from "@/components/jobs/EditJobModal";
// import DeleteConfirmationModal from "@/components/jobs/DeleteConfirmationModal";
// import ApplicationsModal from "@/components/jobs/ApplicationsModal";

const MyJobs = () => {
  const dispatch = useDispatch();
  const { allAdminJobs, isLoading } = useSelector((state) => state.job);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applications, setApplications] = useState(null);
  const [modalType, setModalType] = useState(""); // 'edit', 'delete', 'applications'



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

  const handleApplications = (job) => {
    setApplications(job.applications || []);
    setModalType("applications");
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
    setApplications(null);
    setModalType("");
  };

  const handleSaveEdit = (updatedJob) => {
    dispatch(updateJob(updatedJob));
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
                <Button variant="destructive" onClick={() => handleDelete(job)}>
                  Delete
                </Button>
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
      {modalType === "applications" && applications && (
        <ApplicationsModal applications={applications} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default MyJobs;

