// app/api/auth/route.ts
import dbConnect from '../../../lib/mongodb';
import Schedule, { ValidateCreateSchedule } from './model';
import { FailureResponse, response, SuccessResponse } from '../../../utils/api-response';
import { getSearchParams, IsValidAdmin } from '../../../utils';
import { UploadImageService } from '../../../services';

export async function GET(req: Request) {
  try {
    await dbConnect(); // Connect to MongoDB

    const { isAuthenticated } = IsValidAdmin(req);
    if (!isAuthenticated) {
      return FailureResponse(403, 'Unauthorized');
    }

     const paramsObject = getSearchParams(req);
    const schedules = await Schedule.find({ ...paramsObject })
                                .populate('createdBy');
                                ; // Populate user field with email
    return SuccessResponse(schedules, 'Schedules retrieved successfully');
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
    const error = ValidateCreateSchedule.validate(body);

    if(error.error) {
        return FailureResponse(400, error.error.details[0].message);
    }

    if(body.serviceImage && typeof body.serviceImage === 'string') {
      const { secure_url } = await UploadImageService(body.serviceImage);
      if (!secure_url) {
        return FailureResponse(400, 'Image upload failed');
      }
      body.serviceImage = secure_url;
    }

    

    body.createdBy = data.id; // Set the createdBy field to the admin's ID;
    const newRecord = new Schedule(body);
    const result = await newRecord.save();

    if (!result) {
        return FailureResponse(500, 'Failed to create schedule');
    }

    return response(201, 'Schedule created successfully', result);
  } catch (error: any) {
    return FailureResponse(500, 'Internal Server Error: ' + error.message);
  }
}
