/* This control js will have added js and css required for the GlobalcomponentJs*/
const cssArray = ["/assets/CB_resources/styles/globalSupport.css"];
cssArray.forEach(loadCss);

function loadCss(CssFilePath) {
    $("head").append("<link type='text/css' rel='stylesheet' href='" + CssFilePath + "\'" + ">");
}



$(window).on("load", function () {

    function loadJs(classOrId, jsFilePath) {
        if (document.querySelector("." + classOrId) || document.querySelector("#" + classOrId)) {
            $("body").append("<script type='text/javascript'  src='" + jsFilePath + '\'' + "></script>");
        };
    }

    loadJs("dcom-c-multiColumn", "/assets/CB_resources/GlobalComponents/MultiColumn/multicolumn-shell-master.min.js");
    loadJs("dcom-c-multiColumn", "/assets/CB_resources/GlobalComponents/MultiColumn/multicolumn-card.min.js");
    loadJs("dcom-c-alert-container", "/assets/CB_resources/GlobalComponents/Alerts/alert.min.js");
});
