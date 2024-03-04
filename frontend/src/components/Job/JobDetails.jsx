import React from "react";
import { Link, useParams } from "react-router-dom";
import { getSingleJob } from "../../@apis/jobs";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const JobDetails = () => {
  const { id } = useParams();
  const { isAuthorized, currentUser } = useSelector((state) => state.user);

  const { isPending, data, error } = useQuery({
    queryKey: ["jobs", id], // Pass id as a part of the queryKey
    queryFn: () => getSingleJob(id),
  });

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

  const JobDetail = data.job || {};
  const jobPostedOnString = JobDetail.jobPostedOn;
  const jobPostedOn = new Date(jobPostedOnString);

  // Format options for date and time
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "UTC", // Ensure consistent formatting in UTC timezone
  };

  // Convert the date and time to a readable string
  const formattedJobPostedOn = jobPostedOn.toLocaleString("en-US", options);
  return (
    <section className="jobDetail page" style={{ minHeight: "86vh" }}>
      <main className="main bg-white px-6 md:px-16 py-6 max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-between mx-auto w-full">
          <div className="job-post w-full md:w-8/12">
            <div className="job-meta mb-4">
              <span className="text-xs text-gray-500">
                {formattedJobPostedOn}
              </span>

              <h1 className="job-title text-2xl">{JobDetail.title}</h1>

              <span className="job-type bg-teal-500 text-white p-1 text-xs mr-4">
                Full-time
              </span>
              <span className="job-location text-xs">Chicago</span>
              <span className="remote-job text-xs ml-4">Remote Job</span>
            </div>

            <div className="admin-controls block md:hidden text-sm mb-4 border-t border-b py-2">
              <h5 className="text-gray-700 mb-2">Admin controls</h5>
              <div className="controls mb-2">
                <a
                  href="#"
                  className="border border-2 text-teal-500 hover:text-white rounded border-teal-500 hover:bg-teal-500 p-1 mr-1"
                >
                  View
                </a>
                <a
                  href="#"
                  className="border border-2 text-teal-500 hover:text-white rounded border-teal-500 hover:bg-teal-500 p-1 mr-1"
                >
                  Edit
                </a>
                <a
                  href="#"
                  className="border border-2 text-teal-500 hover:text-white rounded border-teal-500 hover:bg-teal-500 p-1"
                >
                  Delete
                </a>
              </div>
            </div>

            <div className="job-description mb-1">
              <div className="flex gap-4">
                <span className="text-sm text-gray-700">
                  {JobDetail.country}
                </span>
                <span className="text-xs text-gray-700">{JobDetail.city}</span>
                <span className="text-xs text-gray-700">
                  {JobDetail.location}
                </span>
              </div>
              <p className="mb-2">{JobDetail.description}</p>
            </div>
            <div className="mb-2 flex gap-3 items-center">
              <span className="font-bold">Salary:</span>
              {JobDetail.fixedSalary ? (
                <span className="text-sm">{JobDetail.fixedSalary} PKR</span>
              ) : (
                <p className="flex gap-4 text-[15px] text-red-500 font-medium">
                  <span>{JobDetail.salaryFrom} PKR</span> -{" "}
                  <span>{JobDetail.salaryTo} PKR</span>
                </p>
              )}
            </div>
            {currentUser?.role === "Job Seeker" && (
              <Link
                to={`/application/${JobDetail._id}`}
                className="bg-teal-500 hover:bg-teal-600 text-white text-center block rounded-full py-2"
              >
                Apply for this job
              </Link>
            )}
          </div>
          {/* <div className="w-full hidden md:block md:w-3/12">
            <div className="employer-info mb-4 text-center ">
              <img
                src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                alt=""
              />
              <a href="#" className="text-sm hover:underline">
                <h3 className="employer-name text-center">Github</h3>
              </a>
            </div>

            <a
              href="#"
              className="bg-teal-500 hover:bg-teal-600 text-white text-center block rounded-full py-2 mb-4"
            >
              Apply for this job
            </a>

            <div className="admin-controls text-center text-sm">
              <h5 className="text-gray-700 mb-2">Admin controls</h5>
              <div className="controls">
                <a
                  href="#"
                  className="border border-2 text-teal-500 hover:text-white rounded border-teal-500 hover:bg-teal-500 p-1 mr-1"
                >
                  View
                </a>
                <a
                  href="#"
                  className="border border-2 text-teal-500 hover:text-white rounded border-teal-500 hover:bg-teal-500 p-1 mr-1"
                >
                  Edit
                </a>
                <a
                  href="#"
                  className="border border-2 text-teal-500 hover:text-white rounded border-teal-500 hover:bg-teal-500 p-1"
                >
                  Delete
                </a>
              </div>
            </div>
          </div> */}
        </div>
      </main>
    </section>
  );
};

export default JobDetails;
