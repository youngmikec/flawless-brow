"use client"
import { useRef, useState, FC, useEffect } from "react";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";
import { UploadImageToServer } from "../../../providers";

type Props = {
  onUploading?: (isUploading: boolean) => void,
  onImageUploadComplete: (imageUrl: string) => void,
  imgUrl?: string; 
}

const ImageUploadComp: FC<Props> = ({ 
  onImageUploadComplete, 
  imgUrl = '',
  onUploading
}) => {
  const fileUploadRef = useRef<HTMLInputElement | null>(null);
  const [imageString, setImageString] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const handleFileRead = async (event: any) => {
    setIsUploading(true);
    onUploading && onUploading(true);
    setUploadProgress(0);
    try {
      const file = event.target.files[0];
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const base64: any = await convertBase64(file);
      const result = await UploadImageToServer({ imageSrc: base64 });
      const { data: { imageUrl } } = result.data;
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      setImageString(imageUrl);
      onImageUploadComplete && onImageUploadComplete(imageUrl);
      setIsUploading(false);
      onUploading && onUploading(false);

    } catch (error: any) {
      setIsUploading(false);
      onUploading && onUploading(false);
      setUploadProgress(0);
    }
  }

  const convertBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }

  const openFileDock = () => {
    if (fileUploadRef) {
      fileUploadRef.current?.click();
    }
  }

  useEffect(() => {
    setImageString(imgUrl);
  }, [imgUrl])

  return (
    <div className="w-full flex flex-col items-center justify-center p-4 min-h-[200px] bg-white rounded-md border-dashed border-[1px] border-[#384EB74D]">
      {imageString ? (
        <div className="relative w-full h-[200px]">
          <Image
            src={imageString}
            alt="uploaded image"
            fill
            className="object-cover rounded-md"
          />
          <button
            onClick={() => setImageString('')}
            className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
          >
            <FaTimes size={20} className="text-[#1D1C1DB2]" />
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex justify-center">
            <Image
              src="/images/upload-img.png"
              alt="upload image"
              width={100}
              height={100}
            />
          </div>
          <div>
            <p className="text-lg font-bold font-mullish text-center">
              Drag & drop files or
              <span
                onClick={openFileDock}
                className="text-[#C5A46D] cursor-pointer underline"
              > Browse</span>
            </p>
            <p className="text-sm font-normal font-mullish text-center text-gray-500">Supported formates: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT</p>
          </div>
        </div>
      )}
      {isUploading && (
        <div className="w-full mt-4 px-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-[#C5A46D] h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-center mt-2 text-gray-600">{uploadProgress}% uploaded</p>
        </div>
      )}
      <input
        className="hidden"
        ref={fileUploadRef}
        type="file"
        accept="image/*"
        onChange={handleFileRead}
      />
    </div>
  )
}

export default ImageUploadComp;

