
var boardStateArray = [[0,0,0],[0,0,0],[0,0,0]];
var playerValue = 1; //1 == X; -1 == O;
var moveMade = false;
var humanPlayerGo = true;
var humanValue = 1;
var turnsCounter = 1;
var isGameFinished = false;

boardDisplay(boardStateArray);

while (isGameFinished === false){
    moveMade = false;
    if (humanValue === playerValue){
        humanPlayerGo = true;
        while (moveMade === false){

        }
    humanPlayerGo = false;
    } else {
        computerStrategies(boardStateArray, playerValue);
    }
    boardDisplay(boardStateArray);
    if (hasPlayerWon (boardStateArray, playerValue)){
        isGameFinished = true;
        if (playerValue === humanValue){
            alert("You have won!");
            break;
        } else {
            alert("Computer has won!");
            break;
        }
    } if (turnsCounter > 8){
        isGameFinished = true;
        alert("It's a draw!");
        break;
    }
    turnsCounter++;
}

function squareClicked(id){
  if (humanPlayerGo = false) {
    break;
  }
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

function computerStrategies (boardStateArray, playerValue) {

    // initialise flag that alerts functions to skip once a move has been made
    var moveMadeYet = false;

    // turn order

    //1 WIN
    boardStateArray = strategy1Win2BlockCombo (boardStateArray, playerValue, 1);
    //2 BLOCK
    boardStateArray = strategy1Win2BlockCombo (boardStateArray, playerValue, -1);
    //3 FORK
    boardStateArray = strategy3Fork4BlockCombo (boardStateArray, playerValue, 1, true);
    //4(i) BLOCK FORK
    boardStateArray = strategy3Fork4BlockCombo (boardStateArray, playerValue, -1, true);
    //4(ii) TWO IN A ROW
    boardStateArray = strategy3Fork4BlockCombo (boardStateArray, playerValue, 1, false);
    //5 CENTRE
    boardStateArray = strategy5Centre (boardStateArray, playerValue);
    //6 OPPOSITE CORNER
    boardStateArray = strategy6OppositeCorner (boardStateArray, playerValue);
    //7 EMPTY CORNER
    boardStateArray = strategy7EmptyCorner (boardStateArray, playerValue);
    //8 EMPTY SIDE
    boardStateArray = strategy8EmptySide (boardStateArray, playerValue);    

    return boardStateArray;

    function strategy1Win2BlockCombo (boardStateArray, playerValue, flag) {
        // skip function if move made already
        if (moveMadeYet === true) {return boardStateArray;}
        // desired score = 2 * player or opponent value (2 in a row)
        // multiplying by -1 gets us the opponents player value
        var targetScore = 2 * (playerValue * flag);

        // *** ROWS ***
        // iterate through rows, [[i=0],[i=1],[i=2]]
        for (var i = 0; i < boardStateArray.length; i++) {
            // if row adds up to 3 * player value, has won, return true
            if (boardStateArray[i].reduce(function (a, b) {
                    return a + b;
                    }) === targetScore) {
                //iterate through row to find empty square, 
                // place player value in empty square and return.
                for (var j = 0; j < boardStateArray[i].length; j++) {
                    if (boardStateArray[i][j] === 0) {
                        boardStateArray[i][j] = playerValue;
                        break;
                    }
                }
                moveMadeYet = true;
                return boardStateArray;
            }
        }

        // *** COLUMNS ***
        // iterate through columns [j][i] - eg [0][0] + [1][0] + [2][0] 
        var currentScore = 0
        // iterate through inner array for second index
        for (i = 0; i < boardStateArray[0].length; i++) {
            // reset column score for new column
            currentScore = 0
            // iterate through outer array for first index
            for (j = 0; j < boardStateArray.length; j++) {
                // add current element to column score
                currentScore += boardStateArray[j][i];
            }
            // Does column sum to 2 * player value?
            if (currentScore === targetScore) {
                //Look through column for empty square
                //Place player piece and return array 
                for (var k = 0; k < boardStateArray.length; k++) {
                    if (boardStateArray[k][i] === 0) {
                        boardStateArray[k][i] = playerValue;
                        break;
                    }
                }
                moveMadeYet = true;         
                return boardStateArray;
            }

        }

        // *** DIAGONALS ***

        // FORWARD DIAGONAL
        var diagonalSum = boardStateArray[0][0] + boardStateArray[1][1] + boardStateArray[2][2];

        if (diagonalSum === targetScore) {
            for (i = 0; i < boardStateArray.length; i++) {
                if (boardStateArray[i][i] === 0) {
                    boardStateArray[i][i] = playerValue;
                    moveMadeYet = true;
                    return boardStateArray;
                }
            }
        }

        // REVERSE DIAGONAL
        diagonalSum = boardStateArray[0][2] + boardStateArray[1][1] + boardStateArray[2][0];

        if (diagonalSum === targetScore) {
            for (i = 0; i < boardStateArray.length; i++) {
                if (boardStateArray[i][2-i] === 0) {
                    boardStateArray[i][2-i] = playerValue;
                    moveMadeYet = true;
                    return boardStateArray;
                }
            }
        }
        // if no win possibility found, return array unchanged
        return boardStateArray;
    }

    function strategy3Fork4BlockCombo (boardStateArray, playerValue, flag, fork) {
        // skip function if move made already
        if (moveMadeYet === true) {return boardStateArray;}     
        // desired score = 1 * player value (1 in a row)
        var targetScore = playerValue * flag;
        var opponent = playerValue * -1 * flag;
        // initialise target coordinates
        var targetCoordinates = [];
        // initialise final coordinates
        var finalCoordinates = [];
        // flag to indicate if opponent found in each search
        // so we can ignore that search if so.
        var opponentFound = false;
        // *** ROWS ***
        // iterate through rows, [[i=0],[i=1],[i=2]]
        for (var i = 0; i < boardStateArray.length; i++) {
            // if row adds up to player value...
            if (boardStateArray[i].reduce(function (a, b) {
                    return a + b;
                    }) === targetScore) {
                // iterate through row looking for opponent squares.
                // if found, we know to skip the search for empty
                // squares that follows. Reset flag first.
                opponentFound = false
                for (var j = 0; j < boardStateArray[i].length; j++) {
                    if (boardStateArray[i][j] === opponent) {
                        opponentFound = true;
                        break;
                    }
                }
                // if no opponent found, push co-ordinates of
                // empty spaces to co-ordinate array
                if (opponentFound === false) {
                    // iterate through row looking for empty spaces
                    // If found, push i & j to target coordinates 
                    for (var j = 0; j < boardStateArray[i].length; j++) {
                        if (boardStateArray[i][j] === 0) {
                            targetCoordinates.push([i,j]);
                        }
                    }                   
                }
                
            }
        }

        // *** COLUMNS ***
        // iterate through columns [j][i] - eg [0][0] + [1][0] + [2][0] 
        var currentScore = 0
        // iterate through inner array for second index
        for (i = 0; i < boardStateArray[0].length; i++) {
            // reset column score for new column
            currentScore = 0
            // iterate through outer array for first index
            for (j = 0; j < boardStateArray.length; j++) {
                // add current element to column score
                currentScore += boardStateArray[j][i];
            }
            // Does column sum to 1 * player value?
            if (currentScore === targetScore) {
                // Look through column for opponent squares
                // if found, we know to skip the search for empty
                // squares that follows. Reset flag first.
                opponentFound = false;
                for (var k = 0; k < boardStateArray.length; k++) {
                    if (boardStateArray[k][i] === opponent) {
                        opponentFound = true;
                        break;
                    }
                }
                // if no opponent found, push co-ordinates of
                // empty spaces to co-ordinate array
                if (opponentFound === false) {
                    // iterate through row looking for empty spaces
                    // If found, push k & i to target coordinates 
                    for (k = 0; k < boardStateArray.length; k++) {
                        if (boardStateArray[k][i] === 0) {
                            targetCoordinates.push([k,i]);
                        }
                    }
                }                           
            }

        }

        // *** DIAGONALS ***

        // FORWARD DIAGONAL
        var diagonalSum = boardStateArray[0][0] + boardStateArray[1][1] + boardStateArray[2][2];

        if (diagonalSum === targetScore) {
            // search for opponent piece, if found break
            opponentFound = false;
            for (i = 0; i < boardStateArray.length; i++) {
                if (boardStateArray[i][i] === opponent) {
                    opponentFound = true;
                    break;
                }
            }
            // If no opponent piece found, push position of empty spaces
            if (opponentFound === false) {
                for (i = 0; i < boardStateArray.length; i++) {
                    if (boardStateArray[i][i] === 0) {
                        targetCoordinates.push([i,i]);
                    }
                }           
            }
            
        }

        // REVERSE DIAGONAL
        diagonalSum = boardStateArray[0][2] + boardStateArray[1][1] + boardStateArray[2][0];

        if (diagonalSum === targetScore) {
            // search for opponent piece, if found break
            opponentFound = false;
            for (i = 0; i < boardStateArray.length; i++) {
                if (boardStateArray[i][2-i] === opponent) {
                    opponentFound = true;
                    break;
                }
            }
            // If no opponent piece found, push position of empty spaces
            if (opponentFound === false) {
                for (i = 0; i < boardStateArray.length; i++) {
                    if (boardStateArray[i][2-i] === 0) {
                        targetCoordinates.push([i,2-i]);
                    }
                }           
            }
            
        }
        //alert(targetCoordinates);     
        //search through co-ordinates for match
        // iterate through first three co-ordinate sets
        for (i = 0; i < targetCoordinates.length-1; i++) {
            // iterate through remaining sets (starting at i+1)
            for (j = i + 1; j < targetCoordinates.length-1; j++) {
                // if both co-ord sets match, place piece and exit
                if (targetCoordinates[i][0] === targetCoordinates[j][0]) {
                    if (targetCoordinates[i][1] === targetCoordinates[j][1]) {
                        boardStateArray[targetCoordinates[i][0]][targetCoordinates[i][1]] = playerValue;
                        moveMadeYet = true;
                        return boardStateArray;
                    }
                }   

            }
        }
        // if we aren't worried about looking for a fork
        // and we have at least one set of co-ordinates, place piece
        // at first set of co-ordinates.
        if (flag === 1 && fork === false && targetCoordinates.length > 0) {
            boardStateArray[targetCoordinates[0][0]][targetCoordinates[0][1]] = playerValue;
            moveMadeYet = true;
            return boardStateArray;
        } 

        // if no valid fork/block or 2 in a row possibility found
        // return array unchanged
        return boardStateArray;
    }

    function strategy5Centre (boardStateArray, playerValue) {

        // skip function if move made already
        if (moveMadeYet === true) {return boardStateArray;}

        if (boardStateArray[1][1] === 0) {
            boardStateArray[1][1] = playerValue;
            moveMadeYet = true;
            return boardStateArray;
        }

        return boardStateArray; 

    }   

    function strategy6OppositeCorner (boardStateArray, playerValue) {

        // skip function if move made already
        if (moveMadeYet === true) {return boardStateArray;}

        // TODO Might be nice if we can make this more elegant :)
        // can remove '&& boardStateArray[x][x] === 0' sections in final thing
        var targetValue = playerValue * -1;

        if (boardStateArray[0][0] === targetValue && boardStateArray[2][2] === 0) {
            boardStateArray[2][2] = playerValue;
            moveMadeYet = true;
            return boardStateArray;
        }

        if (boardStateArray[2][0] === targetValue && boardStateArray[0][2] === 0) {
            boardStateArray[0][2] = playerValue;
            moveMadeYet = true;
            return boardStateArray;
        }

        if (boardStateArray[0][2] === targetValue && boardStateArray[2][0] === 0) {
            boardStateArray[2][0] = playerValue;
            moveMadeYet = true;
            return boardStateArray;
        }

        if (boardStateArray[2][2] === targetValue && boardStateArray[0][0] === 0) {
            boardStateArray[0][0] = playerValue;
            moveMadeYet = true;
            return boardStateArray;
        }

        return boardStateArray; 

    }

    function strategy7EmptyCorner (boardStateArray, playerValue) {

        // skip function if move made already
        if (moveMadeYet === true) {return boardStateArray;}

        // TODO Might be nice if we can make this more elegant :)

        if (boardStateArray[0][0] === 0) {
            boardStateArray[0][0] = playerValue;
            moveMadeYet = true;
            return boardStateArray;
        }

        if (boardStateArray[0][2] === 0) {
            boardStateArray[0][2] = playerValue;
            moveMadeYet = true;
            return boardStateArray;
        }

        if (boardStateArray[2][0] === 0) {
            boardStateArray[2][0] = playerValue;
            moveMadeYet = true;
            return boardStateArray;
        }

        if (boardStateArray[2][2] === 0) {
            boardStateArray[2][2] = playerValue;
            moveMadeYet = true;
            return boardStateArray;
        }

        return boardStateArray; 

    }       

    function strategy8EmptySide (boardStateArray, playerValue) {

        // skip function if move made already
        if (moveMadeYet === true) {return boardStateArray;}

        // TODO Might be nice if we can make this more elegant :)

        if (boardStateArray[0][1] === 0) {
            boardStateArray[0][1] = playerValue;
            moveMadeYet = true;
            return boardStateArray;
        }

        if (boardStateArray[1][0] === 0) {
            boardStateArray[1][0] = playerValue;
            moveMadeYet = true;
            return boardStateArray;
        }

        if (boardStateArray[1][2] === 0) {
            boardStateArray[1][2] = playerValue;
            moveMadeYet = true;
            return boardStateArray;
        }

        if (boardStateArray[2][1] === 0) {
            boardStateArray[2][1] = playerValue;
            moveMadeYet = true;
            return boardStateArray;
        }

        return boardStateArray; 

    }   

}

function hasPlayerWon (boardStateArray, playerValue) {

    // winning score = 3 * player value (3 in a row)
    var winningScore = 3 * playerValue;

    // *** ROWS ***
    // iterate through rows, [[i=0],[i=1],[i=2]]
    for (var i = 0; i < boardStateArray.length; i++) {
        // if row adds up to 3 * player value, has won, return true
        if (boardStateArray[i].reduce(function (a, b) {
                return a + b;
                }) === winningScore) {
            return true;
        }
    }

    // *** COLUMNS ***
    // iterate through columns [j][i] - eg [0][0] + [1][0] + [2][0] 
    var currentScore = 0
    // iterate through inner array for second index
    for (i = 0; i < boardStateArray[0].length; i++) {
        // reset column score for new column
        currentScore = 0
        // iterate through outer array for first index
        for (var j = 0; j < boardStateArray.length; j++) {
            currentScore += boardStateArray[j][i];
        }
        // Does column sum to 3 * player value? if so return true.
        if (currentScore === winningScore) {
            return true;
        }

    }

    // *** DIAGONALS ***

    // FORWARD DIAGONAL
    var diagonalSum = boardStateArray[0][0] + boardStateArray[1][1] + boardStateArray[2][2];
    if (diagonalSum === winningScore) {
        return true;
    }

    // REVERSE DIAGONAL
    diagonalSum = boardStateArray[0][2] + boardStateArray[1][1] + boardStateArray[2][0];
    if (diagonalSum === winningScore) {
        return true;
    }
    // if not won yet, no three in a rows, return false
    return false;
}
