import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useGetJobs } from "../../@apis/jobs";
import { useQuery } from "@tanstack/react-query";

const Jobs = () => {
  const { isPending, data:jobs, error } = useQuery({
    queryKey: ['jobs'],
    queryFn: useGetJobs,
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  const allJobs = jobs.data.jobs || [];
  console.log('allJobs: ', allJobs);
  return (
    <section className="jobs page flex items-start gap-5 justify-center">
      {allJobs.map((jobData) => (
          <div key={jobData._id} className=" relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
            <div className="p-6">
              <h5 className="flex items-end justify-between mb-4 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                {jobData.title}
                <span className="text-sm text-red-600">{jobData.city}</span>
              </h5>
              <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
              {jobData.description}
              </p>
            </div>
            <div className="p-6 pt-0">
              <button
                className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                type="button"
              >
                Read More
              </button>
            </div>
          </div>
        )
      )}
    </section>
  );
};

export default Jobs;
