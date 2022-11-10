export const Board = (props) => {
  const { player, setPlayer, disks, setDisks, turn, setTurn } = props;

  const diskDesign = (disk) => {
    switch (disk) {
      case 1:
        return <div className="white-dick"></div>;
      case -1:
        return <div className="black-dick"></div>;
      default:
        return "";
    }
  };

  const putDisk = (i, j, disk) => {
    if (disk !== 0) return;

    const under = judgmentUnderDicks(i, j, disks, player);

    const up = judgmentUpDicks(i, j, disks, player);

    const right = judgmentRightDicks(i, j, disks, player);

    const left = judgmentLeftDicks(i, j, disks, player);

    const upperright = judgmentUpperrightDicks(i, j, disks, player);

    const upperleft = judgmentUpperleftDicks(i, j, disks, player);

    const lowerright = judgmentLowerrightDicks(i, j, disks, player);

    const lowerleft = judgmentLowerleftDicks(i, j, disks, player);

    if (
      up +
        under +
        right +
        left +
        upperleft +
        upperright +
        lowerleft +
        lowerright ===
      8
    )
      return;

    const reverseDisks = (disks) =>
      disks.map((diskRow, m) => {
        return diskRow.map((disk, n) => {
          if (m === i && n === j) {
            return player ? 1 : -1;
          } else if (under > 1 && n === j && m > i && m < i + under) {
            return player ? 1 : -1;
          } else if (up > 1 && n === j && m < i && m > i - up) {
            return player ? 1 : -1;
          } else if (right > 1 && m === i && n > j && n < j + right) {
            return player ? 1 : -1;
          } else if (left > 1 && m === i && n < j && n > j - left) {
            return player ? 1 : -1;
          } else if (
            (upperright === 2 || upperright === 3) &&
            m === i - 1 &&
            n === j + 1
          ) {
            return player ? 1 : -1;
          } else if (upperright === 3 && m === i - 2 && n === j + 2) {
            return player ? 1 : -1;
          } else if (
            (upperleft === 2 || upperleft === 3) &&
            m === i - 1 &&
            n === j - 1
          ) {
            return player ? 1 : -1;
          } else if (upperleft === 3 && m === i - 2 && n === j - 2) {
            return player ? 1 : -1;
          } else if (
            (lowerright === 2 || lowerright === 3) &&
            m === i + 1 &&
            n === j + 1
          ) {
            return player ? 1 : -1;
          } else if (lowerright === 3 && m === i + 2 && n === j + 2) {
            return player ? 1 : -1;
          } else if (
            (lowerleft === 2 || lowerleft === 3) &&
            m === i + 1 &&
            n === j - 1
          ) {
            return player ? 1 : -1;
          } else if (lowerleft === 3 && m === i + 2 && n === j - 2) {
            return player ? 1 : -1;
          }
          return disk;
        });
      });

    setDisks(reverseDisks);

    setPlayer(!player);
    setTurn(turn + 1);
  };

  return (
    <dis key="disks" className="board">
      {disks.map((diskRow, i) => {
        return (
          <div key={i.toString()} className="button-row">
            {diskRow.map((disk, j) => {
              return (
                <button key={j.id} onClick={() => putDisk(i, j, disk)}>
                  {diskDesign(disk)}
                </button>
              );
            })}
          </div>
        );
      })}
    </dis>
  );
};

const judgmentUnderDicks = (i, j, dicks, player) => {
  for (let l = 0; l + i < 4; l++) {
    if (l === 0) {
      if (i === 3 || i === 2) {
        return 1;
      }
    } else {
      if (player ? dicks[i + l][j] === -1 : dicks[i + l][j] === 1) {
        if (l + i === 3) {
          return 1;
        }
        if (player ? dicks[i + l + 1][j] === 1 : dicks[i + +l + 1][j] === -1) {
          return 1 + l;
        }
      } else {
        return 1;
      }
    }
  }
};

const judgmentUpDicks = (i, j, dicks, player) => {
  for (let l = 0; l + i >= 0; l--) {
    if (l === 0) {
      if (i === 0 || i === 1) {
        return 1;
      }
    } else {
      if (player ? dicks[i + l][j] === -1 : dicks[i + l][j] === 1) {
        if (l + i === 0) {
          return 1;
        }
        if (player ? dicks[i + l - 1][j] === 1 : dicks[i + l - 1][j] === -1) {
          return 1 - l;
        }
      } else {
        return 1;
      }
    }
  }
};

