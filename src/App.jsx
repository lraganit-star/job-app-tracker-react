import { useState } from "react";
import "./App.css";

function BuildForm({ id, placeholder }) {
  const [value, setValue] = useState("");
  const input = (
    <label>
      {placeholder}
      <input
        type="text"
        id={id}
        name={id}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
      />
    </label>
  );
  return [value, input];
}

export default function Card() {
  return (
    <>
      <div className="card">
        <form>
          <BuildForm id="compname" placeholder="Company Name" />
          <BuildForm id="jobtitle" placeholder="Job Title" />
          <BuildForm id="location" placeholder="Location of Office" />
          <BuildForm id="link" placeholder="Link to application" />
        </form>
      </div>
    </>
  );
}
