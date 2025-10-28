// app/api/auth/route.tsimport aqp from "api-query-params";
import aqp from "api-query-params";

import dbConnect from '../../../lib/mongodb';
import ProductService from '../product-services/model';
import User from '../users/model';
import { IsValidAdmin, getSearchParams, setLimit } from '../../../utils';
import Appointment, { AppointStatusEnum, ValidateCreateAppointment } from './model';
import { FailureResponse, response, SuccessResponse } from '../../../utils/api-response';
import { sendEmail } from "../email-service";
import { Recipient } from "mailersend";
import { appointmentEmailTemplate } from "@/constant/email-template";
import { EMAIL_DETAILS } from "@/constant";


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
    
    const { filter, projection, population, skip, sort } = aqp(req.url);
    let { limit } = aqp(req.url);
    limit = setLimit(limit);
    const searchQuery = filter.q ? filter.q : false;
    if (searchQuery) {
      const escaped = searchQuery.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
      filter.$or = [
        { name: { $regex: new RegExp(searchQuery, "i") } },
        { shortName: { $regex: new RegExp(searchQuery, "i") } },
        { $text: { $search: escaped, $caseSensitive: false } },
      ];
      delete filter.q;
    }

    if (!filter.deleted) filter.deleted = 0;

    const paramsObject = getSearchParams(req);
    const filters = paramsObject.filter ? JSON.parse(paramsObject.filter) : {};


    const services = await Appointment.find({ ...filters })
      .populate(paramsObject.populate.split(','))
      .sort(paramsObject.sort)
      .limit(setLimit(paramsObject.limit))
      .skip(skip)
      .select(projection)
      .exec();
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

    const { productService, amountPaid, customer } = body;

    const customerRes = await User.findOne({ _id: customer });

    if(!customerRes) {
      return FailureResponse(400, "Customer not found!");
    }

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


    const userAppointmentEmailResponse = sendEmail({
      recipients: [new Recipient('michaelozor15@gmail.com', `${customerRes.firstName} ${customerRes.lastName}`)],
      subject: 'Appointment Confirmation',
      html: appointmentEmailTemplate(result, customer, false),
      text: ``,
    })
    
    if(!userAppointmentEmailResponse){
      return FailureResponse(400, 'Email not sent');
    }

    // const adminAppointmentEmailResponse = sendEmail({
    //   recipients: [new Recipient(EMAIL_DETAILS?.senderEmail, EMAIL_DETAILS?.senderName)],
    //   subject: 'Appointment Confirmation',
    //   html: appointmentEmailTemplate(result, customer, true),
    //   text: ``,
    // })
    
    // if(!adminAppointmentEmailResponse){
    //   return FailureResponse(400, 'Email not sent');
    // }

    return response(201, 'Appointment created successfully', result);
  } catch (error: any) {
    return FailureResponse(500, 'Internal Server Error: ' + error.message);
  }
}
