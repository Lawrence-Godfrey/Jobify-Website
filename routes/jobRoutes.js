import express from "express";
import { createJob, deleteJob, updateJob, getAllJobs, showStats } from "../controllers/jobsController.js";
import authenticateUser from "../middleware/auth.js";

const router = express.Router();

router.use(authenticateUser);

router.route("/").post(createJob).get(getAllJobs);
router.route("/stats").get(showStats);
router.route("/:id").delete(deleteJob).patch(updateJob);

export default router;