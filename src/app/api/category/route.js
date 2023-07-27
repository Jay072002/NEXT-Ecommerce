import Category from "@/app/models/category";
import { NextResponse } from "next/server";

// get all Categories
export async function GET(req) {
    try {
        const Categories = await Category.find();
        return NextResponse.json(Categories);
    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

// create category
export async function POST(req) {
    try {
        const requestBody = await req.json();
        const category = new Category(requestBody);
        const savedCategory = await category.save();
        return NextResponse.json(savedCategory, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });

    }
}

// update category
export async function PUT(req, { params }) {
    const requestBody = await req.json();
    const { id } = params;
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            requestBody,
            { new: true }
        );
        if (!updatedCategory) {
            return NextResponse.json({ message: 'Category not found' }, { status: 400 });
        }
        return NextResponse.json(updatedCategory, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

// delete category
export async function DELETE(req, { params }) {

    try {
        const deletedCategory = await Category.findByIdAndDelete(params.id);
        if (!deletedCategory) {
            return NextResponse.json({ message: 'Category not found' }, { status: 400 });
        }
        return NextResponse.json(deletedCategory, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}


