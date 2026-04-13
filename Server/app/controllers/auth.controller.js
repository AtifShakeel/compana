import User from "../models/User.js";

import {
    hashPassword,
    comparePassword,
    hashToken,
    compareToken,
} from "../../utils/bcrypt.js";

import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
} from "../../utils/jwt.js";

/* =========================
   REGISTER
========================= */

const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }

        const exists = await User.findOne({ email });

        if (exists) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const hashed = await hashPassword(password);

        await User.create({
            email,
            password: hashed,
        });

        return res.status(201).json({
            message: "User registered successfully",
        });

    } catch (error) {
        return res.status(500).json({ message: "Register error" });
    }
};

/* =========================
   LOGIN
========================= */

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const payload = {
            id: user._id,
            email: user.email,
        };

        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        // hash refresh token before saving
        const hashedRefreshToken = await hashToken(refreshToken);

        user.refreshToken = hashedRefreshToken;
        await user.save();

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false, // true in production (HTTPS)
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            accessToken,
            user: payload,
        });

    } catch (error) {
        return res.status(500).json({ message: "Login error" });
    }
};

/* =========================
   REFRESH TOKEN
========================= */

const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;

        if (!token) {
            return res.status(401).json({ message: "No refresh token" });
        }

        const decoded = verifyRefreshToken(token);

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        const isValid = await compareToken(token, user.refreshToken);

        if (!isValid) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        const payload = {
            id: user._id,
            email: user.email,
        };

        const newAccessToken = generateAccessToken(payload);
        const newRefreshToken = generateRefreshToken(payload);

        // rotate refresh token (HASHED)
        const hashedNewRefreshToken = await hashToken(newRefreshToken);

        user.refreshToken = hashedNewRefreshToken;
        await user.save();

        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            accessToken: newAccessToken,
        });

    } catch (error) {
        return res.status(500).json({ message: "Refresh error" });
    }
};

/* =========================
   LOGOUT
========================= */

const logout = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;

        if (token) {
            const decoded = verifyRefreshToken(token);

            const user = await User.findById(decoded.id);

            if (user) {
                user.refreshToken = null;
                await user.save();
            }
        }

        res.clearCookie("refreshToken");

        return res.status(200).json({
            message: "Logged out successfully",
        });

    } catch (error) {
        return res.status(500).json({ message: "Logout error" });
    }
};

export {
    register,
    login,
    refreshToken,
    logout,
};