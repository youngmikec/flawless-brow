import Joi from 'joi';
import { UploadImageService } from '../../../services';
import { FailureResponse, SuccessResponse } from '../../../utils/api-response';

const ValidateImageUpload = Joi.object({
  imageSrc: Joi.string().required(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { error } = ValidateImageUpload.validate(body);
    if (error) {
      return FailureResponse(400, error.details[0].message);
    }

    if(body.imageSrc && typeof body.imageSrc === 'string') {
      const { secure_url } = await UploadImageService(body.imageSrc);
      if (!secure_url) {
        return FailureResponse(400, 'Image upload failed');
      }

      return SuccessResponse({ imageUrl: secure_url }, 'Image uplaoded successfully');

    }

    
  } catch (error: any) {
    return FailureResponse(500, 'Internal Server Error: ' + error.message);
  }
}