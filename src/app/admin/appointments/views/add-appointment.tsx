"use client";

import { FC, useEffect, useState } from "react";
import * as Yup from 'yup'
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

import { ISchedule, IService } from "../../../../interfaces";
import { useAppStore } from "../../../../store/app-store";
import AppButton from "../../../components/app/AppButton";
import { Appointment, User } from "../../../../interfaces";
import { useProductService, useSchedules, useUser } from "../../../hooks";
import InputField from "../../../components/form/InputField";
import { CURRENCY_OPTIONS } from "../../../constants/currency";
import ImageUploadComp from "../../../components/app/ImageUploadComp";
import { CreateAppointment, UpdateAppointment } from "../../../providers";
import SelectField, { SelectOption } from "../../../components/form/SelectField";
import moment from "moment";

type Props = {
  formMode: 'create' | 'update';
  selectedRecord: Appointment | null;
  onSuccess?: () => any;
}

const AddAppointment: FC<Props> = ({ formMode, selectedRecord, onSuccess }) => {
    const { toggleAppModal, toggleDeleteModal } = useAppStore();
    const [proofOfPaymentImage, setProofOfPaymentImage] = useState<string>('');
    const [productServiceOptions, setProductServiceOptions] = useState<SelectOption[]>([]);
    const [userOptions, setUserOptions] = useState<SelectOption[]>([]);
    const [availableDateOptions, setAvailableDateOptions] = useState<SelectOption[]>([]);
    const [availableTimeOptions, setAvailableTimeOptions] = useState<SelectOption[]>([]);

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

    const validateForm = (formMode: 'create' | 'update') => {
        return formMode === 'create' ? Yup.object().shape({
            productService: Yup.string().required('Product service is required'),
            customer: Yup.string().required('Customer is required'),
            amountPaid: Yup.number().required('Amount paid is required'),
            appointmentDay: Yup.string().required('Appointment day is required'),
            appointmentTime: Yup.string().required('Appointment time is required'),
        }) : Yup.object().shape({
            productService: Yup.string().optional(),
            customer: Yup.string().optional(),
            amountPaid: Yup.number().optional(),
            appointmentDay: Yup.string().optional(),
            appointmentTime: Yup.string().optional(),
        })
    }

    const { values, errors, touched, handleSubmit, handleChange, setSubmitting, isSubmitting, } = useFormik({
        initialValues: {
            productService: selectedRecord?.productService?._id || '',
            customer: selectedRecord?.customer?._id || '',
            amountPaid: selectedRecord?.amountPaid || 0,
            appointmentDay: selectedRecord?.appointmentDay || '',
            appointmentTime: selectedRecord?.appointmentTime || '',
            currencySymbol: selectedRecord?.currencySymbol || '',
            proofOfPaymentImage: selectedRecord?.proofOfPaymentImage || '',
        },
        enableReinitialize: true,
        validationSchema: validateForm(formMode),
        onSubmit: async (values) => {
            const payload: any = { ...values };
            if(proofOfPaymentImage){
                payload['proofOfPaymentImage'] = proofOfPaymentImage;
            }
            delete payload[payload['currencySymbol']];
            delete payload[payload['appointmentDay']];
            delete payload[payload['appointmentTime']];
            setSubmitting(true);
            try {
                const response = (formMode === 'update' && selectedRecord) ? await UpdateAppointment(selectedRecord?._id, payload) : await CreateAppointment(payload); 
                if(response) {
                const { success, message } = response.data;
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

    const handleSelectChange = (name: string, value: any) => {
        handleInputChange(value, name);
    }

    const handleDeleteAppointment = () => {
        toggleDeleteModal(true);
    };

    const { data: productServices } = useProductService();
    const { data: users } = useUser("?role=user");
    const { data: schedules } = useSchedules();

    useEffect(() => {
        if(selectedRecord){
        setProofOfPaymentImage(selectedRecord?.proofOfPaymentImage);
        }
    }, [formMode, selectedRecord]);

    useEffect(() => {
        if(productServices && productServices.length){
            const options = productServices.map((item: IService) => ({
                label: item.title,
                value: item._id,
            }));
            setProductServiceOptions(options);
        }
        if(users && users.length){
            const options = users.map((item: User) => ({
                label: `${item.firstName} ${item.lastName}`,
                value: item._id,
            }));
            setUserOptions(options);
        }
        if(schedules && schedules.length){
            const scheduleDates = schedules.map((item: ISchedule) => ({
                label: moment(item.scheduleDate).format('MMMM Do YYYY'),
                value: item.scheduleDate,
            }));
            const scheduleTimes = schedules.map((item: ISchedule) => ({
                label: `${item.startTime} - ${item.endTime}`,
                value: item.startTime,
            }));
            setAvailableDateOptions(scheduleDates);
            setAvailableTimeOptions(scheduleTimes);
        }
    }, [productServices, users, schedules]);

    return (
        <>
            <div className="px-4 my-4">
                {
                    (formMode === 'update' && selectedRecord) && (
                        <div className="flex justify-end mb-4">
                            <div 
                                className="flex justify-start gap-2 items-center cursor-pointer"
                                onClick={handleDeleteAppointment}
                            >
                                <Image 
                                    src="/svgs/delete-icon.svg"
                                    alt="delete icon"
                                    width={15}
                                    height={15}
                                />
                                <p className="text-[#B3261E] font-inter font-[500] text-sm">Delete Appointment</p>
                            </div>
                        </div>
                    )
                }

                <div className="my-2">
                    <p className="text-sm font-inter font-[500] mb-2">Proof of payment</p>
                    <ImageUploadComp
                        imgUrl={proofOfPaymentImage}
                        onImageUploadComplete={setProofOfPaymentImage}
                    />
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="my-2">
                        <SelectField
                            name='productService'
                            label='Service'
                            value={values.productService}
                            isError={(touched.productService && errors.productService) ? true : false}
                            errMsg={errors && errors.productService}
                            onChange={handleSelectChange}
                            selectOptions={productServiceOptions}
                        />
                    </div>
                    <div className="my-2">
                        <SelectField
                            name='customer'
                            label='Customer'
                            value={values.customer}
                            isError={(touched.customer && errors.customer) ? true : false}
                            errMsg={errors && errors.customer}
                            onChange={handleSelectChange}
                            selectOptions={userOptions}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <InputField
                                type={'number'}
                                name='amountPaid'
                                label='Amount Paid'
                                labelPosition={'out'}
                                value={values.amountPaid}
                                isError={(touched.amountPaid && errors.amountPaid) ? true : false}
                                errMsg={errors && errors.amountPaid}
                                placeholder='0.00'
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="pt-3">
                            <SelectField
                                name='currencySymbol'
                                label='Currency'
                                value={values.currencySymbol}
                                isError={(touched.currencySymbol && errors.currencySymbol) ? true : false}
                                errMsg={errors && errors.currencySymbol}
                                onChange={handleSelectChange}
                                selectOptions={CURRENCY_OPTIONS}
                            />
                        </div>
                        <div className="pt-3">
                            <SelectField
                                name='appointmentDay'
                                label='Appointment Day'
                                value={values.appointmentDay}
                                isError={(touched.appointmentDay && errors.appointmentDay) ? true : false}
                                errMsg={errors && errors.appointmentDay}
                                onChange={handleSelectChange}
                                selectOptions={availableDateOptions}
                            />
                        </div>
                        <div className="pt-3">
                            <SelectField
                                name='appointmentTime'
                                label='Time'
                                value={values.appointmentTime}
                                isError={(touched.appointmentTime && errors.appointmentTime) ? true : false}
                                errMsg={errors && errors.appointmentTime}
                                onChange={handleSelectChange}
                                selectOptions={availableTimeOptions}
                            />
                        </div>
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

export default AddAppointment;