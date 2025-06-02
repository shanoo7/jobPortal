// import { useState, useEffect } from "react";
// import { BarLoader } from "react-spinners";
// import { ApplicationCard } from "./ApplicationCard";
// // import ApplicationCard from "./ApplicationCard"; // keep your existing ApplicationCard component

// // Dummy application data
// const dummyApplications = [
//   {
//     id: "app_1",
//     jobTitle: "Frontend Developer",
//     companyName: "Tech Corp",
//     status: "Pending",
//     appliedDate: "2025-05-15",
//     // add other fields your ApplicationCard needs
//   },
//   {
//     id: "app_2",
//     jobTitle: "Backend Engineer",
//     companyName: "Innovate Labs",
//     status: "Interview Scheduled",
//     appliedDate: "2025-05-10",
//   },
//   {
//     id: "app_3",
//     jobTitle: "Full Stack Developer",
//     companyName: "Startup Hub",
//     status: "Rejected",
//     appliedDate: "2025-05-05",
//   },
// ];

// function CreatedApplications ()  {
//   const [loadingApplications, setLoadingApplications] = useState(true);
//   const [applications, setApplications] = useState([]);

//   // Simulate fetching data with a delay
//   useEffect(() => {
//     setLoadingApplications(true);
//     const timer = setTimeout(() => {
//       setApplications(dummyApplications);
//       setLoadingApplications(false);
//     }, 1500);

//     return () => clearTimeout(timer);
//   }, []);

//   // Dummy refresh function
//   const fnApplications = () => {
//     setLoadingApplications(true);
//     setTimeout(() => {
//       setApplications(dummyApplications);
//       setLoadingApplications(false);
//     }, 1000);
//   };

//   if (loadingApplications) {
//     return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
//   }

//   return (
//     <div className="flex flex-col gap-2">
//       {applications.length ? (
//         applications.map((application) => (
//           <ApplicationCard
//             key={application.id}
//             application={application}
//             isCandidate={true}
//             onRefresh={fnApplications} // if your ApplicationCard can refresh
//           />
//         ))
//       ) : (
//         <div>No Applications Found 😢</div>
//       )}
//     </div>
//   );
// };

// export default CreatedApplications;
