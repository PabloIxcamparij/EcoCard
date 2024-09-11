import React from "react";

function MessageHeader({title, score}) {
  return (
    <div className="felx flex-col">
      <h1 className="text-danger font-bold text-xl">{title}</h1>
      <h1 className="text-danger font-bold text-xl text-center">{score}</h1>
    </div>
  );
}

export default MessageHeader;
