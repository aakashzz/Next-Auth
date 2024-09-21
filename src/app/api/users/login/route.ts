import { connect } from "@/db/dbConfig";
import { User } from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

connect();

export async function POST(request: NextRequest) {
   try {
      const reqBody = await request.json();
      const { email, password } = reqBody;
      console.log(reqBody);

      const existedUser = await User.findOne({ email });
      if (!existedUser) {
         return NextResponse.json(
            { error: "User has not exist please signup" },
            { status: 400 }
         );
      }

      console.log(existedUser);

      const validPassword = await bcryptjs.compare(
         password,
         existedUser.password
      );
      if (!validPassword) {
         return NextResponse.json(
            { error: "Check your credentials" },
            { status: 400 }
         );
      }

      const tokenData = {
        id: existedUser._id,
        username: existedUser.username,
        email: existedUser.email
      }
      
      const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!, {expiresIn: "1d"});
      const response = NextResponse.json({message:"Logged In success",success:true})
      response.cookies.set("token",token,{httpOnly:true,secure:true});

      return response
   } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
   }
}
