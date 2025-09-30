"use client";

import { FC } from "react";
import Image from "next/image";

import * as Yup from 'yup'
import { useFormik } from "formik";
import { AxiosResponse } from "axios";

import AppButton from "../../components/app/AppButton";
import InputField from "../../components/form/InputField";
import TextAreaField from "../../components/form/TextAreaField";
import { getItem, setItem } from '../../helpers';
import { ApiResponse } from "../../../interfaces";
import { UpdateUser } from "../../providers";
import IsAuthenticatedPage from "../../components/auth/is-auth";
import { _notifyError, _notifySuccess } from "../../helpers/alerts";
import { useUser } from "../../../store/user";


const ProfileSettingsPage: FC = () => {
    const { setLoggedInUser } = useUser();
    const userDetails = getItem('clientD');

    const validateForm = () => Yup.object({
        email: Yup.string().email('Invalid email address').optional(),
        firstName: Yup.string().optional(),
        lastName: Yup.string().optional(),
        phone: Yup.string().optional(),
        bio: Yup.string().optional(),
        password: Yup.string().optional(),
        confirmPassword: Yup.string().optional().test('passwords-match', 'Passwords must match', function (value) {
            return this.parent.password === value;
        }),
    });

    const { values, errors, touched, handleSubmit, handleChange, setSubmitting, isSubmitting, } = useFormik({
      initialValues: {
        email: userDetails ? userDetails.email : '',
        firstName: userDetails ? userDetails.firstName : '',
        lastName: userDetails ? userDetails.lastName : '',
        phone: userDetails ? userDetails.phone : '',
        password: '',
        confirmPassword: '',
        bio: userDetails ? userDetails.bio : '',
      },
      validationSchema: validateForm(),
      onSubmit: (values) => {
          setSubmitting(true);
          const payload: any = {...values};
          payload.password === '' && delete payload.password;
          delete payload.confirmPassword;
          UpdateUser(userDetails._id, payload)
          .then((res: AxiosResponse<ApiResponse>) => {
              const { success, message, data } = res.data;
              if(success){
                setSubmitting(false);
                _notifySuccess(message);
                setLoggedInUser(data);
                setItem('clientD', data);
              }
          })
          .catch((err: any) => {
              setSubmitting(false);
              const { message } = err.response.data;
              _notifyError(message);
          })
      }
    });

    const handleInputChange = (value: any, name: string) => {
        const event = {
          target: { name, value }
        };
        handleChange(event);
    };

    return (
        <div>
            <h1 className="text-lg font-semibold font-inter text-primary">Settings</h1>
            <div 
                className="mt-12 bg-white rounded-lg px-4 py-2 w-full"
            >
                <h1 className="text-sm font-semibold font-inter text-primary">Profile</h1>

                <div className="mt-4 mb-8 flex justify-start gap-4">
                    <div>
                        <Image
                            src="/images/male.png"
                            alt="User"
                            width={60}
                            height={60}
                            className="rounded-full"
                        />
                    </div>
                    <div>
                        <AppButton
                            btnText="Edit Photo"
                            width="max"
                            bgColor="blue"
                            fill={"outline"}
                            type="button"
                            onClick={() => console.log("Add Bank Account Clicked")}
                        />
                        <p className="text-xs text-[#506176] mt-2">Recommended dimensions: 200x200, maximum file size: 5MB</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="w-full sm:w-10/12 md:w-10/12 lg:w-8/12">

        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="">
                                <InputField
                                    label="First name"
                                    placeholder="John Doe"
                                    type="text"
                                    name="firstName"
                                    value={values.firstName}
                                    isError={(touched.firstName && errors.firstName) ? true : false}
                                    errMsg={errors && errors.firstName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="">
                                <InputField
                                    label="Last name"
                                    placeholder="John Doe"
                                    type="text"
                                    name="lastName"
                                    value={values.lastName}
                                    isError={(touched.lastName && errors.lastName) ? true : false}
                                    errMsg={errors && errors.lastName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="">
                                <InputField
                                    label="Email Address"
                                    placeholder='Enter your email'
                                    type="text"
                                    name="email"
                                    value={values.email}
                                    isError={(touched.email && errors.email) ? true : false}
                                    errMsg={errors && errors.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="">
                                <InputField
                                    label="Phone Number"
                                    placeholder="+44"
                                    type="text"
                                    name="phone"
                                    value={values.phone}
                                    isError={(touched.phone && errors.phone) ? true : false}
                                    errMsg={errors && errors.phone}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="">
                                <InputField
                                    label="Password"
                                    placeholder="Enter your password"
                                    type="password"
                                    name="password"
                                    value={values.password}
                                    isError={(touched.password && errors.password) ? true : false}
                                    errMsg={errors && errors.password}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="">
                                <InputField
                                    label="Confirm Password"
                                    placeholder="Enter your password"
                                    type="password"
                                    name="confirmPassword"
                                    value={values.confirmPassword}
                                    isError={(touched.confirmPassword && errors.confirmPassword) ? true : false}
                                    errMsg={errors && errors.confirmPassword}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="my-2">
                            <TextAreaField 
                                name="bio"
                                label="Bio"
                                placeholder="About yourself"
                                rows={6}
                                value={values.bio}
                                isError={(touched.bio && errors.bio) ? true : false}
                                errMsg={errors && errors.bio}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
        
                    <div className="my-4">
                        <AppButton
                            btnText="Save Changes"
                            width="max"
                            bgColor="primary"
                            fill="fill"
                            type="submit"
                            loading={isSubmitting}
                        />
                    </div>
                </form>
                
            </div>
        </div>
    )
}

export default IsAuthenticatedPage(ProfileSettingsPage);