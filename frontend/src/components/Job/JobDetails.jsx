import React from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const JobDetails = () => {

  return (
    <section className="jobDetail page">
      <div className="container">
        <h3>Job Details</h3>
        <div className="banner">
          <p>
            Title: <span> </span>
          </p>
          <p>
            Category: <span></span>
          </p>
          <p>
            Country: <span></span>
          </p>
          <p>
            City: <span></span>
          </p>
          <p>
            Location: <span></span>
          </p>
          <p>
            Description: <span></span>
          </p>
          <p>
            Job Posted On: <span></span>
          </p>
    
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
