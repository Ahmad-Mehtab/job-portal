import React from "react";

const ResumeModal = ({resumeImageUrl, closeModal }) => {
  return (
    <div className="resume-modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <img src={resumeImageUrl} alt="resume" />
      </div>
    </div>
  );
};

export default ResumeModal;
