var solutions = {};

solutions.fake_fakovich = function (Board) {
    function pauseComp(ms) {
        var curr = new Date().getTime();
        ms += curr;
        while (curr < ms) {
            curr = new Date().getTime();
        }
    }

    pauseComp(Math.random() * 2000);
    return Array(5);

};


// YOUR SOLUTION
solutions.boiko_natalia = function (Board) {
    // GOES HERE
};


// YOUR SOLUTION
solutions.dobrooskok_yaroslav = function (Board) {
    // GOES HERE
};


// YOUR SOLUTION
solutions.kozynets_oleg = function (Board) {
    // GOES HERE
};


// YOUR SOLUTION
solutions.maltsev_valerii = function (Board) {
    // GOES HERE
};


// YOUR SOLUTION
solutions.martyniuk_oleksandra = function (Board) {
    // GOES HERE
};


// YOUR SOLUTION
solutions.melnykov_andrii = function (Board) {
    // GOES HERE
};


// YOUR SOLUTION
solutions.pylhun_valerii = function (Board) {
    var start, finish;

    if(!Array.isArray(Board)) return "matrix is not a matrix";
    var rowsNum = Board.length;
    if(rowsNum < 2) return "matrix is not a matrix";
    var colsNum = Board[0].length;
    if(colsNum < 2) return "matrix is not a matrix";
    //for(var i= 0, rowsNum=matrix.length; i<rowsNum; i++){
    //    if(matrix[i].length !== colsNum){
    //        return "matrix is not a matrix";
    //    }
    //}
    rows:
        for(var i= 0; i<rowsNum; i++){
            for(var j= 0; j<colsNum; j++){
                if(Board[i][j] === "f"){
                    finish = [i, j];
                    break rows;
                }
            }
        }
    rows:
        for(i= 0; i<rowsNum; i++){
            for(j= 0; j<colsNum; j++){
                if(Board[i][j] === "s"){
                    start = [i, j];
                    break rows;
                }
            }
        }

    var sQ = [start];
    var fQ = [finish];
    var res = [];
    var sTreeTraversal = [];
    var fTreeTraversal = [];
    var solutionFound = false;

    var bfs = function(){
        var sV= sQ.shift();
        var fV = fQ.shift();
        sTreeTraversal[sTreeTraversal.length] = sV;
        fTreeTraversal[fTreeTraversal.length] = fV;

        if(sV[0]-1>-1 && sV[1]-2>-1 && Board[sV[0]-1][sV[1]-2]!=="s" && Board[sV[0]-1][sV[1]-2]!==-1){
            if(Board[sV[0]-1][sV[1]-2] === "f"){
                solutionFound = true;
                sTreeTraversal[sTreeTraversal.length] = [sV[0]-1, sV[1]-2];
                res[0] = [sV[0]-1, sV[1]-2];
                return;
            }
            Board[sV[0]-1][sV[1]-2] = "s";
            sQ.push([sV[0]-1, sV[1]-2]);
        }
        if(fV[0]-1>-1 && fV[1]-2>-1 && Board[fV[0]-1][fV[1]-2]!=="f" && Board[fV[0]-1][fV[1]-2]!==-1){
            if(Board[fV[0]-1][fV[1]-2] === "s"){
                solutionFound = true;
                fTreeTraversal[fTreeTraversal.length] = [fV[0]-1, fV[1]-2];
                res[0] = [fV[0]-1, fV[1]-2];
                return;
            }
            Board[fV[0]-1][fV[1]-2] = "f";
            fQ.push([fV[0]-1, fV[1]-2]);
        }

        if(sV[0]-2>-1 && sV[1]-1>-1 && Board[sV[0]-2][sV[1]-1]!=="s" && Board[sV[0]-2][sV[1]-1]!==-1){
            if(Board[sV[0]-2][sV[1]-1] === "f"){
                solutionFound = true;
                sTreeTraversal[sTreeTraversal.length] = [sV[0]-2, sV[1]-1];
                res[0] = [sV[0]-2, sV[1]-1];
                return;
            }
            Board[sV[0]-2][sV[1]-1] = "s";
            sQ.push([sV[0]-2, sV[1]-1]);
        }
        if(fV[0]-2>-1 && fV[1]-1>-1 && Board[fV[0]-2][fV[1]-1]!=="f" && Board[fV[0]-2][fV[1]-1]!==-1){
            if(Board[fV[0]-2][fV[1]-1] === "s"){
                solutionFound = true;
                fTreeTraversal[fTreeTraversal.length] = [fV[0]-2, fV[1]-1];
                res[0] = [fV[0]-2, fV[1]-1];
                return;
            }
            Board[fV[0]-2][fV[1]-1] = "f";
            fQ.push([fV[0]-2, fV[1]-1]);
        }

        if(sV[0]-2>-1 && sV[1]+1<Board[0].length && Board[sV[0]-2][sV[1]+1]!=="s" && Board[sV[0]-2][sV[1]+1]!==-1){
            if(Board[sV[0]-2][sV[1]+1] === "f"){
                solutionFound = true;
                sTreeTraversal[sTreeTraversal.length] = [sV[0]-2, sV[1]+1];
                res[0] = [sV[0]-2, sV[1]+1];
                return;
            }
            Board[sV[0]-2][sV[1]+1] = "s";
            sQ.push([sV[0]-2, sV[1]+1]);
        }
        if(fV[0]-2>-1 && fV[1]+1<Board[0].length && Board[fV[0]-2][fV[1]+1]!=="f" && Board[fV[0]-2][fV[1]+1]!==-1){
            if(Board[fV[0]-2][fV[1]+1] === "s"){
                solutionFound = true;
                fTreeTraversal[fTreeTraversal.length] = [fV[0]-2, fV[1]+1];
                res[0] = [fV[0]-2, fV[1]+1];
                return;
            }
            Board[fV[0]-2][fV[1]+1] = "f";
            fQ.push([fV[0]-2, fV[1]+1]);
        }

        if(sV[0]-1>-1 && sV[1]+2<Board[0].length && Board[sV[0]-1][sV[1]+2]!=="s" && Board[sV[0]-1][sV[1]+2]!==-1){
            if(Board[sV[0]-1][sV[1]+2] === "f"){
                solutionFound = true;
                sTreeTraversal[sTreeTraversal.length] = [sV[0]-1, sV[1]+2];
                res[0] = [sV[0]-1, sV[1]+2];
                return;
            }
            Board[sV[0]-1][sV[1]+2] = "s";
            sQ.push([sV[0]-1, sV[1]+2]);
        }
        if(fV[0]-1>-1 && fV[1]+2<Board[0].length && Board[fV[0]-1][fV[1]+2]!=="f" && Board[fV[0]-1][fV[1]+2]!==-1){
            if(Board[fV[0]-1][fV[1]+2] === "s"){
                solutionFound = true;
                fTreeTraversal[fTreeTraversal.length] = [fV[0]-1, fV[1]+2];
                res[0] = [fV[0]-1, fV[1]+2];
                return;
            }
            Board[fV[0]-1][fV[1]+2] = "f";
            fQ.push([fV[0]-1, fV[1]+2]);
        }

        if(sV[0]+1<Board.length && sV[1]+2<Board[0].length && Board[sV[0]+1][sV[1]+2]!=="s" && Board[sV[0]+1][sV[1]+2]!==-1){
            if(Board[sV[0]+1][sV[1]+2] === "f"){
                solutionFound = true;
                sTreeTraversal[sTreeTraversal.length] = [sV[0]+1, sV[1]+2];
                res[0] = [sV[0]+1, sV[1]+2];
                return;
            }
            Board[sV[0]+1][sV[1]+2] = "s";
            sQ.push([sV[0]+1, sV[1]+2]);
        }
        if(fV[0]+1<Board.length && fV[1]+2<Board[0].length && Board[fV[0]+1][fV[1]+2]!=="f" && Board[fV[0]+1][fV[1]+2]!==-1){
            if(Board[fV[0]+1][fV[1]+2] === "s"){
                solutionFound = true;
                fTreeTraversal[fTreeTraversal.length] = [fV[0]+1, fV[1]+2];
                res[0] = [fV[0]+1, fV[1]+2];
                return;
            }
            Board[fV[0]+1][fV[1]+2] = "f";
            fQ.push([fV[0]+1, fV[1]+2]);
        }

        if(sV[0]+2<Board.length && sV[1]+1<Board[0].length && Board[sV[0]+2][sV[1]+1]!=="s" && Board[sV[0]+2][sV[1]+1]!==-1){
            if(Board[sV[0]+2][sV[1]+1] === "f"){
                solutionFound = true;
                sTreeTraversal[sTreeTraversal.length] = [sV[0]+2, sV[1]+1];
                res[0] = [sV[0]+2, sV[1]+1];
                return;
            }
            Board[sV[0]+2][sV[1]+1] = "s";
            sQ.push([sV[0]+2, sV[1]+1]);
        }
        if(fV[0]+2<Board.length && fV[1]+1<Board[0].length && Board[fV[0]+2][fV[1]+1]!=="f" && Board[fV[0]+2][fV[1]+1]!==-1){
            if(Board[fV[0]+2][fV[1]+1] === "s"){
                solutionFound = true;
                fTreeTraversal[fTreeTraversal.length] = [fV[0]+2, fV[1]+1];
                res[0] = [fV[0]+2, fV[1]+1];
                return;
            }
            Board[fV[0]+2][fV[1]+1] = "f";
            fQ.push([fV[0]+2, fV[1]+1]);
        }

        if(sV[0]+2<Board.length && sV[1]-1>-1 && Board[sV[0]+2][sV[1]-1]!=="s" && Board[sV[0]+2][sV[1]-1]!==-1){
            if(Board[sV[0]+2][sV[1]-1] === "f"){
                solutionFound = true;
                sTreeTraversal[sTreeTraversal.length] = [sV[0]+2, sV[1]-1];
                res[0] = [sV[0]+2, sV[1]-1];
                return;
            }
            Board[sV[0]+2][sV[1]-1] = "s";
            sQ.push([sV[0]+2, sV[1]-1]);
        }
        if(fV[0]+2<Board.length && fV[1]-1>-1 && Board[fV[0]+2][fV[1]-1]!=="f" && Board[fV[0]+2][fV[1]-1]!==-1){
            if(Board[fV[0]+2][fV[1]-1] === "s"){
                solutionFound = true;
                fTreeTraversal[fTreeTraversal.length] = [fV[0]+2, fV[1]-1];
                res[0] = [fV[0]+2, fV[1]-1];
                return;
            }
            Board[fV[0]+2][fV[1]-1] = "f";
            fQ.push([fV[0]+2, fV[1]-1]);
        }

        if(sV[0]+1<Board.length && sV[1]-2>-1 && Board[sV[0]+1][sV[1]-2]!=="s" && Board[sV[0]+1][sV[1]-2]!==-1){
            if(Board[sV[0]+1][sV[1]-2] === "f"){
                solutionFound = true;
                sTreeTraversal[sTreeTraversal.length] = [sV[0]+1, sV[1]-2];
                res[0] = [sV[0]+1, sV[1]-2];
                return;
            }
            Board[sV[0]+1][sV[1]-2] = "s";
            sQ.push([sV[0]+1, sV[1]-2]);
        }
        if(fV[0]+1<Board.length && fV[1]-2>-1 && Board[fV[0]+1][fV[1]-2]!=="f" && Board[fV[0]+1][fV[1]-2]!==-1){
            if(Board[fV[0]+1][fV[1]-2] === "s"){
                solutionFound = true;
                fTreeTraversal[fTreeTraversal.length] = [fV[0]+1, fV[1]-2];
                res[0]  = [fV[0]+1, fV[1]-2];
                return;
            }
            Board[fV[0]+1][fV[1]-2] = "f";
            fQ.push([fV[0]+1, fV[1]-2]);
        }
    };
    while(!solutionFound){
        if(sQ.length === 0 || fQ.length === 0){
            return "deadlock";
        }
        bfs();
    }

    for(i=sTreeTraversal.length-1; i>-1; i--){
        var difference = [Math.abs(sTreeTraversal[i][0] - res[0][0]), Math.abs(sTreeTraversal[i][1] - res[0][1])];
        if((difference[0]===1 && difference[1]===2) || (difference[0]===2 && difference[1]===1)){
            res.unshift(sTreeTraversal[i]);
        }
    }
    for(i=fTreeTraversal.length-1; i>-1; i--){
        difference = [Math.abs(fTreeTraversal[i][0] - res[res.length-1][0]), Math.abs(fTreeTraversal[i][1] - res[res.length-1][1])];
        if((difference[0]===1 && difference[1]===2) || (difference[0]===2 && difference[1]===1)){
            res[res.length] = fTreeTraversal[i];
        }
    }
    return res;
};


// YOUR SOLUTION
solutions.vaskovska_anna = function (Board) {
    // GOES HERE
};