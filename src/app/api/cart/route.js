import Cart from "@/app/models/cart";
import { NextResponse } from "next/server";

// get all carts
export async function GET() {
    try {
        const carts = await Cart.find();
        return NextResponse.json(carts);
    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

// create cart
export async function POST(req) {
    try {
        const requestBody = await req.json();
        const cart = new Cart(requestBody);
        const savedCart = await category.save();
        return NextResponse.json(savedCart, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });

    }
}

// update cart
export async function PUT(req, { params }) {
    const requestBody = await req.json();
    const { id } = params;
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            id,
            requestBody,
            { new: true }
        );
        if (!updatedCart) {
            return NextResponse.json({ message: 'Cart not found' }, { status: 400 });
        }
        return NextResponse.json(updatedCart, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
