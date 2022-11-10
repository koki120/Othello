export const GameInformation = (props) => {
  const { player, turn, disks, setPlayer } = props;

  const pass = () => {
    setPlayer(!player);
  };

  return (
    <>
      <div className="playertext">
        <h2 key="">player : </h2>
        <h2 key="playertext" className="title1">
          {player ? " white" : " black"}
        </h2>
        <button className="passbutton" onClick={pass}>
          pass
        </button>
      </div>

      <h1 key="playertexttotal" className="title">
        {turn === 13 && finaltext(disks)}
      </h1>
    </>
  );
};

const finaltext = (disks) => {
  let total = 0;

  for (let m = 0; m < 4; m++) {
    for (let n = 0; n < 4; n++) {
      total += disks[m][n];
    }
  }

  if (total > 0) {
    return "winner : white";
  } else if (total < 0) {
    return "winner : black";
  } else {
    return "Drow";
  }
};
