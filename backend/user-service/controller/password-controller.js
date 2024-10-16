import crypto from "crypto";
import bcrypt from "bcrypt";
import {
  findUserByEmail, findUserByResetPasswordToken, updateUserById, updatePasswordTokenById
} from "../model/repository.js";
import nodemailer from "nodemailer";

export async function requestPasswordReset(req, res) {
    try {
        const { email } = req.body;
        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(404).json({ message: "No user with that email" });
        }

        const token = crypto.randomBytes(32).toString("hex");
        const resetPasswordExpiresIn = Date.now() + 600000; // token expires in 10 minutes

        await updatePasswordTokenById(user.id, token, resetPasswordExpiresIn);

        const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;

        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          service: "Gmail",
          auth: {
            user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASSWORD,
            
          },
        });

        const mailContent = {
              to: user.email,
              from: process.env.EMAIL_USER,
              subject: "Peerprep Password Reset",
            text: `Hi ${user.username}, \n\n
                We're sending you this email because you have requested a password reset.\n\n
                Please click on the following link to reset your password:\n\n
                        ${resetPasswordUrl}\n\n
                If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };
        
        await transporter
        .sendMail(mailContent)
        .then((info) => console.log("Email sent:", info))
        .catch((err) => console.error("Error sending email:", err));


        return res.status(200).json({ message: "Password reset link sent" });

    } catch (err) {
    return res.status(500).json({ message: "Error requesting password reset", error: err.message });
    }
    
}

export async function resetPassword(req, res) {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;
        const user = await findUserByResetPasswordToken(token);
    
        if (!user) {
            return res.status(400).json({ message: "Password token is invalid"});
        } else if (user.resetPasswordExpiresIn < Date.now()) {
            return res.status(400).json({ message: "Password token has expired" });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(newPassword, salt);
        await updateUserById(user.id, user.username, user.email, hashedPassword);
        await updatePasswordTokenById(user.id, null, null);

        return res.status(200).json({ message: "Password has been reset successfully" });
    } catch (err) {
        return res.status(500).json({ message: "Error resetting password", error: err.message });
    }
}