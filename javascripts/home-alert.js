    function validateEmail(sEmail) {
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(sEmail)) {
    return true;
    }
    else {
    return false;
    }
    }
    $j(document).ready(function(){
    $j(".content-right-alert.signpost-item p a").click(function (e) {
    e.preventDefault();
    var text = document.getElementById('textfield-alert').value;
    if(validateEmail(text)){
    var url = "/about-us/investor-relations/alerts?alertEmail="+text;
    document.location.href = url;
    }
    else{
    alert("Invalid Email Address");
    }
    return false;
    });
    $j('input#textfield-alert').bind('keypress', function(e) {
    if(e.keyCode==13){
    $j('.content-right-alert.signpost-item p a').trigger("click");
    return false;
    }
    });
	    	
    if($j("body").attr("id")=="alerts")
    {
    var urlParams = {};
    (function () {
    var e,
    a = /\+/g, // Regex for replacing addition symbol with a space
    r = /([^&=]+)=?([^&]*)/g,
    d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
    q = window.location.search.substring(1);
    while (e = r.exec(q))
    urlParams[d(e[1])] = d(e[2]);
    })();

//var newiframetext = $j(".alertIframe").attr("src")+"&alertEmail="+urlParams["alertEmail"];

    if(urlParams['alertEmail']!==undefined)
    {
    //alert(urlParams['alertEmail']+"gfdsds"+$j("#iframe-wrapper iframe").attr("src"));
    $j("#alerts #iframe-wrapper iframe").attr("src", $j("#alerts #iframe-wrapper iframe").attr("src")+"&alertEmail="+urlParams['alertEmail']);
    }
    }
    });