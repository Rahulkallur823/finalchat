import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Signup() {
  const [authUser, setAuthUser] = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Watch the password and confirm password fields
  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  const validatePasswordMatch = (value) => {
    return value === password || "Passwords do not match";
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("fullname", data.fullname);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    
    // Append the image file if present
    if (data.image[0]) {
      formData.append("image", data.image[0]);
    }

    await axios
      .post("/api/user/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data) {
          toast.success("Signup successful");
          localStorage.setItem("ChatApp", JSON.stringify(response.data));
          setAuthUser(response.data);
        }
      })
      .catch((error) => {
        if (error.response) {
          toast.error("Error: " + error.response.data.error);
        }
      });
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-white px-6 py-2 rounded-md space-y-3 w-96"
      >
        <h1 className="text-2xl text-center">
          Chat<span className="text-green-500 font-semibold">App</span>
        </h1>
        <h2 className="text-xl text-white font-bold">Signup</h2>
        <br />
        
        {/* Fullname */}
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Fullname"
            {...register("fullname", { required: true })}
          />
        </label>
        {errors.fullname && (
          <span className="text-red-500 text-sm font-semibold">
            This field is required
          </span>
        )}
        
        {/* Email */}
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="email"
            className="grow"
            placeholder="Email"
            {...register("email", { required: true })}
          />
        </label>
        {errors.email && (
          <span className="text-red-500 text-sm font-semibold">
            This field is required
          </span>
        )}

        {/* Password */}
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="password"
            className="grow"
            placeholder="Password"
            {...register("password", { required: true })}
          />
        </label>
        {errors.password && (
          <span className="text-red-500 text-sm font-semibold">
            This field is required
          </span>
        )}

        {/* Confirm Password */}
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="password"
            className="grow"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: true,
              validate: validatePasswordMatch,
            })}
          />
        </label>
        {errors.confirmPassword && (
          <span className="text-red-500 text-sm font-semibold">
            {errors.confirmPassword.message}
          </span>
        )}

        {/* Image Upload */}
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="file"
            className="grow"
            {...register("image", { required: true })}
          />
        </label>
        {errors.image && (
          <span className="text-red-500 text-sm font-semibold">
            An image is required
          </span>
        )}

        {/* Text & Button */}
        <div className="flex justify-between">
          <p>
            Have an account?
            <Link
              to="/login"
              className="text-blue-500 underline cursor-pointer ml-1"
            >
              Login
            </Link>
          </p>
          <input
            type="submit"
            value="Signup"
            className="text-white bg-green-500 px-2 py-1 cursor-pointer rounded-lg"
          />
        </div>
      </form>
    </div>
  );
}

export default Signup;
