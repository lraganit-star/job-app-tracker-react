import React, { useState, useEffect } from "react";
import "./App.css";

export default function Page() {
  const [addCardInfo, setAddCardInfo] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedCards = localStorage.getItem("savedCards");
    if (savedCards) {
      setAddCardInfo(JSON.parse(savedCards));
    }
  }, []);

  function handleClick() {
    const newCard = {
      id: Date.now(),
      compname: "",
      jobtitle: "",
      link: "",
      sectionType: "applied",
    };

    setAddCardInfo((prevCards) => {
      const updatedCards = [...prevCards, newCard];
      localStorage.setItem("savedCards", JSON.stringify(updatedCards));
      return updatedCards;
    });
  }

  function handleCardChange(id, updatedData) {
    setAddCardInfo((prevCards) => {
      const updatedCards = prevCards.map((card) =>
        card.id === id ? { ...card, ...updatedData } : card
      );
      localStorage.setItem("savedCards", JSON.stringify(updatedCards));
      return updatedCards;
    });
  }

  const deleteCard = (id) => {
    const updatedCards = addCardInfo.filter((card) => card.id !== id);
    localStorage.setItem("savedCards", JSON.stringify(updatedCards));
    setAddCardInfo(updatedCards);
  };

  const toggleDropDown = () => setIsOpen(!isOpen);

  return (
    <>
      <div id="headers">
        <div id="mainHeader">
          <div id="mainHeaderContent">
            <div id="dropDownContainer">
              <button id="dropDownButton" onClick={toggleDropDown}>
                <img id="dropDownImage" src="/three_midjourne.png"></img>
                {isOpen && (
                  <div id="dropDownContent">
                    <a href="#appliedNav" className="dropDownElement">
                      Applied
                    </a>
                    <a href="#phoneScreenNav" className="dropDownElement">
                      Phone Screen
                    </a>
                    <a href="#technicalNav" className="dropDownElement">
                      Technical
                    </a>
                    <a href="#takeHomeNav" className="dropDownElement">
                      Take Home
                    </a>
                    <a href="#panelNav" className="dropDownElement">
                      Panel Interview
                    </a>
                    <a href="#offerNav" className="dropDownElement">
                      Offer
                    </a>
                    <a href="#rejectedNav" className="dropDownElement">
                      Rejected
                    </a>
                  </div>
                )}
              </button>
            </div>

            <img id="mainHeaderIcon" src="/mascot.png"></img>
            <div id="mainHeaderTitle">
              Leslie's Lovely Jobquest
              <button id="addCard" onClick={handleClick}>
                +
              </button>
            </div>
          </div>
        </div>
        <div id="sectionHeader">
          <div id="sectionHeaders">
            <div className="header applied" id="appliedNav">
              Applied
            </div>
            <div className="header phone_screen" id="phoneScreenNav">
              Phone Screen
            </div>
            <div className="header technical" id="technicalNav">
              Technical Interview
            </div>
            <div className="header take_home" id="takeHomeNav">
              Take Home
            </div>
            <div className="header panel" id="panelNav">
              Panel Interview
            </div>
            <div className="header offer" id="offerNav">
              Job Offer
            </div>
            <div className="header rejected" id="rejectedNav">
              Rejected
            </div>
          </div>
        </div>
      </div>
      <Sections
        cards={addCardInfo}
        onSectionChange={handleCardChange}
        onDelete={deleteCard}
      />

      <div id="footer">
        <div id="footerMessage">I hope you have a fun time job hunting!</div>
      </div>
    </>
  );
}

