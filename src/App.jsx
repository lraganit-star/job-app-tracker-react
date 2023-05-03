import { useState } from "react";
import "./App.css";

function BuildForm({ id, placeholder }) {
  const [value, setValue] = useState("");
  const input = (
    <label key={id}>
      {placeholder}
      <input
        type="text"
        className="form"
        id={id}
        name={id}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
      />
    </label>
  );
  return [value, input];
}

// need to add functionality to button
export default function Page() {
  function handleClick() {
    // Card();
  }

  return (
    <>
      <div id="header">
        Leslie's Job Application Tracker
        <button onClick={handleClick} id="add_card">
          +
        </button>
      </div>
      <SectionHeaders></SectionHeaders>
    </>
  );
}

function SectionHeaders() {
  return (
    <>
      <div id="sectionHeaders">
        <div className="sectionHeader applied">
          Applied
          <div className="section applied"></div>
        </div>
        <div className="sectionHeader phone_screen">
          Phone Screen
          <div className="section phone_screen"></div>
        </div>
        <div className="sectionHeader technical">
          Technical Interview
          <div className="section technical"></div>
        </div>
        <div className="sectionHeader take_home">
          Take Home
          <div className="section take_home"></div>
        </div>
        <div className="sectionHeader panel">
          Panel Interview
          <div className="section panel"></div>
        </div>
        <div className="sectionHeader offer">
          Job Offer
          <div className="section offer"></div>
        </div>
        <div className="sectionHeader rejected">
          Rejected
          <div className="section rejected"></div>
        </div>
      </div>
    </>
  );
}

function Card() {
  const [compname, setCompname] = useState("");
  const [jobtitle, setJobtitle] = useState("");
  const [location, setLocation] = useState("");
  const [link, setLink] = useState("");

  const [compNameVal, compnameInput] = BuildForm({
    id: "compname",
    placeholder: "Company Name",
    value: compname,
    setValue: setCompname,
  });
  const [jobTitleVal, jobtitleInput] = BuildForm({
    id: "jobtitle",
    placeholder: "Job Title",
    value: jobtitle,
    setValue: setJobtitle,
  });
  const [locationVal, locationInput] = BuildForm({
    id: "location",
    placeholder: "Office Location",
    value: location,
    setValue: setLocation,
  });
  const [linkVal, linkInput] = BuildForm({
    id: "link",
    placeholder: "Application link",
    value: link,
    setValue: setLink,
  });

  return (
    <>
      <form>
        <div className={`card ${compname}`}>
          {compnameInput}
          {jobtitleInput}
          {locationInput}
          {linkInput}
        </div>
      </form>
    </>
  );
}
