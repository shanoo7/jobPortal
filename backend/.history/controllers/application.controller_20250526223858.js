import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required.",
                success: false
            })
        };
        // check if the user has already applied for the job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this jobs",
                success: false
            });
        }

        // check if the jobs exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }
        // create a new application
        const newApplication = await Application.create({
            job:jobId,
            applicant:userId,
        });

        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message:"Job applied successfully.",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
};
export const getAppliedJobs = async (req,res) => {
    try {
        const userId = req.id;
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}},
            }
        });
        if(!application){
            return res.status(404).json({
                message:"No Applications",
                success:false
            })
        };
        return res.status(200).json({
            application,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
// admin dekhega kitna user ne apply kiya hai
// export const getApplicants = async (req,res) => {
//     try {
//         const jobId = req.params.id;
//         const job = await Job.findById(jobId).populate({
//             path:'applications',
//             options:{sort:{createdAt:-1}},
//             populate:{
//                 path:'applicant'
//             }
//         });
//         if(!job){
//             return res.status(404).json({
//                 message:'Job not found.',
//                 success:false
//             })
//         };
//         return res.status(200).json({
//             job, 
//             succees:true
//         });
//     } catch (error) {
//         console.log(error);
//     }
// }
// export const getApplicants = async (req, res) => {
//     try {
//         const jobId = req.params.id;
//         const recruiterId = req.id; // Current user ID from auth middleware

//         // Verify the job exists and belongs to the recruiter
//         const job = await Job.findOne({
//             _id: jobId,
//             created_by: recruiterId
//         }).populate({
//             path: 'applications',
//             populate: {
//                 path: 'applicant',
//                 select: 'name email avatar resume', // Include all needed fields
//                 populate: {
//                     path: 'resume', // If resume is a separate model
//                     select: 'url fileName'
//                 }
//             }
//         });

//         if (!job) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Job not found or unauthorized access"
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             applications: job.applications
//         });

//     } catch (error) {
//         console.error("Get applicants error:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Failed to fetch applicants",
//             error: error.message
//         });
//     }
// };
// application.controller.js
// export const getApplicants = async (req, res) => {
//     try {
//         const jobId = req.params.id;
//         const recruiterId = req.id;

//         // Verify job exists and belongs to requester
//         const job = await Job.findOne({
//             _id: jobId,
//             created_by: recruiterId
//         }).populate({
//             path: 'applications',
//             populate: {
//                 path: 'applicant',
//                 select: 'name email avatar resume', // Include all needed fields
//                 populate: {
//                     path: 'resume',
//                     select: 'url fileName'
//                 }
//             }
//         });

//         if (!job) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Job not found or unauthorized access"
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             applications: job.applications
//         });

//     } catch (error) {
//         console.error("Get applicants error:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Failed to fetch applicants",
//             error: error.message
//         });
//     }
// };
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId)
      .populate({
        path: 'applications',
        populate: {
          path: 'applicant',
          select: 'name email avatar' // Ensure these fields exist
        }
      });

    if (!job) {
      return res.status(404).json({ 
        success: false,
        message: "Job not found" 
      });
    }

    return res.status(200).json({
      success: true,
      applications: job.applications
    });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
export const updateStatus = async (req,res) => {
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message:'status is required',
                success:false
            })
        };

        // find the application by applicantion id
        const application = await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(404).json({
                message:"Application not found.",
                success:false
            })
        };

        // update the status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message:"Status updated successfully.",
            success:true
        });

    } catch (error) {
        console.log(error);
    }
}