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

router.post('/register', register);
router.post('/login', login);
router.delete('/logout', logout);

router.get('/user/profile', verifyUser, getUserProfile);
router.patch('/user/:id', verifyUser, editUserProfile);
router.delete('/user/:id', verifyUser, deleteUserProfile);

export default router;
