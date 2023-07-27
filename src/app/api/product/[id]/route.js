import Product from "@/app/models/product";
import { NextResponse } from "next/server";

// get product by id
export async function GET(_, { params }) {
    const { id } = params;
    try {
        const products = await Product.findById(id);
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

// delete product
export async function DELETE(req, { params }) {

    const { id } = params;

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return NextResponse.json(deletedProduct, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

