import { FailureResponse, IsValidAdmin, SuccessResponse } from "../../../../utils";
import dbConnect from '../../../../lib/mongodb';
import { hash, getSearchParams } from '../../../../utils/helpers';
import User, { ValidateCreateAdminProfile } from "../model";

export const GET = async (req: Request) => {
    try {
        await dbConnect(); // Connect to MongoDB

        const { isAuthenticated } = IsValidAdmin(req);
        if (!isAuthenticated) {
            return FailureResponse(403, 'Unauthorized');
        }

        const paramsObject = getSearchParams(req);

        const result = await User.find({ role: 'admin', ...paramsObject  }); // Populate user field with email
        return SuccessResponse(result, 'Admins retrieved successfully');

    } catch (error: any) {
        return FailureResponse(500, 'Internal Server Error: ' + error.message);
    }
}


export async function POST(req: Request) {
  try {
    await dbConnect(); // Connect to MongoDB

    const { isAuthenticated, data } = IsValidAdmin(req);
    if (!isAuthenticated) {
      return FailureResponse(403, 'Unauthorized');
    }

    const body = await req.json();
    const error = ValidateCreateAdminProfile.validate(body);

    if(error.error) {
        return FailureResponse(400, error.error.details[0].message);
    }

    //Check for duplicate user email
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
        return FailureResponse(400, 'User with this email already exists');
    }

    if (body.password) {
      body.password = hash(body.password);
    }

    body.createdBy = data.id; // Set the createdBy field to the admin's ID;
    const newRecord = new User(body);
    const result = await newRecord.save();

    if (!result) {
        return FailureResponse(500, 'Failed to create Admin profile');
    }

    return SuccessResponse(result, 'Profile created successfully');
  } catch (error: any) {
    return FailureResponse(500, 'Internal Server Error: ' + error.message);
  }
}