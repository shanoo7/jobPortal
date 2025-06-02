
// import React from "react";
// import { useDispatch } from "react-redux";
// import { updateApplicationStatus } from "@/redux/slices/applicationSlice";
// import { toast } from "sonner";

// const ApplicationsModal = ({ applications = [], onClose }) => {
//   const dispatch = useDispatch();

//   const handleStatusChange = async (appId, newStatus) => {
//     try {
//       await dispatch(
//         updateApplicationStatus({
//           appId,
//           status: newStatus,
//         })
//       ).unwrap();
//       toast.success("Status updated successfully!");
//     } catch (error) {
//       console.error("Status update failed:", error);
//       toast.error(error?.message || "Status update failed");
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/95 bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="rounded-lg p-6 w-full bg-white max-w-2xl max-h-[80vh] overflow-y-auto">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold text-black">Applicants</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700 text-2xl"
//             aria-label="Close modal"
//           >
//             &times;
//           </button>
//         </div>

//         {!applications?.length ? (
//           <p className="text-gray-600 text-center">No applicants yet</p>
//         ) : (
//           <div className="space-y-4">
//             {applications.map((application, index) => {
//               if (!application || !application?.applicant) return null;

//               const { applicant, status } = application;
//               const hasResume = applicant?.resume?.url;

//               return (
//                 <div
//                   key={application?._id || index}
//                   className="border p-4 rounded-lg bg-gray-50"
//                 >
//                   <div className="flex items-start gap-4">
//                     {applicant?.avatar && (
//                       <img
//                         src={applicant.avatar}
//                         alt="Applicant"
//                         className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
//                         loading="lazy"
//                       />
//                     )}

//                     <div className="flex-1 space-y-2">
//                       <h3 className="font-semibold text-gray-800">
//                         {applicant?.fullname || "Anonymous Applicant"}
//                       </h3>

//                       <p className="text-gray-600 text-sm">
//                         {applicant?.email || "No email provided"}
//                       </p>

//                       <div className="mt-2 flex items-center gap-3 flex-wrap">
//                         <span
//                           className={`text-sm font-medium px-2 py-1 rounded ${
//                             status === "accepted"
//                               ? "bg-green-100 text-green-800"
//                               : status === "rejected"
//                               ? "bg-red-100 text-red-800"
//                               : "bg-yellow-100 text-yellow-800"
//                           }`}
//                         >
//                           Status: {status || "pending"}
//                         </span>

//                         <select
//                           value={status}
//                           onChange={(e) =>
//                             handleStatusChange(application._id, e.target.value)
//                           }
//                           className="border border-black bg-black  rounded px-2 py-1 text-sm"
//                         >
                     
//                           <option value="accepted">Accepted</option>
//                           <option value="rejected">Rejected</option>
//                         </select>

//                         {hasResume ? (
//                           <a
//                             href={applicant.resume.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-600 hover:text-blue-800 text-sm font-medium"
//                           >
//                             📄 View Resume
//                           </a>
//                         ) : (
//                           <span className="text-gray-500 text-sm">
//                             No resume submitted
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ApplicationsModal;

import React from "react";
import { useDispatch } from "react-redux";
import { updateApplicationStatus } from "@/redux/slices/applicationSlice";
import { toast } from "sonner";
import { FileUser } from "lucide-react";

const ApplicationsModal = ({ applications = [], onClose }) => {
  const dispatch = useDispatch();

  const handleStatusChange = async (appId, newStatus) => {
    try {
      await dispatch(
        updateApplicationStatus({
          appId,
          status: newStatus,
        })
      ).unwrap();
      toast.success("Status updated successfully!");
    } catch (error) {
      console.error("Status update failed:", error);
      toast.error(error?.message || "Status update failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/95 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="rounded-lg p-6 w-full bg-white max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-black">Applicants</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        {!applications?.length ? (
          <p className="text-gray-600 text-center">No applicants yet</p>
        ) : (
          <div className="space-y-4">
            {applications.map((application, index) => {
              if (!application || !application?.applicant) return null;

              const { applicant, status } = application;
              
              // FIX: Access resume from profile correctly
              const hasResume = applicant?.profile?.resume;
              const resumeUrl = applicant?.profile?.resume;

              return (
                <div
                  key={application?._id || index}
                  className="border p-4 rounded-lg bg-gray-50"
                >
                  <div className="flex items-start gap-4">
                    {/* FIX: Use profilePhoto from profile */}
                    {applicant?.profile?.profilePhoto && (
                      <img
                        src={applicant.profile.profilePhoto}
                        alt="Applicant"
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                        loading="lazy"
                      />
                    )}

                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold text-gray-800">
                        {applicant?.fullname || "Anonymous Applicant"}
                      </h3>

                      <p className="text-gray-600 text-sm">
                        {applicant?.email || "No email provided"}
                      </p>

                      <div className="mt-2 flex items-center gap-3 flex-wrap">
                        <span
                          className={`text-sm font-medium px-2 py-1 rounded ${
                            status === "accepted"
                              ? "bg-green-100 text-green-800"
                              : status === "rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          Status: {status || "pending"}
                        </span>

                        <select
                          value={status}
                          onChange={(e) =>
                            handleStatusChange(application._id, e.target.value)
                          }
                          className="border border-black bg-black  rounded px-2 py-1 text-sm"
                        >
                          <option value="accepted">Accepted</option>
                          <option value="rejected">Rejected</option>
                        </select>

                        {hasResume ? (
                          <a
                            href={resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            <FileUser /> View Resume
                          </a>
                        ) : (
                          <span className="text-gray-500 text-sm">
                            No resume submitted
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationsModal;