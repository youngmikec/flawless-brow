"use client"
import { FC, useEffect, useState } from "react";
import * as Yup from 'yup'
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ApiResponse, IService } from "../../../../interfaces";
import { CreateProductService, UpdateProductService } from "../../../providers";
import InputField from "../../../components/form/InputField";
import ImageUploadComp from "../../../components/app/ImageUploadComp";
import TextAreaField from "../../../components/form/TextAreaField";
import AppButton from "../../../components/app/AppButton";
import { useAppStore } from "../../../../store/app-store";
import { IAddOnService } from "@/app/api/product-services/model";
import Image from "next/image";


type Props = {
  formMode: 'create' | 'update';
  selectedRecord: IService | null;
  onSuccess?: () => any;
}


const AddProductService: FC<Props> = ({ formMode, selectedRecord, onSuccess }) => {
  const { toggleAppModal, toggleDeleteModal } = useAppStore();
  const [productServiceImg, setProductServiceImg] = useState<string>('');
  const [productServices, setProductServices] = useState<any[]>([]);

  const validateForm = () => Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
  });

  const notify = (type: string, msg: string) => {
    if (type === "success") {
      toast.success(msg, {
      // position: toast.POSITION.TOP_RIGHT
      });
    }

    if (type === "error") {
      toast.error(msg, {
        // position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const { values, errors, touched, handleSubmit, handleChange, setSubmitting, isSubmitting, } = useFormik({
    initialValues: {
      title: selectedRecord ? selectedRecord.title : '',
      description: selectedRecord ? selectedRecord.description : '',
      price: selectedRecord ? selectedRecord.price : '',
      duration: selectedRecord ? selectedRecord.duration : '',
      currencySymbol: selectedRecord ? selectedRecord.currencySymbol: "EUR",
    },
    enableReinitialize: true,
    validationSchema: validateForm(),
    onSubmit: async (values) => {
      const payload = {
        ...values,
        addOnServices: productServices.map((item: IAddOnService) => ({ title: item.title })),
        serviceImage: productServiceImg,
      }
      setSubmitting(true);
      try {
        const response = (formMode === 'update' && selectedRecord) ? await UpdateProductService(selectedRecord?._id, payload) : await CreateProductService(payload); 
        if(response) {
          const { success, message, data } = response.data;
          if(success){
            onSuccess && onSuccess();
            setSubmitting(false);
            notify('success', message);
            toggleAppModal(false);
          }
        }
      } catch (err: any) {
        setSubmitting(false);
        const { message } = err;
        notify('error', message);
      }
    }
  });

  const handleInputChange = (value: any, name: string) => {
    const event = {
      target: { name, value }
    };
    handleChange(event);
  };

  const handleDeleteService = () => {
    toggleDeleteModal(true);
  }

  useEffect(() => {
    if(selectedRecord){
      setProductServiceImg(selectedRecord?.serviceImage);
      setProductServices(selectedRecord?.addOnServices);
    }
  }, [formMode, selectedRecord]);

  return (
    <>
      <div className="px-4 my-4">
        {
          (formMode === 'update' && selectedRecord) && (
            <div className="flex justify-end mb-4">
              <div 
                className="flex justify-start gap-2 items-center cursor-pointer"
                onClick={handleDeleteService}
              >
                <Image  
                  src="/svgs/delete-icon.svg"
                  alt="delete icon"
                  width={15}
                  height={15}
                />
                <p className="text-[#B3261E] font-inter font-[500] text-sm">Delete Service</p>
              </div>
            </div>
          )
        }
        <div className="my-2">
          <ImageUploadComp
            imgUrl={productServiceImg}
            onImageUploadComplete={setProductServiceImg}
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="my-2">
            <InputField
              type={'text'}
              name='title'
              label='Service name'
              labelPosition={'out'}
              value={values.title}
              isError={(touched.title && errors.title) ? true : false}
              errMsg={errors && errors.title}
              placeholder='Enter service name'
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <InputField
                type={'text'}
                name='duration'
                label='Duration'
                labelPosition={'out'}
                value={values.duration}
                isError={(touched.duration && errors.duration) ? true : false}
                errMsg={errors && errors.duration}
                placeholder='00 00'
                onChange={handleInputChange}
              />
            </div>
            <div>
              <InputField
                type={'text'}
                name='price'
                label='Price'
                labelPosition={'out'}
                value={values.price}
                isError={(touched.price && errors.price) ? true : false}
                errMsg={errors && errors.price}
                placeholder='0.00'
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="my-2">
            <TextAreaField
              name='description'
              label='Description'
              rows={5}
              labelPosition={'out'}
              value={values.description}
              isError={(touched.description && errors.description) ? true : false}
              errMsg={errors && errors.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex justify-end gap-4 mb-4 border-t-[1px] border-gray-light mt-8 pt-4">
            <AppButton 
              btnText="Back"
              btnSize="md"
              bgColor={"black"}
              fill={"outline"}
              width={"max"}
              onClick={() => toggleAppModal(false)}
            />
            <AppButton 
              type={"submit"}
              btnText="Save"
              btnSize="md"
              bgColor={"primary"}
              fill="fill"
              width={"max"}
              loading={isSubmitting}
            />
          </div>
        </form>
      </div>

      <ToastContainer />
    </>
  )
}

export default AddProductService;