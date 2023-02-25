import express from "express";
import {
    register,
    login,
    logout,
    getUserProfile,
    editUserProfile,
    deleteUserProfile

} from "../controllers/userController";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.delete('/logout', logout);

router.get('/user/profile', getUserProfile);
router.patch('/user/:id', editUserProfile);
router.delete('/user/:id', deleteUserProfile);

export default router;
