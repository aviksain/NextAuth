import { dbConnection } from "@/db/index";
import { User } from "@/models/user.model.js";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

dbConnection();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: "INvalid token" });
    }

    user.isVerfied = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json({
      message: "Email verified successfully",
      success: true
  })

  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
