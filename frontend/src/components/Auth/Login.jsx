import React, { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { doLogin } from "../../@apis/auth";
import { useMutation } from "@tanstack/react-query";
import { userAuthorize } from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { DevTool } from "@hookform/devtools";
import nookies from "nookies";

const Login = () => {
  const {register,handleSubmit, reset, control} = useForm();
  const navigate =  useNavigate();
  const dispatch = useDispatch()
  const userRegistered = useMutation({
    mutationFn: doLogin,
    // onSuccess: (data,error) => {
    // toast.success(data.data.message)
    // },
  });

  const submitHandle = async(data) => {
    try {
      const res = await userRegistered.mutateAsync({data});
      if(res.data.success) {
        toast.success(res.data.message);
        nookies.set(null, 'token', res.data.token, {path: '/'});
        dispatch(userAuthorize(res.data.user));
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      console.log('done')
      reset();
    }
  };
  return (
    <>
      <section className="authPage">
        <div className="container">
          <div className="header">
            <img src="/jobportal.svg" alt="logo" />
            <h3>Login to your account</h3>
          </div>
          <form onSubmit={handleSubmit(submitHandle)}>
            <div className="inputTag">
              <label>Login As</label>
              <div>
                <select id="role" {...register("role")} >
                  <option value="">Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
                <FaRegUser />
              </div>
            </div>
            <div className="inputTag">
              <label>Email Address</label>
              <div>
                <input
                  type="email"
                  placeholder="zk@gmail.com"
                  id="email"
                  {...register("email")}
                />
                <MdOutlineMailOutline />
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
            <button type="submit">
              Login
            </button>
            <Link to={"/register"}>Register Now</Link>
          </form>
          <DevTool control={control} />
        </div>
        <div className="banner">
          <img src="/login.png" alt="login" />
        </div>
      </section>
    </>
  );
};

export default Login;
