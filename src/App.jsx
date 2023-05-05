import { useState } from "react";
import React, { Component } from "react";
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

export default function Page() {
  const [addCard, setAddCard] = useState([]);

  function handleClick() {
    setAddCard((prevCards) => [...prevCards, { id: Date.now() }]);
  }

  return (
    <>
      <div id="header">
        Leslie's Job Application Tracker
        <button onClick={handleClick} id="add_card">
          +
        </button>
      </div>
      <Sections cards={addCard} />
    </>
  );
}

function Sections({ cards }) {
  return (
    <>
      <div id="sections">
        <div id="sectionHeaders">
          <div className="sectionHeader applied">Applied</div>
          <div className="sectionHeader phone_screen">Phone Screen</div>
          <div className="sectionHeader technical">Technical Interview</div>
          <div className="sectionHeader take_home">Take Home</div>
          <div className="sectionHeader panel">Panel Interview</div>
          <div className="sectionHeader offer">Job Offer</div>
          <div className="sectionHeader rejected">Rejected</div>
        </div>
        <div id="sectionContent">
          <div className="content applied">
            {cards.map((card) => (
              <Card key={card.id} />
            ))}
          </div>
          <div className="content phone_screen"></div>
          <div className="content technical"></div>
          <div className="content take_home"></div>
          <div className="content panel"></div>
          <div className="content offer"></div>
          <div className="content rejected"></div>
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
        <div className={compname} id="card">
          {compnameInput}
          {jobtitleInput}
          {locationInput}
          {linkInput}
        </div>
      </form>
    </>
  );
}
