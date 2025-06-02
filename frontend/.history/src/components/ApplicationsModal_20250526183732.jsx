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

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription, // <-- Add this
} from "@/components/ui/dialog";

const ApplicationsModal = ({ applications, onClose }) => {
  if (!applications) return null;

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Applicants</DialogTitle>
          <DialogDescription>
            View the list of applicants and their status for this job.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {applications.length === 0 ? (
            <p>No applications received for this job yet.</p>
          ) : (
            applications.map((app, index) => (
              <div key={index} className="border p-3 rounded-md">
                <p><strong>Name:</strong> {app.applicant?.name}</p>
                <p><strong>Email:</strong> {app.applicant?.email}</p>
                <p><strong>Status:</strong> {app.status}</p>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationsModal;

