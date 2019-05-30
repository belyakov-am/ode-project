// Initialise board1
board1 = JXG.JSXGraph.initBoard('jxgbox-1', {boundingbox: [-1.5, 28.5, 28.5, -2.5], axis: true, grid: false, showCopyright: false});

// Define sliders to dynamically change parameters of the equations and create text elements to describe them
s1 = board1.createElement('slider', [[20.0,26.0],[25.0,26.0],[0.0,0.3,1.0]],{name:'&epsilon;1',strokeColor:'black',fillColor:'black'});
st1 = board1.createElement('text', [20,25, "Birth rate predators"], {fixed:true});
u1 = board1.createElement('slider', [[20.0,24.0],[25.0,24.0],[0.0,0.7,1.0]],{name:'&epsilon;2',strokeColor:'black',fillColor:'black'});
ut1 = board1.createElement('text', [20,23, "Death rate predators"], {fixed:true});

o1 = board1.createElement('slider', [[10.0,26.0],[15.0,26.0],[0.0,0.1,1.0]],{name:'&gamma;1',strokeColor:'black',fillColor:'black'});
ot1 = board1.createElement('text', [10,25, "Death rate preys/per predator"], {fixed:true});
p1 = board1.createElement('slider', [[10.0,24.0],[15.0,24.0],[0.0,0.3,1.0]],{name:'&gamma;2',strokeColor:'black',fillColor:'black'});
pt1 = board1.createElement('text', [10,23, "Reproduction rate pred./per prey"], {fixed:true});

// Dynamic initial value as gliders on the y-axis
startpred1 = board1.createElement('glider', [0, 10, board1.defaultAxes.y], {name:'Preys',strokeColor:'red',fillColor:'red'});
startprey1 = board1.createElement('glider', [0, 5, board1.defaultAxes.y], {name:'Predators',strokeColor:'blue',fillColor:'blue'});


// Variables for the JXG.Curves
var g31 = null;
var g41 = null;


function solve_ode1(x0, I, N, f) {
    var data = [x0];
    var dt = (I[1] - I[0]) / N;
    for (var i = 1; i < N; ++i) {
        var dx_dt = data[i - 1][0] + dt * f(0, data[i - 1])[0];
        var dy_dt = data[i - 1][1] + dt * f(0, data[i - 1])[1];
        data.push([dx_dt, dy_dt]);
    }

    return data
}


// Initialise ODE and solve it with JXG.Math.Numerics.rungeKutta()
function ode1() {
    // evaluation interval
    var I1 = [0, 25];
    // Number of steps. 1000 should be enough
    var N1 = 1000;

    // Right hand side of the ODE dx/dt = f(t, x)
    var f1 = function(t1, x1) {
        var bpred1 = s1.Value();//0.3;
        var bprey1 = u1.Value();//0.7;
        var dpred1 = o1.Value();//0.1;
        var dprey1 = p1.Value();//0.3;

        var y1 = [];
        y1[0] = x1[0]*(bpred1 - dpred1*x1[1]);
        y1[1] = -x1[1]*(bprey1 - dprey1*x1[0]);

        return y1;
    };

    // Initial value
    var x01 = [startpred1.Y(), startprey1.Y()];

    // Solve ode
    var data1 = solve_ode1(x01, I1, N1, f1);

    // to plot the data against time we need the times where the equations were solved
    var q1 = I1[0];
    var h1 = (I1[1]-I1[0])/N1;
    for(var i=0; i<data1.length; i++) {
        data1[i].push(q1);
        q1 += h1;
    }

    return data1;
}

// get data points
var data1 = ode1();

// copy data to arrays so we can plot it using JXG.Curve
var t1 = [];
var dataprey1 = [];
var datapred1 = [];
for(var i=0; i<data1.length; i++) {
    t1[i] = data1[i][2];
    datapred1[i] = data1[i][0];
    dataprey1[i] = data1[i][1];
}

// Plot Predator
g31 = board1.createElement('curve', [t1, datapred1], {strokeColor:'red', strokeWidth:'2px'});
g31.updateDataArray = function() {
    var data1 = ode1();
    this.dataX = [];
    this.dataY = [];
    for(var i=0; i<data1.length; i++) {
        this.dataX[i] = t1[i];
        this.dataY[i] = data1[i][0];
    }
};

// Plot Prey
g41 = board1.createElement('curve', [t1, dataprey1], {strokeColor:'blue', strokeWidth:'2px'});
g41.updateDataArray = function() {
    var data1 = ode1();
    this.dataX = [];
    this.dataY = [];
    for(var i=0; i<data1.length; i++) {
        this.dataX[i] = t1[i];
        this.dataY[i] = data1[i][1];
    }
};
