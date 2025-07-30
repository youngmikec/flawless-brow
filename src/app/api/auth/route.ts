// app/api/auth/route.ts
import { NextResponse } from 'next/server';
import jwt from "jsonwebtoken";
import bycriptjs from "bcryptjs";
import dbConnect from '@/lib/mongodb';
import User from '../users/model';
import { FailureResponse, SuccessResponse } from '@/utils';
import { JWT, USER_TYPE } from '@/constant';

export async function GET(req: Request) {
  return NextResponse.json({ message: 'Auth GET route' });
}

export async function POST(req: Request) {
  try {
    const dbconnected = await dbConnect(); // Connect to MongoDB
    const body = await req.json();
    const { password } = body;

    const email = body.email.trim().toLowerCase();
    const admin = await User.findOne({ email }).exec();

    //Logic to check for when the user is an admin.
    if(!admin) {
      return FailureResponse(401, 'User not found');
    }

    if (admin.password !== password) {
      return FailureResponse(401, 'Invalid credentials');
    }

    // if(bycriptjs.compareSync(password, admin.password) !== true) {
    //   return FailureResponse(401, 'Invalid credentials');
    // }

    // check if the last login ip address is the same as the current login ip address
    // if the same then login or refresh token
    //send mail to user upon successful login with new login ip address

    const jwtData = {
      id: admin._id,
      email: admin.email,
      role: admin.role,
      frontendAuth: JWT.frontendAuth,
    }

    const token = jwt.sign(
      jwtData,
      JWT.jwtSecret,
      {
        expiresIn: admin.role === USER_TYPE.ADMIN
          ? JWT.adminTokenExpirationTime
          : JWT.tokenExpireTime,
      }
    );


    const result = {
      token,
      user: {
        id: admin._id,
        email: admin.email,
        role: admin.role,
        firstName: admin.firstName,
        lastName: admin.lastName,
        profileImage: admin.profileImage,
        phone: admin.phone,
      }
    }

    return SuccessResponse({ ...result }, 'Login successful');
  } catch (error: any) {
    return FailureResponse(500, 'Internal Server Error: ' + error.message);
  }
}
