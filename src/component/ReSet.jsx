export const ReSet = (props) => {
  const { setTurn, setPlayer, setDisks } = props;

  const reset = () => {
    setTurn(1);

    setPlayer(false);

    setDisks([
      [0, 0, 0, 0],
      [0, 1, -1, 0],
      [0, -1, 1, 0],
      [0, 0, 0, 0],
    ]);
  };

  return (
    <button key="resetbutton" className="resetbutton" onClick={reset}>
      reset
    </button>
  );
};
