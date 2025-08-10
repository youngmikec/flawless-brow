// app/api/auth/route.ts
import dbConnect from '../../../lib/mongodb';
import Appointment, { AppointStatusEnum, ValidateCreateAppointment } from './model';
import { FailureResponse, response, SuccessResponse } from '../../../utils/api-response';
import { IsValidAdmin, getSearchParams } from '../../../utils';
import { UploadImageService } from '../../../services';
import ProductService from '../product-services/model';


const getAppointmentStatusDescription = (value: AppointStatusEnum): string => {
    let status: string = 'Pending';
    switch (value) {
        case (AppointStatusEnum.COMPLETED):
            status = 'Completed';
            break;
        case (AppointStatusEnum.PENDING):
            status = 'Pending';
            break;
        case (AppointStatusEnum.PARTLY_PAID):
            status = 'Partly Paid';
            break;
        case (AppointStatusEnum.PAID):
            status = 'Paid';
            break;
        default: 
            status = 'Pending';
            break;
    }
    return status;
}

export async function GET(req: Request) {
  try {
    await dbConnect(); // Connect to MongoDB

    const { isAuthenticated } = IsValidAdmin(req);
    if (!isAuthenticated) {
      return FailureResponse(403, 'Unauthorized');
    }

     const paramsObject = getSearchParams(req);
    
    const services = await Appointment.find({ ...paramsObject })
                                // .populate('user', 'createdBy')
                                ; // Populate user field with email
    return SuccessResponse(services, 'Services retrieved successfully');
  } catch (error: any) {
    return FailureResponse(500, 'Internal Server Error: ' + error.message);
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect(); // Connect to MongoDB

    // const { isAuthenticated, data } = IsValidAdmin(req);
    // if (!isAuthenticated) {
    //   return FailureResponse(401, 'Unauthorized');
    // }

    const body = await req.json();
    const error = ValidateCreateAppointment.validate(body);

    if(error.error) {
        return FailureResponse(400, error.error.details[0].message);
    }

    const { productService, amountPaid } = body;

    const serviceRes = await ProductService.findOne({ _id: productService });

    if(!serviceRes) {
        return FailureResponse(400, "Service not found!");
    }

    if(amountPaid === 0 && !serviceRes.isFree){
        return FailureResponse(400, "Payment Must be made to confirm your booking");
    }

    if(amountPaid === 0 && serviceRes.isFree) {
        body.status = AppointStatusEnum.PAID;
        body.statusDesc = getAppointmentStatusDescription(AppointStatusEnum.PAID);
    }

    if(amountPaid > 0 && !serviceRes.isFree && amountPaid !== parseInt(serviceRes.price)) {
      body.status = AppointStatusEnum.PARTLY_PAID;
      body.statusDesc = getAppointmentStatusDescription(AppointStatusEnum.PARTLY_PAID);
      body.balance = parseInt(serviceRes.price) - amountPaid;
    }

    if(body.addOnServices) {
      body.addOnServices = body.addOnServices.map((item: string) => {
        return {
          title: item,
          description: ''
        }
      })
    }

    // if(body.proofOfPaymentImage && typeof body.proofOfPaymentImage === 'string') {
    //   const { secure_url } = await UploadImageService(body.proofOfPaymentImage);
    //   if (!secure_url) {
    //     return FailureResponse(400, 'Proof of Payment upload failed');
    //   }
    //   body.proofOfPaymentImage = secure_url;
    // }

    

    const newRecord = new Appointment(body);
    const result = await newRecord.save();

    if (!result) {
        return FailureResponse(500, 'Failed to create appointment');
    }

    return response(201, 'Appointment created successfully', result);
  } catch (error: any) {
    return FailureResponse(500, 'Internal Server Error: ' + error.message);
  }
}
