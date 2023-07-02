import express from "express";

import { isAuthenticated } from "../middlewares";

import auth from "./auth/auth.routes";
import users from "./users/users.routes";
import notes from "./notes/notes.routes";

const router = express.Router();

router.use("/auth", auth);
router.use("/users", users);
router.use("/notes", isAuthenticated, notes);

export default router;
