import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
const Application = () => {
  return (
    <section className="application">
      <div className="container">
        <h3>Application Form</h3>
        <form >
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <input type="number" placeholder="Your Phone Number" />
          <input type="text" placeholder="Your Address" />
          <textarea placeholder="CoverLetter..." />
          <div>
            <label
              style={{ textAlign: "start", display: "block", fontSize: "20px" }}
            >
              Select Resume
            </label>
            <input
              type="file"
              accept=".pdf, .jpg, .png"
             
              style={{ width: "100%" }}
            />
          </div>
          <button type="submit">Send Application</button>
        </form>
      </div>
    </section>
  );
};

export default Application;
