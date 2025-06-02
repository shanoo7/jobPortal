import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { deleteJob, getAdminJobs, getAllJobs, getJobById, postJob,updateJob,updateJobStatus } from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);
router.route("/update/:id").patch(isAuthenticated, updateJobStatus);
// जॉब अपडेट एंडपॉइंट
router.patch('/newupdate/:id', isAuthenticated, updateJob);

// जॉब डिलीट एंडपॉइंट
router.delete('/delete/:id', isAuthenticated, deleteJob);

export default router;

