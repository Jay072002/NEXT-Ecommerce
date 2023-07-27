import Category from "@/app/models/category";
import { NextResponse } from "next/server";

// get product by id
export async function GET(_, { params }) {
    const { id } = params
    try {
        const category = await Category.find(id);
        return NextResponse.json(category);
    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}



