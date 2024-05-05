import extractTokenData  from "@/utils/extractTokenData";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/user.model";
import { dbConnection } from "@/db/index";

dbConnection();

export async function GET(request: NextRequest) {
  try {
    const userId = await extractTokenData(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json({
      mesaaage: "User found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
