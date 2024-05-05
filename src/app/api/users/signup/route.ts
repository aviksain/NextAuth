import { dbConnection } from "@/db/index";
import { User } from "@/models/user.model.js";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendMail } from "@/utils/mailer";

dbConnection();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    console.log(reqBody);

    if ([username, email, password].some((field) => field?.trim() === "")) {
      throw new Error("All fields are required");
    }

    const user = await User.findOne({email});

    if (user) {
      throw new Error("User with same email already exists");
    }

    console.log(user);
  
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // const savedUser = await newUser.save();
    console.log(newUser);

    //send verification email

    await sendMail({ email, emailType: "VERIFY", userId: newUser._id });

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      newUser,
    });

  } catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 500})
  }
}
