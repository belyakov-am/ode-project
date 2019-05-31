p5.disableFriendlyErrors = false;

let edit_head = function(p) {
    p.setup = function() {
        p.noCanvas();
        let $head_nav = $(".nav");
        $head_nav[0].innerHTML = "<a href=\" https://github.com/belyakov-am/ \"> Belyakov Artem </a>";

        let logo = p.select(".logo");
        logo.html('HSE FCS AMI')
    };

    p.mousePressed = function () {

    }
};

let edit_head_run = new p5(edit_head);