import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
// import { useSigninMutation } from "../../redux/api/authAPI";
// import Spinner from "../utils/Spinner";
import { useEffect } from "react";
// import { authSelector, setAuth } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import TextField from "../shared/TextField";
// import FormError from "../utils/FormError";
// const backendUrl = import.meta.env.VITE_BACKEND_URL;



interface FormData{
    email: string;
    password: string;
    role: string;
}

const Signin = () => {
    const {formState: {errors}, register, handleSubmit} = useForm<FormData>({
        defaultValues: {
            role: 'patient',
        },
        mode: 'onChange'
    });
    // const navigate = useNavigate()
    // const dispatch = useDispatch()
    // const authState = useSelector(authSelector)
    const onSubmit = async(data: FormData) => {

        // const result = await signinUser(data)
        // console.log('singin result', result)

    }

    // useEffect(() => {
    //     if(isSuccess){
    //         console.log('just success', authState, data)
            


    //         dispatch(setAuth(data))

    //     }
    //     if(authState.id){
    //         console.log(authState.id, 'email', authState.role)
    //         navigate('/dashboard')
    //     }

    // }, [isSuccess, authState])

    
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

            {/* {isLoading && <Spinner />}
            {isError && <FormError error={error} />} */}

            

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