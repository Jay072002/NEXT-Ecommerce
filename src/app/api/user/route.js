import User from "@/app/models/user";
import { NextResponse } from "next/server";


// login user
export async function GET(req) {
    const userData = await User.find({})
    return NextResponse.json({ message: "Hello world" })
}
