import React from "react";

function PostJob() {
  return (
    <div className="max-w-5xl mx-auto my-5 h-100 p-10">
      <h1 className="text-3xl mb-5 text-center font-extrabold leading-7 text-gray-900 uppercase">
        Post new job
      </h1>
      <div className="border border-gray-900/10 rounded-md shadow-lg p-12">
        <form action="">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-md font-medium leading-6 text-gray-900"
                id="job-title"
              >
                Job title
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                />
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
                  name="category"
                  autoComplete="country-name"
                  className="block w-full py-[8px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                >
                  <option>Default</option>
                  <option>MERN</option>
                  <option>MEAN</option>
                </select>
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
                  name="country"
                  id="country"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                />
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
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                />
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
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="country"
                className="block text-md font-medium leading-6 text-gray-900"
              >
                Select Salary Type
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="block w-full rounded-md py-[8px] border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-md sm:leading-6"
                >
                  <option>Default</option>
                  <option>Fixed</option>
                  <option>Range</option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostJob;
