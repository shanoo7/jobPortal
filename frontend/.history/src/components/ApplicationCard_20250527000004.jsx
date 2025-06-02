// /* eslint-disable react/prop-types */
// import { useState } from "react";
// import { Boxes, BriefcaseBusiness, Download, School } from "lucide-react";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "./ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "./ui/select";
// import { BarLoader } from "react-spinners";

// function ApplicationCard ({ application, isCandidate = false })  {
//   const [loadingHiringStatus, setLoadingHiringStatus] = useState(false);
//   const [status, setStatus] = useState(application.status);

//   const handleDownload = () => {
//     // Just open the resume URL in new tab (simulate)
//     const link = document.createElement("a");
//     link.href = application?.resume || "#";
//     link.target = "_blank";
//     link.click();
//   };

//   const handleStatusChange = (newStatus) => {
//     setLoadingHiringStatus(true);

//     // Simulate API call delay and success
//     setTimeout(() => {
//       setStatus(newStatus);
//       setLoadingHiringStatus(false);
//     }, 1000);
//   };

//   return (
//     <Card>
//       {loadingHiringStatus && <BarLoader width={"100%"} color="#36d7b7" />}
//       <CardHeader>
//         <CardTitle className="flex justify-between font-bold">
//           {isCandidate
//             ? `${application?.job?.title} at ${application?.job?.company?.name}`
//             : application?.name}
//           <Download
//             size={18}
//             className="bg-white text-black rounded-full h-8 w-8 p-1.5 cursor-pointer"
//             onClick={handleDownload}
//           />
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="flex flex-col gap-4 flex-1">
//         <div className="flex flex-col md:flex-row justify-between">
//           <div className="flex gap-2 items-center">
//             <BriefcaseBusiness size={15} /> {application?.experience} years of
//             experience
//           </div>
//           <div className="flex gap-2 items-center">
//             <School size={15} />
//             {application?.education}
//           </div>
//           <div className="flex gap-2 items-center">
//             <Boxes size={15} /> Skills: {application?.skills}
//           </div>
//         </div>
//         <hr />
//       </CardContent>
//       <CardFooter className="flex justify-between">
//         <span>{new Date(application?.created_at).toLocaleString()}</span>
//         {isCandidate ? (
//           <span className="capitalize font-bold">Status: {status}</span>
//         ) : (
//           <Select
//             onValueChange={handleStatusChange}
//             value={status}
//           >
//             <SelectTrigger className="w-52">
//               <SelectValue placeholder="Application Status" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="applied">Applied</SelectItem>
//               <SelectItem value="interviewing">Interviewing</SelectItem>
//               <SelectItem value="hired">Hired</SelectItem>
//               <SelectItem value="rejected">Rejected</SelectItem>
//             </SelectContent>
//           </Select>
//         )}
//       </CardFooter>
//     </Card>
//   );
// };

// export default ApplicationCard;

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export const ApplicationCard = ({ application }) => {
  console.log(application.status)
  const getStatusColor = (status) => {
    switch (status) {
      case "accepted": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-3">
        <Avatar>
          <AvatarImage src={application.applicant?.profile?.profilePhoto} />
          <AvatarFallback>
            {application.applicant?.fullname?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">{application.applicant?.fullname}</h3>
          <p className="text-sm text-gray-500">{application.applicant?.email}</p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <Badge className={getStatusColor(application.status)}>
          {/* {application.status} */}
          {application}
        </Badge>
        <span className="text-sm text-gray-500">
          {new Date(application.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};
