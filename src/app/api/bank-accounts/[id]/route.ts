// app/api/auth/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import BankAccount, { ValidateUpdateBankAccount } from '../model';
import { ValidateCreateBankAccount } from '../model';
import { FailureResponse, response } from '@/utils/api-response';
import { IsAuthenticated } from '@/utils';
import { VALID_LOADERS } from 'next/dist/shared/lib/image-config';


export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
  try {
    await dbConnect(); // Connect to MongoDB

    const isAuthenticated = IsAuthenticated(req);
    if (!isAuthenticated) {
      return FailureResponse(401, 'Unauthorized');
    }

    const body = await req.json();
    const error = ValidateUpdateBankAccount.validate(body);

    if(error.error) {
        return FailureResponse(400, error.error.details[0].message);
    }

    const result = await BankAccount.findByIdAndUpdate(params.id, {...body}, { new: true }).exec();

    if (!result) {
        return FailureResponse(500, 'Failed to create bank account');
    }

    return response(201, 'Bank account updated successfully', result);
  } catch (error: any) {
    return FailureResponse(500, 'Internal Server Error: ' + error.message);
  }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
  try {
    await dbConnect(); // Connect to MongoDB

    const isAuthenticated = IsAuthenticated(req);
    if (!isAuthenticated) {
      return FailureResponse(401, 'Unauthorized');
    }

    const { id } = params;

    const result = await BankAccount.deleteOne({ id }).exec();

    if (!result) {
        return FailureResponse(500, 'Failed to create bank account');
    }
    return response(201, 'Bank account created successfully', result);
  } catch (error: any) {
    return FailureResponse(500, 'Internal Server Error: ' + error.message);
  }
}
