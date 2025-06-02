
import { Job } from "../models/job.model.js";

// // ADMIN: Post a new job
// export const postJob = async (req, res) => {
    
//   try {
//     console.log("Incoming Job Payload:", req.body);
//     const {
//       title,
//       description,
//       requirements,
//       salary,
//       location,
//       jobType,
//       experienceLevel,
//       position,
//       company,
//       website,
//       logo,
//       created_by
//     } = req.body;

//     // Validate required fields
//     if (!title || !description || !requirements || !salary || !location || 
//         !jobType || experienceLevel === undefined || !position || !company) {
//       console.log("Missing required fields:", req.body);
//       return res.status(400).json({
//         message: "All required fields must be provided",
//         success: false,
//         requiredFields: {
//           title: !title,
//           description: !description,
//           requirements: !requirements,
//           salary: !salary,
//           location: !location,
//           jobType: !jobType,
//           experienceLevel: experienceLevel === undefined,
//           position: !position,
//           company: !company
//         }
//       });
//     }

//     // Create job with all fields
//     const job = await Job.create({
//       title,
//       description,
//       requirements: Array.isArray(requirements) ? requirements : [requirements],
//       salary: Number(salary),
//       location,
//       jobType,
//       experienceLevel: Number(experienceLevel),
//       position: Number(position),
//       company,
//       website: website || undefined,
//       logo: logo || undefined,
//       created_by,
//       isOpen: true,
//       isDeleted: false
//     });

//     console.log("Job created successfully:", job);
//     return res.status(201).json({
//       message: "Job created successfully",
//       job,
//       success: true
//     });

//   } catch (error) {
//     console.error("Error in postJob:", error);
//     return res.status(500).json({ 
//       message: "Internal server error",
//       error: error.message,
//       success: false 
//     });
//   }
// };

// // STUDENT: Get all jobs (with keyword search)
// export const getAllJobs = async (req, res) => {
//     try {
//         const keyword = req.query.keyword || "";
//         console.log("Search keyword:", keyword);

//         const query = {
//             $or: [
//                 { title: { $regex: keyword, $options: "i" } },
//                 { description: { $regex: keyword, $options: "i" } }
//             ]
//         };

//         const jobs = await Job.find(query)
//             .populate("company")
//             .sort({ createdAt: -1 });

//         console.log("Jobs found:", jobs.length);

//         if (!jobs || jobs.length === 0) {
//             return res.status(404).json({
//                 message: "Jobs not found.",
//                 success: false
//             });
//         }

//         return res.status(200).json({
//             jobs,
//             success: true
//         });
//     } catch (error) {
//         console.error("Error in getAllJobs:", error);
//         return res.status(500).json({ message: "Internal server error", success: false });
//     }
// };

// // STUDENT: Get a specific job by ID
// export const getJobById = async (req, res) => {
//     try {
//         const jobId = req.params.id;
//         console.log("Job ID to fetch:", jobId);

//         const job = await Job.findById(jobId).populate("applications");

//         if (!job) {
//             return res.status(404).json({
//                 message: "Job not found.",
//                 success: false
//             });
//         }

//         console.log("Job found:", job);

//         return res.status(200).json({
//             job,
//             success: true
//         });
//     } catch (error) {
//         console.error("Error in getJobById:", error);
//         return res.status(500).json({ message: "Internal server error", success: false });
//     }
// };

// // ADMIN: Get all jobs created by current admin
// export const getAdminJobs = async (req, res) => {
//     try {
//         const adminId = req.id;
//         console.log("Admin ID:", adminId);

//         const jobs = await Job.find({ created_by: adminId })
//             .populate("company")
//             .sort({ createdAt: -1 });

//         console.log(`Jobs found for admin ${adminId}:`, jobs.length);

//         if (!jobs || jobs.length === 0) {
//             return res.status(404).json({
//                 message: "Jobs not found.",
//                 success: false
//             });
//         }

