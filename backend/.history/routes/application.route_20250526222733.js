// import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
// import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";
 
// const router = express.Router();

// router.route("/apply/:id").get(isAuthenticated, applyJob);
// router.route("/get").get(isAuthenticated, getAppliedJobs);
// router.route("/:id/applicants").get(isAuthenticated, getApplicants);
// router.route("/status/:id/update").post(isAuthenticated, updateStatus);
 

// export default router;

import express from "express";
import { 
  applyJob, 
  getJobApplications, 
  updateStatus 
} from "../controllers/application.controller.js";
// import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/:jobId/apply", isAuthenticated, applyJob);
router.get("/job/:jobId", isAuthenticated, getJobApplications);
router.patch("/:id/status", isAuthenticated, updateStatus);

export default router;