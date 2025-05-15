import { useState } from "react";

function FAQAccordion({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="faq-item" style={{ color: "white" }}>
      <div
        className="faq-question"
        onClick={() => setOpen(!open)}
        style={{ color: "white", cursor: "pointer", display: "flex", justifyContent: "space-between" }}
      >
        <span>{question}</span>
        <span>{open ? "–" : "+"}</span>
      </div>
      {open && <div className="faq-answer" style={{ color: "white", marginTop: "0.5rem" }}>{answer}</div>}
    </div>
  );
}

export default FAQAccordion;
