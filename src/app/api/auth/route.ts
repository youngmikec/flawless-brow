// app/api/auth/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '../users/model';

export async function GET() {
  return NextResponse.json({ message: 'Auth GET route' });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Auth POST body:', body);
    await dbConnect(); // Connect to MongoDB

    const admin = await User.findOne({ email: body.email, role: 'admin' });

    if (!admin || admin.password !== body.password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Auth POST error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
