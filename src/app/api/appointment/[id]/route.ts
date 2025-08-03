// app/api/auth/route.ts
import dbConnect from '../../../../lib/mongodb';
import Appointment, { ValidateUpdateAppointment } from '../model';
import { FailureResponse, SuccessResponse } from '../../../../utils/api-response';
import { IsAuthenticated, IsValidAdmin } from '../../../../utils';
import { UploadImageService } from '../../../../services';


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
    const error = ValidateUpdateAppointment.validate(body);

    if(error.error) {
        return FailureResponse(400, error.error.details[0].message);
    }

    if(body.serviceImage && typeof body.serviceImage === 'string') {
        body.serviceImage = await UploadImageService(body.serviceImage);
    }

    body.updatedBy = data.id; // Set the updatedBy field to the admin's ID;
    body.updatedAt = new Date(); // Set the updatedAt field to the current date

    const result = await Appointment.findByIdAndUpdate(params.id, {...body}, { new: true }).exec();

    if (!result) {
        return FailureResponse(500, 'Failed to update service');
    }

    return SuccessResponse(result, 'Service updated successfully');
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

    const result = await Appointment.deleteOne({ id }).exec();

    if (!result) {
        return FailureResponse(500, 'Failed to delete service');
    }
    return SuccessResponse(result, 'Service deleted successfully');
  } catch (error: any) {
    return FailureResponse(500, 'Internal Server Error: ' + error.message);
  }
}
