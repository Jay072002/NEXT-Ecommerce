import Order from "@/app/models/order";
import { NextResponse } from "next/server";

// get all Orders
export async function GET(req) {
    try {
        const Orders = await Order.find();
        return NextResponse.json(Orders);
    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

// create Order
export async function POST(req) {
    try {
        const requestBody = await req.json();
        const Order = new Order(requestBody);
        const savedOrder = await Order.save();
        return NextResponse.json(savedOrder, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });

    }
}

// update order
export async function PUT(req, { params }) {
    const requestBody = await req.json();
    const { id } = params;
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            requestBody,
            { new: true }
        );
        if (!updatedOrder) {
            return NextResponse.json({ message: 'Order not found' }, { status: 400 });
        }
        return NextResponse.json(updatedOrder, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

// delete product
export async function DELETE(req, { params }) {
    const { id } = params

    try {
        const deletedOrder = await Order.findByIdAndDelete(id);
        if (!deletedOrder) {
            return NextResponse.json({ message: 'Order not found' }, { status: 400 });
        }
        return NextResponse.json(deletedOrder, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}


