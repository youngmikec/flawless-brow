// app/api/auth/route.ts
import dbConnect from '../../../lib/mongodb';
import Appointments from '../appointment/model';
import { FailureResponse, SuccessResponse } from '../../../utils/api-response';
import { getSearchParams, IsValidAdmin } from '../../../utils';
import User from '../users/model';

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
    totalAmount = response.reduce((a: any, b: any) => a.amountPaid + b.amountPaid);
    

    return SuccessResponse({
      totalAmount,
      numOfAppointments: appointmentCount,
      numOfClients: usersCount
    }, 'Report Statistics retrieved successfully');

  } catch (error: any) {
    return FailureResponse(500, 'Internal Server Error: ' + error.message);
  }
}