
import { Job } from "../models/job.model.js";

// ADMIN: Post a new job
export const postJob = async (req, res) => {
    try {
        console.log("Incoming Job Payload:", req.body);
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            console.log("Missing fields in job creation request");
            return res.status(400).json({
                message: "Something is missing.....",
                success: false
            });
        }

        const job = await Job.create({
            title,
            description,
            requirements: Array.isArray(requirements) ? requirements : [],
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });

        console.log("Job created:", job);

        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.error("Error in postJob:", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

// STUDENT: Get all jobs (with keyword search)
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        console.log("Search keyword:", keyword);

        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        };

        const jobs = await Job.find(query)
            .populate("company")
            .sort({ createdAt: -1 });

        console.log("Jobs found:", jobs.length);

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            });
        }

        return res.status(200).json({
            jobs,
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
        console.log("Job ID to fetch:", jobId);

        const job = await Job.findById(jobId).populate("applications");

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        console.log("Job found:", job);

        return res.status(200).json({
            job,
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
        console.log("Admin ID:", adminId);

        const jobs = await Job.find({ created_by: adminId })
            .populate("company")
            .sort({ createdAt: -1 });

        console.log(`Jobs found for admin ${adminId}:`, jobs.length);

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            });
        }

        return res.status(200).json({
            jobs,
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

        console.log("Job ID for status update:", id);
        console.log("New isOpen value:", isOpen);

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

        console.log("Updated job status:", job);

        return res.status(200).json({
            message: "Job status updated",
            job,
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

// // ADMIN: Update job details (not just status)
// export const updateJob = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const updates = req.body;
        
//         console.log("Updating job:", id, "with:", updates);

//         const job = await Job.findByIdAndUpdate(
//             id,
//             updates,
//             { new: true }
//         ).populate("company");

//         if (!job) {
//             return res.status(404).json({
//                 message: "Job not found",
//                 success: false
//             });
//         }

//         console.log("Updated job:", job);
//         return res.status(200).json({
//             message: "Job updated successfully",
//             job,
//             success: true
//         });
//     } catch (error) {
//         console.error("Error updating job:", error);
//         return res.status(500).json({
//             message: "Error updating job",
//             success: false
//         });
//     }
// };


// // updateJob कंट्रोलर में ओनरशिप चेक जोड़ें
// export const updateJob = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const updates = req.body;
//         const userId = req.id;

//         // पहले जॉब fetch करें
//         const job = await Job.findById(id);
        
//         if (!job) {
//             return res.status(404).json({
//                 message: "Job not found",
//                 success: false
//             });
//         }

//         // चेक करें कि यूजर जॉब का ओनर है
//         if (job.created_by.toString() !== userId) {
//             return res.status(403).json({
//                 message: "Unauthorized - You don't own this job",
//                 success: false
//             });
//         }

//         // फिर अपडेट करें
//         const updatedJob = await Job.findByIdAndUpdate(
//             id,
//             updates,
//             { new: true }
//         ).populate("company");

//         return res.status(200).json({
//             message: "Job updated successfully",
//             job: updatedJob,
//             success: true
//         });
//     } catch (error) {
//         console.error("Error updating job:", error);
//         return res.status(500).json({
//             message: "Error updating job",
//             success: false
//         });
//     }
// };

// ✅ Corrected backend controller
export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const job = await Job.findByIdAndUpdate(id, updatedData, {
      new: true, // return updated job
      runValidators: true, // ensure validations are enforced
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job,
    });
  } catch (error) {
    console.error("Error updating job:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// ADMIN: Delete a job
export const deleteJob = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Deleting job:", id);

        const job = await Job.findByIdAndDelete(id);

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        console.log("Deleted job:", job);
        return res.status(200).json({
            message: "Job deleted successfully",
            success: true
        });
    } catch (error) {
        console.error("Error deleting job:", error);
        return res.status(500).json({
            message: "Error deleting job",
            success: false
        });
    }
};