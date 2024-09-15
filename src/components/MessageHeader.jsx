import React from "react";

function MessageHeader({title, score}) {
  return (
    <div className="felx flex-col w-2/4 text-danger font-bold text-xl text-center">
      <h1>{title}</h1>
      <h1>{score}</h1>
    </div>
  );
}

export default MessageHeader;
