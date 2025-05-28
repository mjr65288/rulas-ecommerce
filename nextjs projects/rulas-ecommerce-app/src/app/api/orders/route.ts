import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const { name, email, address, cart, total } = await req.json();

    if (!name || !email || !address || !Array.isArray(cart) || cart.length === 0) {
        return NextResponse.json({ error: 'Invalid order data' }, { status: 400 });
    }

    const order = await prisma.order.create({
        data: {
            name,
            email,
            address,
            total,
            items: {
                create: cart.map(item => ({
                    title: item.title,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image,
                })),
            },
        },
    });

    return NextResponse.json({ message: 'Order created', orderId: order.id });
}
