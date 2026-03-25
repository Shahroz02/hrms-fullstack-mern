import { useState } from "react";
import "../styles/Attendance.css";

const Attendance = () => {
  const [present, setPresent] = useState(false);

  return (
    <div className="attendance-heading">
      <h2>Attendance</h2>

      <button onClick={() => setPresent(true)}>
        Mark Present
      </button>

      {present && <p>You are marked present today.</p>}
    </div>
  );
};

export default Attendance;
