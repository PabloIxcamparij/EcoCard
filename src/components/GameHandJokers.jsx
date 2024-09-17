import { Button } from "@nextui-org/react";

export default function GameJokers({ Joker }) {
  return (
    <div
      className="flex flex-col p-2 w-full h-full rounded-lg text-black text-center text-wrap"
      style={{ backgroundColor: Joker.color }}
    >
      <h1 className="text-xl font-bold">{Joker.title}</h1>
      <p>{Joker.description}</p>
    </div>
  );
}
