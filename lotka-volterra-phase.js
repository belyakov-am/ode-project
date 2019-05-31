board_phase = JXG.JSXGraph.initBoard('jxgbox-phase', {boundingbox: [-4, 42.5, 42.5, -3.5], axis: true, grid: false, showCopyright: false});

alpha_slider_p = board_phase.createElement('slider', [[3.0, 40.5], [8.0, 40.5], [0.0, 0.42, 1.0]],{name:'&alpha;',strokeColor:'black',fillColor:'black'});
alpha_text_p = board_phase.createElement('text', [5, 39.5, "alpha"], {fixed:true});

beta_slider_p = board_phase.createElement('slider', [[13.0, 40.5], [18.0, 40.5], [0.0, 0.14, 1.0]],{name:'&beta;',strokeColor:'black',fillColor:'black'});
beta_text_p = board_phase.createElement('text', [13, 39.5, "beta"], {fixed:true});

gamma_slider_p = board_phase.createElement('slider', [[23.0, 40.5], [28.0, 40.5], [0.0, 0.79, 1.0]],{name:'&gamma;',strokeColor:'black',fillColor:'black'});
gamma_text_p = board_phase.createElement('text', [23, 39.5, "gamma"], {fixed:true});

delta_slider_p = board_phase.createElement('slider', [[33.0, 40.5], [38.0, 40.5], [0.0, 0.17, 1.0]],{name:'&delta;',strokeColor:'black',fillColor:'black'});
delta_text_p = board_phase.createElement('text', [33, 39.5, "delta"], {fixed:true});

prey_0 = board_phase.createElement('glider', [10, 0, board_phase.defaultAxes.x], {name:'Preys',strokeColor:'blue',fillColor:'blue'});
pred_0 = board_phase.createElement('glider', [0, 5, board_phase.defaultAxes.y], {name:'Predators',strokeColor:'red',fillColor:'red'});


var draw_data = null;


function ode_phase() {
    var I_phase = [0, 200];
    var N_phase = 5000;

    var f_phase = function(t_phase, x_phase) {
        var alpha_p = alpha_slider_p.Value();
        var beta_p = beta_slider_p.Value();
        var gamma_p = gamma_slider_p.Value();
        var delta_p = delta_slider_p.Value();

        var y_phase = [];
        y_phase[0] = x_phase[0] * (alpha_p - beta_p * x_phase[1]);
        y_phase[1] = x_phase[1] * (-gamma_p + delta_p * x_phase[0]);

        return y_phase;
    };

    var x0_phase = [prey_0.X(), pred_0.Y()];

    var data_phase = solve_ode(x0_phase, I_phase, N_phase, f_phase);

    return data_phase;
}

var data_phase = ode_phase();

var prey_data = [];
var pred_data = [];

for (let i = 0; i < data_phase.length; ++i) {
    prey_data.push(data_phase[i][0]);
    pred_data.push(data_phase[i][1]);
}

draw_data = board_phase.createElement('curve', [prey_data, pred_data], {strokeColor:'#ff6600', strokeWidth:'2px'});
draw_data.updateDataArray = function() {
    var func_data = ode_phase();
    this.dataX = [];
    this.dataY = [];

    for (let i = 0; i < func_data.length; ++i) {
        this.dataX.push(func_data[i][0]);
        this.dataY.push(func_data[i][1]);
    }
};