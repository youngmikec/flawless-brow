// app/api/auth/route.ts
import dbConnect from '../../../../lib/mongodb';
import BankAccount from '../model';
import { FailureResponse, response } from '../../../../utils/api-response';
import { getSearchParams } from '../../../../utils';

export async function GET(req: Request) {
  try {
    await dbConnect(); // Connect to MongoDB
    const paramsObject = getSearchParams(req);
    const bankAccounts = await BankAccount.find({ ...paramsObject })
                                // .populate('user', 'createdBy')
                                ; // Populate user field with email
    return response(200, 'Bank accounts retrieved successfully', bankAccounts);
  } catch (error: any) {
    return FailureResponse(500, 'Internal Server Error: ' + error.message);
  }
}