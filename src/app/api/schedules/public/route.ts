// app/api/auth/route.ts
import dbConnect from '../../../../lib/mongodb';
import Schedule from '../model';
import { FailureResponse, SuccessResponse } from '../../../../utils/api-response';
import { getSearchParams } from '../../../../utils';

export async function GET(req: Request) {
  try {
    await dbConnect(); // Connect to MongoDB

    const paramsObject = getSearchParams(req);
    const services = await Schedule.find({ ...paramsObject })
                                // .populate('createdBy');
                                ; // Populate user field with email
    return SuccessResponse(services, 'Schedules retrieved successfully');
  } catch (error: any) {
    return FailureResponse(500, 'Internal Server Error: ' + error.message);
  }
}