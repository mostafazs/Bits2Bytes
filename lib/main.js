var { ToggleButton } = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");
var self = require("sdk/self");

var button = ToggleButton({
    id: "bits2bytes",
    label: "Bits2Bytes",
    icon: {
        "16": self.data.url('icon-16.png'),
        "32": self.data.url('icon-32.png'),
        "64": self.data.url('icon-64.png')
    },
    onChange: handleChange
});

var panel = panels.Panel({
	width: 290,
	height: 325,
    contentURL: self.data.url("popup.html"),
	//contentScriptFile: self.data.url("angular.min.js"),
	contentStyleFile: self.data.url("style.css"),
    onHide: handleHide
});

function handleChange(state) {
    if (state.checked) {
        panel.show({
            position: button
        });
    }
}

function handleHide() {
    button.state('window', {checked: false});
}

panel.port.on('hide', function () {
    panel.hide();
});