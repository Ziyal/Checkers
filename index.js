// create board
var b = jsboard.board({attach:"game", size:"8x8", style:"checkerboard", stylePattern: ["#f9f9f9","#cccccc"]});
b.cell("each").style({width:"65px", height:"65px"});

// setup pieces
var red   = jsboard.piece({text:"R", textIndent:"-9999px", background:"url('images/red.png') no-repeat",   width:"50px", height:"50px", margin:"0 auto" });
var black = jsboard.piece({text:"B", textIndent:"-9999px", background:"url('images/black.png') no-repeat", width:"50px", height:"50px", margin:"0 auto" });

// create pieces to place in DOM

var redPlayer = [];
var blackPlayer = [];
for(var i = 1; i <= 12; i++) {
    redPlayer.push(red.clone());
    blackPlayer.push(black.clone());
}

// place red pieces on board
b.cell([7,0]).place(redPlayer[0]);
b.cell([7,2]).place(redPlayer[1]);
b.cell([7,4]).place(redPlayer[2]);
b.cell([7,6]).place(redPlayer[3]);
b.cell([6,1]).place(redPlayer[4]);
b.cell([6,3]).place(redPlayer[5]);
b.cell([6,5]).place(redPlayer[6]);
b.cell([6,7]).place(redPlayer[7]);
b.cell([5,0]).place(redPlayer[8]);
b.cell([5,2]).place(redPlayer[9]);
b.cell([5,4]).place(redPlayer[10]);
b.cell([5,6]).place(redPlayer[11]);

// place black pieces on board
b.cell([0,1]).place(blackPlayer[0]);
b.cell([0,3]).place(blackPlayer[1]);
b.cell([0,5]).place(blackPlayer[2]);
b.cell([0,7]).place(blackPlayer[3]);
b.cell([1,0]).place(blackPlayer[4]);
b.cell([1,2]).place(blackPlayer[5]);
b.cell([1,4]).place(blackPlayer[6]);
b.cell([1,6]).place(blackPlayer[7]);
b.cell([2,1]).place(blackPlayer[8]);
b.cell([2,3]).place(blackPlayer[9]);
b.cell([2,5]).place(blackPlayer[10]);
b.cell([2,7]).place(blackPlayer[11]);

// give functionality to pieces
// for(var i = 0; i < redPlayer.length; i++) {
//     redPlayer[i].addEventListener("click", function() { showMoves(this); });
//     blackPlayer[i].addEventListener("click", function() { showMoves(this); });
// }

playerTurn();

var turn = "black";

function playerTurn(){
    if(turn === "red") {
        for(var i = 0; i < redPlayer.length; i++) {
            redPlayer[i].addEventListener("click", function() { showMoves(this); });
            b.removeEvents("click", blackPlayer[i]);
        }
        
    } else if (turn === "black") {
        for(var i = 0; i < redPlayer.length; i++) {
            blackPlayer[i].addEventListener("click", function() { showMoves(this); });
            b.removeEvents("click", redPlayer[i]);
        }
    }

}

// show new locations 
function showMoves(piece) {

    // parentNode is needed because the piece you are clicking 
    // on doesn't have access to cell functions, therefore you 
    // need to access the parent of the piece because pieces are 
    // always contained within in cells

    var loc = b.cell(piece.parentNode).where();
    var newLocs = [[loc[0]-1,loc[1]-1],[loc[0]-1,loc[1]+1]];
    var newLocsDown = [[loc[0]+1,loc[1]+1],[loc[0]+1,loc[1]-1]];


    // locations to move to and simple jump check
    for (var i=0; i<newLocs.length; i++) {

        if(piece.innerHTML === "R"){

            if (b.cell(newLocs[i]).get()=="B") { 
                if (!i) newLocs[i] = [loc[0]-2,loc[1]-2];
                else newLocs[i] = [loc[0]-2,loc[1]+2];
            }
            b.cell(newLocs[i]).style({background:"yellow"});
            b.cell(newLocs[i]).on("click", movePiece);
        
        }
        else { //If the current player/piece is BLACK
            if (b.cell(newLocsDown[i]).get()=="B") { 
                if (!i) newLocsDown[i] = [loc[0]-2,loc[1]-2];
                else newLocsDown[i] = [loc[0]-2,loc[1]+2];
            }
            b.cell(newLocsDown[i]).style({background:"yellow"});
            b.cell(newLocsDown[i]).on("click", movePiece);
        }

    }

    function highlightSquare(location) {
        $(location).addClass("moves");
    }

    // move piece to new location when clicked
    function movePiece() {

        b.cell(this).place(piece);


        b.cell(newLocsDown[0]).style({background:"#cccccc"});
        b.cell(newLocsDown[1]).style({background:"#cccccc"});

        b.cell(newLocs[0]).style({background:"#cccccc"});
        b.cell(newLocs[1]).style({background:"#cccccc"});

        if(turn === "red"){
            turn = "black";
            playerTurn();
        } else if (turn === "black"){
            turn = "red";
            playerTurn();
        }


        console.log(turn)
        b.removeEvents("click", movePiece);


    }

}