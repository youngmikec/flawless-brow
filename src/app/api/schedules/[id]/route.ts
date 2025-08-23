// app/api/auth/route.ts
import dbConnect from '../../../../lib/mongodb';
import Schedule, { ValidateUpdateSchedule } from '../model';
import { FailureResponse, SuccessResponse } from '../../../../utils/api-response';
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
    const error = ValidateUpdateSchedule.validate(body);

    if(error.error) {
        return FailureResponse(400, error.error.details[0].message);
    }

    body.updatedBy = data.id; // Set the updatedBy field to the admin's ID;
    body.updatedAt = new Date(); // Set the updatedAt field to the current date

    const result = await Schedule.findOneAndUpdate({ _id: params.id }, {...body}, { new: true });

    if (!result) {
        return FailureResponse(500, 'Failed to update schedule');
    }

    return SuccessResponse(result, 'Schedule updated successfully');
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

    const result = await Schedule.deleteOne({ _id: id });

    if (!result) {
        return FailureResponse(500, 'Failed to delete schedule');
    }
    return SuccessResponse(result, 'Schedule deleted successfully');    
  } catch (error: any) {
    return FailureResponse(500, 'Internal Server Error: ' + error.message);
  }
}
