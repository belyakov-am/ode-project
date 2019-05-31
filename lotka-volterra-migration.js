board_m = JXG.JSXGraph.initBoard('jxgbox-migrate', {boundingbox: [-4, 40.5, 95.5, -3.5], axis: true, grid: false, showCopyright: false});

alpha_slider_m = board_m.createElement('slider', [[10.0, 38.5], [20.0, 38.5], [0.0, 0.4, 1.0]],{name:'&alpha;',strokeColor:'black',fillColor:'black'});
alpha_text_m = board_m.createElement('text', [10, 37.5, "alpha"], {fixed:true});

beta_slider_m = board_m.createElement('slider', [[30.0, 38.5], [40.0, 38.5], [0.0, 0.11, 1.0]],{name:'&beta;',strokeColor:'black',fillColor:'black'});
beta_text_m = board_m.createElement('text', [30, 37.5, "beta"], {fixed:true});

gamma_slider_m = board_m.createElement('slider', [[50.0, 38.5], [60.0, 38.5], [0.0, 0.8, 1.0]],{name:'&gamma;',strokeColor:'black',fillColor:'black'});
gamma_text_m = board_m.createElement('text', [50, 37.5, "gamma"], {fixed:true});

delta_slider_m = board_m.createElement('slider', [[70.0, 38.5], [80.0, 38.5], [0.0, 0.25, 1.0]],{name:'&delta;',strokeColor:'black',fillColor:'black'});
delta_text_m = board_m.createElement('text', [70, 37.5, "delta"], {fixed:true});

c_slider_m = board_m.createElement('slider', [[10.0, 36.3], [40.0, 36.3], [0.0, 0.05, 1.0]],{name:'c',strokeColor:'black',fillColor:'black'});
c_text_m = board_m.createElement('text', [10, 35.3, "c"], {fixed:true});

d_slider_m = board_m.createElement('slider', [[50.0, 36.3], [80.0, 36.3], [0.0, 0.0, 1.0]],{name:'d',strokeColor:'black',fillColor:'black'});
d_text_m = board_m.createElement('text', [50, 35.3, "d"], {fixed:true});

startprey_m = board_m.createElement('glider', [0, 16, board_m.defaultAxes.y], {name:'Preys',strokeColor:'blue',fillColor:'blue'});
startpred_m = board_m.createElement('glider', [0, 10, board_m.defaultAxes.y], {name:'Predators',strokeColor:'red',fillColor:'red'});

var g3_m = null;
var g4_m = null;


function ode_m() {
    var I_m = [0, 200];
    var N_m = 5000;

    var f_m = function(t_m, x_m) {
        var alpha_m = alpha_slider_m.Value();
        var beta_m = beta_slider_m.Value();
        var gamma_m = gamma_slider_m.Value();
        var delta_m = delta_slider_m.Value();
        var c_m = c_slider_m.Value();
        var d_m = d_slider_m.Value();

        var y_m = [];

        var cx_m = c_m;
        if (x_m[0] !== 0) {
            cx_m /= x_m[0];
        }

        var dx_m = d_m;
        if (x_m[1] !== 0) {
            dx_m /= x_m[1];
        }

        y_m[0] = x_m[0] * (alpha_m - beta_m * x_m[1]) + cx_m;
        y_m[1] = x_m[1] * (-gamma_m + delta_m * x_m[0]) + dx_m;
        // console.log(y_m[0], y_m[1], x_m[0], x_m[1]);

        return y_m;
    };

    var x0_m = [startprey_m.Y(), startpred_m.Y()];

    var data_m = solve_ode(x0_m, I_m, N_m, f_m);

    var q_m = I_m[0];
    var h_m = (I_m[1]-I_m[0]) / N_m;
    for (let i = 0; i < data_m.length; ++i) {
        data_m[i].push(q_m);
        q_m += h_m;
    }

    return data_m;
}

var data_m = ode_m();

var t_m = [];
var dataprey_m = [];
var datapred_m = [];
for (let i = 0; i < data_m.length; i++) {
    dataprey_m[i] = data_m[i][0];
    datapred_m[i] = data_m[i][1];
    t_m[i] = data_m[i][2];
}

g3_m = board_m.createElement('curve', [t_m, datapred_m], {strokeColor:'red', strokeWidth:'2px'});
g3_m.updateDataArray = function() {
    var data_m = ode_m();
    this.dataX = [];
    this.dataY = [];
    for (let i = 0; i < data_m.length; i++) {
        this.dataX[i] = t_m[i];
        this.dataY[i] = data_m[i][1];
    }
};

g4_m = board_m.createElement('curve', [t_m, dataprey_m], {strokeColor:'blue', strokeWidth:'2px'});
g4_m.updateDataArray = function() {
    var data_m = ode_m();
    this.dataX = [];
    this.dataY = [];
    for (let i = 0; i < data_m.length; i++) {
        this.dataX[i] = t_m[i];
        this.dataY[i] = data_m[i][0];
    }
};