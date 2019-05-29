// Initialise board
board = JXG.JSXGraph.initBoard('jxgbox1', {boundingbox: [-1.5, 33.5, 33.5, -1.5], axis: true, grid: false, showCopyright: false});


// Define sliders to dynamically change parameters of the equations and create text elements to describe them
s = board.createElement('slider', [[20.0,26.0],[25.0,26.0],[0.0,0.3,1.0]],{name:'&epsilon;1',strokeColor:'black',fillColor:'black'});
st = board.createElement('text', [20,25, "Birth rate predators"], {fixed:true});
u = board.createElement('slider', [[20.0,24.0],[25.0,24.0],[0.0,0.7,1.0]],{name:'&epsilon;2',strokeColor:'black',fillColor:'black'});
ut = board.createElement('text', [20,23, "Death rate predators"], {fixed:true});

o = board.createElement('slider', [[10.0,26.0],[15.0,26.0],[0.0,0.1,1.0]],{name:'&gamma;1',strokeColor:'black',fillColor:'black'});
ot = board.createElement('text', [10,25, "Death rate preys/per predator"], {fixed:true});
p = board.createElement('slider', [[10.0,24.0],[15.0,24.0],[0.0,0.3,1.0]],{name:'&gamma;2',strokeColor:'black',fillColor:'black'});
pt = board.createElement('text', [10,23, "Reproduction rate pred./per prey"], {fixed:true});

b = board.createElement('slider', [[10.0,30.0],[15.0,30.0],[25.0,25.0,100.0]],{name:'&gamma;2',strokeColor:'black',fillColor:'black'});
bt = board.createElement('text', [10,29, "b"], {fixed:true});


// Dynamic initial value as gliders on the y-axis
startpred = board.createElement('glider', [0, 10, board.defaultAxes.y], {name:'Preys',strokeColor:'red',fillColor:'red'});
startprey = board.createElement('glider', [0, 5, board.defaultAxes.y], {name:'Predators',strokeColor:'blue',fillColor:'blue'});


// Variables for the JXG.Curves
var g3 = null;
var g4 = null;

// Initialise ODE and solve it with JXG.Math.Numerics.rungeKutta()
function ode() {
    // evaluation interval
    var I = [0, b.Value()];
    // Number of steps. 1000 should be enough
    var N = 1000;

    // Right hand side of the ODE dx/dt = f(t, x)
    var f = function(t, x) {
        var bpred = s.Value();//0.3;
        var bprey = u.Value();//0.7;
        var dpred = o.Value();//0.1;
        var dprey = p.Value();//0.3;

        var y = [];
        y[0] = x[0]*(bpred - dpred*x[1]);
        y[1] = -x[1]*(bprey - dprey*x[0]);

        return y;
    };

    // Initial value
    var x0 = [startpred.Y(), startprey.Y()];

    // Solve ode
    var data = JXG.Math.Numerics.rungeKutta('euler', x0, I, N, f);

    // to plot the data against time we need the times where the equations were solved
    var t = [];
    var q = I[0];
    var h = (I[1]-I[0])/N;
    for(var i=0; i<data.length; i++) {
        data[i].push(q);
        q += h;
    }

    return data;
}

// get data points
var data = ode();

// copy data to arrays so we can plot it using JXG.Curve
var t = [];
var dataprey = [];
var datapred = [];
for(var i=0; i<data.length; i++) {
    t[i] = data[i][2];
    datapred[i] = data[i][0];
    dataprey[i] = data[i][1];
}

// Plot Predator
g3 = board.createElement('curve', [t, datapred], {strokeColor:'red', strokeWidth:'2px'});
g3.updateDataArray = function() {
    var data = ode();
    this.dataX = [];
    this.dataY = [];
    for(var i=0; i<data.length; i++) {
        this.dataX[i] = t[i];
        this.dataY[i] = data[i][0];
    }
};

// Plot Prey
g4 = board.createElement('curve', [t, dataprey], {strokeColor:'blue', strokeWidth:'2px'});
g4.updateDataArray = function() {
    var data = ode();
    this.dataX = [];
    this.dataY = [];
    for(var i=0; i<data.length; i++) {
        this.dataX[i] = t[i];
        this.dataY[i] = data[i][1];
    }
};