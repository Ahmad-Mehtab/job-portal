import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "../../@validationSchema/SchemaPostJob";
import { DevTool } from "@hookform/devtools";
import { useMutation } from "@tanstack/react-query";
import { doPostJob } from "../../@apis/post";

function PostJob() {
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

  var PostJob = null;
  const onPost = async(data) => {
    let postData = { ...data }; // Copy all fields from data
    if (data.salarytype === "fixed") {
      // If fixed salary is selected, remove salaryFrom and salaryTo from postData
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
      // navigate("/");
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
            {/* <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
            </svg> */}
            Submit
          </button>
        </form>
        <DevTool control={control} />
      </div>
    </div>
  );
}

export default PostJob;
