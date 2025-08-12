"use client";

import * as Yup from 'yup'
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';

import { setItem } from '../helpers';
import { LoginService } from '../providers';
import { ApiResponse } from '../../interfaces';
import AppButton from "../components/app/AppButton";
import InputField from "../components/form/InputField";
import { useUser } from '../../store/user';



const LoginPage = () => {
  const router = useRouter();
  const userStore = useUser();

    const validateForm = () => Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    const { values, errors, touched, handleSubmit, handleChange, setSubmitting, isSubmitting, } = useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: validateForm(),
      onSubmit: (values) => {
          const payload = {...values}
          setSubmitting(true);
          LoginService(payload)
          .then((res: AxiosResponse<ApiResponse>) => {
              const { success, message, data } = res.data;
              if(success){
                  setSubmitting(false);
                  setItem('clientToken', data.token);
                  setItem('clientD', data.user);
                  userStore.setLoggedInUser(data.user);
                  router.push('/admin');
              }
          })
          .catch((err: any) => {
              setSubmitting(false);
              // const { message } = err.response.data;
              // notify err
              // notify('error', message);
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
    <>
      <div className="w-full h-screen bg-[#fff9ef] flex justify-center items-center">
        <div className="w-10/12 md:w-5/12 lg:w-4/12 min-h-[60vh] flex flex-col gap-6">
          <div className="flex justify-center items-center">
            <Image 
              src="/images/logo.png"
              alt="logo"
              width={80}
              height={80}
            />
          </div>
          <p className="text-center text-black text-lg md:text-xl">Login Details</p>

          <div>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <InputField
                  type={'email'}
                  name='email'
                  label='Email Address'
                  labelPosition={'out'}
                  value={values.email}
                  isError={(touched.email && errors.email) ? true : false}
                  errMsg={errors && errors.email}
                  placeholder='Enter your email'
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-2">
                <InputField
                  name="password"
                  label="Password"
                  type="password"
                  isError={(touched.password && errors.password) ? true : false}
                  errMsg={errors && errors.password}
                  value={values.password}
                  onChange={handleInputChange}
                  placeholder="****************"
                />
              </div>
              
              <div className="flex justify-center text-black my-4">
                <Link href="/forgot-password">Forgot Password?</Link>
              </div>

              <div>
                <AppButton
                  type="submit"
                  btnText="Login"
                  fill={'fill'}
                  bgColor={'blue'}
                  width={"full"}
                  loading={isSubmitting}
                />
              </div>
            </form>
          </div>

        </div>
      </div>
    </>
  );
}

export default LoginPage;