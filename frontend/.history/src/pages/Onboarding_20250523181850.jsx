// // import { useUser } from "@clerk/clerk-react";
// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";
// // import { useEffect } from "react";
// // import { BarLoader } from "react-spinners";

// const Onboarding = () => {
//   // const { user, isLoaded } = useUser();
//   const navigate = useNavigate();

//   function navigateUser (currRole=true) {
//     navigate(currRole === "recruiter" ? "/post-job" : "/job-listing");
//   };

//   // const handleRoleSelection = async (role) => {
//   //   await user
//   //     .update({ unsafeMetadata: { role } })
//   //     .then(() => {
//   //       console.log(`Role updated to: ${role}`);
//   //       navigateUser(role);
//   //     })
//   //     .catch((err) => {
//   //       console.error("Error updating role:", err);
//   //     });
//   // };

//   // useEffect(() => {
//   //   if (user?.unsafeMetadata?.role) {
//   //     navigateUser(user.unsafeMetadata.role);
//   //   }
//   // }, [user]);

//   // if (!isLoaded) {
//   //   return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
//   // }

//   return (
//     <div className="flex flex-col items-center justify-center mt-40">
//       <h2 className="gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter">
//         I am a...
//       </h2>
//       <div className="mt-16 grid grid-cols-2 gap-4 w-full md:px-40">
//         <Button
//           variant="blue"
//           className="h-36 text-2xl"
//           onClick={() => navigateUser("candidate")}
//         >
//           Candidate
//         </Button>
//         <Button
//           variant="destructive"
//           className="h-36 text-2xl"
//           onClick={() => navigateUser("recruiter")}
//         >
//           Recruiter
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Onboarding;


import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Onboarding = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if no user
    if (!user) {
      navigate("/?sign-in=true");
    }
  }, [user, navigate]);

  function navigateUser(role) {
    navigate(role === "recruiter" ? "/post-job" : "/job-listing");
  }

  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <h2 className="gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter">
        I am a...
      </h2>
      <div className="mt-16 grid grid-cols-2 gap-4 w-full md:px-40">
        <Button
          variant="blue"
          className="h-36 text-2xl"
          onClick={() => navigateUser("student")}
        >
          Candidate
        </Button>
        <Button
          variant="destructive"
          className="h-36 text-2xl"
          onClick={() => navigateUser("recruiter")}
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;

