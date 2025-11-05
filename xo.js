const message = document.getElementById("message");
const cells = [document.getElementById("cell0"), document.getElementById("cell1"), 
    document.getElementById("cell2"), document.getElementById("cell3"), 
    document.getElementById("cell4"), document.getElementById("cell5"), 
    document.getElementById("cell6"), document.getElementById("cell7"), 
    document.getElementById("cell8")];
const resetGame = document.getElementById("resetGame");
// Get the audio element from the HTML file.
const winSound = document.getElementById("winSound");
const drawSound = document.getElementById("drawSound");


let currentSymbol = "X";

function checkMatching(){
    let temp = ()=>{
        for(let cell of cells){
            // Note: In your original code, this event listener is already removed
            // in the xoClickFun. This might be redundant.
            cell.removeEventListener("click", xoClickFun);
        }
    };

    let winningCombination = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    for (let combination of winningCombination){
        let [a, b, c] = combination;
        
        let cella = cells[a];
        let cellb = cells[b];
        let cellc = cells[c];

        if(cella.textContent === cellb.textContent && cellb.textContent === cellc.textContent && (cella.textContent==="X" || cella.textContent==="O")){
            message.textContent = cella.textContent + " wins!";
            winSound.play();
            temp();
            return;
        }
    }

}

function xoClickFun(event){
    event.target.textContent = currentSymbol;
    event.target.removeEventListener("click", xoClickFun);

    if(currentSymbol === "X"){
        message.textContent = "Now it's O's turn";
        event.target.classList.add("x-sym");
        event.target.classList.remove("o-sym");
        currentSymbol = "O";
    }
    else{
        event.target.classList.add("o-sym");
        event.target.classList.remove("x-sym");
        message.textContent = "Now it's X's turn";
        currentSymbol = "X";
    }
    checkMatching();
}

for(let cell of cells){
    cell.addEventListener("click", xoClickFun);
};

resetGame.addEventListener("click", function(){
    for(let cell of cells){
        cell.textContent = "";
        cell.addEventListener("click", xoClickFun);
        cell.classList.remove("x-sym");
        cell.classList.remove("o-sym");
        currentSymbol = "X";
        message.textContent = "Now it's X's turn";
    }
});
