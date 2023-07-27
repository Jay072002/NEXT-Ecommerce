import Cart from "@/app/models/cart";
import { NextResponse } from "next/server";

// get product by id
export async function GET(_, { params }) {
    const { id } = params
    try {
        const cart = await Cart.find(id);
        return NextResponse.json(cart);
    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}


// delete cart
export async function DELETE(_, { params }) {

    const { id } = params
    try {
        const deletedCart = await Cart.findByIdAndDelete(id);
        if (!deletedCart) {
            return NextResponse.json({ message: 'Cart not found' }, { status: 400 });
        }
        return NextResponse.json(deletedCart, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
