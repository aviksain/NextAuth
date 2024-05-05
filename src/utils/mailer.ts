import nodemailer from "nodemailer";
import { User } from "@/models/user.model.js";
import bcrypt from "bcryptjs";

export const sendMail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "11ead4c9c63de8",
        pass: "28e1bdec3cb771",
      },
    });

    const response = await transport.sendMail({
      from: "anonymous122912@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `
      <p>Click 
        <a href="${
          process.env.DOMAIN
        }/verifyemail?token=${hashedToken}">here</a> 
        to ${
          emailType === "VERIFY" ? "verify your email" : "reset your password"
        }
        or copy and paste the link below in your browser. <br> 
        ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
      </p>`,
    });

    console.log(response);

    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
