board_mp = JXG.JSXGraph.initBoard('jxgbox-mp', {boundingbox: [-4, 42.5, 42.5, -3.5], axis: true, grid: false, showCopyright: false});

alpha_slider_mp = board_mp.createElement('slider', [[3.0, 40.5], [8.0, 40.5], [0.0, 0.44, 1.0]],{name:'&alpha;',strokeColor:'black',fillColor:'black'});
alpha_text_mp = board_mp.createElement('text', [5, 39.5, "alpha"], {fixed:true});

beta_slider_mp = board_mp.createElement('slider', [[13.0, 40.5], [18.0, 40.5], [0.0, 0.19, 1.0]],{name:'&beta;',strokeColor:'black',fillColor:'black'});
beta_text_mp = board_mp.createElement('text', [13, 39.5, "beta"], {fixed:true});

gamma_slider_mp = board_mp.createElement('slider', [[23.0, 40.5], [28.0, 40.5], [0.0, 0.88, 1.0]],{name:'&gamma;',strokeColor:'black',fillColor:'black'});
gamma_text_mp = board_mp.createElement('text', [23, 39.5, "gamma"], {fixed:true});

delta_slider_mp = board_mp.createElement('slider', [[33.0, 40.5], [38.0, 40.5], [0.0, 0.12, 1.0]],{name:'&delta;',strokeColor:'black',fillColor:'black'});
delta_text_mp = board_mp.createElement('text', [33, 39.5, "delta"], {fixed:true});

c_slider_mp = board_mp.createElement('slider', [[3.0, 36.3], [18.0, 36.3], [0.0, 0.05, 1.0]],{name:'c',strokeColor:'black',fillColor:'black'});
c_text_mp = board_mp.createElement('text', [3, 35.3, "c"], {fixed:true});

d_slider_mp = board_mp.createElement('slider', [[23.0, 36.3], [38.0, 36.3], [0.0, 0.0, 1.0]],{name:'d',strokeColor:'black',fillColor:'black'});
d_text_mp = board_mp.createElement('text', [23, 35.3, "d"], {fixed:true});

prey_0_mp = board_mp.createElement('glider', [10, 0, board_mp.defaultAxes.x], {name:'Preys',strokeColor:'blue',fillColor:'blue'});
pred_0_mp = board_mp.createElement('glider', [0, 5, board_mp.defaultAxes.y], {name:'Predators',strokeColor:'red',fillColor:'red'});


var draw_data_mp = null;


function ode_mp() {
    var I_mp = [0, 200];
    var N_mp = 5000;

    var f_mp = function(t_mp, x_mp) {
        var alpha_mp = alpha_slider_mp.Value();
        var beta_mp = beta_slider_mp.Value();
        var gamma_mp = gamma_slider_mp.Value();
        var delta_mp = delta_slider_mp.Value();
        var c_mp = c_slider_mp.Value();
        var d_mp = d_slider_mp.Value();

        var y_mp = [];

        var cx_mp = c_mp;
        if (x_mp[0] !== 0) {
            cx_mp /= x_mp[0];
        }

        var dx_mp = d_mp;
        if (x_mp[1] !== 0) {
            dx_mp /= x_mp[1];
        }

        y_mp[0] = x_mp[0] * (alpha_mp - beta_mp * x_mp[1]) + cx_mp;
        y_mp[1] = x_mp[1] * (-gamma_mp + delta_mp * x_mp[0]) + dx_mp;

        return y_mp;
    };

    var x0_mp = [prey_0_mp.X(), pred_0_mp.Y()];

    var data_mp = solve_ode(x0_mp, I_mp, N_mp, f_mp);

    return data_mp;
}

var data_mp = ode_mp();

var prey_data_mp = [];
var pred_data_mp = [];

for (let i = 0; i < data_mp.length; ++i) {
    prey_data_mp.push(data_mp[i][0]);
    pred_data_mp.push(data_mp[i][1]);
}

draw_data_mp = board_mp.createElement('curve', [prey_data_mp, pred_data_mp], {strokeColor:'#ff6600', strokeWidth:'2px'});
draw_data_mp.updateDataArray = function() {
    var func_data_mp = ode_mp();
    this.dataX = [];
    this.dataY = [];

    for (let i = 0; i < func_data_mp.length; ++i) {
        this.dataX.push(func_data_mp[i][0]);
        this.dataY.push(func_data_mp[i][1]);
    }
};