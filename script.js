let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector(".reset");
let newGame = document.querySelector(".newGame");
let msgCont = document.querySelector(".msgCont");
let msg = document.querySelector(".msg");


let turn0 = true; // player1, player2

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    enableBoxes();
    turn0 = true;
    msgCont.classList.add("hide");
    count = 0;
}

let count = 0;

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("BTN Clicked");
        count++;
        console.log(count);

        if (turn0) {
            box.innerHTML = "O";
            box.style.color = "#7c5e93";
            turn0 = false;
        }
        else {
            box.innerHTML = "X";
            box.style.color = "#82994c";

            turn0 = true;
        }
        box.disabled = true;

        checkWinner();
    });

});




const disabledBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerHTML = "";
    }
}

const showWinner = (winner) => {
    msg.style.color = "#e4cc0f"
    msg.innerHTML = `Congratulations Winner is ${winner}`;
    msgCont.classList.remove("hide");
    disabledBoxes();
};

const tieWinner = () => {
    msg.style.color = "#993737"
    msg.innerHTML = `The Match is tie`;
}

const checkWinner = () => {
    let isWinner = false;
    for (let pattern of winPatterns) {

        let pos1Val = boxes[pattern[0]].innerHTML;
        let pos2Val = boxes[pattern[1]].innerHTML;
        let pos3Val = boxes[pattern[2]].innerHTML;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("Winner", pos1Val);
                isWinner = true;
                showWinner(pos1Val);
                break;
            }

        }

        if (count === 9 && !isWinner) {
            tieWinner();
            msgCont.classList.remove("hide");
            disabledBoxes();
        }
    }
};


resetbtn.addEventListener("click", resetGame);
newGame.addEventListener("click", resetGame);