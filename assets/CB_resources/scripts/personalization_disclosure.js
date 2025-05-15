window.CTZ = window.CTZ || {};
window.CTZ.creative_setDisclosure = false;
var defaultCreativeElement_DS = document.getElementsByClassName('creative_id_disclosure_default');
var jsonTimeout_DS = setTimeout(forceLeaderboardDisplay_DS, 2000);
//displayElement();

function swapLeaderboard_DS(htmlElement) {
    
	//alert("inside disclosure swapLeaderboard js");
			var i;
			for (i = 0; i < htmlElement.length; i++) {
			htmlElement[i].style.display = "block";
			}
	//alert("htmlElement.style.display: "+htmlElement.style.display);
    //var hyperLink = htmlElement.querySelectorAll('.cta_btn');
    /* if (typeof clickurl !== 'undefined' && hyperLink.length > 0)
        hyperLink[0].href = clickurl; */
    
}

function displayElement_DS() {
    clearTimeout(jsonTimeout_DS);
    var creative_display_DS = creativeid;
   // var creative_clickurl_DS = clickurl;
	
//alert("inside disclosure js");
    if (!window.CTZ.creative_setDisclosure) {
	//alert("inside window");
         if (creative_display_DS ) { //FailSafe Check            
            var creativeDisplayElement = document.getElementsByClassName('creative_id_disclosure_' + creative_display_DS);
			if(creativeDisplayElement.length>0)
			{			
            if (typeof creativeDisplayElement !== 'undefined' && creativeDisplayElement !== null) {
			//alert("inside 1st if");
                swapLeaderboard_DS(creativeDisplayElement);
				
				//alert("clickURL: "+data.leaderboard.clickURL);
                window.CTZ.creative_setDisclosure = true;
            }
			}
            // This Else condition works in case when data is present but JSON responded creative id does not match
            // It picks up the default div
            else {
				//alert("default case");
				//alert("inside 1st else");
                swapLeaderboard_DS(defaultCreativeElement_DS);
					
				//alert("test 1: "+document.getElementById('creative_id_default').style.display);
				window.CTZ.creative_setDisclosure = true;
            }
        } 
        // This Else condition works in case of Firewall Issues / Network Latency
        // It picks up the default div
       else{
		  // alert("inside 2nd else");
			//alert("defaultCreativeElement2: "+defaultCreativeElement);
           swapLeaderboard_DS(defaultCreativeElement_DS);
			//alert("test 2: "+document.getElementById('creative_id_default').style.display);
            window.CTZ.creative_setDisclosure = true;
			}
        

    }
}



 function forceLeaderboardDisplay_DS() {
	
   displayElement_DS();
} 
