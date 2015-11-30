var assert = require('assert');

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

    var findPath = function (matrix) {
        var start = {};
        var finish = {};
        var currentLocation;
        var newPath;

        //Find coordinates of start
        for (var i = 0; i < matrix.length; i++) {
            if (matrix[i].indexOf('s') !== -1) {
                start.t = i;
                start.l = matrix[i].indexOf('s');
                break;
            }
        }

        //Find coordinates of end
        for (var i = 0; i < matrix.length; i++) {
            if (matrix[i].indexOf('f') !== -1) {
                finish.t = i;
                finish.l = matrix[i].indexOf('f');
                break;
            }
        }

        //Options for points to check (difference from start(currentLocation) point)
        var steps = [
            {
                't': 1,
                'l': 2
            },
            {
                't': -1,
                'l': -2
            },
            {
                't': 2,
                'l': 1
            },
            {
                't': -2,
                'l': -1
            },
            {
                't': 2,
                'l': -1
            },
            {
                't': -2,
                'l': 1
            },
            {
                't': 1,
                'l': -2
            },
            {
                't': -1,
                'l': 2
            },
        ];

        // Initialize the queue with the start location already inside
        var queue = [{
            t: start.t,
            l: start.l,
            path: []
        }];

        // Loop through the grid searching for the goal
        while (queue.length > 0) {
            currentLocation = queue.shift();

            for (var i = 0; i < steps.length; i++) {
                //Check if point is not out of grid
                if (currentLocation.t + steps[i].t > 0 && currentLocation.t + steps[i].t < matrix.length && currentLocation.l + steps[i].l > 0 && currentLocation.l + steps[i].l < matrix[0].length) {
                    //Check if cell is free from obstacles and was not visited before
                    if (matrix[currentLocation.t + steps[i].t][currentLocation.l + steps[i].l] === 0) {
                        newPath = currentLocation.path.slice();
                        newPath.push([currentLocation.t + steps[i].t, currentLocation.l + steps[i].l]);
                        queue.push({
                            t: currentLocation.t + steps[i].t,
                            l: currentLocation.l + steps[i].l,
                            path: newPath
                        });

                        matrix[currentLocation.t + steps[i].t][currentLocation.l + steps[i].l] = -1;
                    } else if (matrix[currentLocation.t + steps[i].t][currentLocation.l + steps[i].l] === 'f') {
                        newPath.push([currentLocation.t + steps[i].t, currentLocation.l + steps[i].l]);
                        newPath = currentLocation.path.slice();
                        newPath.push([currentLocation.t + steps[i].t, currentLocation.l + steps[i].l]);
                        return newPath;
                    }
                }
            }

        }

        return null;
    }

    return findPath(Board);
};

// YOUR SOLUTION
solutions.dobrooskok_yaroslav = function (Board) {
    // GOES HERE
    var n, x0, y0, xf, yf, squares = Board;
    var flagStart = false, flagFinish = false;
    var minNumSteps;

    // Массив, в котором хранятся все клетки каждого шага
    var steps = [];

    var declaration = function () {

        /* Обьявление переменных
         x0, y0 - координаты стартовой точки
         xf, yf - координаты конечной точки
         squares - двумерный массив клеток доски, где 0 - свободные клетки, а -1 - недоступные */

        n = squares.length;

        // Проверка правильности массива
        for (var i = 0; i < squares.length; i++)
            for (var j = 0; j < squares[i].length; j++)
                if (squares[i][j] != 0 && squares[i][j] != -1 && squares[i][j] != 's' && squares[i][j] != 'f') {
                    throw new Error('Массив заполнен неправильно');
                    break;
                }

        var i, j, l = squares.length;

        for (i=0; i < l; i++)
            for (j=0; j < l; j++) {
                if (squares[i][j] === 's') {
                    flagStart = true;
                    x0 = i;
                    y0 = j;
                    squares[x0][y0] = 1;

                }
                if (Board[i][j] === 'f') {
                    flagFinish = true;
                    xf = i;
                    yf = j;
                }
            }

        if (!flagStart || !flagFinish)
            throw new Error('Не найдены начальная или конечная точка');

    };

    // Конструктор клетки
    var Kletka = function(x, y){
        this.x = x;
        this.y = y;
    }

    /* Конструктор шага
     number - номер текущего шага
     kletki - массив объектов kletka на текущем шаге */
    var Step = function (number, kletki) {
        this.number = number;
        this.kletki = kletki;
    }

    // Метод нахождения всех доступных ходов из всех клеток на текущем шаге
    var findAvailable = function(currentStep) {
        var flag = false;
        while (!flag) {
            steps.push(new Step(currentStep+1, []));
            var i, j, l = steps[currentStep].kletki.length;
            main:
                for (i = 0; i < l; i++) {
                    var curX = steps[currentStep].kletki[i].x;
                    var curY = steps[currentStep].kletki[i].y;

                    var suspX = [curX+1, curX+2, curX+2, curX+1, curX-1, curX-2, curX-2, curX-1];
                    var suspY = [curY+2, curY+1, curY-1, curY-2, curY-2, curY-1, curY+1, curY+2];

                    for (j = 0; j < suspX.length; j++ ) {

                        if (suspX[j] >= 0 && suspY[j] >= 0 && suspX[j] < n && suspY[j] < n && squares[suspX[j]][suspY[j]] === 0) {
                            steps[currentStep+1].kletki.push(new Kletka(suspX[j], suspY[j]));
                            squares[ suspX[j] ] [ suspY[j] ] = currentStep+1;
                        }

                        if (suspX[j] == xf && suspY[j] == yf) {
                            var numsteps = currentStep;
                            flag = true;
                            squares[suspX[j]][suspY[j]] = currentStep+1;
                            minNumSteps = numsteps;
                            break main;
                        }

                    }

                }
            currentStep++;

        }
    }

    // Method finds a reverse way to a start point
    var findRevesrseWay = function(){

        var resArray = [];
        var currentStep = minNumSteps;
        var curX = xf;
        var curY = yf;
        var suspX, suspY;

        resArray.push([xf, yf]);

        while (currentStep >= 1) {
            var suspX = [curX+1, curX+2, curX+2, curX+1, curX-1, curX-2, curX-2, curX-1];
            var suspY = [curY+2, curY+1, curY-1, curY-2, curY-2, curY-1, curY+1, curY+2];

            var i, l = suspX.length;
            for (i = 0; i < l; i++) {
                if (suspX[i] >= 0 && suspY[i] >= 0 && suspX[i] < n && suspY[i] < n && squares[suspX[i]][suspY[i]] === currentStep) {
                    var bar = [suspX[i], suspY[i]];
                    resArray.unshift(bar);
                    currentStep--;
                    curX = suspX[i];
                    curY = suspY[i];
                    break;
                }
            }
        }

        return resArray;

    }


    declaration();

    /* Метод поиска кратчайшего пути
     x0, y0 - координаты стартовой точки
     xf, yf - координаты конечной точки
     squares - двумерный массив клеток доски, где 0 - свободные клетки, а -1 - недоступные */
    var searchShortWay = function(n, x0, y0, xf, yf, squares) {
        // Текущий шаг
        var currentStep = 1;

        // Установка начальной клетки
        steps[currentStep] = new Step(currentStep, []);
        steps[currentStep].kletki.push(new Kletka(x0, y0));

        findAvailable(currentStep);
    };

    searchShortWay(n, x0, y0, xf, yf, squares);

    return findRevesrseWay();
};


