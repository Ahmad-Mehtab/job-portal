import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "../../@validationSchema/SchemaPostJob";
import { DevTool } from "@hookform/devtools";
import { useMutation } from "@tanstack/react-query";
import { doPostJob } from "../../@apis/post";
import { useNavigate } from "react-router-dom";

function PostJob() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    control,
    reset,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema), // Use the validation schema with React Hook Form
  });
  const postJob = useMutation({
    mutationFn: doPostJob,
    // onSuccess: (data,error) => {
    // toast.success(data.data.message)
    // },
  });

  const values = getValues();
  const salarytype = watch("salarytype");

  // var PostJob = null;
  const onPost = async(data) => {
    let postData = { ...data }; // Copy all fields from data
    if (data.salarytype === "fixed") {
      const { salaryFrom, salaryTo, salarytype, ...rest } = postData;
      postData = rest;
    } else if (data.salarytype === "range") {
      // If range salary is selected, remove fixedSalary from postData
      const { fixedSalary, salarytype, ...rest } = postData;
      postData = rest;
    }
    try {
      const res = await postJob.mutateAsync({ postData });
      toast.success(res.data.message);
      navigate("/job/me");
    } catch (error) {
      toast.error(error.message);
    } finally {
      console.log("done");
      reset();
    }
  };
  // if (data.salaryTo < data.salaryFrom) {
  //   toast.error("salary From must be less than To");
  //   return false;
  // }

  return (
    <div className="max-w-5xl mx-auto h-[85vh] p-10">
      <h1 className="text-3xl mb-5 text-center font-extrabold leading-7 text-gray-900 uppercase">
        Post new job
      </h1>
      <div className="border border-gray-900/10 rounded-md shadow-lg md:p-12 p-5">
        <form onSubmit={handleSubmit(onPost)}>
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-md font-medium leading-6 text-gray-900"
                id="title"
              >
                Job title
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="job title"
                  {...register("title")}
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                />
                {errors.title && (
                  <p className="text-red-500 hover:text-red-700 text-[17px] mt-3">
                    {errors.title.message}
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="country"
                className="block text-md font-medium leading-6 text-gray-900"
              >
                Select Category
              </label>
              <div className="mt-2">
                <select
                  id="category"
                  {...register("category")}
                  name="category"
                  autoComplete="country-name"
                  className="block w-full py-[8px] rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                >
                  <option value="">Default</option>
                  <option value={"mern"}>MERN</option>
                  <option value={"mean"}>MEAN</option>
                </select>
                {values.category == "" && (
                  <p className="text-red-500 hover:text-red-700 text-[17px] mt-3">
                    Please select a category
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="country"
                className="block text-md font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  {...register("description", { required: true })}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                  placeholder="Enter your description here..."
                />
                {errors.description && (
                  <p className="text-red-500 hover:text-red-700 text-[17px] mt-3">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="country"
                className="block text-md font-medium leading-6 text-gray-900"
              >
                Country
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="country"
                  name="country"
                  id="country"
                  {...register("country")}
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                />
                {errors.country && (
                  <p className="text-red-500 hover:text-red-700 text-[17px] mt-3">
                    {errors.country.message}
                  </p>
                )}
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="city"
                className="block text-md font-medium leading-6 text-gray-900"
              >
                City
              </label>
              <div className="mt-2">
                <input
                  id="city"
                  name="city"
                  type="text"
                  {...register("city")}
                  autoComplete="city"
                  placeholder="city"
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                />
                {errors.city && (
                  <p className="text-red-500 hover:text-red-700 text-[17px] mt-3">
                    {errors.city.message}
                  </p>
                )}
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="location"
                className="block text-md font-medium leading-6 text-gray-900"
              >
                Location
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="location"
                  id="location"
                  placeholder="location"
                  {...register("location")}
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                />
                {errors.location && (
                  <p className="text-red-500 hover:text-red-700 text-[17px] mt-3">
                    {errors.location.message}
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="salarytype"
                className="block text-md font-medium leading-6 text-gray-900"
              >
                Select Salary Type
              </label>
              <div className="mt-2">
                <select
                  id="salarytype"
                  name="salarytype"
                  {...register("salarytype")}
                  autoComplete="country-name"
                  className="block w-full rounded-md py-[8px] border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-md sm:leading-6"
                >
                  <option value="">Default</option>
                  <option value={"fixed"}>Fixed</option>
                  <option value={"range"}>Range</option>
                </select>
                {salarytype == "" && (
                  <p className="text-red-500 hover:text-red-700 text-[17px] mt-3">
                    Please select a Salary Type
                  </p>
                )}
              </div>
            </div>
            <div className="sm:col-span-4">
              {salarytype === "fixed" ? (
                <div className="mt-2">
                  <label
                    htmlFor="fixedSalary"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Fixed Salary
                  </label>
                  <input
                    type="text"
                    name="fixedSalary"
                    id="fixedSalary"
                    {...register("fixedSalary")}
                    autoComplete="off"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                  />
                  {errors.fixedSalary && (
                    <p className="text-red-500 hover:text-red-700 text-[17px] mt-3">
                      {errors.fixedSalary.message}
                    </p>
                  )}
                </div>
              ) : salarytype === "range" ? (
                <div className="" style={{ display: "flex", gap: "10px" }}>
                  <div style={{ flex: "1" }}>
                    <label
                      htmlFor="salaryFrom"
                      className="block text-md font-medium leading-6 text-gray-900 mt-2"
                    >
                      Salary From
                    </label>
                    <input
                      type="number"
                      name="salaryFrom"
                      id="salaryFrom"
                      {...register("salaryFrom")}
                      autoComplete="off"
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                    />
                    {errors.salaryFrom && (
                      <p className="text-red-500 hover:text-red-700 text-[17px] mt-3">
                        Salary From Required
                      </p>
                    )}
                  </div>
                  <div style={{ flex: "1" }}>
                    <label
                      htmlFor="salaryTo"
                      className="block text-md font-medium leading-6 text-gray-900 mt-2"
                    >
                      Salary To
                    </label>
                    <input
                      type="number"
                      name="salaryTo"
                      id="salaryTo"
                      {...register("salaryTo")}
                      autoComplete="off"
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                    />
                    {errors.salaryTo && (
                      <p className="text-red-500 hover:text-red-700 text-[17px] mt-3">
                        Salary To Required
                      </p>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <button
            type="submit"
            className="w-full text-white text-center mt-2 bg-blue-700 hover:bg-blue-900  font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
          
            Submit
          </button>
        </form>
        <DevTool control={control} />
      </div>
    </div>
  );
}

export default PostJob;
