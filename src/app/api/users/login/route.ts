import { dbConnection } from "@/db/index";
import { User } from "@/models/user.model.js";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendMail } from "@/utils/mailer";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

dbConnection();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    if ([email, password].some((field) => field?.trim() === "")) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email: email });

    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    const token = await jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: email,
        password: password,
      },
      process.env.SECRET_KEY!,
      {
        expiresIn: "7d",
      }
    );

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    // cookies().set("token",token,{
    //   httpOnly: true,
      
    // })
    
    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.massage });
  }
}
