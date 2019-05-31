board_phase1 = JXG.JSXGraph.initBoard('jxgbox-phase1', {boundingbox: [-4, 42.5, 42.5, -3.5], axis: true, grid: false, showCopyright: false});

alpha_slider_p1 = board_phase1.createElement('slider', [[3.0, 40.5], [8.0, 40.5], [0.0, 0.42, 1.0]],{name:'&alpha;',strokeColor:'black',fillColor:'black'});
alpha_text_p1 = board_phase1.createElement('text', [5, 39.5, "alpha"], {fixed:true});

beta_slider_p1 = board_phase1.createElement('slider', [[13.0, 40.5], [18.0, 40.5], [0.0, 0.14, 1.0]],{name:'&beta;',strokeColor:'black',fillColor:'black'});
beta_text_p1 = board_phase1.createElement('text', [13, 39.5, "beta"], {fixed:true});

gamma_slider_p1 = board_phase1.createElement('slider', [[23.0, 40.5], [28.0, 40.5], [0.0, 0.79, 1.0]],{name:'&gamma;',strokeColor:'black',fillColor:'black'});
gamma_text_p1 = board_phase1.createElement('text', [23, 39.5, "gamma"], {fixed:true});

delta_slider_p1 = board_phase1.createElement('slider', [[33.0, 40.5], [38.0, 40.5], [0.0, 0.17, 1.0]],{name:'&delta;',strokeColor:'black',fillColor:'black'});
delta_text_p1 = board_phase1.createElement('text', [33, 39.5, "delta"], {fixed:true});

prey_01 = board_phase1.createElement('glider', [10, 0, board_phase1.defaultAxes.x], {name:'Preys',strokeColor:'blue',fillColor:'blue'});
pred_01 = board_phase1.createElement('glider', [0, 5, board_phase1.defaultAxes.y], {name:'Predators',strokeColor:'red',fillColor:'red'});

var draw_data1 = null;


function ode_phase1() {
    var I_phase1 = [0, 200];
    var N_phase1 = 5000;

    var f_phase1 = function(t_phase1, x_phase1) {
        var alpha_p1 = alpha_slider_p1.Value();
        var beta_p1 = beta_slider_p1.Value();
        var gamma_p1 = gamma_slider_p1.Value();
        var delta_p1 = delta_slider_p1.Value();

        var y_phase1 = [];
        y_phase1[0] = x_phase1[0] * (alpha_p1 - beta_p1 * x_phase1[1]);
        y_phase1[1] = x_phase1[1] * (-gamma_p1 + delta_p1 * x_phase1[0]);

        return y_phase1;
    };

    var x0_phase1 = [prey_01.X(), pred_01.Y()];

    var data_phase1 = solve_ode(x0_phase1, I_phase1, N_phase1, f_phase1);

    return data_phase1;
}

var data_phase1 = ode_phase1();

var prey_data1 = [];
var pred_data1 = [];

for (let i = 0; i < data_phase1.length; ++i) {
    prey_data1.push(data_phase1[i][0]);
    pred_data1.push(data_phase1[i][1]);
}

draw_data1 = board_phase1.createElement('curve', [prey_data1, pred_data1], {strokeColor:'#ff6600', strokeWidth:'2px'});
draw_data1.updateDataArray = function() {
    var func_data1 = ode_phase1();
    this.dataX = [];
    this.dataY = [];

    for (let i = 0; i < func_data1.length; ++i) {
        this.dataX.push(func_data1[i][0]);
        this.dataY.push(func_data1[i][1]);
    }
};