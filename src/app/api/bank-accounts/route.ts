// app/api/auth/route.ts
import dbConnect from '@/lib/mongodb';
import BankAccount from './model';
import { ValidateCreateBankAccount } from './model';
import { FailureResponse, response } from '@/utils/api-response';
import { IsValidAdmin } from '@/utils';

export async function GET(req: Request) {
  try {
    await dbConnect(); // Connect to MongoDB

    const isAuthenticated = IsValidAdmin(req);
    if (!isAuthenticated) {
      return FailureResponse(403, 'Unauthorized');
    }

    const bankAccounts = await BankAccount.find()
                                // .populate('user', 'createdBy')
                                .exec(); // Populate user field with email
    return response(200, 'Bank accounts retrieved successfully', bankAccounts);
  } catch (error: any) {
    return FailureResponse(500, 'Internal Server Error: ' + error.message);
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect(); // Connect to MongoDB

    const { isAuthenticated, data } = IsValidAdmin(req);
    if (!isAuthenticated) {
      return FailureResponse(401, 'Unauthorized');
    }

    const body = await req.json();
    console.log('body', body);
    const error = ValidateCreateBankAccount.validate(body);

    if(error.error) {
        return FailureResponse(400, error.error.details[0].message);
    }

    body.createdBy = data.id; // Set the createdBy field to the admin's ID;
    const newBankAccount = new BankAccount(body);
    const result = await newBankAccount.save();

    if (!result) {
        return FailureResponse(500, 'Failed to create bank account');
    }

    return response(201, 'Bank account created successfully', result);
  } catch (error: any) {
    return FailureResponse(500, 'Internal Server Error: ' + error.message);
  }
}
