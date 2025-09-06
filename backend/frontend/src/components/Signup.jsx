import React from 'react'
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useAuth } from '../context/AuthProvider';
import {toast} from 'react-hot-toast'


const Signup = () => {
    const [authUser,setAuthUser]=useAuth()
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch
    } = useForm();

    const onSubmit = async (data) => {
        const userInfo = {
            fullname: data.fullname,
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword,
        };
         await axios
      .post("/api/user/signup", userInfo)
      .then((response) => {
        if (response.data) {
          toast.success("Signup successful");
        }
        localStorage.setItem("ChatApp", JSON.stringify(response.data));
        setAuthUser(response.data);
      })
      .catch((error) => {
        if (error.response) {
          toast.error("Error: " + error.response.data.error);
        }
      });
        


    }

    const password = watch("password", "")
    const confirmPassword = watch("confirmPassword", "")

    const validatePassword = (value) => {
        return value === watch("password") || "Passwords do not match"
    }

    return (
        <>
            <div className="flex h-screen items-center justify-center bg-gray-900">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="border border-white px-6 py-4 rounded-md w-96 space-y-3"
                >
                    <h1 className="text-2xl text-center text-white">
                        Chat<span className="text-green-500 font-semibold">App</span>
                    </h1>
                    <h2 className="text-xl text-white font-bold ">Signup</h2>

                    {/* Fullname */}
                    <div className="space-y-1">
                        <label className="input input-bordered flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 opacity-70" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Fullname"
                                className="grow"
                                {...register("fullname", { required: true })}
                            />
                        </label>
                        {errors.fullname && <span className="text-red-500 text-sm">* This field is required</span>}
                    </div>

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

                    {/* Confirm Password */}
                    <div className="space-y-1">
                        <label className="input input-bordered flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 opacity-70" viewBox="0 0 16 16" fill="currentColor">
                                <path fillRule="evenodd" clipRule="evenodd" d="M14 6a4 4 0 1 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" />
                            </svg>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className="grow focus:outline-none"
                                {...register("confirmPassword", { required: true, validate: validatePassword })}
                            />
                        </label>
                        {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message || "This field is required"}</span>}
                    </div>

                    {/* Text & Button */}
                    <div className="flex justify-between pt-2 items-center">
                        <p className="italic text-white text-sm">
                            Have an account?
                            <Link to="/login" ><span className="text-blue-500 underline not-italic ml-1 cursor-pointer">Login</span></Link>

                        </p>
                        <input
                            type="submit"
                            value="Signup"
                            className="text-white bg-green-500 px-4 py-1 cursor-pointer rounded-lg"
                        />
                    </div>
                </form>
            </div>
        </>
    )
}

export default Signup
