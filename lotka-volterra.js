board = JXG.JSXGraph.initBoard('jxgbox', {boundingbox: [-4, 40.5, 95.5, -3.5], axis: true, grid: false, showCopyright: false});

s = board.createElement('slider', [[10.0, 38.5], [20.0, 38.5], [0.0, 0.3, 1.0]],{name:'&alpha;',strokeColor:'black',fillColor:'black'});
st = board.createElement('text', [10, 37.5, "alpha"], {fixed:true});

o = board.createElement('slider', [[30.0, 38.5], [40.0, 38.5], [0.0, 0.28, 1.0]],{name:'&beta;',strokeColor:'black',fillColor:'black'});
ot = board.createElement('text', [30, 37.5, "beta"], {fixed:true});

u = board.createElement('slider', [[50.0, 38.5], [60.0, 38.5], [0.0, 0.7, 1.0]],{name:'&gamma;',strokeColor:'black',fillColor:'black'});
ut = board.createElement('text', [50, 37.5, "gamma"], {fixed:true});

p = board.createElement('slider', [[70.0, 38.5], [80.0, 38.5], [0.0, 0.3, 1.0]],{name:'&delta;',strokeColor:'black',fillColor:'black'});
pt = board.createElement('text', [70, 37.5, "delta"], {fixed:true});

startprey = board.createElement('glider', [0, 10, board.defaultAxes.y], {name:'Preys',strokeColor:'blue',fillColor:'blue'});
startpred = board.createElement('glider', [0, 5, board.defaultAxes.y], {name:'Predators',strokeColor:'red',fillColor:'red'});


var g3 = null;
var g4 = null;

function solve_ode(x0, I, N, f) {
    var data = [x0];
    var dt = (I[1] - I[0]) / N;
    for (var i = 1; i < N; ++i) {
        var dx_dt = data[i - 1][0] + dt * f(0, data[i - 1])[0];
        var dy_dt = data[i - 1][1] + dt * f(0, data[i - 1])[1];
        data.push([dx_dt, dy_dt]);
    }

    return data
}

function ode() {
    var I = [0, 100];
    var N = 1000;

    var f = function(t, x) {
        var bpred = s.Value();
        var bprey = u.Value();
        var dpred = o.Value();
        var dprey = p.Value();

        var y = [];
        y[0] = x[0]*(bpred - dpred*x[1]);
        y[1] = x[1]*(-bprey + dprey*x[0]);

        return y;
    };

    var x0 = [startprey.Y(), startpred.Y()];

    var data = solve_ode(x0, I, N, f);

    var q = I[0];
    var h = (I[1]-I[0])/N;
    for(var i=0; i<data.length; i++) {
        data[i].push(q);
        q += h;
    }

    return data;
}

var data = ode();

var t = [];
var dataprey = [];
var datapred = [];
for(var i=0; i<data.length; i++) {
    dataprey[i] = data[i][0];
    datapred[i] = data[i][1];
    t[i] = data[i][2];
}

g3 = board.createElement('curve', [t, datapred], {strokeColor:'red', strokeWidth:'2px'});
g3.updateDataArray = function() {
    var data = ode();
    this.dataX = [];
    this.dataY = [];
    for(var i=0; i<data.length; i++) {
        this.dataX[i] = t[i];
        this.dataY[i] = data[i][1];
    }
};

g4 = board.createElement('curve', [t, dataprey], {strokeColor:'blue', strokeWidth:'2px'});
g4.updateDataArray = function() {
    var data = ode();
    this.dataX = [];
    this.dataY = [];
    for(var i=0; i<data.length; i++) {
        this.dataX[i] = t[i];
        this.dataY[i] = data[i][0];
    }
};
