import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, password } = reqBody;
    console.log("reqBody : ", reqBody);

    //check if user already exists
    const user = await User.findOne({ username });
    if (!user) {
      console.log("User is Null ");
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }
    console.log("User Exists : ", user);

    //check if the password is correct
    const validPasswaord = await bcryptjs.compare(password, user.password);
    if (!validPasswaord) {
      return NextResponse.json({ error: "Wrong Password" }, { status: 400 });
    }
    //create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    //create token
    const token = await jwt.sign(tokenData, process.env.SECRET_TOKEN!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login Successful",
      success: true,
    });

    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