const judgmentRightDicks = (i, j, dicks, player) => {
  for (let l = 0; l + j < 4; l++) {
    if (l === 0) {
      if (j === 2 || j === 3) {
        return 1;
      }
    } else {
      if (player ? dicks[i][j + l] === -1 : dicks[i][j + l] === 1) {
        if (l + j === 3) {
          return 1;
        }
        if (player ? dicks[i][j + l + 1] === 1 : dicks[i][j + l + 1] === -1) {
          return 1 + l;
        }
      } else {
        return 1;
      }
    }
  }
};

const judgmentLeftDicks = (i, j, dicks, player) => {
  for (let l = 0; l + j >= 0; l--) {
    if (l === 0) {
      if (j === 0 || j === 1) {
        return 1;
      }
    } else {
      if (player ? dicks[i][j + l] === -1 : dicks[i][j + l] === 1) {
        if (l + j === 0) {
          return 1;
        }
        if (player ? dicks[i][j + l - 1] === 1 : dicks[i][j + l - 1] === -1) {
          return 1 - l;
        }
      } else {
        return 1;
      }
    }
  }
};

const judgmentUpperrightDicks = (i, j, dicks, player) => {
  if (
    ((i === 2 && j === 0) || (i === 3 && j === 1) || (i === 3 && j === 0)) &&
    (player ? dicks[i - 1][j + 1] === -1 : dicks[i - 1][j + 1] === 1) &&
    (player ? dicks[i - 2][j + 2] === 1 : dicks[i - 2][j + 2] === -1)
  ) {
    return 2;
  } else if (
    i === 3 &&
    j === 0 &&
    (player ? dicks[i - 1][j + 1] === -1 : dicks[i - 1][j + 1] === 1) &&
    (player ? dicks[i - 2][j + 2] === -1 : dicks[i - 2][j + 2] === 1) &&
    (player ? dicks[i - 3][j + 3] === 1 : dicks[i - 3][j + 3] === -1)
  ) {
    return 3;
  } else {
    return 1;
  }
};

const judgmentUpperleftDicks = (i, j, dicks, player) => {
  if (
    ((i === 2 && j === 3) || (i === 3 && j === 2) || (i === 3 && j === 3)) &&
    (player ? dicks[i - 1][j - 1] === -1 : dicks[i - 1][j - 1] === 1) &&
    (player ? dicks[i - 2][j - 2] === 1 : dicks[i - 2][j - 2] === -1)
  ) {
    return 2;
  } else if (
    i === 3 &&
    j === 3 &&
    (player ? dicks[i - 1][j - 1] === -1 : dicks[i - 1][j - 1] === 1) &&
    (player ? dicks[i - 2][j - 2] === -1 : dicks[i - 2][j - 2] === 1) &&
    (player ? dicks[i - 3][j - 3] === 1 : dicks[i - 3][j - 3] === -1)
  ) {
    return 3;
  } else {
    return 1;
  }
};

const judgmentLowerrightDicks = (i, j, dicks, player) => {
  if (
    ((i === 0 && j === 1) || (i === 1 && j === 0) || (i === 0 && j === 0)) &&
    (player ? dicks[i + 1][j + 1] === -1 : dicks[i + 1][j + 1] === 1) &&
    (player ? dicks[i + 2][j + 2] === 1 : dicks[i + 2][j + 2] === -1)
  ) {
    return 2;
  } else if (
    i === 0 &&
    j === 0 &&
    (player ? dicks[i + 1][j + 1] === -1 : dicks[i + 1][j + 1] === 1) &&
    (player ? dicks[i + 2][j + 2] === -1 : dicks[i + 2][j + 2] === 1) &&
    (player ? dicks[i + 3][j + 3] === 1 : dicks[i + 3][j + 3] === -1)
  ) {
    return 3;
  } else {
    return 1;
  }
};

const judgmentLowerleftDicks = (i, j, dicks, player) => {
  if (
    ((i === 1 && j === 3) || (i === 0 && j === 2) || (i === 0 && j === 3)) &&
    (player ? dicks[i + 1][j - 1] === -1 : dicks[i + 1][j - 1] === 1) &&
    (player ? dicks[i + 2][j - 2] === 1 : dicks[i + 2][j - 2] === -1)
  ) {
    return 2;
  } else if (
    i === 0 &&
    j === 3 &&
    (player ? dicks[i + 1][j - 1] === -1 : dicks[i + 1][j - 1] === 1) &&
    (player ? dicks[i + 2][j - 2] === -1 : dicks[i + 2][j - 2] === 1) &&
    (player ? dicks[i + 3][j - 3] === 1 : dicks[i + 3][j - 3] === -1)
  ) {
    return 3;
  } else {
    return 1;
  }
};
