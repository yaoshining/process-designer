/**
 * Created by 世宁 on 13-12-18.
 */
define({
    defaults: {
        togglerClass: "toggler",
        buttonClass: "button"
    },
    west: {
        size: 250,
        spacing_closed:	21,			// wider space when closed
        spacing_open: 0,
        togglerLength_closed: 21,			// make toggler 'square' - 21x21
        togglerAlign_closed: "top",		// align to top of resizer
        togglerLength_open: 0,			// NONE - using custom togglers INSIDE west-pane
        togglerTip_open: "Close West Pane",
        togglerTip_closed: "Open West Pane",
        resizerTip_open: "Resize West Pane",
        slideTrigger_open: "click", 	// default
        initClosed: true,
        //	add 'bounce' option to default 'slide' effect
        fxSettings_open:		{ easing: "easeOutBounce" }
    },
    east: {
        size: 250,
        spacing_closed: 21,			// wider space when closed
        spacing_open: 0,
        togglerLength_closed: 21,			// make toggler 'square' - 21x21
        togglerAlign_closed: "top",		// align to top of resizer
        togglerLength_open: 0, 			// NONE - using custom togglers INSIDE east-pane
        togglerTip_open: "Close East Pane",
        togglerTip_closed: "Open East Pane",
        resizerTip_open: "Resize East Pane",
        slideTrigger_open: "mouseover",
        initClosed: true,
        //	override default effect, speed, and settings
        fxName: "drop",
        fxSpeed: "normal",
        fxSettings:				{ easing: "" } // nullify default easing
    }

});