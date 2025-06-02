// import express from "express";
// import { login, logout, register, updateProfile, getLikedJobs,
//   getSavedJobs } from "../controllers/user.controller.js";
// import isAuthenticated from "../middlewares/isAuthenticated.js";
// import { singleUpload } from "../middlewares/mutler.js";
 
// const router = express.Router();

// router.route("/register").post(singleUpload,register);
// router.route("/login").post(login);
// router.route("/logout").get(logout);
// router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);
// router.route("/jobs/liked").get(isAuthenticated, getLikedJobs);
// router.route("/jobs/saved").get(isAuthenticated, getSavedJobs);


// export default router;

// import express from "express";
// import { login, logout, register, updateProfile, getLikedJobs, getSavedJobs } from "../controllers/user.controller.js";
// import isAuthenticated from "../middlewares/isAuthenticated.js";
// import { uploadFiles } from "../middlewares/multer.js";

// const router = express.Router();

// router.route("/register").post(singleUpload, register);
// router.route("/login").post(login);
// router.route("/logout").get(logout);
// router.route("/profile/update").post(isAuthenticated, uploadFiles, updateProfile);
// router.route("/jobs/liked").get(isAuthenticated, getLikedJobs);
// router.route("/jobs/saved").get(isAuthenticated, getSavedJobs);

// export default router;

import express from "express";
import { login, logout, register, updateProfile, getLikedJobs,
  getSavedJobs } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js";
 

const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated, uploadFiles, updateProfile);
router.route("/jobs/liked").get(isAuthenticated, getLikedJobs);
router.route("/jobs/saved").get(isAuthenticated, getSavedJobs);

export default router;

