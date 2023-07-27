import Order from "@/app/models/order";
import { NextResponse } from "next/server";

// get product by id
export async function GET(_, { params }) {
    const { id } = params
    try {
        const Order = await Order.find(id);
        return NextResponse.json(Order, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}


