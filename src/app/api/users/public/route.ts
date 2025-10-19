import { FailureResponse, IsAuthenticated, SuccessResponse } from "../../../../utils";
import dbConnect from '../../../../lib/mongodb';
import { getSearchParams } from '../../../../utils/helpers';
import User from "../model";

export const GET = async (req: Request) => {
    try {
        await dbConnect(); // Connect to MongoDB

        // const { isAuthenticated } = IsAuthenticated(req);
        // if (!isAuthenticated) {
        //   return FailureResponse(403, 'Unauthorized');
        // }

        const paramsObject = getSearchParams(req);

        const result = await User.find({ ...paramsObject }); // Populate user field with email
        return SuccessResponse(result, 'Users retrieved successfully');

    } catch (error: any) {
        return FailureResponse(500, 'Internal Server Error: ' + error.message);
    }
}