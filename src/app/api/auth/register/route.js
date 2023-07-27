import generateToken from "@/app/helper/JWT";
import { comparePassword, hashPassword } from "@/app/helper/bcrypt";
import { errorLog, infoLog, successLog } from "@/app/helper/logHelper";
import User from "@/app/models/user";
import { NextResponse } from "next/server";

export const registerUser = async (req) => {
    infoLog("registerUser entry");
    try {
        const { name, shipping_address, phone_number, isAdmin, username, email, password, confirmpassword } = await req.json();

        if (!username || !email || !password || !confirmpassword || !name || !shipping_address || !phone_number || !isAdmin) {
            errorLog("Invalid Details");
            return NextResponse.json({ isRegister: false }, { status: 400 });
        }

        if (password !== confirmpassword) {
            errorLog("Password Not Matched");
            return NextResponse.json({ isRegister: false }, { status: 400 });
        }

        // check for the existance if already exist then dont allow to regsister

        const isRegistered = await User.findOne({
            $or: [{ email }, { username }],
        });

        if (isRegistered) {
            errorLog("User Already Exist!");
            return NextResponse.json({ isRegister: false }, { status: 400 });
        }

        const hashPass = await hashPassword(password);

        const newUser = new User({
            name,
            email,
            username,
            email,
            password: hashPass,
            shipping_address,
            phone_number,
            isAdmin
        });

        await newUser.save();

        successLog("Successfully Registered!");
        infoLog("registerUser exit");
        return NextResponse.json({ isRegister: true }, { status: 201 });
    } catch (error) {
        infoLog("registerUser exit");
        errorLog("Error While Registration!");
        return NextResponse.json({ isRegister: false }, { status: 500 });
    }
};

export const loginUser = async (req) => {
    infoLog("loginUser entry");

    const { username, password } = await req.json();

    if (!username || !password) {
        infoLog("loginUser exit");
        errorLog("Invalid Details");
        return NextResponse.json({ isLogin: false }, { status: 400 });
    }

    try {
        // check if the user logged in or not

        const isRegistered = await User.findOne({ username });

        if (!isRegistered) {
            infoLog("loginUser exit");
            errorLog("Unauthorized User Trying To Login");
            return NextResponse.json({ isLogin: false }, { status: 401 });
        }

        // if found then compare the password

        const isMatch = await comparePassword(password, isRegistered?.password);

        if (!isMatch) {
            infoLog("loginUser exit");
            errorLog("Authentication Failed");
            return NextResponse.json({ isLogin: false }, { status: 401 });
        }

        const token = generateToken({
            id: isRegistered._id,
            username: isRegistered.username,
            isAdmin: isRegistered.isAdmin,
        });

        // cookies.set(name, value, options);
        res.cookie("token", token, { maxAge: 9000000, httpOnly: true });

        successLog("Successfully LoggedIn!");
        infoLog("loginUser exit");
        return NextResponse.json({ isLogin: true }, { status: 200 });
    } catch (error) {
        infoLog("loginUser exit");
        errorLog("error while login the user");
        return NextResponse.json({ isLogin: false }, { status: 500 });
    }
};