// YOUR SOLUTION
solutions.kozynets_oleg = function (Board) {
    //пошук у матриці
    function findInMatrix(matrix, element) {
        var res;
        matrix.forEach(function (el, index) {
            el.forEach(function (em, ins) {
                if (em == element) res = [index, ins]
            })
        });
        return res;
    }

//перевірка чи є змінна масивом
    function isArray(myArray) {
        return myArray.constructor.toString().indexOf("Array") > -1;
    }

//створимо клас, де збірігатимемо координати вершин
    function Point(x, y, parent) {
        this.X = x,
            this.Y = y,
            this.Parent = parent
    };
    Point.prototype = {
        toString: function () {
            return "(" + this.X + ", " + this.Y + ")";
        },
        toArray: function () {
            return [this.X, this.Y];
        },
        isEqualTo: function (obj) {
            if (obj instanceof Point) {
                if ((this.X === obj.X) && (this.Y === obj.Y)) return true;
            } else return false;
        }
    };
//функція поширення(робимо один хід)
    function NextSteps(coordinates, board, dimension) {
        var x, y;
        var result = [];
        if (!dimension)  dimension = board.length;
        if (isArray(coordinates)) {
            for (var i = 0, l = coordinates.length; i < l; i++) {
                x = coordinates[i].X, y = coordinates[i].Y;
                if (y + 2 < dimension) {
                    //строго менше N тому що у масиві найвищий індекс N-1
                    if ((x + 1 < dimension) && (board[x + 1][y + 2] === 0)) {
                        result.push(new Point(x + 1, y + 2, coordinates[i]));
                        board[x + 1][y + 2] = 1;
                    }
                    if ((x - 1 >= 0) && (board[x - 1][y + 2] === 0)) {
                        result.push(new Point(x - 1, y + 2, coordinates[i]));
                        board[x - 1][y + 2] = 1;
                    }
                }
                ;
                if (x + 2 < dimension) {
                    if ((y + 1 < dimension) && (board[x + 2][y + 1] === 0)) {
                        result.push(new Point(x + 2, y + 1, coordinates[i]));
                        board[x + 2][y + 1] = 1;
                    }
                    if ((y - 1 >= 0) && (board[x + 2][y - 1] === 0)) {
                        result.push(new Point(x + 2, y - 1, coordinates[i]));
                        board[x + 2][y - 1] = 1;
                    }
                }
                ;
                if (y - 2 >= 0) {
                    //строго менше N тому що у масиві найвищий індекс N-1
                    if ((x + 1 < dimension) && (board[x + 1][y - 2] === 0)) {
                        result.push(new Point(x + 1, y - 2, coordinates[i]));
                        board[x + 1][y - 2] = 1
                    }
                    if ((x - 1 >= 0) && (board[x - 1][y - 2] === 0)) {
                        result.push(new Point(x - 1, y - 2, coordinates[i]));
                        board[x - 1][y - 2] = 1;
                    }
                }
                ;
                if (x - 2 >= 0) {
                    if ((y + 1 < dimension) && (board[x - 2][y + 1] === 0)) {
                        result.push(new Point(x - 2, y + 1, coordinates[i]));
                        board[x - 2][y + 1] = 1
                    }
                    if ((y - 1 >= 0) && (board[x - 2][y - 1] === 0)) {
                        result.push(new Point(x - 2, y - 1, coordinates[i]));
                        board[x - 2][y - 1] = 1;
                    }
                }
                ;
            }
            if (result.length) return result; else return null;
        }
        else {
            x = coordinates.X, y = coordinates.Y;
            if (y + 2 < dimension) {
                //строго менше N тому що у масиві найвищий індекс N-1
                if ((x + 1 < dimension) && (board[x + 1][y + 2] === 0)) {
                    result.push(new Point(x + 1, y + 2, coordinates));
                    board[x + 1][y + 2] = 1;
                }
                if ((x - 1 >= 0) && (board[x - 1][y + 2] === 0)) {
                    result.push(new Point(x - 1, y + 2, coordinates));
                    board[x - 1][y + 2] = 1;
                }
            }
            ;
            if (x + 2 < dimension) {
                if ((y + 1 < dimension) && (board[x + 2][y + 1] === 0)) {
                    result.push(new Point(x + 2, y + 1, coordinates));
                    board[x + 2][y + 1] = 1;
                }
                if ((y - 1 >= 0) && (board[x + 2][y - 1] === 0)) {
                    result.push(new Point(x + 2, y - 1, coordinates));
                    board[x + 2][y - 1] = 1;
                }
            }
            ;
            if (y - 2 >= 0) {
                //строго менше N тому що у масиві найвищий індекс N-1
                if ((x + 1 < dimension) && (board[x + 1][y - 2] === 0)) {
                    result.push(new Point(x + 1, y - 2, coordinates));
                    board[x + 1][y - 2] = 1
                }
                if ((x - 1 >= 0) && (board[x - 1][y - 2] === 0)) {
                    result.push(new Point(x - 1, y - 2, coordinates));
                    board[x - 1][y - 2] = 1;
                }
            }
            ;
            if (x - 2 >= 0) {
                if ((y + 1 < dimension) && (board[x - 2][y + 1] === 0)) {
                    result.push(new Point(x - 2, y + 1, coordinates));
                    board[x - 2][y + 1] = 1
                }
                if ((y - 1 >= 0) && (board[x - 2][y - 1] === 0)) {
                    result.push(new Point(x - 2, y - 1, coordinates));
                    board[x - 2][y - 1] = 1;
                }
            }
            ;
        }
        if (result.length) return result; else return null;
    }

//основна функція
    var board = Board;
    var sstart = findInMatrix(board, "s");
    var eend = findInMatrix(board, "f");
    var start = new Point(sstart[0], sstart[1]);
    var end = new Point(eend[0], eend[1]);
    var steps = 0, tree = [];
    var dim = board.length;
    board[eend[0]][eend[1]] = 0;
    board[sstart[0]][sstart[1]] = 0;//

    //перевірка того чи кінець і початок співпадають
    if (start.isEqualTo(end)) return null;//return {
    //NumberOfSteps: 0,
    // Path: undefined
    //};
    else {//якщо задано різні точки
        tree.push(start);//вершина дерева
        //гілки та листя дерева
        do {
            tree.push(NextSteps(tree[steps], board, dim));
            steps++;
            if (tree[steps].some(function (el) {
                    return el.isEqualTo(end)
                })) {
                var resArr = [], result = [];//запишемо сюди шлях
                //знаходимо останню вершину графа
                for (var j = 0, l = tree[steps].length; j < l; j++) {
                    if (tree[steps][j].isEqualTo(end)) {
                        resArr.push(tree[steps][j]);
                        break;
                    }
                }
                //рухаємося вверх до початку
                for (var i = 0; i < steps; i++) {
                    resArr.push(resArr[i].Parent);
                }
                for (var i = 0; i <= steps; i++) {
                    result.push(resArr[i].toArray());
                }
                return result;//{NumberOfSteps: steps,
                // Path: resArr};
            }
        } while (tree[steps]);

        return null;//{
        //NumberOfSteps: 0,
        //Path: undefined
        //};
    }

};


