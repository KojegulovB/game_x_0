const BOX = document.querySelector(".box");
const BUTTON_X0 = document.querySelector(".box__button");

const matrix = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

function render(symbol) {
  clean(BOX);
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      if (matrix[i][j] === "") {
        BOX.innerHTML += `<div>
          <button class="box__button" id="${
            i + "" + j
          }" onclick="selectSymbol()">${symbol}</button>
        </div>`;
      }
      if (matrix[i][j] === "X") {
        BOX.insertAdjacentHTML(
          "beforeend",
          `<div><p class="symbol">X</p></div>`
        );
      }
      if (matrix[i][j] === "0") {
        BOX.insertAdjacentHTML(
          "beforeend",
          '<div><p class="symbol">0</p></div>'
        );
      }
    }
  }
}

render("X");

function clean(parent) {
  parent.innerHTML = "";
}

const selectSymbol = () => {
  const currentButton = event.target;

  const x0 = currentButton.textContent;

  const [index0, index1] = currentButton.id.split("");

  matrix[index0][index1] = x0;

  if (x0 === "X") {
    render("0");
  } else {
    render("X");
  }

  x0Win("X");

  x0Win("0");

  if (matrix.join("").replaceAll(",", "").length === 9) {
    finishHtml("Draw");
  }
};

function x0Win(sym) {
  let str = sym.repeat(3);
  let n02 = matrix[0][2];
  let n00 = matrix[0][0];
  let n11 = matrix[1][1];
  let n22 = matrix[2][2];
  let n20 = matrix[2][0];
  if (
    matrix[0].join("") === str ||
    matrix[1].join("") === str ||
    matrix[2].join("") === str ||
    n00 + matrix[1][0] + n20 === str ||
    matrix[0][1] + n11 + matrix[2][1] === str ||
    n02 + matrix[1][2] + n22 === str ||
    n00 + n11 + n22 === str ||
    n02 + n11 + n20 === str
  ) {
    finishHtml("WIN " + sym);
  }
}

const finishHtml = (text) => {
  BOX.classList.add("box__finish");
  BOX.innerHTML = `<h2>${text}</h2>`;
};

const newGame = () => {
  if (confirm("Do you want to start a new game?")) window.location.reload();
};
