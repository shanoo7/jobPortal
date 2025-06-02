import { useDispatch, useSelector } from "react-redux";
import { Heart, HeartOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { likeJob, unlikeJob } from "@/redux/slices/authSlice";
import { toast } from "sonner";


const JobCard = ({ job }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
 

  const { likedJobs } = useSelector((state) => state.auth);
  const isSaved = likedJobs?.some((liked) => liked._id === job._id);


// console.log("logo is " , job.logo)
// console.log("job is  " , job)

  const toggleSave = async () => {
 
    
    try {
      if (isSaved) {
        await dispatch(unlikeJob(job._id)).unwrap();
      } else {
        await dispatch(likeJob(job._id)).unwrap();
      }
    } catch (error) {
      // Properly extract error message from Redux action
      const errorMessage = error?.payload?.message 
        || error?.message 
        || "Failed to update saved jobs";
      console.log(error)
      toast.error(errorMessage);
    }
  };


  // console.log(isSaved, "isSaved in job card");
  return (
    <Card className="rounded shadow-md hover:shadow-lg transition-all duration-200 border p-4 flex flex-col justify-between">
      <CardContent>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{job.title}</h2>
          <Button variant="ghost" size="icon" onClick={toggleSave}>
            {isSaved ? (
              <Heart className="text-red-500 fill-red-500" />
            ) : (
              <HeartOff />
            )}
          </Button>
        </div>

      <img
  className="w-10 h-10 object-contain"
  src={
    job.logo
      ? job.logo.startsWith("http")
        ? job.logo
        : `${import.meta.env.VITE_BACKEND_URL}/${job.logo}`
      : "https://ui-avatars.com/api/?name=Company"
  }
  alt="logo"
/>


        <p className="text-sm text-gray-600 mb-1">
          <span className="font-medium">Company:</span> {job.company || "Unknown"}
        </p>

        <p className="text-sm text-gray-600 mb-1">
          <span className="font-medium">Location:</span> {job.location}
        </p>

        <p className="text-sm text-gray-600 mb-3">
          <span className="font-medium">Salary:</span> ₹{job.salary}
        </p>

        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {job.description}
        </p>

        <Button
          onClick={() => navigate(`/job/${job._id}`)}
          className="w-full cursor-pointer"
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default JobCard;