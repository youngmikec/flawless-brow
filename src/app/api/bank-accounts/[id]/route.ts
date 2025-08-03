// app/api/auth/route.ts
import dbConnect from '../../../../lib/mongodb';
import BankAccount, { ValidateUpdateBankAccount } from '../model';
import { FailureResponse, response, SuccessResponse } from '../../../../utils/api-response';
import { IsAuthenticated, IsValidAdmin } from '../../../../utils';


export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
  try {
    await dbConnect(); // Connect to MongoDB

    const { isAuthenticated, data } = IsValidAdmin(req);
    if (!isAuthenticated) {
      return FailureResponse(403, 'Unauthorized');
    }

    const body = await req.json();
    const error = ValidateUpdateBankAccount.validate(body);

    if(error.error) {
        return FailureResponse(400, error.error.details[0].message);
    }

    body.updatedBy = data.id; // Set the updatedBy field to the admin's ID;
    body.updatedAt = new Date(); // Set the updatedAt field to the current date

    const result = await BankAccount.findOneAndUpdate({ _id: params.id }, {...body}, { new: true });

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

    const result = await BankAccount.deleteOne({ _id: id });

    if (!result) {
        return FailureResponse(500, 'Failed to delete bank account');
    }
    return SuccessResponse(result, 'Bank account deleted successfully');
  } catch (error: any) {
    return FailureResponse(500, 'Internal Server Error: ' + error.message);
  }
}
