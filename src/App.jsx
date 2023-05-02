import { useState } from "react";
import "./App.css";

export default function Card() {
  // const [companyName, setCompanyName] = useState("");
  // const [jobTitle, setJobTitle] = useState("");
  // const [location, setLocation] = useState("");
  // const [link, setLink] = useState("");

  // return (
  //   <div className="card">
  //     <form>
  //       <input id="company_name" type="text" placeholder="Company Name" />
  //       <input id="job_title" type="text" placeholder="Job Title" />
  //       <input id="location" type="text" placeholder="Location" />
  //       <input id="link" type="text" placeholder="Link to job description" />
  //     </form>
  //   </div>

  const [username, userInput] = useInput({ type: "text" });
  const [password, passwordInput] = useInput({ type: "text" });

  return (
    <>
      {userInput} : {username} <br />
      {passwordInput} : {password}
    </>
  );
}

function useInput({ type /*...*/ }) {
  const [value, setValue] = useState("");
  const input = (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type={type}
    />
  );
  return [value, input];
}
