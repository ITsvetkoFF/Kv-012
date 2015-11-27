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
solutions.melnykov_andrii = function (a) {

    var spX = -Infinity; // start point
    var spY = -Infinity;
    var l = a.length;

    !function searchStart() {
        var f = false;
        var i = 0;
        var patt = /s/i;
        while (!f && (i < l)) {
            for (i =0; i < l; i++) {
                for (var j = 0; j < l; j++) {
                    if (patt.test(a[i][j])) {spX = i; spY = j;f = true;}
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
        return console.log("Start point NOT found");
    } else {

        a[spX][spY] = 0;
        q.push([spX,spY]);

        !function searchFinish () {
            var patt = /f/i;
            while ((q.length > 0) && !ff) {
                var p = q.shift(); // first in the queue
                for (var i = 0; i < 8; i++) {
                    var npX = p[0] + mX[i]; // next point X
                    var npY = p[1] + mY[i];
                    if ((npX < l) && (npY < l) && (npY > 0) && (npX > 0)) {
                        if (patt.test(a[npX][npY])) {ff = true; fpX = npX; fpY = npY; fpV = a[p[0]][p[1]] + 1;}
                        if (a[npX][npY] === 0) {a[npX][npY] = a[p[0]][p[1]] + 1; q.push([npX, npY]);}
                    }
                }
            }
        }();
    }


    if (fpX < 0) {
        return console.log("NO way to finish");
    } else {

        a[fpX][fpY] = fpV;
        a[spX][spY] = "S";
        var path = [];
        var fs = false; // find start
        var pX = fpX;
        var pY = fpY;

    document.write("<br>");
    !function createMatrix () {
        for (var i = 0; i < l; i++) {
            for (var j = 0; j < l; j++) {
                document.write(a[i][j] + "&nbsp;&nbsp;&nbsp;");
            }
            document.write("<br>");
        }
    }();

        !function searchPath() {
            document.write("<br>");
            while (!fs) {
                for (var i = 0; i < 8; i++) {
                    var npX = pX - mX[i]; // previous point
                    var npY = pY - mY[i];
                    if (a[npX][npY] === "S") {fs = true; break;}
                    if ((npX < l) && (npY < l) && (npX > 0) && (npY > 0) && (a[npX][npY] !== -1) && (a[npX][npY] === a[pX][pY] - 1)) {
                        path.push([npX, npY]); pX = npX; pY = npY;
                    }
                }
            }
        }();
    }

    a[fpX][fpY] = "F";

    document.write("<br>");
    !function createMatrix () {
        for (var i = 0; i < l; i++) {
            for (var j = 0; j < l; j++) {
                document.write(a[i][j] + "&nbsp;&nbsp;&nbsp;");
            }
            document.write("<br>");
        }
    }();

    path.push([spX, spY]);
    path.unshift([fpX, fpY]);
    path.reverse();

    return path;

};


// YOUR SOLUTION
solutions.pylhun_valerii = function (Board) {
    // GOES HERE
};


// YOUR SOLUTION
solutions.vaskovska_anna = function (Board) {
    // GOES HERE
};