// import { Application } from "../models/application.model.js";
// import { Job } from "../models/job.model.js";

// export const applyJob = async (req, res) => {
//     try {
//         const userId = req.id;
//         const jobId = req.params.id;
//         if (!jobId) {
//             return res.status(400).json({
//                 message: "Job id is required.",
//                 success: false
//             })
//         };
//         // check if the user has already applied for the job
//         const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

//         if (existingApplication) {
//             return res.status(400).json({
//                 message: "You have already applied for this jobs",
//                 success: false
//             });
//         }

//         // check if the jobs exists
//         const job = await Job.findById(jobId);
//         if (!job) {
//             return res.status(404).json({
//                 message: "Job not found",
//                 success: false
//             })
//         }
//         // create a new application
//         const newApplication = await Application.create({
//             job:jobId,
//             applicant:userId,
//         });

//         job.applications.push(newApplication._id);
//         await job.save();
//         return res.status(201).json({
//             message:"Job applied successfully.",
//             success:true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// };
// export const getAppliedJobs = async (req,res) => {
//     try {
//         const userId = req.id;
//         const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
//             path:'job',
//             options:{sort:{createdAt:-1}},
//             populate:{
//                 path:'company',
//                 options:{sort:{createdAt:-1}},
//             }
//         });
//         if(!application){
//             return res.status(404).json({
//                 message:"No Applications",
//                 success:false
//             })
//         };
//         return res.status(200).json({
//             application,
//             success:true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }
// // admin dekhega kitna user ne apply kiya hai
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
// export const updateStatus = async (req,res) => {
//     try {
//         const {status} = req.body;
//         const applicationId = req.params.id;
//         if(!status){
//             return res.status(400).json({
//                 message:'status is required',
//                 success:false
//             })
//         };

//         // find the application by applicantion id
//         const application = await Application.findOne({_id:applicationId});
//         if(!application){
//             return res.status(404).json({
//                 message:"Application not found.",
//                 success:false
//             })
//         };

//         // update the status
//         application.status = status.toLowerCase();
//         await application.save();

//         return res.status(200).json({
//             message:"Status updated successfully.",
//             success:true
//         });

//     } catch (error) {
//         console.log(error);
//     }
// }

// import { Application } from "../models/application.model.js";
// import { Job } from "../models/job.model.js";

import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.id; // From authentication middleware
        const jobId = req.params.id;

        // Validate inputs
        if (!jobId || !mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({
                success: false,
                message: "Valid job ID is required"
            });
        }

        // Check for existing application
        const existingApplication = await Application.findOne({ 
            job: jobId, 
            applicant: userId 
        });

        if (existingApplication) {
            return res.status(400).json({
                success: false,
                message: "You have already applied for this job"
            });
        }

        // Verify job exists and is open
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }
        if (!job.isOpen) {
            return res.status(400).json({
                success: false,
                message: "This job is no longer accepting applications"
            });
        }

        // Create new application with populated data
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
            status: 'pending'
        });

        // Update job's applications array
        job.applications.push(newApplication._id);
        await job.save();

        // Return populated application data
        const populatedApplication = await Application.findById(newApplication._id)
            .populate('job', 'title company')
            .populate('applicant', 'name email');

        return res.status(201).json({
            success: true,
            message: "Application submitted successfully",
            application: populatedApplication
        });

    } catch (error) {
        console.error("Application error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;

        const applications = await Application.find({ applicant: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: 'job',
                populate: {
                    path: 'company',
                    select: 'name logo'
                }
            });

        if (!applications.length) {
            return res.status(404).json({
                success: false,
                message: "No applications found"
            });
        }

        return res.status(200).json({
            success: true,
            count: applications.length,
            applications
        });

    } catch (error) {
        console.error("Get applications error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch applications",
            error: error.message
        });
    }
};

export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const recruiterId = req.id; // Current user making the request

        // Verify job exists and belongs to requester
        const job = await Job.findOne({
            _id: jobId,
            created_by: recruiterId
        }).populate({
            path: 'applications',
            populate: {
                path: 'applicant',
                select: 'name email resume'
            }
        });

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found or unauthorized access"
            });
        }

        return res.status(200).json({
            success: true,
            count: job.applications.length,
            applicants: job.applications
        });

    } catch (error) {
        console.error("Get applicants error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch applicants",
            error: error.message
        });
    }
};

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;
        const recruiterId = req.id; // Current user making the request

        // Validate status
        const validStatuses = ['pending', 'accepted', 'rejected'];
        if (!status || !validStatuses.includes(status.toLowerCase())) {
            return res.status(400).json({
                success: false,
                message: "Valid status is required (pending/accepted/rejected)"
            });
        }

        // Find application and verify ownership
        const application = await Application.findById(applicationId)
            .populate('job', 'created_by');

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            });
        }

        // Verify requester is job creator
        if (application.job.created_by.toString() !== recruiterId) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized to update this application"
            });
        }

        // Update status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            success: true,
            message: "Application status updated",
            application
        });

    } catch (error) {
        console.error("Status update error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update status",
            error: error.message
        });
    }
};