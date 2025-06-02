import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyJob, getAppliedJobs, getJobApplications, updateStatus,updateApplicationStatus } from "../controllers/application.controller.js";
 
const router = express.Router();

router.route("/apply/:id").get(isAuthenticated, applyJob);
router.route("/get").get(isAuthenticated, getAppliedJobs);
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
// router.get("/:jobId/applicants", getApplicants);
router.get('/job/:id', isAuthenticated, getJobApplications); // recruiter view
router.put('/status/:applicationId', isAuthenticated, updateApplicationStatus); // recruiter status update

router.route("/status/:id/update").post(isAuthenticated, updateStatus);
 

export default router;


// import express from 'express';
// import { applyJob, getJobApplications, updateApplicationStatus } from '../controllers/application.controller.js';
// import { verifyToken } from '../middlewares/auth.js';

// const router = express.Router();

// router.post('/apply/:id', verifyToken, applyJob);
// router.get('/job/:id', verifyToken, getJobApplications); // recruiter view
// router.put('/status/:applicationId', verifyToken, updateApplicationStatus); // recruiter status update

// export default router;


