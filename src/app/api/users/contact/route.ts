import { FailureResponse, IsValidAdmin, SuccessResponse } from "../../../../utils";
import dbConnect from '../../../../lib/mongodb';
import { hash, getSearchParams } from '../../../../utils/helpers';
import User, { ValidateCreateContact } from "../model";

export async function POST(req: Request) {
  try {
    await dbConnect(); // Connect to MongoDB

    const body = await req.json();
    const error = ValidateCreateContact.validate(body);

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
    } else {
      body.password = hash(body.phone);
    }

    if(body.fullName) {
      body.firstName = body.fullName.split(' ')[0];
      body.lastName = body.fullName.split(' ')[1];
    }

    // body.createdBy = data.id; // Set the createdBy field to the admin's ID;
    if(!body.role) {
      body.role = 'user';
    }
    const newRecord = new User(body);
    const result = await newRecord.save();

    if (!result) {
        return FailureResponse(500, 'Failed to create user profile');
    }

    return SuccessResponse(result, 'Profile created successfully');
  } catch (error: any) {
    return FailureResponse(500, 'Internal Server Error: ' + error.message);
  }
}