function Sections({ cards, onSectionChange, onDelete }) {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const droppedSection = e.target;
    const droppedItemId = e.dataTransfer.getData("text/plain");

    if (droppedSection.classList.contains("content")) {
      const newSection = droppedSection.classList[1];
      const cardId = Number.parseInt(droppedItemId);

      onSectionChange(cardId, { sectionType: newSection });
    }
  };

  function renderCards(sectionType) {
    return cards
      .filter((card) => card.sectionType === sectionType)
      .map((card) => (
        <Card
          key={card.id}
          cardData={card}
          onDataChange={(updatedData) => onSectionChange(card.id, updatedData)}
          onDelete={onDelete}
          cardId={card.id}
        />
      ));
  }

  return (
    <>
      <div id="sectionContent">
        <div
          className="content applied"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {renderCards("applied")}
          {/* <div id="mock_card">
            <div id="mockCardContent">
              <img id="cardIcon" src="/mascot.png"></img>
            </div>
          </div> */}
        </div>
        <div
          className="content phone_screen"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {renderCards("phone_screen")}
        </div>
        <div
          className="content technical"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {renderCards("technical")}
        </div>
        <div
          className="content take_home"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {renderCards("take_home")}
        </div>
        <div
          className="content panel"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {renderCards("panel")}
        </div>
        <div
          className="content offer"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {renderCards("offer")}
        </div>
        <div
          className="content rejected"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {renderCards("rejected")}
        </div>
      </div>
    </>
  );
}

function Card({ cardData, onDataChange, onDelete, cardId }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onDataChange({ [name]: value });
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", e.target.id);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    onDelete(cardId);
  };

  return (
    <>
      <div
        className="card"
        id={cardData.id}
        draggable={true}
        onDragStart={handleDragStart}
      >
        <button id="deletecard" onClick={handleDelete}>
          x
        </button>
        <form>
          <div>
            <BuildForm
              formid="compname"
              type="text"
              imgSrc="/briefcase_midjourney.png"
              name="compname"
              placeholder="Company Name"
              value={cardData.compname}
              onChange={handleInputChange}
            />
            <BuildForm
              formid="jobtitle"
              type="text"
              imgSrc="/id_midjourney.png"
              name="jobtitle"
              placeholder="Job Title"
              value={cardData.jobtitle}
              onChange={handleInputChange}
            />
            <BuildForm
              formid="link"
              type="url"
              imgSrc="/chain_midjourney.png"
              name="link"
              placeholder="Application Link"
              value={cardData.link}
              onChange={handleInputChange}
            />
            <BuildForm
              formid="applydate"
              type="date"
              imgSrc="/calendar_midjourney.png"
              name="applydate"
              placeholder="Application Date"
              value={cardData.applydate}
              onChange={handleInputChange}
            />
            <BuildForm
              formid="location"
              type="text"
              imgSrc="/building_midjourney.png"
              name="location"
              placeholder="Office Location"
              value={cardData.location}
              onChange={handleInputChange}
            />
            <BuildForm
              formid="notes"
              type="text"
              imgSrc="/notebook_midjourney.png"
              name="notes"
              placeholder="Notes"
              value={cardData.notes}
              onChange={handleInputChange}
            />
          </div>
        </form>
      </div>
    </>
  );
}

function BuildForm({
  formid,
  type,
  imgSrc,
  name,
  placeholder,
  value,
  onChange,
}) {
  const handleMouseEnter = (e) => {
    const tooltip = e.currentTarget.querySelector(".tooltip");
    tooltip.style.display = "block";
    tooltip.style.opacity = 1;
  };

  const handleMouseLeave = (e) => {
    const tooltip = e.currentTarget.querySelector(".tooltip");
    tooltip.style.display = "none";
    tooltip.style.opacity = 0;
  };

  return (
    <>
      <div className="form_layout">
        <img className="icons" src={imgSrc} alt={name}></img>
        <div
          className="input_container"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <label key={formid}>
            {formid === "notes" ? (
              <textarea
                type={type}
                className="form"
                id={formid}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
              />
            ) : (
              <input
                type={type}
                className="form"
                id={formid}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
              />
            )}
          </label>
          <span
            className="tooltip"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {placeholder}
          </span>
        </div>
      </div>
    </>
  );
}
