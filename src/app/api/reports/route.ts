// app/api/auth/route.ts
import dbConnect from '../../../lib/mongodb';
import Appointments from '../appointment/model';
import { FailureResponse, SuccessResponse } from '../../../utils/api-response';
import { getSearchParams, IsValidAdmin } from '../../../utils';
import User from '../users/model';
import { sendEmail } from '../email-service';
import { Recipient } from 'mailersend';

export async function GET(req: Request) {
  try {
    await dbConnect(); // Connect to MongoDB

    const { isAuthenticated } = IsValidAdmin(req);
    if (!isAuthenticated) {
      return FailureResponse(403, 'Unauthorized');
    }

    const usersCount = await User.countDocuments({ role: 'user' });
    
    const paramsObject = getSearchParams(req);
    const response = await Appointments.find({ ...paramsObject });
    if(!response){
      return FailureResponse(400, 'No Report statistics found');
    }

    const appointmentCount = response.length;
    let totalAmount = 0;
    response.forEach((a: any) => {
      totalAmount = a.amountPaid ? (totalAmount + parseInt(a?.amountPaid)) : (totalAmount + 0);
    });
    
    return SuccessResponse({
      totalAmount,
      numOfAppointments: appointmentCount,
      numOfClients: usersCount
    }, 'Report Statistics retrieved successfully');

  } catch (error: any) {
    return FailureResponse(500, 'Internal Server Error: ' + error.message);
  }
}