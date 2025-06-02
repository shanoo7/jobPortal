import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyJob, getApplicants, getAppliedJobs, getStudentApplications, updateStatus } from "../controllers/application.controller.js";
 
const router = express.Router();

router.route("/apply/:id").get(isAuthenticated, applyJob);
router.route("/get").get(isAuthenticated, getAppliedJobs);
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
router.get("/:jobId/applicants", getApplicants);
router.route('/student').get(isAuthenticated, getStudentApplications);

router.route("/status/:id/update").post(isAuthenticated, updateStatus);
 

export default router;

