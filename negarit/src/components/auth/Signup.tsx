import React from 'react';
import { useForm } from 'react-hook-form';
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setAuth } from "../../redux/slices/authSlice";
import { FcGoogle } from "react-icons/fc";
import TextField from "../shared/TextField"; 
// import FormError from "../utils/FormError";


interface FormData {
  password: string;
  fullName: string;
  email: string;
  username: string;
}

const SignupForm: React.FC = () => {
    const { formState: { errors, isValid }, register, handleSubmit } = useForm<FormData>({
        mode: 'onChange'
      });
    
    //   const navigate = useNavigate();
    //   const dispatch = useDispatch();
    
      const onSubmit = async (data: FormData) => {
        // if (isValid) {
        //   const result = await signupUser(data as SignupCredential);
        //   console.log('result signup', result);
        // }
      };
    
    //   useEffect(() => {
    //     if (isSuccess) {
    //       console.log('signup data', signupData)
    //       dispatch(setAuth(signupData));
    //       navigate('/dashboard');
    //     }
    //   }, [isSuccess]);
    

  return (
    <div className="border shadow-lg bg-white  xl:w-2/5 h-full p-4 flex flex-col justify-center items-center rounded-md">
    <h1 className="text-3xl text-blue-950 font-semibold mb-2">Welcome to Negarit!</h1>
    <p className="text-3xl text-blue-500 font-semibold mt-5">Signup</p>

    <form noValidate onSubmit={handleSubmit(onSubmit)} className="p-10 w-full">
      <div className="py-5 w-full">
        <Link to={`${'.'}/auth/google`} className="border p-4 sm:px-20 w-full flex justify-center items-center gap-2 rounded-md text-gray-600 hover:shadow-sm">
          <FcGoogle className="w-8 h-8" /> Sign up with Google
        </Link>
      </div>
      <div className="flex justify-between items-center w-full">
        <p className="bg-gray-400 h-[1px] w-1/3"></p>
        <p>or</p>
        <p className="bg-gray-400 h-[1px] w-1/3"></p>
      </div>
      {/* {isError && <FormError error={error} />} */}


      <TextField
        label="Fullname"
        id="fullName"
        type="text"
        register={register}
        validation={{ required: "Fullname is required" }}
        error={errors.fullName?.message}
      />

      <TextField
        label="Password"
        id="password"
        type="password"
        register={register}
        validation={{
          required: "Password is required",
          validate: (value: string) => {
            if (value.length < 6) return "Password should not be shorter than six characters.";
            return /[a-zA-Z]{1,}/.test(value) || 'Password must contain at least one letter';
          }
        }}
        error={errors.password?.message}
      />

      <TextField
        label="Email"
        id="email"
        type="email"
        register={register}
        validation={{
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Email should include letters and digits"
          }
        }}
        error={errors.email?.message}
      />

      <TextField
        label="Username"
        id="username"
        type="text"
        register={register}
        validation={{ required: "Username is required" }}
        error={errors.username?.message}
      />

      <button type="submit" className="w-full bg-blue-700 text-lg font-semibold hover:shadow-md text-white py-2 rounded-full">Signup</button>
    </form>

    <p className="text-gray-400 mt-8">Have an account? <Link className="text-blue-500 hover:text-blue-800" to='/signin'>Signin</Link></p>
    <p className="text-gray-400">By clicking 'Signup' you accept our terms or <span className="text-blue-400">privacy</span> and <span className="text-blue-400">security</span></p>
  </div>
  );
};

export default SignupForm;




