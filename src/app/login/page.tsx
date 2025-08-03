"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import InputField from "../components/form/InputField";
import AppButton from "../components/app/AppButton";


const LoginPage = () => {
  //local states.
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<{value: string, error: string, isError: boolean}>({ value: '', error: '', isError: false})
  const [password, setPassword] = useState<{value: string, error: string, isError: boolean}>({ value: '', error: '', isError: false});
  const [error, setError] = useState<string>('');

  //hooks
  const router = useRouter();

  const handleLogin = async () => {
    // e.preventDefault();
    setIsLoading(true);
    const res = await fetch('http://localhost:3000/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        { 
          email: email.value, 
          password: password.value 
        }
      ),
    });

    setIsLoading(false);
    console.log('res', res);
    const data = await res.json();

    if (res.ok) {
      // ✅ Login successful
      router.push('/admin');
    } else {
      setError(data.error || 'Login failed');
    }
  };

  return (
    <>
      <div className="w-full h-screen bg-[#fff9ef] flex justify-center items-center">
        <div className="w-full md:w-5/12 min-h-[60vh] flex flex-col gap-6">
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
            <form>
              <div className="mb-2">
                <InputField
                  name="email"
                  label="Email"
                  type="email"
                  isError={email.isError}
                  errMsg={email.error}
                  value={email.value}
                  onChange={(value) => setEmail({ value, error: '', isError: false })}
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-2">
                <InputField
                  name="password"
                  label="Password"
                  type="password"
                  isError={password.isError}
                  errMsg={password.error}
                  value={password.value}
                  onChange={(value) => setPassword({ value, error: '', isError: false })}
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
                  onClick={() => handleLogin()}
                  loading={isLoading}
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