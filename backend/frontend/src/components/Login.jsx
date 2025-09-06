
import React from 'react'
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useAuth } from '../context/AuthProvider';
import {toast} from 'react-hot-toast'
const Login = () => {
    const [authUser,setAuthUser]=useAuth()
      const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

      const onSubmit = async (data) => {
        const userInfo = {
          
            email: data.email,
            password: data.password,
            
        };
         await axios
      .post("/api/user/login", userInfo)
      .then((response) => {
    console.log(response)
        if (response.data) {
          toast.success("Login successful");
        }
        localStorage.setItem("ChatApp", JSON.stringify(response.data));
        setAuthUser(response.data);
      })
      .catch((error) => {
        console.log(error)
        if (error.response) {
            
          toast.error("Error: " + error.response.data.error);
        }
      });
        


    }

  return (
      <>
            <div className="flex h-screen items-center justify-center">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="border border-white px-6 py-2 rounded-md space-y-3 w-96"
                >
                    <h1 className="text-2xl text-center">
                        Chat<span className="text-green-500 font-semibold">App</span>
                    </h1>
                    <h2 className="text-xl text-white font-bold">Login</h2>
                    <br />


                    {/* Email */}
                    <div className="space-y-1">
                        <label className="input input-bordered flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 opacity-70" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                            </svg>
                            <input
                                type="email"
                                placeholder="Email"
                                className="grow"
                                {...register("email", { required: true })}

                            />
                        </label>
                        {errors.email && <span className="text-red-500 text-sm">* This field is required</span>}
                    </div>



                    {/* Password */}
                    <div className="space-y-1">
                        <label className="input input-bordered flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 opacity-70" viewBox="0 0 16 16" fill="currentColor">
                                <path fillRule="evenodd" clipRule="evenodd" d="M14 6a4 4 0 1 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" />
                            </svg>
                            <input
                                type="password"
                                placeholder="Password"
                                className="grow"
                                {...register("password", { required: true })}
                            />
                        </label>
                        {errors.password && <span className="text-red-500 text-sm">* This field is required</span>}
                    </div>


                    {/* Text & Button */}
                    <div className="flex justify-between">
                        <p className='italic'>
                            New account ?
                            <Link to="/signup"><span className='text-blue-500 underline not-italic'> Signup</span></Link>
                            
                        </p>
                        <input
                            type="submit"
                            value="Login"
                            className="text-white bg-green-500 px-2 py-1 cursor-pointer rounded-lg"
                        />
                    </div>
                </form>
            </div>
        </>
  )
}

export default Login
