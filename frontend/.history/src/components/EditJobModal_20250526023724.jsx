// // import React, { useState, useEffect } from "react";
// // import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";

// // const EditJobModal = ({ job, onClose, onSave }) => {
// //   if (!job) return null; // Prevents render error if job is null

// //   const [formData, setFormData] = useState({
// //     title: job.title || "",
// //     location: job.location || "",
// //     isOpen: job.isOpen ?? true,
// //   });

// //   useEffect(() => {
// //     setFormData({
// //       title: job.title || "",
// //       location: job.location || "",
// //       isOpen: job.isOpen ?? true,
// //     });
// //   }, [job]);

// //   const handleChange = (e) => {
// //     const { name, value, type, checked } = e.target;
// //     setFormData({
// //       ...formData,
// //       [name]: type === "checkbox" ? checked : value,
// //     });
// //   };

// //   const handleSave = () => {
// //     onSave({ ...job, ...formData });
// //   };

// //   return (
// //     <Dialog open onOpenChange={onClose}>
// //       <DialogContent>
// //         <DialogHeader>
// //           <DialogTitle>Edit Job</DialogTitle>
// //         </DialogHeader>
// //         <div className="space-y-4">
// //           <Input
// //             name="title"
// //             value={formData.title}
// //             onChange={handleChange}
// //             placeholder="Job Title"
// //           />
// //           <Input
// //             name="location"
// //             value={formData.location}
// //             onChange={handleChange}
// //             placeholder="Location"
// //           />
// //           <label className="flex items-center space-x-2">
// //             <input
// //               type="checkbox"
// //               name="isOpen"
// //               checked={formData.isOpen}
// //               onChange={handleChange}
// //             />
// //             <span>Job is Open</span>
// //           </label>
// //           <div className="flex justify-end space-x-2">
// //             <Button variant="outline" onClick={onClose}>Cancel</Button>
// //             <Button onClick={handleSave}>Save</Button>
// //           </div>
// //         </div>
// //       </DialogContent>
// //     </Dialog>
// //   );
// // };

// // export default EditJobModal;
// import React, { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription, // <- add this import
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// const EditJobModal = ({ job, onClose, onSave }) => {
//   if (!job) return null;

//   const [formData, setFormData] = useState({
//     title: job.title || "",
//     location: job.location || "",
//     isOpen: job.isOpen ?? true,
//   });

//   useEffect(() => {
//     setFormData({
//       title: job.title || "",
//       location: job.location || "",
//       isOpen: job.isOpen ?? true,
//     });
//   }, [job]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSave = () => {
//     onSave({ ...job, ...formData });
//   };

//   return (
//     <Dialog open onOpenChange={onClose}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Edit Job</DialogTitle>
//           <DialogDescription>
//             Update the job title, location, or status. Click "Save" to apply changes.
//           </DialogDescription>
//         </DialogHeader>
//         <div className="space-y-4">
//           <Input
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             placeholder="Job Title"
//           />
//           <Input
//             name="location"
//             value={formData.location}
//             onChange={handleChange}
//             placeholder="Location"
//           />
//           <label className="flex items-center space-x-2">
//             <input
//               type="checkbox"
//               name="isOpen"
//               checked={formData.isOpen}
//               onChange={handleChange}
//             />
//             <span>Job is Open</span>
//           </label>
//           <div className="flex justify-end space-x-2">
//             <Button variant="outline" onClick={onClose}>
//               Cancel
//             </Button>
//             <Button onClick={handleSave}>Save</Button>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default EditJobModal;






import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const EditJobModal = ({ job, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: job?.title || "",
    description: job?.description || "",
    location: job?.location || "",
    salary: job?.salary || "",
    isOpen: job?.isOpen || true,
    requirements: job?.requirements?.join("\n") || ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requirementsArray = formData.requirements.split("\n").filter(r => r.trim());
    onSave({
      ...formData,
      requirements: requirementsArray,
      salary: Number(formData.salary)
    });
  };

  return (
    <Dialog open={!!job} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-lg  p-6">
          <Dialog.Title className="text-xl font-bold mb-4">Edit Job</Dialog.Title>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
              />
            </div>
            
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="salary">Salary</Label>
              <Input
                id="salary"
                name="salary"
                type="number"
                value={formData.salary}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="requirements">Requirements (one per line)</Label>
              <Textarea
                id="requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                rows={4}
              />
            </div>
            
            <div>
              <Label>Status</Label>
              <Select
                value={formData.isOpen ? "open" : "closed"}
                onValueChange={(val) => 
                  setFormData(prev => ({ ...prev, isOpen: val === "open" }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EditJobModal;
