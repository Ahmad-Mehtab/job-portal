import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  dltApplitionOfJobSekr,
  getApplicationsOfEmployer,
  getApplicationsOfJobSeker,
} from "../../@apis/application";
import toast from "react-hot-toast";
import ResumeModal from "./ResumeModal";

function MyApplications() {
  const { isAuthorized, currentUser } = useSelector((state) => state.user);
const [modalOpen, setModalOpen] = useState(false);
const [resumeImageUrl, setResumeImageUrl] = useState(false);
console.log('resumeImageUrl: ', resumeImageUrl);
  // console.log(currentUser.role === "Job Seeker");
  const { isPending, data, error, refetch } = useQuery({
    queryKey: ["myApplication"],
    queryFn:
      currentUser?.role === "Job Seeker"
        ? getApplicationsOfJobSeker
        : getApplicationsOfEmployer,
  });
  // console.log(data?.applications.length);


    
  const deleteApplication = useMutation({
    mutationFn: dltApplitionOfJobSekr,
    onSuccess: (data, error) => {
      toast.success(data.message)
      refetch();
    },
  });

  const openModal = (imgUrl) => {
    setModalOpen(true);
    setResumeImageUrl(imgUrl)
  }
  const closeModal = () => {
    setModalOpen(false);
  }
  if (isPending) {
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
  }
  if (error) toast.error(error.message);

  return (
    <section className="my_applications page">
      {data?.applications.length > 0 ? (
        currentUser.role === "Job Seeker" ? (
          <div className="container">
            <h1 className="text-3xl">My Applications</h1>
            {data?.applications.map((element) => (
              <JobSeekerCard element={element} key={element._id} deleteApplication={deleteApplication} openModal={openModal} />
            ))}
          </div>
        ) : (
          <div className="container">
            <h1>Applications From Job Seekers</h1>
            {data?.applications.map((element) => (
              <EmployerCard element={element} key={element._id} />
            ))}
          </div>
        )
      ) : (
        <div>
          <h1>No job exits</h1>
        </div>
      )}
    {
      modalOpen && <ResumeModal closeModal={closeModal} resumeImageUrl={resumeImageUrl}  />
    }
    </section>
  );
}

export default MyApplications;


const JobSeekerCard = ({element, deleteApplication,openModal}) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          <p>
            <span>CoverLetter:</span> {element.coverLetter}
          </p>
        </div>
        <div className="resume">
          <img
            src={element.resume.url}
            alt="resume"
            onClick={() => openModal(element.resume.url)}
          />
        </div>
        <div className="btn_area">
          <button onClick={() => deleteApplication.mutateAsync(element._id)}>
            Delete Application
          </button>
        </div>
      </div>
    </>
  );
}
const EmployerCard = ({element}) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          <p>
            <span>CoverLetter:</span> {element.coverLetter}
          </p>
        </div>
        <div className="resume">
          <img
            src={element.resume.url}
            alt="resume"
            onClick={() => openModal(element.resume.url)}
          />
        </div>
        <div className="btn_area">
          <button onClick={() => deleteApplication.mutateAsync(element._id)}>
            Delete Application
          </button>
        </div>
      </div>
    </>
  );
}