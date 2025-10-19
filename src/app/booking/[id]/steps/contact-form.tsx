"use client";

import { FC, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { AxiosResponse } from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ApiResponse } from "../../../../interfaces";
import { CreateUserContact, GetUsersPublic } from "../../../providers";
import ContactInputField from "../../../components/form/ContactInputField";
import AppButton from "../../../components/app/AppButton";
import { useAppointmentStore } from "../../../../store/appointment";

type Props = {
  toggleStep: (type: "prev" | "next") => void;
};

const ContactForm: FC<Props> = ({ toggleStep }) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [searchEmail, setSearchEmail] = useState<string>("");
  const [searching, setSearching] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<any[]>([]); // <-- Store found users

  const { appendAppointData, createAppointment } = useAppointmentStore();

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Name is required"),
    phone: Yup.string().required("Phone is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    gender: Yup.string().required("Gender is required"),
    age: Yup.number().required("Age is required"),
  });

  const notify = (type: "success" | "error", msg: string) => {
    toast[type](msg);
  };

  // 🔍 Fetch user by email
  const handleGetUserByEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchEmail.trim()) {
      notify("error", "Email address is required");
      return;
    }

    setSearching(true);
    try {
      const result = await GetUsersPublic(`?email=${searchEmail}`);
      const users = result?.data?.data || [];

      if (users.length === 0) {
        notify("error", "No user found with this email.");
      } else {
        setSearchResults(users);
      }
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to fetch user";
      notify("error", message);
    } finally {
      setSearching(false);
    }
  };

  // 👇 On selecting an existing user
  const handleSelectUser = (user: any) => {
    appendAppointData({ customer: user._id });
    notify("success", `Welcome back, ${user.fullName || user.email}`);
    toggleStep("next");
  };

  // Formik for creating a new user
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      role: "user",
      phone: "",
      gender: "",
      age: 0,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const payload = { ...values, age: Number(values.age) };
        const res: AxiosResponse<ApiResponse> = await CreateUserContact(payload);
        const { success, message, data } = res.data;

        if (success) {
          appendAppointData({ customer: data._id });
          notify("success", message || "User created successfully");
          toggleStep("next");
        }
      } catch (err: any) {
        const message = err.response?.data?.message || "Error creating contact";
        notify("error", message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const { values, errors, touched, handleSubmit, handleChange, isSubmitting } =
    formik;

  const handleInputChange = (value: any, name: string) =>
    handleChange({ target: { name, value } } as any);

  return (
    <div>
      {!showForm ? (
        <form className="flex flex-col gap-4" onSubmit={handleGetUserByEmail}>
          <ContactInputField
            type="email"
            name="searchEmail"
            label="E-Mail Address"
            value={searchEmail}
            isError={false}
            errMsg={"Email is required"}
            placeholder="Enter your email"
            onChange={(value) => setSearchEmail(value)}
          />

          {/* 🔽 Show search results if any */}
          {searchResults.length > 0 && (
            <div className="mt-2 border rounded-md bg-gray-50 p-2 max-h-48 overflow-auto">
              {searchResults.map((user) => (
                <button
                  key={user._id}
                  type="button"
                  onClick={() => handleSelectUser(user)}
                  className="w-full text-left p-2 rounded-md hover:bg-gray-100 transition"
                >
                  <p className="font-semibold text-gray-800">{`${user.firstName} ${user.lastName}`  || user.fullName}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </button>
              ))}
            </div>
          )}

          <div>
            <AppButton
              btnText={"Search"}
              fill={"fill"}
              bgColor={"primary"}
              disabled={searching}
              loading={searching}
              width={"max"}
              type={"submit"}
            />
          </div>

          {/* Optionally allow creating a new contact manually */}
          {searchResults.length === 0 && (
            <div className="text-center mt-3">
              <button
                type="button"
                className="text-primary"
                onClick={() => setShowForm(true)}
              >
                Cant find your info? Create new contact
              </button>
            </div>
          )}
        </form>
      ) : (
        // ✳️ New User Form
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <ContactInputField
            type="text"
            name="fullName"
            label="Name *"
            value={values.fullName}
            isError={!!(touched.fullName && errors.fullName)}
            errMsg={errors.fullName}
            placeholder="Enter your name"
            onChange={handleInputChange}
          />
          <ContactInputField
            type="email"
            name="email"
            label="E-Mail Address *"
            value={values.email}
            isError={!!(touched.email && errors.email)}
            errMsg={errors.email}
            placeholder="Enter your email"
            onChange={handleInputChange}
          />
          <ContactInputField
            type="text"
            name="phone"
            label="Phone Number *"
            value={values.phone}
            isError={!!(touched.phone && errors.phone)}
            errMsg={errors.phone}
            placeholder="+234 000000000"
            onChange={handleInputChange}
          />
          <ContactInputField
            type="number"
            name="age"
            label="Age *"
            value={values.age}
            isError={!!(touched.age && errors.age)}
            errMsg={errors.age}
            onChange={handleInputChange}
          />
          <ContactInputField
            type="text"
            name="gender"
            label="Gender *"
            value={values.gender}
            isError={!!(touched.gender && errors.gender)}
            errMsg={errors.gender}
            selectOptions={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
            ]}
            onChange={handleInputChange}
            onSelectValue={handleInputChange}
          />

          <div className="my-4 flex gap-4 items-center">
            <AppButton
              btnText={"Back"}
              fill={"outline"}
              bgColor={"black"}
              width={"max"}
              type="button"
              onClick={() => setShowForm(false)}
            />
            <AppButton
              btnText={"Continue"}
              fill={"fill"}
              bgColor={"primary"}
              disabled={!createAppointment?.productService || isSubmitting}
              loading={isSubmitting}
              width={"max"}
              type={"submit"}
            />
          </div>
        </form>
      )}
      <ToastContainer />
    </div>
  );
};

export default ContactForm;
