import express from "express";
import {
    register,
    login,
    logout,
    getUserProfile,
    editUserProfile,
    deleteUserProfile

} from "../controllers/userController";
import { verifyUser } from "../middleware/authUser";

const router = express.Router();

router.post('/api/register', register);
router.post('/api/login', login);
router.delete('/api/logout', logout);

router.get('/api/user/profile', verifyUser, getUserProfile);
router.patch('/api/user/:id', verifyUser, editUserProfile);
router.delete('/api/user/:id', verifyUser, deleteUserProfile);

export default router;
