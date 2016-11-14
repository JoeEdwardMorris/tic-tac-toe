
var boardStateArray = [[1,0,1],[-1,-1,1],[0,1,-1]];
var playerValue = 1;
var moveMade = false;
var humanPlayerGo = true;

boardDisplay(boardStateArray);

function squareClicked(id){
//  if (humanPlayerGo = false) {
//    break;
//  }
  var firstIndex = 0;
  var secondIndex = 0;
  switch(id){
    case 0:
    firstIndex = 0;
    secondIndex = 0;
    break;
    case 1:
    firstIndex = 0;
    secondIndex = 1;
    break;  
    case 2:
    firstIndex = 0;
    secondIndex = 2;
    break;  
    case 3:
    firstIndex = 1;
    secondIndex = 0;
    break;  
    case 4:
    firstIndex = 1;
    secondIndex = 1;
    break;  
    case 5:
    firstIndex = 1;
    secondIndex = 2;
    break;  
    case 6:
    firstIndex = 2;
    secondIndex = 0;
    break;  
    case 7:
    firstIndex = 2;
    secondIndex = 1;
    break;  
    case 8:
    firstIndex = 2;
    secondIndex = 2;
    break;    
  }
  if (boardStateArray[firstIndex][secondIndex] === 0) {
    boardStateArray[firstIndex][secondIndex] = playerValue;
    moveMade = true;
  }
}

function boardDisplay(boardStateArray) {
    var counter = 0;
    for (var i = 0; i < boardStateArray.length; i++){
        for (var j = 0; j < boardStateArray.length; j++){
            if (boardStateArray[i][j] === -1){
                document.getElementById("n" + counter).innerHTML = "O";
            } else if (boardStateArray[i][j] === 0){
                document.getElementById("n" + counter).innerHTML = "";
            } else {
                document.getElementById("n" + counter).innerHTML = "X";
            }
            counter++;
        }
    }
}

