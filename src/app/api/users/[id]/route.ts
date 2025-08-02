import dbConnect from '@/lib/mongodb';
import { FailureResponse, response, IsValidAdmin, SuccessResponse } from "@/utils";
import User, { ValidateUpdateUserProfile } from "../model";
import { hash } from '@/utils/helpers';

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
    const error = ValidateUpdateUserProfile.validate(body);

    if(error.error) {
        return FailureResponse(400, error.error.details[0].message);
    }

    console.log('body =>', body.password);

    if (body.password) body.password = hash(body.password);

    body.updatedBy = data.id; // Set the updatedBy field to the admin's ID;
    body.updatedAt = new Date(); // Set the updatedAt field to the current date

    const result = await User.findByIdAndUpdate(params.id, {...body}, { new: true }).exec();

    if (!result) {
        return FailureResponse(500, 'Failed to Update bank account');
    }

    return SuccessResponse(result, 'Profile updated successfully');
  } catch (error: any) {
    return FailureResponse(500, 'Internal Server Error: ' + error.message);
  }
}