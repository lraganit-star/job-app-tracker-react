import { useState, useEffect } from "react";
// import { DndProvider, useDrag } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
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
  return (
    <>
      {/* <DndContext> */}
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
              <Card
                key={card.id}
                data={card}
                onDataChange={(updatedData) =>
                  onCardChange(card.id, updatedData)
                }
              />
            ))}
            {/* <DraggableCard></DraggableCard> */}
          </div>
          <div className="content phone_screen"></div>
          <div className="content technical"></div>
          <div className="content take_home"></div>
          <div className="content panel"></div>
          <div className="content offer"></div>
          <div className="content rejected"></div>
          {/* <DropZone id="card-1" data={{ label: "card-1"}}></DropZone>
          <DropZone id="card-2" data={{ label: "card-2"}}></DraggableCard> */}
        </div>
      </div>
      {/* </DndContext> */}
    </>
  );
}

// const DropZone = ({ onItemDropped }) => {
//   const [{ isOver }, drop] = useDrop({
//     accept: "ITEM",
//     drop: (item) => {
//       onItemDropped(item);
//     },
//     collect: (monitor) => ({
//       isOver: !!monitor.isOver(),
//     }),
//   });

//   return (
//     <div ref={drop}>
//       {isOver ? "Release to drop" : "Drag and drop items here"}
//     </div>
//   );
// };

function Card({ data, onDataChange }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onDataChange({ [name]: value });
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
        <div className="card" id={data.id}>
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
