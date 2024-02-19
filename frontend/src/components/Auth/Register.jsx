import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { Link, useNavigate,  } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { doRegister } from "../../@apis/auth";

const Register = () => {
  const { register, handleSubmit,reset} = useForm();
const navigate =  useNavigate();
  const userRegistered = useMutation({
    mutationFn: doRegister,
    // onSuccess: (data,error) => {
    // toast.success(data.data.message)
    // },
  });

  const onSubmit = async(data) => {
    try {
      const res = await userRegistered.mutateAsync({data})
      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      console.log('done')
    }
    reset();
  };

  return (
    <>
    
      <section className="authPage">
        <div className="container">
          <div className="header">
            <img src="/jobportal.svg" alt="logo" />
            <h3>Create a new account</h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="inputTag">
              <label>Register As</label>
              <div>
                <select id="role" {...register("role")}>
                  <option>Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
                <FaRegUser />
              </div>
            </div>
            <div className="inputTag">
              <label>Name</label>
              <div>
                <input
                  type="text"
                  placeholder="ahmad"
                  id="name"
                  {...register("name")}
                />
                <FaPencilAlt />
              </div>
            </div>
            <div className="inputTag">
              <label>Email Address</label>
              <div>
                <input
                  type="email"
                  placeholder="ahmad@gmail.com"
                  id="email"
                  {...register("email")}
                />
                <MdOutlineMailOutline />
              </div>
            </div>
            <div className="inputTag">
              <label>Phone Number</label>
              <div>
                <input
                  type="number"
                  placeholder="12345678"
                  id="phone"
                  {...register("phone")}
                />
                <FaPhoneFlip />
              </div>
            </div>
            <div className="inputTag">
              <label>Password</label>
              <div>
                <input
                  type="password"
                  placeholder="Your Password"
                  id="password"
                  {...register("password")}
                />
                <RiLock2Fill />
              </div>
            </div>
            <button type="submit">Register</button>
            <Link to={"/login"}>Login Now</Link>
          </form>
        </div>
        <div className="banner">
          <img src="/register.png" alt="login" />
        </div>
      </section>
    </>
  );
};

export default Register;
