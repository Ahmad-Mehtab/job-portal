import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { DevTool } from "@hookform/devtools";
import { useMutation } from "@tanstack/react-query";
import { postApplication } from "../../@apis/application";

const Application = () => {
  const { id } = useParams();
 const navigate =  useNavigate();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, control } = useForm();

  const postApplicationData = useMutation({
    mutationFn: postApplication,

  });
  
  if (postApplicationData.isFetching) {
    return console.log("Mutation is pending:");
  }

  const handleApplication = async (data) => {
    // console.log('data:>>', resume);
    const formData = new FormData();
    // Append other form data
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("address", data.address);
    formData.append("coverLetter", data.coverLetter);
    formData.append("jobId", id);
    formData.append("resume", resume); // Append the file directly to the FormData
    for (let value of formData.values()) {
      // console.log(value);
    }
    try {
      setLoading(true)
      const res = await postApplicationData.mutateAsync(formData);
      toast.success(res.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false)
      reset();
      navigate('/job/getall')
    }
  };
  if (loading)
  return (
    <div
      id="loading-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-60"
    >
      <svg
        className="animate-spin h-8 w-8 text-white mr-3"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>

      <span className="text-white text-3xl font-bold">Loading...</span>
    </div>
  );
  return (
    <section className="application">
      <div className="container">
        <h3>Application Form</h3>
        <form onSubmit={handleSubmit(handleApplication)}>
          <input type="text" placeholder="Your Name" {...register("name")} />
          <input type="email" placeholder="Your Email" {...register("email")} />
          <input
            type="number"
            placeholder="Your Phone Number"
            {...register("phone")}
          />
          <input
            type="text"
            placeholder="Your Address"
            {...register("address")}
          />
          <textarea placeholder="CoverLetter..." {...register("coverLetter")} />
          <div>
            <label
              style={{ textAlign: "start", display: "block", fontSize: "20px" }}
            >
              Select Resume
            </label>
            <input
              type="file"
              onChange={(e) => setResume(e.target.files[0])}
              accept=".pdf, .jpg, .png"
              // {...register("resume")}
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
