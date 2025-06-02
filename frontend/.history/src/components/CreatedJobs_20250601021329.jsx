// import { useState, useEffect } from "react";
// import { BarLoader } from "react-spinners";
// import JobCard from "./JobCard";
// // import JobCard from "./job-card"; // assuming this accepts the same props

// // Dummy jobs data
// const dummyJobs = [
//   {
//     id: "job_1",
//     title: "Frontend Developer",
//     company: "Tech Corp",
//     location: "Remote",
//     salary: "₹10,00,000 - ₹12,00,000",
//     description: "Build amazing React apps",
//     isActive: true,
//   },
//   {
//     id: "job_2",
//     title: "Backend Engineer",
//     company: "Innovate Labs",
//     location: "Bangalore",
//     salary: "₹12,00,000 - ₹15,00,000",
//     description: "Work on scalable APIs",
//     isActive: false,
//   },
//   {
//     id: "job_3",
//     title: "Full Stack Developer",
//     company: "Startup Hub",
//     location: "Hyderabad",
//     salary: "₹8,00,000 - ₹10,00,000",
//     description: "Frontend + Backend development",
//     isActive: true,
//   },
// ];

// function CreatedJobs  ()  {
//   const [loadingCreatedJobs, setLoadingCreatedJobs] = useState(true);
//   const [createdJobs, setCreatedJobs] = useState([]);

//   // Simulate loading and fetching jobs
//   useEffect(() => {
//     setLoadingCreatedJobs(true);
//     const timer = setTimeout(() => {
//       setCreatedJobs(dummyJobs);
//       setLoadingCreatedJobs(false);
//     }, 1500); // simulate 1.5s loading delay

//     return () => clearTimeout(timer);
//   }, []);

//   // Dummy function to simulate refresh
//   const fnCreatedJobs = () => {
//     setLoadingCreatedJobs(true);
//     setTimeout(() => {
//       setCreatedJobs(dummyJobs); // same dummy data
//       setLoadingCreatedJobs(false);
//     }, 1000);
//   };

//   return (
//     <div>
//       {loadingCreatedJobs ? (
//         <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
//       ) : (
//         <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {createdJobs?.length ? (
//             createdJobs.map((job) => (
//               <JobCard
//                 key={job.id}
//                 job={job}
//                 onJobAction={fnCreatedJobs}
//                 isMyJob
//               />
//             ))
//           ) : (
//             <div>No Jobs Found 😢</div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CreatedJobs;
