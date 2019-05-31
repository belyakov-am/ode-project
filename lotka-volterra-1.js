board1 = JXG.JSXGraph.initBoard('jxgbox-1', {boundingbox: [-4, 40.5, 95.5, -3.5], axis: true, grid: false, showCopyright: false});

alpha_slider1 = board1.createElement('slider', [[10.0, 38.5], [20.0, 38.5], [0.0, 0.63, 1.0]],{name:'&alpha;',strokeColor:'black',fillColor:'black'});
alpha_text1 = board1.createElement('text', [10, 37.5, "alpha"], {fixed:true});

beta_slider1 = board1.createElement('slider', [[30.0, 38.5], [40.0, 38.5], [0.0, 0.21, 1.0]],{name:'&beta;',strokeColor:'black',fillColor:'black'});
beta_text1 = board1.createElement('text', [30, 37.5, "beta"], {fixed:true});

gamma_slider1 = board1.createElement('slider', [[50.0, 38.5], [60.0, 38.5], [0.0, 0.75, 1.0]],{name:'&gamma;',strokeColor:'black',fillColor:'black'});
gamma_text1 = board1.createElement('text', [50, 37.5, "gamma"], {fixed:true});

delta_slider1 = board1.createElement('slider', [[70.0, 38.5], [80.0, 38.5], [0.0, 0.52, 1.0]],{name:'&delta;',strokeColor:'black',fillColor:'black'});
delta_text1 = board1.createElement('text', [70, 37.5, "delta"], {fixed:true});

eps_slider = board1.createElement('slider', [[50.0, 35.5], [60.0, 35.5], [0.0, 0.03, 1.0]],{name:'&epsilon;',strokeColor:'black',fillColor:'black'});
eps_text = board1.createElement('text', [50, 34.5, "epsilon"], {fixed:true});

zeta_slider = board1.createElement('slider', [[70.0, 35.5], [80.0, 35.5], [0.0, 0.03, 1.0]],{name:'&zeta;',strokeColor:'black',fillColor:'black'});
zeta_text = board1.createElement('text', [70, 35.5, "zeta"], {fixed:true});

startprey1 = board1.createElement('glider', [0, 20, board1.defaultAxes.y], {name:'Preys',strokeColor:'blue',fillColor:'blue'});
startpred1 = board1.createElement('glider', [0, 10, board1.defaultAxes.y], {name:'Predators',strokeColor:'red',fillColor:'red'});


var g31 = null;
var g41 = null;

function ode1() {
    var I1 = [0, 100];
    var N1 = 5000;

    var f1 = function(t1, x1) {
        var alpha1 = alpha_slider1.Value();
        var beta1 = beta_slider1.Value();
        var gamma1 = gamma_slider1.Value();
        var delta1 = delta_slider1.Value();
        var eps1 = eps_slider.Value();
        var zeta1 = zeta_slider.Value();

        var y1 = [];
        y1[0] = alpha1 * x1[0] - beta1 * x1[0] * x1[1] - eps1 * x1[0] * x1[0];
        y1[1] = -gamma1 * x1[1] + delta1 * x1[0] * x1[1] - zeta1 * x1[1] * x1[1];

        return y1;
    };

    var x01 = [startpred1.Y(), startprey1.Y()];

    var data1 = solve_ode(x01, I1, N1, f1);

    var q1 = I1[0];
    var h1 = (I1[1] - I1[0]) / N1;
    for(let i = 0; i < data1.length; i++) {
        data1[i].push(q1);
        q1 += h1;
    }

    return data1;
}

var data1 = ode1();

var t1 = [];
var dataprey1 = [];
var datapred1 = [];
for(let i = 0; i < data1.length; i++) {
    dataprey1[i] = data1[i][0];
    datapred1[i] = data1[i][1];
    t1[i] = data1[i][2];
}

g31 = board1.createElement('curve', [t1, datapred1], {strokeColor:'red', strokeWidth:'2px'});
g31.updateDataArray = function() {
    var data1 = ode1();
    this.dataX = [];
    this.dataY = [];
    for(let i = 0; i < data1.length; i++) {
        this.dataX[i] = t1[i];
        this.dataY[i] = data1[i][1];
    }
};

g41 = board1.createElement('curve', [t1, dataprey1], {strokeColor:'blue', strokeWidth:'2px'});
g41.updateDataArray = function() {
    var data1 = ode1();
    this.dataX = [];
    this.dataY = [];
    for(let i = 0; i < data1.length; i++) {
        this.dataX[i] = t1[i];
        this.dataY[i] = data1[i][0];
    }
};
