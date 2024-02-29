import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllJobs } from "../../@apis/jobs";
import { useQuery } from "@tanstack/react-query";

const Jobs = () => {
  const { isPending, data:jobs, error } = useQuery({
    queryKey: ['jobs'],
    queryFn: getAllJobs,
  });

  if (isPending) return <div
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
</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  const allJobs = jobs?.data?.jobs || [];
  return (
    <section className="jobs page flex items-start gap-5 justify-center">
      {allJobs && allJobs?.map((jobData) => (
          <div key={jobData._id} className=" relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
            <div className="p-6">
              <h5 className="flex items-end justify-between mb-4 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                {jobData.title}
                <span className="text-sm text-red-600">{jobData.city}</span>
              </h5>
              <p className="truncate block font-sans text-base antialiased font-light leading-relaxed text-inherit">
              {jobData.description}
              </p>
            </div>
            <div className="p-6 pt-0">
              <Link to={`/job/${jobData._id}`}>
            
              <button
                className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                type="button"
              >
                Read More
              </button>
              </Link>
            </div>
          </div>
        )
      )}
    </section>
  );
};

export default Jobs;
