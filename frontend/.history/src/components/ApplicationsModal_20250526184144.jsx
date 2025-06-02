// import React from "react";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// const ApplicationsModal = ({ applications, onClose }) => {
//   if (!applications) return null;

//   return (
//     <Dialog open onOpenChange={onClose}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Applicants</DialogTitle>
//         </DialogHeader>
//         <div className="space-y-2 max-h-96 overflow-y-auto">
//           {applications.length === 0 ? (
//             <p>No applications received for this job yet.</p>
//           ) : (
//             applications.map((app, index) => (
//               <div key={index} className="border p-3 rounded-md">
//                 <p><strong>Name:</strong> {app.applicant?.name}</p>
//                 <p><strong>Email:</strong> {app.applicant?.email}</p>
//                 <p><strong>Status:</strong> {app.status}</p>
//               </div>
//             ))
//           )}
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default ApplicationsModal;

// import React from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription, // <-- Add this
// } from "@/components/ui/dialog";

// const ApplicationsModal = ({ applications, onClose }) => {
//   if (!applications) return null;

//   return (
//     <Dialog open onOpenChange={onClose}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Applicants</DialogTitle>
//           <DialogDescription>
//             View the list of applicants and their status for this job.
//           </DialogDescription>
//         </DialogHeader>
//         <div className="space-y-2 max-h-96 overflow-y-auto">
//           {applications.length === 0 ? (
//             <p>No applications received for this job yet.</p>
//           ) : (
//             applications.map((app, index) => (
//               <div key={index} className="border p-3 rounded-md">
//                 <p><strong>Name:</strong> {app.applicant?.name}</p>
//                 <p><strong>Email:</strong> {app.applicant?.email}</p>
//                 <p><strong>Status:</strong> {app.status}</p>
//               </div>
//             ))
//           )}
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default ApplicationsModal;

export default const ApplicationsModal = ({ applications, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Applicants</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>

        {applications.length === 0 ? (
          <p>No applicants yet</p>
        ) : (
          <div className="space-y-4">
            {applications.map((application) => (
              <div key={application._id} className="border p-4 rounded-lg">
                <div className="flex items-start gap-4">
                  {application.applicant.avatar && (
                    <img 
                      src={application.applicant.avatar} 
                      alt="Applicant" 
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold">{application.applicant.name}</h3>
                    <p className="text-gray-600">{application.applicant.email}</p>
                    <p className={`mt-2 text-sm ${
                      application.status === 'accepted' ? 'text-green-600' :
                      application.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'
                    }`}>
                      Status: {application.status}
                    </p>
                  </div>
                  {application.applicant.resume && (
                    <a 
                      href={application.applicant.resume.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View Resume
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};