// YOUR SOLUTION
solutions.maltsev_valerii = function (Board) {
    // GOES HERE
    // return array of points that are available from base point on specified map
    function getAvailablePoints(basePoint, map) {
        var res = [
            [basePoint[0] + 2, basePoint[1] + 1],
            [basePoint[0] + 2, basePoint[1] - 1],
            [basePoint[0] + 1, basePoint[1] + 2],
            [basePoint[0] + 1, basePoint[1] - 2],
            [basePoint[0] - 2, basePoint[1] + 1],
            [basePoint[0] - 2, basePoint[1] - 1],
            [basePoint[0] - 1, basePoint[1] + 2],
            [basePoint[0] - 1, basePoint[1] - 2]
        ];

        // check every res for
        // 1. penalty (as -1 in the map),
        // 2. passed (as 1 in the map),
        // or check for equals 0 || 'f';

        // 3. out of field ( x, y > map.length or < 0) through the map

        var newRes = [];
        var j = -1;
        while (++j < 8) {
            if (isInField(res[j], map)) {
                if (map[res[j][0]][res[j][1]] == 0 || map[res[j][0]][res[j][1]] == 'f') {
                    newRes.push(res[j]);
                }
            }
        }

        // set map[point] to passed
        var i = -1, len = newRes.length;
        while (++i < len) {
            map[newRes[i][0]][newRes[i][1]] = 1;
        }

        return newRes;
    }

// return XY of point with specified char on map
    function getPointByChar(map, char) {
        if (char) {
            for (var i = 0; i < map.length; i++) {
                for (var j = 0; j < map[i].length; j++) {
                    if (map[i][j] == char) {
                        return [i, j];
                    }
                }
            }
        }
    }

// is point in the map area
    function isInField(point, map) {
        if (point[0] >= 0 && point[0] < map.length) {
            if (point[1] >= 0 && point[1] < map[0].length) {
                return true;
            }
        }
        return false;
    }

// return the shortest way from start point 's' to end point 'f' as an array of points
// map format :
    // 's' - start point
    // 'f' - finish point
    // 0 - default point
    // -1 - penalty point
    // 1 - passed point
    function getShortcut(map) {
        var queue = [];
        var current;
        var j;
        var isFinish = false;
        var start = getPointByChar(map, 's');
        var finish = getPointByChar(map, 'f');
        var shortcut = [];

        map[start[0]][start[1]] = 1;
        queue.push(start);

        j = 0;
        // 1. end loop if finish == true
        // 2. end loop if j >= queue.length;
        while (!isFinish) {

            current = queue[j];

            // if current point is finish
            if (current[0] == finish[0] && current[1] == finish[1]) {
                isFinish = true;
                break;
            }

            // find available points[] from current
            var avp = getAvailablePoints(current, map);
            var avpLen = avp.length;
            var k = -1;
            while (++k < avpLen) {
                if (avp[k] !== undefined) {
                    avp[k].parent = current;
                    queue.push(avp[k]);
                }
            }

            // j-criteria of process end
            if (j++ == queue.length - 1) {
                isFinish = false;
                break;
            }
        }

        //if (finish) create and return points of shortcut
        // through parent.parent ... from last finish point (current)
        if (isFinish) {
            while (current) {
                shortcut.push(current);
                current = current.parent;
            }
            return shortcut;
        } else {
            throw new Error("No way to finish");
        }
    }

    return getShortcut(Board);
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
        for (i = 0; i < size; i++) {
            for (j = 0; j < size; j++) {
                //see only lower triangular matrix
                if (i >= j) {
                    //down right
                    //if start or end =-1 we can't built IncidenceMatrix (j+1*n)
                    if ((matrixChess[~~(i / sizeChessBoard)][i % sizeChessBoard] != -1) && (matrixChess[~~(j / sizeChessBoard)][j % sizeChessBoard] != -1)) {
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
        while ((head < count)) {
            v = q[head++];
            for (i = 0; i < size; i++) {
                if (!used[i] && (matrix[v][i] == 1)) {
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

        for (i = 0; i < sizeChessBoard; i++) {
            for (j = 0; j < sizeChessBoard; j++) {
                if ((matrixChess[i][j] == "s") || (matrixChess[i][j] == "S")) {
                    testStart = j + i * sizeChessBoard;
                }
                else if ((matrixChess[i][j] == "f") || (matrixChess[i][j] == "F")) {
                    testEnd = j + i * sizeChessBoard;
                }
            }
        }

        var incidenceMatrix = createIncidenceMatrix(matrixChess);
        //showMatrix(incidenceMatrix);

        var path = bfs(incidenceMatrix, testStart, testEnd);
        var result = [];

        //optimisation in memory
        testStart = path.length;
        for (i = 0; i < testStart; i++) {
            result.push([~~(path[i] / sizeChessBoard), path[i] % sizeChessBoard]);
        }
        return result;
    }
};


// YOUR SOLUTION
solutions.melnykov_andrii = function (Board) {

    var spX = -Infinity; // start point
    var spY = -Infinity;
    var l = Board.length;

    !function searchStart() {
        var f = false;
        var i = 0;
        var patt = /s/i;
        while (!f && (i < l)) {
            for (i =0; i < l; i++) {
                for (var j = 0; j < l; j++) {
                    if (patt.test(Board[i][j])) {spX = i; spY = j;f = true;}
                }
            }
        }
    } ();

    var mX = [1, 1, -1, -1, 2, 2, -2, -2]; // Knight's moves
    var mY = [2, -2, 2, -2, 1, -1, 1, -1];
    var ff = false; // find final
    var fpX = -Infinity, fpY; // final point
    var fpV; // final poing value
    var q = []; // queue

    if (spX < 0) {
        return [];
    } else {

        Board[spX][spY] = 0;
        q.push([spX,spY]);

        !function searchFinish () {
            while ((q.length > 0) && !ff) {
                var p = q.shift(); // first in the queue
                for (var i = 0; i < 8; i++) {
                    var npX = p[0] + mX[i]; // next point X
                    var npY = p[1] + mY[i];
                    if ((npX < l) && (npY < l) && (npY > 0) && (npX > 0)) {
                        if ((Board[npX][npY] === "F") || (Board[npX][npY] === "f")) {ff = true; fpX = npX; fpY = npY; fpV = Board[p[0]][p[1]] + 1;}
                        if (Board[npX][npY] === 0) {Board[npX][npY] = Board[p[0]][p[1]] + 1; q.push([npX, npY]);}
                    }
                }
            }
        }();
    }


    if (fpX < 0) {
        return [];
    } else {

        Board[fpX][fpY] = fpV;
        Board[spX][spY] = "S";
        var path = [];
        var fs = false; // find start
        var pX = fpX;
        var pY = fpY;
        var it = 0;

        !function searchPath() {
            while (!fs && it <10000) {
                it++;
                for (var i = 0; i < 8; i++) {
                    var npX = pX - mX[i]; // previous point
                    var npY = pY - mY[i];
                    if ((npX < l) && (npY < l) && (npX > 0) && (npY > 0) && (Board[npX][npY] === "S")) {fs = true; break;}
                    if ((npX < l) && (npY < l) && (npX > 0) && (npY > 0) && (Board[npX][npY] !== -1) && (Board[npX][npY] === Board[pX][pY] - 1)) {
                        path.push([npX, npY]); pX = npX; pY = npY;
                    }
                }
            }
        }();
    }

    path.push([spX, spY]);
    path.unshift([fpX, fpY]);
    path.reverse();

    return path;
};


// YOUR SOLUTION
solutions.pylhun_valerii = function (Board) {
    var start, finish;

    if (!Array.isArray(Board)) return "matrix is not a matrix";
    var rowsNum = Board.length;
    if (rowsNum < 2) return "matrix is not a matrix";
    var colsNum = Board[0].length;
    if (colsNum < 2) return "matrix is not a matrix";
    //for(var i= 0, rowsNum=matrix.length; i<rowsNum; i++){
    //    if(matrix[i].length !== colsNum){
    //        return "matrix is not a matrix";
    //    }
    //}
    rows:
        for (var i = 0; i < rowsNum; i++) {
            for (var j = 0; j < colsNum; j++) {
                if (Board[i][j] === "f") {
                    finish = [i, j];
                    break rows;
                }
            }
        }
    rows:
        for (i = 0; i < rowsNum; i++) {
            for (j = 0; j < colsNum; j++) {
                if (Board[i][j] === "s") {
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

    var bfs = function () {
        var sV = sQ.shift();
        var fV = fQ.shift();
        sTreeTraversal[sTreeTraversal.length] = sV;
        fTreeTraversal[fTreeTraversal.length] = fV;

        if (sV[0] - 1 > -1 && sV[1] - 2 > -1 && Board[sV[0] - 1][sV[1] - 2] !== "s" && Board[sV[0] - 1][sV[1] - 2] !== -1) {
            if (Board[sV[0] - 1][sV[1] - 2] === "f") {
                solutionFound = true;
                sTreeTraversal[sTreeTraversal.length] = [sV[0] - 1, sV[1] - 2];
                res[0] = [sV[0] - 1, sV[1] - 2];
                return;
            }
            Board[sV[0] - 1][sV[1] - 2] = "s";
            sQ.push([sV[0] - 1, sV[1] - 2]);
        }
        if (fV[0] - 1 > -1 && fV[1] - 2 > -1 && Board[fV[0] - 1][fV[1] - 2] !== "f" && Board[fV[0] - 1][fV[1] - 2] !== -1) {
            if (Board[fV[0] - 1][fV[1] - 2] === "s") {
                solutionFound = true;
                fTreeTraversal[fTreeTraversal.length] = [fV[0] - 1, fV[1] - 2];
                res[0] = [fV[0] - 1, fV[1] - 2];
                return;
            }
            Board[fV[0] - 1][fV[1] - 2] = "f";
            fQ.push([fV[0] - 1, fV[1] - 2]);
        }

        if (sV[0] - 2 > -1 && sV[1] - 1 > -1 && Board[sV[0] - 2][sV[1] - 1] !== "s" && Board[sV[0] - 2][sV[1] - 1] !== -1) {
            if (Board[sV[0] - 2][sV[1] - 1] === "f") {
                solutionFound = true;
                sTreeTraversal[sTreeTraversal.length] = [sV[0] - 2, sV[1] - 1];
                res[0] = [sV[0] - 2, sV[1] - 1];
                return;
            }
            Board[sV[0] - 2][sV[1] - 1] = "s";
            sQ.push([sV[0] - 2, sV[1] - 1]);
        }
        if (fV[0] - 2 > -1 && fV[1] - 1 > -1 && Board[fV[0] - 2][fV[1] - 1] !== "f" && Board[fV[0] - 2][fV[1] - 1] !== -1) {
            if (Board[fV[0] - 2][fV[1] - 1] === "s") {
                solutionFound = true;
                fTreeTraversal[fTreeTraversal.length] = [fV[0] - 2, fV[1] - 1];
                res[0] = [fV[0] - 2, fV[1] - 1];
                return;
            }
            Board[fV[0] - 2][fV[1] - 1] = "f";
            fQ.push([fV[0] - 2, fV[1] - 1]);
        }

        if (sV[0] - 2 > -1 && sV[1] + 1 < Board[0].length && Board[sV[0] - 2][sV[1] + 1] !== "s" && Board[sV[0] - 2][sV[1] + 1] !== -1) {
            if (Board[sV[0] - 2][sV[1] + 1] === "f") {
                solutionFound = true;
                sTreeTraversal[sTreeTraversal.length] = [sV[0] - 2, sV[1] + 1];
                res[0] = [sV[0] - 2, sV[1] + 1];
                return;
            }
            Board[sV[0] - 2][sV[1] + 1] = "s";
            sQ.push([sV[0] - 2, sV[1] + 1]);
        }
        if (fV[0] - 2 > -1 && fV[1] + 1 < Board[0].length && Board[fV[0] - 2][fV[1] + 1] !== "f" && Board[fV[0] - 2][fV[1] + 1] !== -1) {
            if (Board[fV[0] - 2][fV[1] + 1] === "s") {
                solutionFound = true;
                fTreeTraversal[fTreeTraversal.length] = [fV[0] - 2, fV[1] + 1];
                res[0] = [fV[0] - 2, fV[1] + 1];
                return;
            }
            Board[fV[0] - 2][fV[1] + 1] = "f";
            fQ.push([fV[0] - 2, fV[1] + 1]);
        }

        if (sV[0] - 1 > -1 && sV[1] + 2 < Board[0].length && Board[sV[0] - 1][sV[1] + 2] !== "s" && Board[sV[0] - 1][sV[1] + 2] !== -1) {
            if (Board[sV[0] - 1][sV[1] + 2] === "f") {
                solutionFound = true;
                sTreeTraversal[sTreeTraversal.length] = [sV[0] - 1, sV[1] + 2];
                res[0] = [sV[0] - 1, sV[1] + 2];
                return;
            }
            Board[sV[0] - 1][sV[1] + 2] = "s";
            sQ.push([sV[0] - 1, sV[1] + 2]);
        }
        if (fV[0] - 1 > -1 && fV[1] + 2 < Board[0].length && Board[fV[0] - 1][fV[1] + 2] !== "f" && Board[fV[0] - 1][fV[1] + 2] !== -1) {
            if (Board[fV[0] - 1][fV[1] + 2] === "s") {
                solutionFound = true;
                fTreeTraversal[fTreeTraversal.length] = [fV[0] - 1, fV[1] + 2];
                res[0] = [fV[0] - 1, fV[1] + 2];
                return;
            }
            Board[fV[0] - 1][fV[1] + 2] = "f";
            fQ.push([fV[0] - 1, fV[1] + 2]);
        }

        if (sV[0] + 1 < Board.length && sV[1] + 2 < Board[0].length && Board[sV[0] + 1][sV[1] + 2] !== "s" && Board[sV[0] + 1][sV[1] + 2] !== -1) {
            if (Board[sV[0] + 1][sV[1] + 2] === "f") {
                solutionFound = true;
                sTreeTraversal[sTreeTraversal.length] = [sV[0] + 1, sV[1] + 2];
                res[0] = [sV[0] + 1, sV[1] + 2];
                return;
            }
            Board[sV[0] + 1][sV[1] + 2] = "s";
            sQ.push([sV[0] + 1, sV[1] + 2]);
        }
        if (fV[0] + 1 < Board.length && fV[1] + 2 < Board[0].length && Board[fV[0] + 1][fV[1] + 2] !== "f" && Board[fV[0] + 1][fV[1] + 2] !== -1) {
            if (Board[fV[0] + 1][fV[1] + 2] === "s") {
                solutionFound = true;
                fTreeTraversal[fTreeTraversal.length] = [fV[0] + 1, fV[1] + 2];
                res[0] = [fV[0] + 1, fV[1] + 2];
                return;
            }
            Board[fV[0] + 1][fV[1] + 2] = "f";
            fQ.push([fV[0] + 1, fV[1] + 2]);
        }

        if (sV[0] + 2 < Board.length && sV[1] + 1 < Board[0].length && Board[sV[0] + 2][sV[1] + 1] !== "s" && Board[sV[0] + 2][sV[1] + 1] !== -1) {
            if (Board[sV[0] + 2][sV[1] + 1] === "f") {
                solutionFound = true;
                sTreeTraversal[sTreeTraversal.length] = [sV[0] + 2, sV[1] + 1];
                res[0] = [sV[0] + 2, sV[1] + 1];
                return;
            }
            Board[sV[0] + 2][sV[1] + 1] = "s";
            sQ.push([sV[0] + 2, sV[1] + 1]);
        }
        if (fV[0] + 2 < Board.length && fV[1] + 1 < Board[0].length && Board[fV[0] + 2][fV[1] + 1] !== "f" && Board[fV[0] + 2][fV[1] + 1] !== -1) {
            if (Board[fV[0] + 2][fV[1] + 1] === "s") {
                solutionFound = true;
                fTreeTraversal[fTreeTraversal.length] = [fV[0] + 2, fV[1] + 1];
                res[0] = [fV[0] + 2, fV[1] + 1];
                return;
            }
            Board[fV[0] + 2][fV[1] + 1] = "f";
            fQ.push([fV[0] + 2, fV[1] + 1]);
        }

        if (sV[0] + 2 < Board.length && sV[1] - 1 > -1 && Board[sV[0] + 2][sV[1] - 1] !== "s" && Board[sV[0] + 2][sV[1] - 1] !== -1) {
            if (Board[sV[0] + 2][sV[1] - 1] === "f") {
                solutionFound = true;
                sTreeTraversal[sTreeTraversal.length] = [sV[0] + 2, sV[1] - 1];
                res[0] = [sV[0] + 2, sV[1] - 1];
                return;
            }
            Board[sV[0] + 2][sV[1] - 1] = "s";
            sQ.push([sV[0] + 2, sV[1] - 1]);
        }
        if (fV[0] + 2 < Board.length && fV[1] - 1 > -1 && Board[fV[0] + 2][fV[1] - 1] !== "f" && Board[fV[0] + 2][fV[1] - 1] !== -1) {
            if (Board[fV[0] + 2][fV[1] - 1] === "s") {
                solutionFound = true;
                fTreeTraversal[fTreeTraversal.length] = [fV[0] + 2, fV[1] - 1];
                res[0] = [fV[0] + 2, fV[1] - 1];
                return;
            }
            Board[fV[0] + 2][fV[1] - 1] = "f";
            fQ.push([fV[0] + 2, fV[1] - 1]);
        }

        if (sV[0] + 1 < Board.length && sV[1] - 2 > -1 && Board[sV[0] + 1][sV[1] - 2] !== "s" && Board[sV[0] + 1][sV[1] - 2] !== -1) {
            if (Board[sV[0] + 1][sV[1] - 2] === "f") {
                solutionFound = true;
                sTreeTraversal[sTreeTraversal.length] = [sV[0] + 1, sV[1] - 2];
                res[0] = [sV[0] + 1, sV[1] - 2];
                return;
            }
            Board[sV[0] + 1][sV[1] - 2] = "s";
            sQ.push([sV[0] + 1, sV[1] - 2]);
        }
        if (fV[0] + 1 < Board.length && fV[1] - 2 > -1 && Board[fV[0] + 1][fV[1] - 2] !== "f" && Board[fV[0] + 1][fV[1] - 2] !== -1) {
            if (Board[fV[0] + 1][fV[1] - 2] === "s") {
                solutionFound = true;
                fTreeTraversal[fTreeTraversal.length] = [fV[0] + 1, fV[1] - 2];
                res[0] = [fV[0] + 1, fV[1] - 2];
                return;
            }
            Board[fV[0] + 1][fV[1] - 2] = "f";
            fQ.push([fV[0] + 1, fV[1] - 2]);
        }
    };
    while (!solutionFound) {
        if (sQ.length === 0 || fQ.length === 0) {
            return "deadlock";
        }
        bfs();
    }

    for (i = sTreeTraversal.length - 1; i > -1; i--) {
        var difference = [Math.abs(sTreeTraversal[i][0] - res[0][0]), Math.abs(sTreeTraversal[i][1] - res[0][1])];
        if ((difference[0] === 1 && difference[1] === 2) || (difference[0] === 2 && difference[1] === 1)) {
            res.unshift(sTreeTraversal[i]);
        }
    }
    for (i = fTreeTraversal.length - 1; i > -1; i--) {
        difference = [Math.abs(fTreeTraversal[i][0] - res[res.length - 1][0]), Math.abs(fTreeTraversal[i][1] - res[res.length - 1][1])];
        if ((difference[0] === 1 && difference[1] === 2) || (difference[0] === 2 && difference[1] === 1)) {
            res[res.length] = fTreeTraversal[i];
        }
    }
    return res;
};


// YOUR SOLUTION
solutions.vaskovska_anna = function (Board) {
    //get field height and width
    var fieldHeight = fieldWidth = Board.length;
    var fieldWidth = Board[0].length;

    //get start and finish points
    var start = new Point();
    var finish = new Point();

    initCoordinates();

    //list of unchecked points
    var openSet = [];

    //list of checked points
    var closeSet = [];

    //add start point to list of unchecked points
    openSet.push(start);

    while (openSet.length > 0) {

        // sort array by ascending distance to finish point
        //and get firts of it. This point will have the smallest distance to finish
        var currentPoint = openSet.sort(function (a, b) {
            return a.distance - b.distance;
        })[0];

        //if this point is finish one - return way to it
        if (currentPoint.x == finish.x && currentPoint.y == finish.y) {
            var path = getPath(currentPoint);
            return path;
        }

        //delete this point from inchecked list
        openSet.shift();
        //and put on checked list
        closeSet.push(currentPoint);

        //find all legal neighbours of current point
        var neighbours = getNeighbours(currentPoint);

        //for every neighbour point
        for (var i = 0; i < neighbours.length; i++) {

            //if it is already cheched - continue
            if (exist(closeSet, neighbours[i])) continue;

            //if it is not cheched but already exist in unchecked list - return it
            var openNode = (exist(openSet, neighbours[i])) ? getSame(openSet, neighbours[i]) : null;

            //null means that point isn't exist in unchecked list
            //so add it
            if (openNode == null) {
                openSet.push(neighbours[i]);
            }
            else {
                //сompare point from list and new neighbour point
                //and add to unchecked list point that has
                //smaller distance to finish
                if (openNode.distance < neighbours[i].distance) {
                    openNode.сameFrom = currentPoint;
                    openNode.distance = neighbours[i].distance;
                    openSet.push(openNode);
                }
            }
        }
    }

    // if the way isn't found - return "=("
    return "=(";

    function getNeighbours(currentPoint) {
        var result = [];
        var neighbourPoints = [];

        //all possible moves for forse
        var moveX = [1, 2, 2, 1, -1, -2, -2, -1];
        var moveY = [-2, -1, 1, 2, 2, 1, -1, -2];

        //get all neighbours
        for (var i = 0; i < 8; i++) {
            neighbourPoints.push(new Point(currentPoint.x + moveX[i], currentPoint.y + moveY[i]));
        }

        //validate neighbour points and calculate distance to finish point for each of valid one
        for (var i = 0; i < neighbourPoints.length; i++) {
            var point = neighbourPoints[i];

            if (point.x < 0 || point.x >= fieldWidth) continue;
            if (point.y < 0 || point.y >= fieldHeight) continue;
            if (Board[point.x][point.y] == '-1') continue;

            var newPoint = new Point(point.x, point.y);

            newPoint.cameFrom = currentPoint;
            newPoint.distance = findDistance(point, finish);
            result.push(newPoint);
        }

        return result;

    }

    function getPath(point) {
        var result = [];
        var currentNode = point;
        while (currentNode != null) {
            result.push([currentNode.x, currentNode.y]);
            currentNode = currentNode.cameFrom;
        }
        result.reverse();
        return result;
    }

    function findDistance(from, to) {
        return Math.sqrt(Math.pow((from.x - to.y), 2) + Math.pow((from.y - to.y), 2));
    }

    function Point(x, y) {
        this.x = x;
        this.y = y;
        this.cameFrom = null;
        this.distance = 0;
    }

    function exist(array, element) {
        for (var i = 0; i < array.length; i++) {
            if (element.x == array[i].x && element.y == array[i].y) {
                return true;
            }
        }
        return false;
    }

    function getSame(array, element) {
        for (var i = 0; i < array.length; i++) {
            if (element.x == array[i].x && element.y == array[i].y) {
                return array[i];
            }
        }
        return false;
    }

    function initCoordinates() {

        function findCoordinates(direction) {
            var x, y;
            for (var i = 0; i < fieldHeight; i++) {
                if (Board[i].indexOf(direction) != -1) {
                    y = Board[i].indexOf(direction);
                    x = i;
                    return {
                        'x': x,
                        'y': y,
                    };
                }
            }
            return false;
        }

        var coordX = findCoordinates('s');
        var coordY = findCoordinates('f');
        start.x = coordX.x;
        start.y = coordX.y;
        finish.x = coordY.x;
        finish.y = coordY.y;
    }
};

var Nsmall = 50;
var Nbig = 1000;

var po = function (x, y) {
    obj = {};
    obj.x = x;
    obj.y = y;
    return obj;
}

var boardFacrory = function (N, start, finish) {
    var board = new Array(N);
    for (var i = 0; i < N; i++) {
        board[i] = new Array(N);
        for (var j = 0; j < N; j++) {
            board[i][j] = 0;
        }
    }
    ;
    board[start.x][start.y] = 's';
    board[finish.x][finish.y] = 'f';
    return board;
};

var addRectToBoard = function (board, start, finish) {
    for (var i = start.x; i <= finish.x; i++) {
        for (var j = start.y; j <= finish.y; j++) {
            board[i][j] = -1;
        }
    }
}


var board0 = boardFacrory(Nsmall, po(4, 8), po(0, 0));

var board1 = boardFacrory(Nsmall, po(0, 0), po(49, 49));

var board2 = boardFacrory(Nsmall, po(49, 49), po(0, 0));

var board3 = boardFacrory(Nsmall, po(22, 22), po(23, 23));

var board4 = boardFacrory(Nbig, po(0, 0), po(999, 999));

var board5 = boardFacrory(Nbig, po(0, 0), po(999, 998));

var board6 = boardFacrory(Nbig, po(999, 0), po(0, 999));

var board7 = boardFacrory(Nbig, po(0, 0), po(999, 999));
addRectToBoard(board7, po(2, 0), po(3, 997));
addRectToBoard(board7, po(8, 2), po(10, 999));

var board8 = boardFacrory(Nbig, po(0, 0), po(999, 999));
addRectToBoard(board8, po(2, 2), po(997, 997));

for (var solutionFuncName in solutions) {

    (function (solution) {

        describe(solutionFuncName, function () {
            this.timeout(10000);

            var timer;
            var localTimer;
            var skipped;

            before(function () {
                timer = Date.now();
                skipped = false
            });

            after(function () {
                console.log("\n it takes: " + ( Date.now() - timer) + "ms \n");
            });

            beforeEach(function () {
                localTimer = Date.now();
            });

            afterEach(function () {
                if ((Date.now() - localTimer) > 10000) {
                    this.skip()
                }
                if (skipped) {
                    this.skip();
                }
            });

            var tests = [
                {args: board0, expected: 5},
                {args: board1, expected: 35},
                {args: board2, expected: 35},
                {args: board3, expected: 3},
                {args: board4, expected: 667},
                {args: board5, expected: 668},
                {args: board6, expected: 667},
                {args: board7, expected: 1665},
                {args: board8, expected: 999}
            ];

            function arrayClone(arr) {

                var i, copy;

                if (Array.isArray(arr)) {
                    copy = arr.slice(0);
                    for (i = 0; i < copy.length; i++) {
                        copy[i] = arrayClone(copy[i]);
                    }
                    return copy;
                } else if (typeof arr === 'object') {
                    throw 'Cannot clone array containing an object!';
                } else {
                    return arr;
                }

            }

            tests.forEach(function (test, index) {
                it('can find path on #' + index + ' board', function () {
                    var result = solution(arrayClone(test.args));
                    result = (typeof(result) == "undefined") ? undefined : result.length;
                    //if (result !== test.expected) {
                    //    skipped = true;
                    //}
                    assert.equal(result, test.expected);

                });
            });
        });
    })(solutions[solutionFuncName], solutionFuncName);
}
