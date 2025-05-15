$j(document).ready(function(){ 
// for desktop
$j("#sub-section-Homepage-level2 li ul li a").each(function(){
if(this.href.indexOf('/media') >= 0) {
	var url = $j(this).attr('href');
	var pdf_url = url.replace(".aspx",".pdf");
	var pdf_url_final = pdf_url.replace("/sitecore/media%20library/","/~/media/");
	$j(this).attr('href',pdf_url_final);
}
});

// for mobile
$j("#mob2-section-Homepage-level2 li ul li a").each(function(){
if(this.href.indexOf('/media') >= 0) {
	var url = $j(this).attr('href');
	var pdf_url = url.replace(".aspx",".pdf");
	var pdf_url_final = pdf_url.replace("/sitecore/media%20library/","/~/media/");
	$j(this).attr('href',pdf_url_final);
}
});

});