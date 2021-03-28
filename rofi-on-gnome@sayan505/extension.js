const Main     = imports.ui.main;
const Overview = imports.ui.overview;
const Util     = imports.misc.util;


let BAK_toggle_function;

function init() {
    BAK_toggle_function = null;
}

function enable() {
    BAK_toggle_function = Overview.Overview.prototype['toggle'];    // save original toggle function

    Overview.Overview.prototype['toggle'] = 
    function rofi_on_wayland() {
        if (this.isDummy) { return; }

        if (this.visible) { this.hide(); }
        else {
            Util.spawn(['/bin/rofi', '-modi', 'drun,run', '-show', 'drun', '-show-icons', '-font', 'Segoe UI Regular 11']);
        }
    };
}

function disable() {
    if (BAK_toggle_function !== null) {
        Overview.Overview.prototype['toggle'] = BAK_toggle_function;    // put the original back
    }
}
