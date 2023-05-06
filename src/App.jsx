import { useState, useEffect } from "react";
// import { DndProvider, useDrag } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";

function BuildForm({ id, placeholder }) {
  const [value, setValue] = useState("");

  const handleInputBlur = () => {
    localStorage.setItem("savedInput", value);
  };

  useEffect(() => {
    const savedValue = localStorage.getItem("savedInput");
    if (savedValue) {
      setValue(savedValue);
    }
  }, []);

  const input = (
    <label key={id}>
      {placeholder}
      <input
        type="text"
        className="form"
        id={id}
        name={id}
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleInputBlur}
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
              <Card key={card.id} />
            ))}
            {/* <DraggableCard></DraggableCard> */}
          </div>
          <Card></Card>
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
        <div className={compname + "card"} id={Date.now()}>
          {compnameInput}
          {jobtitleInput}
          {locationInput}
          {linkInput}
        </div>
      </form>
    </>
  );
}
