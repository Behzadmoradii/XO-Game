let cells = document.getElementsByClassName("item");
let message = document.getElementById("title");
let turn = "X";
let isEnd = false;
let winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const checkWon = () => {
  let isWon = winningConditions.some(winningCondition => {
    let turnClass = "fill-" + turn;
    let isWinning = winningCondition.every(index => {
      return cells[index].classList.contains(turnClass);
    });
    return isWinning;
  });

  return isWon;
};

const checkDraw = () => {
  let conter = 0;

  for (let i = 0; i < cells.length; i++) {
    let cell = cells[i];
    if (
      cell.classList.contains("fill-X") ||
      cell.classList.contains("fill-O")
    ) {
      conter++;
    }
  }

  if (conter === 9) {
    return true;
  } else {
    return false;
  }
};

for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener(
    "click",
    e => {
      let cell = e.target;
      if (isEnd) return;
      cell.classList.add(`fill-${turn}`);
      cells[i].style.cursor = "not-allowed";
      if (isEnd) return;

      if (checkWon()) {
        message.textContent = `${turn} is win`;
        allowed();
        isEnd = true;
      } else if (checkDraw()) {
        message.textContent = `Match is equal`;
        isEnd = true;
      } else {
        turn = turn === "X" ? "O" : "X";
        message.textContent = `Turn is ${turn}`;
      }
    },
    { once: true }
  );
}

const allowed = () => {
  for (let i = 0; i < cells.length; i++) {
    cells[i].style.cursor = "not-allowed";
  }
};
