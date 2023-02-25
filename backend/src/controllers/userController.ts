import argon2 from 'argon2';
import Users from '../models/userModel';
import { Request, Response } from 'express';

declare module "express-session" {
    interface SessionData {
      userId: number;
    }
}

export const register = async(req: Request, res: Response) => {
    const {first_name, last_name, date_of_birth, gender, risk_level, email, password, confPassword } = req.body;
    if (password !== confPassword) {
        return res.status(400).json({msg: "Password and Confirm Password do not match"});
    }
    const hashPassword = await argon2.hash(password);
    try {
        await Users.create({
            FirstName: first_name,
            LastName: last_name,
            DateOfBirth: date_of_birth,
            Gender: gender,
            RiskLevel: risk_level,
            Email: email,
            Password: hashPassword,
        });
        res.status(201).json({msg: "Successful Register"});
    } catch (error: any) {
        res.status(400).json({msg: error.message});
    }
}

export const login = async (req: Request, res: Response) => {
    const user = await Users.findOne({
        where: {
            Email: req.body.email
        }
    });
    if (!user) {
        return res.status(404).json({ msg: "User not found" })
    }
    const match = await argon2.verify(user.Password, req.body.password);
    if (!match) {
        return res.status(400).json({ msg: "Wrong Password" });
    }
    req.session.userId = user.User_ID;
    const user_id = user.User_ID;
    const first_name = user.FirstName;
    const last_name = user.LastName;
    const email = user.Email;
    res.status(200).json({ user_id, first_name, last_name, email });
}

export const getUserProfile = async (req: Request, res: Response) => {

    if (!req.session.userId) {
        return res.status(401).json({ msg: "Please login to your account" });
    }
    const user = await Users.findOne({
        attributes: ['user_id', 'first_name', 'last_name', 'username', 'date_of_birth', 'is_admin'],
        where: {
            user_id: req.session.userId
        }
    })
    if (!user) {
        return res.status(404).json({ msg: "User not found" })
    }
    res.status(200).json(user);
}

export const logout = (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(400).json({ msg: "Unable to logout" })
        }
        res.status(200).json({ msg: "Logout successful" })
    })
}