
import { useDispatch } from "react-redux";
import { updateApplicationStatus } from "@/redux/slices/applicationSlice";
import { toast } from "sonner";

export const ApplicationCard = ({ application, applicant }) => {
  const dispatch = useDispatch();

  const handleStatusChange = async (newStatus) => {
    console.log('Status change initiated:', {
      appId: application._id,
      newStatus
    });
    
    try {
      const result = await dispatch(
        updateApplicationStatus({
          appId: application._id,
          status: newStatus
        })
      ).unwrap();

      console.log('Status update success:', result);
      toast.success("Status updated successfully!");
    } catch (error) {
      console.error('Status update failed:', error);
      toast.error(error.message || "Status update failed");
    }
  };

  return (
    <div className="border rounded p-4 mb-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">{applicant?.fullname || "Applicant"}</h3>
          <p className="text-sm text-gray-600">{applicant?.email}</p>
          <p className="text-sm">
            Status: <span className="capitalize">{application.status}</span>
          </p>
        </div>
        
        <select 
          value={application.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="px-3 py-1 border rounded"
        >
          
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      
      {applicant?.profile?.resume && (
        <a 
          href={applicant.profile.resume} 
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 text-sm mt-2 inline-block"
        >
          View Resume
        </a>
      )}
    </div>
  );
};

