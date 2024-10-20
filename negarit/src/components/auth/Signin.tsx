import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
// import { useSigninMutation } from "../../redux/api/authAPI";
// import Spinner from "../utils/Spinner";
import { useEffect } from "react";
// import { authSelector, setAuth } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import TextField from "../shared/TextField";
import { SigninCredential } from "../../redux/types/auth";
import { useSigninMutation } from "../../redux/api/authAPI";
import Spinner from "../shared/Spinner";
import FormError from "../shared/FormError";
// import FormError from "../utils/FormError";
// const backendUrl = import.meta.env.VITE_BACKEND_URL;



const Signin = () => {
    const [signinUser, {isLoading, isError, isSuccess, error, data}] = useSigninMutation()
    const {formState: {errors}, register, handleSubmit} = useForm<SigninCredential>({
        mode: 'onChange'
    });
    const navigate = useNavigate()
  
    const onSubmit = async(data: SigninCredential) => {
         await signinUser(data)
    }

    useEffect(() => {
        if(isSuccess){      
            localStorage.setItem('token',data.accessToken)
            navigate('/profile')
        }

    }, [isSuccess, data])

    
  return (
    <div className="border shadow-lg bg-white xl:w-2/5  h-full p-6 flex flex-col justify-center items-center rounded-md">
        <h1 className="text-3xl text-blue-950 font-semibold ">Welcome back!</h1>
        
        <form noValidate onSubmit={handleSubmit(onSubmit)} className="  px-10 py-5">
            <div className="mt-4 py-3 w-full">
                <Link to={`${''}/auth/google`} className="border p-2 w-full flex justify-center items-center gap-2 rounded-md text-gray-600 hover:shadow-sm"> <FcGoogle className="w-8 h-8" /> Sign in with Google</Link>        
            </div>  
            <div className="flex justify-between items-center my-8  w-full">
                <p className="bg-gray-400 h-[1px] w-1/3"></p>
                <p>or</p>
                <p className="bg-gray-400 h-[1px] w-1/3"></p>
            </div>  

            
            {isLoading && <div className="w-12 h-12 border-4 border-t-transparent border-gray-800 border-solid rounded-full animate-spin"></div>}
            {isError && <FormError error={error} />}

            
            <TextField
                label="Username"
                id="username"
                type="text"
                register={register}
                validation={{ required: "Username is required" }}
                error={errors.username?.message}
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




            <button type="submit" className="w-full  bg-blue-700 text-lg font-semibold hover:shadow-md text-white py-2 rounded-full">Signin</button> 
              
             <p className="text-gray-400 mt-8 ">Don't have an account? <Link className="text-blue-500 hover:text-blue-800" to='/signup'>Signup</Link> </p>
             <p className="text-gray-400">By clicking 'Signin' you accept our terms or <span className="text-blue-400">privacy</span> and <span className="text-blue-400">security</span></p>

        </form>


    </div>
  )
}

export default Signin