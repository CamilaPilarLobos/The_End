import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/users.models.js";

dotenv.config();

const SECRET = process.env.SECRET;

const userController = {
    getAll: async (req, res) => {
        try {
            const allUsers = await User.find();
            return res.status(200).json(allUsers);
        } catch (e) {
            return res.status(500).json(e);
        }
    },

    createOne: async (req, res) => {
        const { firstName, lastName, email, password, passwordConfirmation } = req.body;

        try {
            const user = new User({
                firstName,
                lastName,
                email,
                password
            });

            // virtual
            user.passwordConfirmation = passwordConfirmation;

            const newUser = await user.save();

            const saveToken = {
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                id: newUser._id
            };

            jwt.sign(saveToken, SECRET, { expiresIn: "10m" }, (err, token) => {
                return res.status(201).json({ token });
            });

        } catch (e) {
            console.error("ERROR REAL 👉", e);

            const messages = {};

            if (e.name === "ValidationError") {
                Object.keys(e.errors).forEach(key => {
                    messages[key] = e.errors[key].message;
                });
                return res.status(400).json({ errors: messages });
            }

            if (e.code === 11000) {
                return res.status(400).json({
                    errors: { email: "Email already exists" }
                });
            }

            return res.status(500).json({
                error: "Internal server error",
                message: e.message
            });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;

        const currentUser = await User.findOne({ email });
        if (!currentUser) {
            return res.status(404).json({
                errors: { email: "The email does not exist" }
            });
        }

        const bcryptResponse = await bcrypt.compare(password, currentUser.password);
        if (!bcryptResponse) {
            return res.status(401).json({
                errors: { password: "The credentials do not match" }
            });
        }

        const saveToken = {
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            email: currentUser.email,
            id: currentUser._id
        };

        jwt.sign(saveToken, SECRET, { expiresIn: "1m" }, (err, token) => {
            return res.status(200).json({ token });
        });
    }
};

export default userController;
