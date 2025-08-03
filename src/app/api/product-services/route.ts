// app/api/auth/route.ts
import dbConnect from '@/lib/mongodb';
import ProductService, { ValidateCreateProductService } from './model';
import { FailureResponse, response, SuccessResponse } from '@/utils/api-response';
import { IsValidAdmin } from '@/utils';
import { UploadImageService } from '@/services';

export async function GET(req: Request) {
  try {
    await dbConnect(); // Connect to MongoDB

    const { isAuthenticated } = IsValidAdmin(req);
    if (!isAuthenticated) {
      return FailureResponse(403, 'Unauthorized');
    }

    const services = await ProductService.find()
                                // .populate('user', 'createdBy')
                                .exec(); // Populate user field with email
    return SuccessResponse(services, 'Services retrieved successfully');
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
    const error = ValidateCreateProductService.validate(body);

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
    const newRecord = new ProductService(body);
    const result = await newRecord.save();

    if (!result) {
        return FailureResponse(500, 'Failed to create bank account');
    }

    return response(201, 'Bank account created successfully', result);
  } catch (error: any) {
    return FailureResponse(500, 'Internal Server Error: ' + error.message);
  }
}
