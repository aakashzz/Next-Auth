import { connect } from "@/db/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest){
    try {
       const response = NextResponse.json({
            message:"Logout SuccessFully",
            success:true,
        })
        //self modification cookies.set > cookies.delete
        response.cookies.delete("token")

        return response;

    } catch(error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}