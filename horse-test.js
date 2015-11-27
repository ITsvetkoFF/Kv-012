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
    //var start = new Date();
    var result = createOptimalPath(Board);
//var end = new Date();
//alert('Time: ' + (end.getTime() - start.getTime()) + ' mc');
    //document.write(result);
return result;

    /**
     Creation incidence matrix for horse in chess
     */
    function createIncidenceMatrix(matrixChess) {
        var sizeChessBoard = matrixChess.length;
        var size = sizeChessBoard * sizeChessBoard;
        var array = new Array(size);
        var i, j;

        for (i = 0; i < size; i++) {
            array[i] = new Array(size);
        }
        for(i = 0; i < size; i++) {
            for (j = 0; j < size; j++) {
                //see only lower triangular matrix
                if (i >= j) {
                    //down right
                    //if start or end =-1 we can't built IncidenceMatrix (j+1*n)
                    if((matrixChess[~~(i / sizeChessBoard)][i % sizeChessBoard] != -1) && (matrixChess[~~(j / sizeChessBoard)][j % sizeChessBoard] != -1)) {
                        //down right!
                        var dw = j + 2 * sizeChessBoard + 1;
                        if ((dw == i) && (dw < size) && (j % sizeChessBoard != (sizeChessBoard - 1))) {
                            array[j][i] = 1;
                            array[i][j] = 1;
                        }
                        else {
                            //down left!
                            dw = j + 2 * sizeChessBoard - 1;
                            if ((dw == i) && (dw < size) && (j % sizeChessBoard != 0)) {
                                array[j][i] = 1;
                                array[i][j] = 1;
                            }
                            else {
                                //up right!
                                dw = j - 2 * sizeChessBoard + 1;
                                if ((dw == i) && (dw < size) && (dw >= 0) && (j % sizeChessBoard != (sizeChessBoard - 1))) {
                                    array[j][i] = 1;
                                    array[i][j] = 1;
                                }
                                else {
                                    //up left!
                                    dw = j - 2 * sizeChessBoard - 1;
                                    if ((dw == i) && (dw >= 0) && (j % sizeChessBoard != 0)) {
                                        array[j][i] = 1;
                                        array[i][j] = 1;
                                    }
                                    else {
                                        //left up
                                        dw = j - sizeChessBoard - 2;
                                        if ((dw == i) && (dw < size) && (dw >= 0) && !(j % sizeChessBoard <= 1)) {
                                            array[j][i] = 1;
                                            array[i][j] = 1;
                                        }
                                        else {
                                            //left down
                                            dw = j + sizeChessBoard - 2;
                                            if ((dw == i) && (dw < size) && (dw >= 0) && !(j % sizeChessBoard <= 1)) {
                                                array[j][i] = 1;
                                                array[i][j] = 1;
                                            }
                                            else {
                                                //right up
                                                dw = j - sizeChessBoard + 2;
                                                if ((dw == i) && (dw < size) && (dw >= 0) && !(j % sizeChessBoard >= sizeChessBoard - 2)) {
                                                    array[j][i] = 1;
                                                    array[i][j] = 1;
                                                }
                                                else {
                                                    //right down
                                                    dw = j + sizeChessBoard + 2;
                                                    if ((dw == i) && (dw >= 0) && !(j % sizeChessBoard >= sizeChessBoard - 2)) {
                                                        array[j][i] = 1;
                                                        array[i][j] = 1;
                                                    }
                                                    else {
                                                        array[j][i] = 0;
                                                        array[i][j] = 0;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else {
                        //obstacle in position (x1, y1) or in (x2, y2)
                        array[j][i] = 0;
                        array[i][j] = 0;
                    }
                }
            }
        }
        return array;
    }
    /*
     Find shortest path from incident matrix
     * */
    function bfs(matrix, start, end) {
        var size = matrix.length;
        var count = 0;
        var head = 0;
        var q = new Array();
        q[count++] = start;
        var used = new Array(size);
        var p = new Array(size);
        var i;
        for (i = 0; i < size; i++) {
            used[i] = false;
        }
        used[start] = true;
        p[start] = -1;
        var v;
        while ((head < count))
        {
            v = q[head++];
            for (i = 0; i < size; i++)
            {
                if (!used[i] && (matrix[v][i] == 1))
                {
                    used[i] = true;
                    q[count++] = i;
                    p[i] = v; // parents;
                }
            }
        }
        q = [];
        if (!used[end]) {
            //document.write("No path!" + "<br/>");
            return q;
        }
        else {
            for (i = end; i != -1; i = p[i])
                q.unshift(i);
            return q;
        }
    }
    /*
     Finding the shortest path of horse on chess field with obstacles
     */
    function createOptimalPath(matrixChess) {

        var testStart = -1;
        var testEnd = -1;

        var sizeChessBoard = matrixChess.length;
        var i, j;

        for(i = 0; i < sizeChessBoard; i++) {
            for(j = 0; j < sizeChessBoard; j++) {
                if((matrixChess[i][j] == "s") || (matrixChess[i][j] == "S")) {
                    testStart = j + i * sizeChessBoard;
                }
                else if((matrixChess[i][j] == "f") || (matrixChess[i][j] == "F")) {
                    testEnd = j + i * sizeChessBoard;
                }
            }
        }

        var incidenceMatrix  = createIncidenceMatrix(matrixChess);
        //showMatrix(incidenceMatrix);

        var path = bfs(incidenceMatrix, testStart, testEnd);
        var result = [];

        //optimisation in memory
        testStart = path.length;
        for (i = 0; i < testStart; i++) {
            result.push([~~(path[i]/ sizeChessBoard), path[i] % sizeChessBoard]);
        }
        return result;
    }
};


// YOUR SOLUTION
solutions.melnykov_andrii = function (Board) {
    // GOES HERE
};


// YOUR SOLUTION
solutions.pylhun_valerii = function (Board) {
    // GOES HERE
};


// YOUR SOLUTION
solutions.vaskovska_anna = function (Board) {
    // GOES HERE
};