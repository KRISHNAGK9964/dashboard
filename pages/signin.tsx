import Image from "next/image";
import React, { useEffect } from "react";
import { google_mark, apple_mark } from "./../public";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface signinProps {}

interface SigninFormData {
  email: string;
  password: string;
}

const Signin: React.FC<signinProps> = ({}) => {
  const{ data: session } = useSession();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>();
  const onSubmit = handleSubmit((formData) => {
    console.log(formData);
  });
  const router = useRouter();
  
  useEffect(()=>{
    if(session?.user){
      router.replace('/');
    }
  },[session])

  return (
    <div className="bg-black flex min-h-screen">
      <div className="bg-black w-2/5 flex justify-center items-center text-white text-[72px]  font-bold">
        Board.
      </div>
      <div className="bg-[#F5F5F5] flex-1 flex justify-center items-center">
        <div>
          {/* Signin Text */}
          <p className="text-4xl font-bold mb-1">Sign In</p>
          <p className="font-normal text-base text-black mb-6">
            Sign in to your account
          </p>
          {/* Signin provider buttons */}
          <div className="flex space-x-5 mb-6">

            <div onClick={()=>{signIn('google')}} className="bg-white p-2 px-4 flex items-center justify-center space-x-4m  rounded-[10px] space-x-2 cursor-pointer hover:bg-[#B5B5B5]">
              <div className="relative w-3.5 h-3.5">
                <Image src={google_mark} fill className="" alt={""} />
              </div>
              <p className="font-normal text-xs text-[#858585]">
                Signin in with Google
              </p>
            </div>

            <div className="bg-white p-2 px-4 flex items-center justify-center space-x-4m rounded-[10px] space-x-2 cursor-not-allowed">
              <div className="relative w-3.5 h-3.5">
                <Image src={apple_mark} fill className="" alt={""} />
              </div>
              <p className="font-normal text-xs text-[#858585]">
                Signin in with Apple
              </p>
            </div>

          </div>
          {/* Signin form */}
          <form
            onSubmit={onSubmit}
            className="p-5 bg-white rounded-2xl space-y-4"
          >
            <div className="space-y-2 w-full">
              <label htmlFor="email_address" className="text-base font-medium">
                Email address
              </label>
              <input
                type="email"
                id="email_address"
                {...register('email',{required: true})}
                className="w-full p-2 px-3 text-sm font-medium rounded-[10px] bg-[#F5F5F5] outline-none focus:ring-1"
                placeholder="name@gmail.com"
              />
            </div>
            <div className="space-y-2 w-full">
              <label htmlFor="password" className="text-base font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register('password',{required:true ,minLength:8 , maxLength: 32})}
                className="w-full p-2 px-3 text-sm font-medium rounded-[10px] bg-[#F5F5F5] outline-none focus:ring-1 placeholder:opacity-50"
                placeholder="◾◾◾◾◾◾◾◾"
              />
            </div>

            <p className="text-[#346BD4] text-base ">Forgot password?</p>

            <button type="submit" className="bg-black rounded-xl w-full text-white font-bold text-base p-2">Sign In</button>
          </form>

          <p className="text-[#858585] text-sm text-center p-2">Don't have an account? <span className="text-[#346BD4]">Register here</span></p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
