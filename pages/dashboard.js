import { useEffect, useState } from "react";

export default function Dashboard() {
  const [gender, setGender] = useState("");

  useEffect(() => {}, []);
  return (
    <div>
      <h1
        onClick={() => {
          setGender("male");
        }}
      >
        Hello Dashboard
      </h1>
    </div>
  );
}
