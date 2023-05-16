import React, { useState, useEffect } from "react";
import "./App.css";

export default function Page() {
  const [addCard, setAddCard] = useState([]);

  useEffect(() => {
    const savedCards = localStorage.getItem("savedCards");
    if (savedCards) {
      setAddCard(JSON.parse(savedCards));
    }
  }, []);

  function handleClick() {
    const newCard = { id: Date.now(), compname: "", jobtitle: "", link: "" };
    setAddCard((prevCards) => {
      const updatedCards = [...prevCards, newCard];
      localStorage.setItem("savedCards", JSON.stringify(updatedCards));
      return updatedCards;
    });
  }

  function handleCardChange(id, updatedData) {
    setAddCard((prevCards) => {
      const updatedCards = prevCards.map((card) =>
        card.id === id ? { ...card, ...updatedData } : card
      );
      localStorage.setItem("savedCards", JSON.stringify(updatedCards));
      return updatedCards;
    });
  }

  return (
    <>
      <div id="header">
        Leslie's Job Application Tracker
        <button onClick={handleClick} id="add_card">
          +
        </button>
      </div>
      <Sections cards={addCard} onCardChange={handleCardChange} />
    </>
  );
}

function Sections({ cards, onCardChange }) {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const droppedItemId = e.dataTransfer.getData("text/plain");
    const droppedItem = document.getElementById(droppedItemId);

    if (droppedItem && e.target.classList.contains("content")) {
      e.target.appendChild(droppedItem);
    }
  };

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
          <div
            className="content applied"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {cards.map((card) => (
              <Card
                key={card.id}
                data={card}
                onDataChange={(updatedData) =>
                  onCardChange(card.id, updatedData)
                }
              />
            ))}
          </div>
          <div
            className="content phone_screen"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          ></div>
          <div
            className="content technical"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          ></div>
          <div
            className="content take_home"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          ></div>
          <div
            className="content panel"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          ></div>
          <div
            className="content offer"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          ></div>
          <div
            className="content rejected"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          ></div>
        </div>
      </div>
    </>
  );
}

function Card({ data, onDataChange }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onDataChange({ [name]: value });
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", e.target.id);
  };

  const compNameInput = BuildForm({
    id: "compname",
    name: "compname",
    placeholder: "Company Name",
    value: data.compname,
    onChange: handleInputChange,
  });

  const jobTitleInput = BuildForm({
    id: "jobtitle",
    name: "jobtitle",
    placeholder: "Job Title",
    value: data.jobtitle,
    onChange: handleInputChange,
  });

  const locationInput = BuildForm({
    id: "location",
    name: "location",
    placeholder: "Office Location",
    value: data.location,
    onChange: handleInputChange,
  });

  const linkInput = BuildForm({
    id: "link",
    name: "link",
    placeholder: "Application link",
    value: data.link,
    onChange: handleInputChange,
  });

  return (
    <>
      <form>
        <div
          className="card"
          id={data.id}
          draggable={true}
          onDragStart={handleDragStart}
        >
          {compNameInput}
          {jobTitleInput}
          {locationInput}
          {linkInput}
        </div>
      </form>
    </>
  );
}

function BuildForm({ id, name, placeholder, value, onChange }) {
  const input = (
    <label key={id}>
      {placeholder}
      <input
        type="text"
        className="form"
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </label>
  );
  return input;
}
