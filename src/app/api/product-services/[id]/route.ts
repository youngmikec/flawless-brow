// app/api/auth/route.ts
import dbConnect from '../../../../lib/mongodb';
import ProductService, { ValidateUpdateProductService } from '../model';
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
    const error = ValidateUpdateProductService.validate(body);

    if(error.error) {
      return FailureResponse(400, error.error.details[0].message);
    }

    // if(body.serviceImage && typeof body.serviceImage === 'string') {
    //   const { secure_url } = await UploadImageService(body.serviceImage);
    //   if (!secure_url) {
    //     return FailureResponse(400, 'Image upload failed');
    //   }
    //   body.serviceImage = secure_url;
    // }

    if(body.price) {
      body.isFree = body.price === '0' ? true : false;
    }

    body.updatedBy = data.id; // Set the updatedBy field to the admin's ID;
    body.updatedAt = new Date(); // Set the updatedAt field to the current date

    const result = await ProductService.findOneAndUpdate({ _id: params.id }, {...body}, { new: true });

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

    const result = await ProductService.deleteOne({ _id: id });

    if (!result) {
        return FailureResponse(500, 'Failed to delete service');
    }
    return SuccessResponse(result, 'Service deleted successfully');
  } catch (error: any) {
    return FailureResponse(500, 'Internal Server Error: ' + error.message);
  }
}
