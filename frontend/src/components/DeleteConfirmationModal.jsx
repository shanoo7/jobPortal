import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription, // Add this
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DeleteConfirmationModal = ({ job, onClose, onDelete }) => {
  if (!job) return null;

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogDescription>
            This action cannot be undone. It will permanently delete the job.
          </DialogDescription>
        </DialogHeader>
        <p>
          Are you sure you want to delete the job titled{" "}
          <strong>"{job.title}"</strong>?
        </p>
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="destructive" onClick={() => onDelete(job._id)}>Delete</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
