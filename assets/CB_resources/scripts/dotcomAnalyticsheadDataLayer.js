function metaDatalayerProcess(){
let newDatalayerActive=document.querySelectorAll('meta[datalayer][content]:not([content=null])').length>0;
let metaTagsWithDataLayer={};
let dataLayerObject = {};
if(newDatalayerActive){
metaTagsWithDataLayer = document.querySelectorAll('meta[datalayer]');
}
if(metaTagsWithDataLayer.length>0){
metaTagsWithDataLayer.forEach(metaTag => {
let dataLayerKey = metaTag.getAttribute('datalayer');
let contentValue = metaTag.getAttribute('content');
contentValue = contentValue === 'null' ? '' : contentValue;
dataLayerObject[dataLayerKey] = contentValue;
});
let analyticsInstance = new DotComAnalytics(dataLayerObject);

if("undefined" != typeof window){
window.CBDL = window.CBDL || {};
window.CBDL.pgInfo = analyticsInstance.pageInfo || window.CBDL.pgInfo;
window.analyticsInstance= analyticsInstance;}
};
}

metaDatalayerProcess();