//         return res.status(200).json({
//             jobs,
//             success: true
//         });
//     } catch (error) {
//         console.error("Error in getAdminJobs:", error);
//         return res.status(500).json({ message: "Internal server error", success: false });
//     }
// };

// // ADMIN: Update job open/close status
// export const updateJobStatus = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { isOpen } = req.body;

//         console.log("Job ID for status update:", id);
//         console.log("New isOpen value:", isOpen);

//         const job = await Job.findByIdAndUpdate(
//             id,
//             { isOpen },
//             { new: true }
//         );

//         if (!job) {
//             return res.status(404).json({
//                 message: "Job not found",
//                 success: false
//             });
//         }

//         console.log("Updated job status:", job);

//         return res.status(200).json({
//             message: "Job status updated",
//             job,
//             success: true
//         });
//     } catch (error) {
//         console.error("Error in updateJobStatus:", error);
//         return res.status(500).json({
//             message: "Error updating job status",
//             success: false
//         });
//     }
// };




// export const updateJob = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updates = req.body;
//     const userId = req.id;

//     // Check ownership
//     const job = await Job.findById(id);
//     if (!job) {
//       return res.status(404).json({
//         message: "Job not found",
//         success: false
//       });
//     }

//     if (job.created_by.toString() !== userId) {
//       return res.status(403).json({
//         message: "Unauthorized - You don't own this job",
//         success: false
//       });
//     }

//     // Perform the update
//     const updatedJob = await Job.findByIdAndUpdate(
//       id,
//       updates,
//       {
//         new: true,
//         runValidators: true
//       }
//     ).populate("company");

//     console.log("Updated job:", updatedJob);

//     return res.status(200).json({
//       message: "Job updated successfully",
//       job: updatedJob,
//       success: true
//     });
//   } catch (error) {
//     console.error("Error updating job:", error);
//     return res.status(500).json({
//       message: "Error updating job",
//       success: false
//     });
//   }
// };

// // ADMIN: Delete a job
// // export const deleteJob = async (req, res) => {
// //     try {
// //         const { id } = req.params;
// //         console.log("Deleting job:", id);

// //         const job = await Job.findByIdAndDelete(id);

// //         if (!job) {
// //             return res.status(404).json({
// //                 message: "Job not found",
// //                 success: false
// //             });
// //         }

// //         console.log("Deleted job:", job);
// //         return res.status(200).json({
// //             message: "Job deleted successfully",
// //             success: true
// //         });
// //     } catch (error) {
// //         console.error("Error deleting job:", error);
// //         return res.status(500).json({
// //             message: "Error deleting job",
// //             success: false
// //         });
// //     }
// // };

// // DELETE JOB CONTROLLER
// export const deleteJob = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deletedJob = await Job.findByIdAndDelete(id);

//     if (!deletedJob) {
//       return res.status(404).json({
//         success: false,
//         message: "Job not found or already deleted",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Job deleted successfully",
//       job: deletedJob,
//     });
//   } catch (error) {
//     console.error("Error deleting job:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error while deleting job",
//     });
//   }
// };


// Helper function to extract direct image URL from Google Images URL
const extractDirectImageUrl = (logoUrl) => {
  if (!logoUrl) return null;
  
  try {
    const urlObj = new URL(logoUrl);
    if (urlObj.hostname === 'www.google.com' && urlObj.pathname === '/imgres') {
      const imgUrl = urlObj.searchParams.get('imgurl');
      return imgUrl ? decodeURIComponent(imgUrl) : logoUrl;
    }
    return logoUrl;
  } catch (error) {
    return logoUrl;
  }
};

