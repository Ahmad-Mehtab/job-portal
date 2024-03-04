import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { DevTool } from "@hookform/devtools";
import { useMutation } from "@tanstack/react-query";
import { postApplication } from "../../@apis/application";

const Application = () => {
  const {id} =  useParams();
  const {register,handleSubmit, reset, control} = useForm();

  const postApplicationData = useMutation({
    mutationFn: postApplication,
    // onSuccess: (data,error) => {
    // toast.success(data.data.message)
    // },
  });
  const handleApplication = async(data) => {
    try {
      const res = await postApplicationData.mutateAsync({data});
      toast.success(res.message);
    } catch (error) {
      
    }
  }
  return (
    <section className="application">
      <div className="container">
        <h3>Application Form</h3>
        <form onSubmit={handleSubmit(handleApplication)}>
          <input type="text" placeholder="Your Name" {...register("name")} />
          <input type="email" placeholder="Your Email"  {...register("email")} />
          <input type="number" placeholder="Your Phone Number" {...register("phone")} />
          <input type="text" placeholder="Your Address"  {...register("address")}/>
          <textarea placeholder="CoverLetter..." {...register("coverLetter")} />
          <div>
            <label
              style={{ textAlign: "start", display: "block", fontSize: "20px" }}
            >
              Select Resume
            </label>
            <input
              type="file"
              accept=".pdf, .jpg, .png"
              {...register("resume")}
              style={{ width: "100%" }}
            />
          </div>
          <button type="submit">Send Application</button>
        </form>
        <DevTool control={control} />
      </div>
    </section>
  );
};

export default Application;
