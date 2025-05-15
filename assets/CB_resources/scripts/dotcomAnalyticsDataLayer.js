
function setupDotcomAnalytics() {
    var cbpgType = document.getElementById("cbpgType") ? document.getElementById("cbpgType").innerHTML : '';
    var cbpgSubType = document.getElementById("cbpgSubtype") ? document.getElementById("cbpgSubtype").innerHTML : '';
    var cbpgProduct = document.getElementById("cbproduct") ? document.getElementById("cbproduct").innerHTML : '';
    var cbpgProductType = document.getElementById("cbpgProductType") ? document.getElementById("cbpgProductType").innerHTML : '';
    var cbpgFunction = document.getElementById("cbpgFunction") ? document.getElementById("cbpgFunction").innerHTML : '';
    var cbpgSubFunction = document.getElementById("cbpgSubFunction") ? document.getElementById("cbpgSubFunction").innerHTML : '';
    var cbbrand = document.getElementById("cbbrand") ? document.getElementById("cbbrand").innerHTML : '';
    var cbtype = document.getElementById("cbtype") ? document.getElementById("cbtype").innerHTML : '';

    var dotComAnalytics = new DotComAnalytics({
      "cbproduct": cbpgProduct,
      "cbpgFunction": cbpgFunction,
      "cbpgType": cbpgType,
      "cbpgsubType": cbpgSubType,
      "cbpgproductType": cbpgProductType,
      "cbpgSubFunction": cbpgSubFunction,
      "cbbrand": cbbrand,
      "cbtype" : cbtype
    });

    dotComAnalytics.init();

    document.addEventListener('click', trackEvent, true);
    document.addEventListener('keypress', trackEvent, true);
  }

  var trackEvent = function (evt) {
    if (!evt.target.classList.contains('cbensightenevent')) {
      return true;
    }

    console.log('element clicked!', evt && evt.target && evt.target.dataset);
    return false;
  };

if(window.analyticsInstance){
  window.analyticsInstance.init();
}
 else{setupDotcomAnalytics();}
   