// ADMIN: Post a new job
export const postJob = async (req, res) => {
  try {
    console.log("Incoming Job Payload:", req.body);
    
    // Extract and fix logo URL before validation
    let logo = req.body.logo;
    if (logo) logo = extractDirectImageUrl(logo);

    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experienceLevel,
      position,
      company,
      website,
      created_by
    } = req.body;

    // Validate required fields (keep original validation)
    if (!title || !description || !requirements || !salary || !location || 
        !jobType || experienceLevel === undefined || !position || !company) {
      return res.status(400).json({ /* original validation response */ });
    }

    // Create job with fixed logo URL
    const job = await Job.create({
      title,
      description,
      requirements: Array.isArray(requirements) ? requirements : [requirements],
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: Number(experienceLevel),
      position: Number(position),
      company,
      website: website || undefined,
      logo,  // Use the fixed URL
      created_by,
      isOpen: true,
      isDeleted: false
    });

    // Convert to object and fix logo for response
    const jobObj = job.toObject();
    jobObj.logo = extractDirectImageUrl(jobObj.logo);

    return res.status(201).json({
      message: "Job created successfully",
      job: jobObj,
      success: true
    });

  } catch (error) {
    console.error("Error in postJob:", error);
    return res.status(500).json({ 
      message: "Internal server error",
      error: error.message,
      success: false 
    });
  }
};

// STUDENT: Get all jobs (with keyword search)
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } }
      ]
    };

    const jobs = await Job.find(query).lean(); // Use lean() for plain objects

    // Process each job's logo
    const fixedJobs = jobs.map(job => ({
      ...job,
      logo: extractDirectImageUrl(job.logo)
    }));

    return res.status(200).json({
      jobs: fixedJobs,
      success: true
    });
  } catch (error) {
    console.error("Error in getAllJobs:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

// STUDENT: Get a specific job by ID
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate("applications");

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false
      });
    }

    // Convert to object and fix logo
    const jobObj = job.toObject();
    jobObj.logo = extractDirectImageUrl(jobObj.logo);

    return res.status(200).json({
      job: jobObj,
      success: true
    });
  } catch (error) {
    console.error("Error in getJobById:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

// ADMIN: Get all jobs created by current admin
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).lean();

    // Process each job's logo
    const fixedJobs = jobs.map(job => ({
      ...job,
      logo: extractDirectImageUrl(job.logo)
    }));

    return res.status(200).json({
      jobs: fixedJobs,
      success: true
    });
  } catch (error) {
    console.error("Error in getAdminJobs:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

// ADMIN: Update job open/close status
export const updateJobStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isOpen } = req.body;

    const job = await Job.findByIdAndUpdate(
      id,
      { isOpen },
      { new: true }
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false
      });
    }

    // Convert to object and fix logo
    const jobObj = job.toObject();
    jobObj.logo = extractDirectImageUrl(jobObj.logo);

    return res.status(200).json({
      message: "Job status updated",
      job: jobObj,
      success: true
    });
  } catch (error) {
    console.error("Error in updateJobStatus:", error);
    return res.status(500).json({
      message: "Error updating job status",
      success: false
    });
  }
};

export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    let updates = req.body;
    const userId = req.id;

    // Fix logo URL if present in updates
    if (updates.logo) {
      updates.logo = extractDirectImageUrl(updates.logo);
    }

    // Check ownership
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false
      });
    }

    if (job.created_by.toString() !== userId) {
      return res.status(403).json({
        message: "Unauthorized - You don't own this job",
        success: false
      });
    }

    // Perform update
    const updatedJob = await Job.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    // Convert to object and fix logo
    const jobObj = updatedJob.toObject();
    jobObj.logo = extractDirectImageUrl(jobObj.logo);

    return res.status(200).json({
      message: "Job updated successfully",
      job: jobObj,
      success: true
    });
  } catch (error) {
    console.error("Error updating job:", error);
    return res.status(500).json({
      message: "Error updating job",
      success: false
    });
  }
};

// ADMIN: Delete a job
export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedJob = await Job.findByIdAndDelete(id);

    if (!deletedJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found or already deleted",
      });
    }

    // Convert to object and fix logo
    const jobObj = deletedJob.toObject();
    jobObj.logo = extractDirectImageUrl(jobObj.logo);

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
      job: jobObj,
    });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting job",
    });
  }
};