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
        for (var i = 0; i < matrix.length; i++){
            if (matrix[i].indexOf('s') !== -1) {
                start.t = i;
                start.l = matrix[i].indexOf('s');
                break;
            }
        }

        //Find coordinates of end
        for (var i = 0; i < matrix.length; i++){
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
            'l':  2
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

            for (var i = 0; i < steps.length; i++){
                //Check if point is not out of grid
                if (currentLocation.t + steps[i].t > 0 && currentLocation.t + steps[i].t < matrix.length && currentLocation.l + steps[i].l > 0 && currentLocation.l + steps[i].l < matrix[0].length) {
                    //Check if cell is free from obstacles and was not visited before
                    if (matrix[currentLocation.t + steps[i].t][currentLocation.l + steps[i].l] === 0) {
                        newPath = currentLocation.path.slice();
                        newPath.push([currentLocation.t + steps[i].t,currentLocation.l + steps[i].l]);
                        queue.push({
                          t: currentLocation.t + steps[i].t,
                          l: currentLocation.l + steps[i].l,
                          path: newPath
                        });

                        matrix[currentLocation.t + steps[i].t][currentLocation.l + steps[i].l] = -1;
                    } else if (matrix[currentLocation.t + steps[i].t][currentLocation.l + steps[i].l] === 'f') {
                        newPath = currentLocation.path.slice();
                        newPath.push([currentLocation.t + steps[i].t,currentLocation.l + steps[i].l]);
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
    // GOES HERE
};


// YOUR SOLUTION
solutions.vaskovska_anna = function (Board) {
    // GOES HERE
};