import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { useMutation, useQuery } from "@tanstack/react-query";
import { doDeleteJob, getJobList } from "../../@apis/jobs";
import toast from "react-hot-toast";

// import { ProductService } from './ProductService';

function MyJobs() {
  // const [customers, setCustomers] = useState([]);
  const [visible, setVisible] = useState(false);

  const truncateStyle = {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    maxWidth: "250px", // Adjust the width as needed
  };

  const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
  const paginatorRight = <Button type="button" icon="pi pi-download" text />;

  const { isPending, data, error, refetch } = useQuery({
    queryKey: ["jobs"],
    queryFn: getJobList,
  });

  const deleteJob = useMutation({
    mutationFn: doDeleteJob,
    onSuccess: (data, error) => {
      toast.success(data.message)
      getJobList();
      refetch();
    },
  });
  useEffect(() => {
    // Trigger data refetch when the component mounts
    // getJobList();
    refetch();
  }, []);

  if (isPending)
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
  if (error) return <div>Error: {error.message}</div>;

  const actionTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <button
          className="bg-red-700 py-1 rounded-sm  px-3 text-white"
          onClick={() => setVisible(true)}
        >
          edit
        </button>
        <button
          className="bg-yellow-600  rounded-sm py-1 px-3 text-white"
          onClick={() => deleteJob.mutateAsync(rowData._id)}
        >
          Delete
        </button>
      </div>
    );
  };

  return (
    <div className="p-5 m-auto h-[50rem]">
      <div className="card my-14 mx-auto w-[90%] border">
        <DataTable
          value={data?.myJobs}
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: "50rem" }}
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
          paginatorLeft={paginatorLeft}
          paginatorRight={paginatorRight}
        >
          <Column field="title" header="Title" style={{ width: "20%" }} />
          <Column field="category" header="Category" style={{ width: "10%" }} />
          <Column
            field="description"
            header="Description"
            // className="truncate"
            // OR (using inline styles)
            style={truncateStyle}
          />
          <Column field="country" header="Country" style={{ width: "15%" }} />
          <Column field="city" header="City" style={{ width: "15%" }} />
          <Column field="location" header="Location" style={{ width: "20%" }} />
          <Column
            field="FixedSalary"
            header="FixedSalary"
            style={{ width: "20%" }}
            body={(rowData) =>
              rowData.fixedSalary ? rowData.fixedSalary : "NA"
            }
          />
          <Column
            field="SalaryFrom"
            header="SalaryFrom"
            style={{ width: "20%" }}
            body={(rowData) => (rowData.salaryFrom ? rowData.salaryFrom : "NA")}
          />
          <Column
            field="SalaryTo"
            header="SalaryTo"
            style={{ width: "20%" }}
            body={(rowData) => (rowData.salaryTo ? rowData.salaryTo : "NA")}
          />
          <Column
            field="jobPostedOn"
            header="PostingDate"
            body={(rowData) =>
              new Date(rowData.jobPostedOn).toLocaleDateString()
            }
            style={{ width: "20%" }}
          />
          <Column body={actionTemplate} header="Action" />
        </DataTable>
      </div>
      <Dialog
        // header="Header"
        visible={visible}
        onHide={() => setVisible(false)}
      >
        <h1 className="text-3xl mb-3 text-center font-extrabold text-gray-900 uppercase">
          Edit job
        </h1>
        <div className="border border-gray-900/10 rounded-md shadow-lg md:p-5 p-2">
          <form>
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
                    // {...register("title")}
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                  />
                  {/* {errors.title && (
                  <p className="text-red-500 hover:text-red-700 text-[17px] mt-3">
                    {errors.title.message}
                  </p>
                )} */}
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
                    // {...register("category")}
                    name="category"
                    autoComplete="country-name"
                    className="block w-full py-[8px] rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                  >
                    <option value="">Default</option>
                    <option value={"mern"}>MERN</option>
                    <option value={"mean"}>MEAN</option>
                  </select>
                  {/* {values.category == "" && (
                  <p className="text-red-500 hover:text-red-700 text-[17px] mt-3">
                    Please select a category
                  </p>
                )} */}
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
                    // {...register("description", { required: true })}
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                    placeholder="Enter your description here..."
                  />
                  {/* {errors.description && (
                  <p className="text-red-500 hover:text-red-700 text-[17px] mt-3">
                    {errors.description.message}
                  </p>
                )} */}
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
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                  />
                  {/* {errors.country && (
                  <p className="text-red-500 hover:text-red-700 text-[17px] mt-3">
                    {errors.country.message}
                  </p>
                )} */}
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
                    // {...register("city")}
                    autoComplete="city"
                    placeholder="city"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                  />
                  {/* {errors.city && (
                  <p className="text-red-500 hover:text-red-700 text-[17px] mt-3">
                    {errors.city.message}
                  </p>
                )} */}
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
                    // {...register("location")}
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                  />
                  {/* {errors.location && (
                  <p className="text-red-500 hover:text-red-700 text-[17px] mt-3">
                    {errors.location.message}
                  </p>
                )} */}
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
                    // {...register("salarytype")}
                    autoComplete="country-name"
                    className="block w-full rounded-md py-[8px] border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-md sm:leading-6"
                  >
                    <option value="">Default</option>
                    <option value={"fixed"}>Fixed</option>
                    <option value={"range"}>Range</option>
                  </select>
                  {/* {salarytype == "" && (
                  <p className="text-red-500 hover:text-red-700 text-[17px] mt-3">
                    Please select a Salary Type
                  </p>
                )} */}
                </div>
              </div>
              {/* <div className="sm:col-span-4">
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
            </div> */}
            </div>
            <button
              type="submit"
              className="w-full text-white text-center mt-3 bg-blue-700 hover:bg-blue-900  font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Update
            </button>
          </form>
        </div>
      </Dialog>
    </div>
  );
}

export default MyJobs;
