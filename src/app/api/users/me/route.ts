import { connect } from "@/db/dbConfig";
import { User } from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function GET(request:NextRequest){
    const userId = await getDataFromToken(request);
    const user = await User.findById(userId).select("-password");
    return NextResponse.json({message:"User founded", data: user});
}