import { useState } from "react";
import { Board } from "./component/Board";
import { GameInformation } from "./component/GameInformation";
import { ReSet } from "./component/ReSet";
import "./styles.css";

export const App = () => {
  const [turn, setTurn] = useState(1);

  const [player, setPlayer] = useState(false);

  const [disks, setDisks] = useState([
    [0, 0, 0, 0],
    [0, 1, -1, 0],
    [0, -1, 1, 0],
    [0, 0, 0, 0],
  ]);

  return (
    <>
      <h1 className="title">Othello Game</h1>

      <ReSet setTurn={setTurn} setPlayer={setPlayer} setDisks={setDisks} />

      <Board
        player={player}
        setPlayer={setPlayer}
        disks={disks}
        setDisks={setDisks}
        turn={turn}
        setTurn={setTurn}
      />

      <GameInformation
        player={player}
        turn={turn}
        disks={disks}
        setPlayer={setPlayer}
      />
    </>
  );
};
