import Product from "@/app/models/product";
import { NextResponse } from "next/server";

// get all products
export async function GET(req) {
    try {
        const res = new NextResponse(req)
        res.cookies.set('name', 'sgsg')
        console.log(res.cookies.get('name'));
        const products = await Product.find();
        return NextResponse.json(products);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

// create product
export async function POST(req) {
    try {
        const requestBody = await req.json();
        console.log(requestBody);
        const product = new Product(requestBody);
        const savedProduct = await product.save();
        return NextResponse.json(savedProduct, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });

    }
}

// update product
export async function PUT(req, { params }) {
    const requestBody = await req.json();
    const { id } = params;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            requestBody,
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return NextResponse.json(updatedProduct, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}


