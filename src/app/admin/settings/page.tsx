"use client";

import { FC } from "react";
import Image from "next/image";
import AppButton from "../../components/app/AppButton";
import InputField from "../../components/form/InputField";
import TextAreaField from "@/app/components/form/TextAreaField";


const ProfileSettingsPage: FC = () => {
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
    
                <div className="w-full sm:w-10/12 md:w-8/12 lg:w-8/12">
                    <div className="my-4">
                        <InputField
                            label="Full name"
                            placeholder="John Doe"
                            type="text"
                            name="accountName"
                            value={""}
                            isError={false}
                            onChange={() => {}}
                        />
                    </div>

    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="">
                            <InputField
                                label="Email Address"
                                placeholder=""
                                type="text"
                                name="accountNumber"
                                value={""}
                                isError={false}
                                onChange={() => {}}
                            />
                        </div>
                        <div className="">
                            <InputField
                                label="Phone Number"
                                placeholder="+44"
                                type="text"
                                name="branchName"
                                value={""}
                                isError={false}
                                onChange={() => {}}
                            />
                        </div>
                    </div>
                    <div className="my-2">
                        <TextAreaField 
                            name="bio"
                            label="Bio"
                            placeholder="About yourself"
                            value={""}
                            rows={6}
                            isError={false}
                            onChange={() => null}
                        />
                    </div>
                </div>
    
                <div className="my-4">
                    <AppButton
                        btnText="Save Changes"
                        width="max"
                        bgColor="primary"
                        fill="fill"
                        type="button"
                        onClick={() => console.log("Add Bank Account Clicked")}
                    />
                </div>
                
            </div>
        </div>
    )
}

export default ProfileSettingsPage;