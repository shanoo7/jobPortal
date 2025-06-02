
// import { useDispatch, useSelector } from "react-redux";
// import { Heart, HeartOff } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { saveJob, unsaveJob } from "@/redux/slices/jobSlice"; // Still using jobSlice actions

// const JobCard = ({ job }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { savedJobIds } = useSelector((state) => state.job);

// const isSaved = savedJobIds.includes(job._id);

// const toggleSave = () => {
//   if (isSaved) {
//     dispatch(unsaveJob(job._id));
//   } else {
//     dispatch(saveJob(job._id));
//   }
// };


//   return (
//     <Card className="rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 border p-4 flex flex-col justify-between">
//       <CardContent>
//         <div className="flex items-center justify-between">
//           <h2 className="text-xl font-semibold">{job.title}</h2>
//           <Button variant="ghost" size="icon" onClick={toggleSave}>
//             {isSaved ? <Heart className="text-red-500 fill-red-500" /> : <HeartOff />}
//           </Button>
//         </div>

//         <img className="w-10" src={job?.logo || "https://ui-avatars.com/api/?name=User" } alt="logo" />

//         <p className="text-sm text-gray-600 mb-1">
//           <span className="font-medium">Company:</span> {job.company || "Unknown"}
//         </p>

//         <p className="text-sm text-gray-600 mb-1">
//           <span className="font-medium">Location:</span> {job.location}
//         </p>

//         <p className="text-sm text-gray-600 mb-3">
//           <span className="font-medium">Salary:</span> ₹{job.salary}
//         </p>

//         <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
//           {job.description}
//         </p>

//         <Button onClick={() => navigate(`/job/${job._id}`)} className="w-full cursor-pointer">
//           View Details
//         </Button>
//       </CardContent>
//     </Card>
//   );
// };

// export default JobCard;







// // ok


// import { useDispatch, useSelector } from "react-redux";
// import { Heart, HeartOff } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { likeJob, unlikeJob } from "@/redux/slices/authSlice"; // Changed imports

// const JobCard = ({ job }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Get user from auth state
//   const { user } = useSelector((state) => state.auth);
  
//   // Check if job is liked by current user
//   const isSaved = user?.likedJobs?.includes(job._id);

//   const toggleSave = () => {
//     if (!user) {
//       // Handle unauthenticated user (e.g., show login modal)
//       return;
//     }
    
//     if (isSaved) {
//       dispatch(unlikeJob(job._id));
//     } else {
//       dispatch(likeJob(job._id));
//     }
//   };

//   return (
//     <Card className="rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 border p-4 flex flex-col justify-between">
//       <CardContent>
//         <div className="flex items-center justify-between">
//           <h2 className="text-xl font-semibold">{job.title}</h2>
//           <Button variant="ghost" size="icon" onClick={toggleSave}>
//             {isSaved ? (
//               <Heart className="text-red-500 fill-red-500" />
//             ) : (
//               <HeartOff />
//             )}
//           </Button>
//         </div>

//         <img
//           className="w-10"
//           src={job?.logo || "https://ui-avatars.com/api/?name=User"}
//           alt="logo"
//         />

//         <p className="text-sm text-gray-600 mb-1">
//           <span className="font-medium">Company:</span> {job.company || "Unknown"}
//         </p>

//         <p className="text-sm text-gray-600 mb-1">
//           <span className="font-medium">Location:</span> {job.location}
//         </p>

//         <p className="text-sm text-gray-600 mb-3">
//           <span className="font-medium">Salary:</span> ₹{job.salary}
//         </p>

//         <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
//           {job.description}
//         </p>

//         <Button
//           onClick={() => navigate(`/job/${job._id}`)}
//           className="w-full cursor-pointer"
//         >
//           View Details
//         </Button>
//       </CardContent>
//     </Card>
//   );
// };

// export default JobCard;


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
  const { user } = useSelector((state) => state.auth);
  const isSaved = user?.likedJobs?.includes(job._id);

  const toggleSave = async () => {
    if (!user) {
      toast.error("Please login to save jobs");
      navigate("/login");
      return;
    }
    
    try {
      if (isSaved) {
        await dispatch(unlikeJob(job._id)).unwrap();
      } else {
        await dispatch(likeJob(job._id)).unwrap();
      }
    } catch (error) {
      toast.error(error.message || "Failed to update saved jobs");
    }
  };

  return (
    <Card className="rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 border p-4 flex flex-col justify-between">
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
          className="w-10"
          src={job?.logo || "https://ui-avatars.com/api/?name=User"}
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