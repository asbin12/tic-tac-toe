const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector(".msg");
const strike = document.getElementById("strike");

let turnO = true; //player x player y
let currentStrikeClass;

const winingPattern = [
  { numb: [0, 1, 2], strikeClass: "strike-row-1" },
  { numb: [0, 3, 6], strikeClass: "strike-col-1" },
  { numb: [0, 4, 8], strikeClass: "strike-diagonal-1" },
  { numb: [1, 4, 7], strikeClass: "strike-col-2" },
  { numb: [2, 4, 6], strikeClass: "strike-diagonal-2" },
  { numb: [2, 5, 8], strikeClass: "strike-col-3" },
  { numb: [3, 4, 5], strikeClass: "strike-row-2" },
  { numb: [6, 7, 8], strikeClass: "strike-row-3" },
];

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
  if (currentStrikeClass) {
    strike.classList.remove(currentStrikeClass);
  }
};

const disabledBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.textContent = "";
  }
};

const showWinner = (winner, strikeClass) => {
  msg.textContent = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disabledBoxes();
  currentStrikeClass = strikeClass; // Store the current strikeClass
  strike.classList.add(strikeClass);
};

const checkWinner = () => {
  let winnerFound = false;

  for (let pattern of winingPattern) {
    let { numb, strikeClass } = pattern;
    let pos1Value = boxes[numb[0]].textContent;
    let pos2Value = boxes[numb[1]].textContent;
    let pos3Value = boxes[numb[2]].textContent;

    if (pos1Value !== "" && pos2Value !== "" && pos3Value !== "") {
      if (pos1Value === pos2Value && pos2Value === pos3Value) {
        showWinner(pos1Value, strikeClass);
        winnerFound = true;
        break; // Break out of the loop since a winner is found
      }
    }
  }

  if (
    !winnerFound &&
    Array.from(boxes).every((box) => box.textContent !== "")
  ) {
    // No winner found and all boxes are filled, it's a draw
    showDraw();
  }
};

const showDraw = () => {
  msg.textContent = "It's a draw!";
  msgContainer.classList.remove("hide");
  disabledBoxes();
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.textContent = "O";
      turnO = false;
    } else {
      box.textContent = "X";
      turnO = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
// const checkWinner = () => {
// strike.classList.toggle(strikeClass);
//   for (let pattern of winingPattern) {
//     let pos1Value = boxes[pattern[0]].textContent;
//     let pos2Value = boxes[pattern[1]].textContent;
//     let pos3Value = boxes[pattern[2]].textContent;

//     if (pos1Value != "" && pos2Value != "" && pos3Value != "") {
//       if (pos1Value === pos2Value && pos2Value === pos3Value) {
//         showWinner(pos1Value);
//         document.querySelector(".line").style.width = "16vw";
//         document.querySelector(
//           ".line"
//         ).style.transform = `translate(${pattern[3]}vw,${pattern[4]}vw) rotate(${pattern[5]}deg)`;
//       }
//     }
//   }
//   if (Array.from(boxes).every((box) => box.textContent !== "")) {
//     showDraw();
//   }
// };

// [0, 1, 2, 1, 3, 0],
// [0, 3, 6, -5, 9, 90],
// [0, 4, 8, 1, 9, 45],
// [1, 4, 7, 1, 9, 90],
// [2, 5, 8, 7.2, 9, 90],
// [2, 4, 6, 1, 9, 135],
// [3, 4, 5, 1, 9, 0],
// [6, 7, 8, 1, 15.2, 0],
// [1,2,3,strikeClass="strike-row-1"]
// row
