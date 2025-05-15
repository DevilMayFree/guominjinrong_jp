$j(document).ready(function() {


    /*-------------Mobi menu JS starts-------------*/

/*
    $j('#sidr').mmenu({        
        offCanvas: {
            position: "next",
            zposition: "front"
        }
    });
*/

$j(".social-icon").click(function () {
       alert("You are now leaving the Citizens Financial Group website.\n\nPLEASE NOTE: You are about to leave the Citizens Financial Group website. Citizens Financial Group is not responsible for, nor do we control, endorse or guarantee the content, products and/or services of the subsequent pages. The linked site may have a different privacy policy or provide less security than our website. We recommend you review these policies on the linked site. Thank you!");
   });

if( $j(".content-right-col > div.related-links-sp").length <=0 )
{
$j(".content-right-col > div:eq(0)").css('margin-top','0');
}

$j(".banner-text ul.rad-introtext > li").addClass(function(i){return "item" + (i + 1);});

if($j(".main-content p > img.rad-right").length > 0)
{
//alert($j(this).parent().text());
$j('img.rad-right').parent().addClass('p-rad-right');
}

$j('#sidr').mmenu({panelNodetype:'',classes: "mm-white",offCanvas:{position: "next",zposition: "front"}},{offCanvas:{position: "next",zposition: "front",menuWrapperSelector:'.header-wrapper-top'}});

    $j('#contactFormContainer div:nth-child(even)').addClass('even');
    $j('#contactFormContainer div:nth-child(3n)').addClass('right');

    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
        var msViewportStyle = document.createElement("style");
        msViewportStyle.appendChild(
            document.createTextNode(
                "@-ms-viewport{width:auto!important}"
            )
        );
        document.getElementsByTagName("head")[0].
        appendChild(msViewportStyle);
    } // JavaScript Document

    /* Search Width Expand */

    newWidth = $j(window).width();

    if (newWidth > 480) {
        var $search = $j('#searchTextbox'),
            searchWidthInitial = $search.outerWidth(),
            searchVal = $j('#searchTextbox').val();
        $search.focus(function() {
            $j(this).attr("placeholder", "");
            searchOpen = true;
            $j(this).stop().animate({
                width: searchWidthInitial * 1.98347107438017
            });
            $j(this).attr("placeholder", "");
        });

        $search.blur(function() {
            searchOpen = false;
            $j(this).stop().animate({
                width: searchWidthInitial
            }).attr("placeholder", searchVal);
        });
    } else {
        var $search = $j('#searchTextbox'),
            searchWidthInitial = $search.outerWidth(),
            searchVal = $j('#searchTextbox').val();
        $search.focus(function() {
            $j(this).attr("placeholder", "");
            searchOpen = true;
            $j(this).stop().animate({
                width: 95
            });
            $j(this).attr("placeholder", "");
        });

        $search.blur(function() {
            searchOpen = false;
            $j(this).stop().animate({
                width: searchWidthInitial
            }).attr("placeholder", searchVal);
        });
    }

    /* Search Focus */

    $j("input#searchTextbox").focusin(function(event) {
        $j(this).parents('#searchbox').addClass('add-focus');
        if (this.value == 'Search') {
            this.value = '';
        }
    });
    $j("input#searchTextbox").focusout(function(event) {
        $j(this).parents('#searchbox').removeClass('add-focus');
        if (this.value == '') {
            this.value = 'Search';
        }
    });

    /* Search Width Expand */

    /* Tabs Start */

$j('.tab-content > div:gt(0)').css('display','none');
    $j(".tab-nav a").click(function(event) {

        event.preventDefault();
        $j(this).parent().addClass("active");
        $j(this).parent().siblings().removeClass("active");
        var tab = $j(this).attr("href");


        $j(".tab-item-main").not(tab).css("display", "none");
        $j(tab).customFadeIn();
    });

    /* Tabs End */

    /* Fade IN OUT Js Starts */

    $j.fn.customFadeIn = function(speed, callback) {
        $j(this).fadeIn(speed, function() {
            if (jQuery.browser.msie)
                $j(this).get(0).style.removeAttribute('filter');
            if (callback != undefined)
                callback();
        });
    };
    $j.fn.customFadeOut = function(speed, callback) {
        $j(this).fadeOut(speed, function() {
            if (jQuery.browser.msie)
                $j(this).get(0).style.removeAttribute('filter');
            if (callback != undefined)
                callback();
        });
    };

    /* Fade IN OUT Js Ends */

    //  For word limit starts

    $j("#home-news-tab .news-title p").each(function() {
        var dataTemp = $j(this).html();

        if (dataTemp.length < 200) return;
        dataTemp = dataTemp.substring(0, 220);
        dataTemp = dataTemp + "...";
        $j(this).html(dataTemp);
    });

    //  For word limit ends

    // Investing Bank Tab to Select Box Mob Start

    var tabText = $j('.investing-bank-inner-content .tab-nav-mobile ul li:first-child').find('a').text();
    $j('p.mobi-tabs-menu').text(tabText);

    $j('p.mobi-tabs-menu').click(function() {
        $j(this).toggleClass('active');
        $j(this).next().slideToggle();
    });

    // filter drop down starts

    $j('span.filter-title').click(function() {
        $j(this).toggleClass('active');
        $j(this).next().slideToggle();
    });

    var furl = location.href;
    var newurlp = furl.split('=')[1];

    if (newurlp != undefined) {
        var newurlp = furl.split('=')[1];
        var newurlp = newurlp.split('&')[0];

        newurlp = newurlp.toLowerCase().replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
        });

        newurlp = newurlp.replace(/\-+/g, ' ');

        if (newurlp == '*') {
            $j('span.filter-title').text("All");
        } else {
            $j('span.filter-title').text(newurlp);
        }

    }

    // filter drop down ends

    $j('.investing-bank-inner-content .tab-nav-mobile ul li').click(function() {
        $j(this).parent().slideToggle();
        var tabTextNew = $j(this).find('a').text();
        $j('p.mobi-tabs-menu').text(tabTextNew);
    });

    // Investing Bank Tab to Select Box Mob End

    // Reports Presentation Tab to Select Box Mob Start

    var rpYear = $j('.rp-tab-nav-mobile ul li.current').find('span').text();
    $j('.rp-tab-nav-mobile p.mobi-tabs-menu').text(rpYear);
    $j('.news-result-landing .rp-tab-nav-mobile p.mobi-tabs-menu').text('All');

    // Reports Presentation  Tab to Select Box Mob End
    // UL devider starts

    $j(".sub-menu-child-ul > ul > li > ul").each(function() {
        breakList(4, $j(this));
        //$j(this).next().find('ul').addClass('divided-ul');
        $j(this).remove();
    });

    function breakList(numOfLists, list) {
        var listLength = list.find("li.level3").size();
        
        var numInRow = Math.round(listLength / numOfLists);
		var diffItems = listLength - (numInRow*numOfLists);
        for (var i = 0; i < numOfLists; i++) {
			//if(i==(numOfLists-1))
            if(i==0)
			{
				var listItems = list.find("li.level3").slice(0, (numInRow+diffItems));
			}
			else
			{
				var listItems = list.find("li.level3").slice(0, (numInRow));
			}
            
            var newList = $j("<ul class='ul-" + i + "'/>").append(listItems);
            $j(list).parent().append(newList);
        }
    }

    //  UL devider ends

    //  For main menu hover Starts

    $j('.sub-menu-child-content > div').hide();
    $j('.sub-menu-child-ul > ul > li').hide();
    $j('.sub-menu-child-ul > ul > li > span').hide();
    $j('p.menu-close-btn').hide();
	$j('p.goto-link').hide();
	
    $j(document).off("click", 'p.menu-close-btn');
    $j(document).on("click", 'p.menu-close-btn', function(e) {
        $j('.head-sub-menu ul li').removeClass('hvr-active');
        $j('.sub-menu-child-content > div').slideUp();
        $j('.sub-menu-child-ul > ul > li').slideUp();
		$j('p.goto-link').slideUp();
		$j(this).hide();
    });

    $j(document).off("click", '.head-sub-menu ul li:not("#nav-careers-level2, #nav-in-the-community-level2, #nav-latest-news-level2")');
    $j(document).on("click", '.head-sub-menu ul li:not("#nav-careers-level2, #nav-in-the-community-level2, #nav-latest-news-level2")', function(e) {

//  for changing go to url dynamically in dropdown main menu starts

		var nurl = $j(this).find('a').attr('href');
		var nwnm = $j(this).find('span').text();
		nwnm = "GO TO " + nwnm + " HOMEPAGE";
		$j('.sub-menu-child-ul p.goto-link a').attr('href',nurl);
		$j('.sub-menu-child-ul p.goto-link a').text(nwnm);

//  for changing go to url dynamically in dropdown main menu ends

        if ($j(this).hasClass('hvr-active')) {
			$j(this).removeClass('hvr-active');
            $j('.sub-menu-child-content .cntnt-' + $j(this).attr('id')).slideUp();
            $j('.sub-menu-child-ul #sub-' + $j(this).attr('id')).slideUp();
			$j('p.menu-close-btn').hide();
			$j('p.goto-link').slideUp();			
        } else {
            
			$j('.sub-menu-child-content > div, .sub-menu-child-ul > ul > li').slideUp();
			$j('.sub-menu-child-content > div, .sub-menu-child-ul > ul > li').css('height','auto');
			$j('.head-sub-menu ul li').removeClass('hvr-active');
			
			if ($j('.sub-menu-child-content .cntnt-' + $j(this).attr('id')).length > 0) {
                $j('.sub-menu-child-content .cntnt-' + $j(this).attr('id')).slideDown();
            }
            if ($j('.sub-menu-child-ul #sub-' + $j(this).attr('id')).length > 0) {
                $j('.sub-menu-child-ul #sub-' + $j(this).attr('id')).slideDown();
            }
			
            $j('.head-sub-menu ul li').removeClass('hvr-active');
            $j(this).addClass('hvr-active');
			$j('p.menu-close-btn').show();
			$j('p.goto-link').show();
			$j('p.goto-link').css('display','inline-block');
        }

        return false;

    });

    /* $j('.head-sub-menu ul li:not("#nav-careers-level2, #nav-in-the-community-level2, #nav-latest-news-level2")').hover(function() {
             tmode = "";
             mode = "";
             
             $j('.sub-menu-child-content > div, .sub-menu-child-ul > ul > li').stop(true, true).slideUp();

             if ($j('.sub-menu-child-content .cntnt-' + $j(this).attr('id')).length > 0) {
                 $j('.sub-menu-child-content .cntnt-' + $j(this).attr('id')).slideDown();
             }
             if ($j('.sub-menu-child-ul #sub-' + $j(this).attr('id')).length > 0) {
                 $j('.sub-menu-child-ul #sub-' + $j(this).attr('id')).slideDown();
             }
             $j('.head-sub-menu-child').addClass('active');
             $j('.head-sub-menu ul li').removeClass('hvr-active');
             $j(this).addClass('hvr-active');
         },
         function() {

             mode = "false";
             $j('.head-sub-menu-child').hover(function() {
                 tmode = "true";
                 $j(this).addClass('hvr-active');
             }, function() {                
                 $j('.sub-menu-child-content > div, .sub-menu-child-ul > ul > li').stop(true, true).slideUp();
                 setTimeout(function() {
                     $j('.head-sub-menu-child').removeClass('active');
                     $j('.head-sub-menu ul li').removeClass('hvr-active');
                 }, 300);
                 tmode = "false";
             }); // sub-mn-itm hover ends
             setTimeout(function() {
                 if (tmode != "true" && mode == "false") {
                     //$j('.sub-menu-child-content > div, .sub-menu-child-ul > ul > li').slideUp();
                     $j('.sub-menu-child-content > div, .sub-menu-child-ul > ul > li').stop(true, true).slideUp();
                     tmode = "false";
                     setTimeout(function() {
                         $j('.head-sub-menu-child').removeClass('active');
                         $j('.head-sub-menu ul li').removeClass('hvr-active');
                     }, 300);
                 }
             }, 100);

         });   head-sub-menu ul li hover ends */

    //  For main menu hover  ENDS							 

    /* Mobile Menu */

    $j('span.menu-parent-arrw').click(function(e) {
        if ($j(this).hasClass('selected')) {

            $j(this).next().slideUp();
            $j(this).removeClass('selected');
        } else {
            $j(this).next().slideDown();
            $j(this).addClass('selected');
        }
    });

    $j("#sidr ul ul:not('ul#mob2-section-latest-news-level4, ul#mob2-section-financial-news-level4')").prev().append('<span class="dd-arrw selected"></span>');
    $j("#sidr ul ul:not('ul#mob2-section-latest-news-level4, ul#mob2-section-financial-news-level4')").addClass('sub-child');

    $j("span.dd-arrw").click(function(e) {
        e.preventDefault();
        if ($j(this).hasClass('selected')) {
            $j(this).parents('li').children('.sub-child').slideDown();
            $j(this).removeClass('selected');
        } else {
            $j(this).parent().parent('li').find('.sub-child:eq(0)').slideUp();
            $j(this).addClass('selected');
        }
    });

    if ($j('#sidr li').hasClass('current')) {
        $j('#sidr li.current').parents('ul.sub-child').show();
        $j('#sidr li.current').parent().show();
        $j('#sidr li.current').parent().prev().find('span.dd-arrw').removeClass('selected');
        $j('#sidr li.current').parents('ul.sub-child').prev().find('span.dd-arrw').removeClass('selected');
    }
	
	if ($j('#sidr li').hasClass('level4 selected haschildren')) {
        $j('#sidr li.selected').parents('ul.sub-child').show();
        $j('#sidr li.selected').parent().show();
        $j('#sidr li.selected').parent().prev().find('span.dd-arrw').removeClass('selected');
        $j('#sidr li.selected').parents('ul.sub-child').prev().find('span.dd-arrw').removeClass('selected');
    }

    /* Mobile Menu */

    /* Leadership Snap Down */

    $j(".leadership-down").hide();
    $j(".leadership-up:first .leadership-down").show();
    $j(".leadership-up:first").addClass('selected');
    $j(".leadership-up:first").next().show();

    $j(document).off("click", ".leadership-up");
    $j(document).on("click", '.leadership-up', function(e) {

        if ($j(this).hasClass("selected")) {
            $j(this).removeClass("selected");
            $j(this).next().slideUp("slow");

        } else {
            $j(".leadership-up").removeClass("selected");
            $j(this).addClass("selected");
            $j(".leadership-up").next().slideUp("slow");
            $j(this).next().slideDown("slow");

            $self = $j(this);

            setTimeout(function() {
                $j("html,body").animate({
                    scrollTop: $self.offset().top
                }, "slow");

            }, 500);

        }

    });

/* Event Snap Down Start */
	
    $j(document).off("click", ".events-up");
    $j(document).on("click", '.events-up', function(e) {

        if ($j(this).hasClass("selected")) {
            $j(this).removeClass("selected");
            $j(this).next().slideUp("slow");

        } else {
            $j(this).addClass("selected");
            $j(this).next().slideDown("slow");
        }

    });
    	
	$j(".events-down").each(function() {	
		if($j(this).find('p').length <= 0)
		{
			$j(this).parents('.up-eve-right').hide();
		}
		else
		{
			$j(this).parents('.up-eve-right').show();
		}
	});
	$j(".events-down-2").each(function() {	
		if($j(this).find('p').length <= 0)
		{
        if($j(this).find('table').length <= 0)
        {
        $j(this).parents('.up-event-right-2').hide();
        }
        else
		{
			$j(this).parents('.up-event-right-2').show();
		}
        
		}
		
	});
	

/* Event Snap Down End */

    /* ------------------ Search - Following function is used for <enter> issue in IE ------------ */
    $j("#searchTextboxContainer input").keypress(function(e) {
        if (e.keyCode == 13) {
            document.getElementById("searchButton").click();
            return false;
        }
    });
    /* ------------------ <END> Following function is used for <enter> issue in IE ------------ */


    /* ------------------ File extension to UPPERCASE in title attribute ------------------ */

    $j(".your_classname a[title]").each(function() {
        var tmpTxt = $j(this).attr("title").split(",");
        if (tmpTxt.length > 1) {
            tmpTxt[0] = tmpTxt[0].toUpperCase();
        }
        $j(this).attr("title", tmpTxt.join());
    });

    /* ------------------ <END> File extension to UPPERCASE in title attribute ------------ */

    $j('#sidr #mm-0').removeClass('mm-panel');	


});

function setEqualHeight(arr) {
var highestBox = 0;
$j(arr).each(function(){
if($j(this).height() > highestBox){
highestBox = $j(this).height();
}
});
$j(arr).height(highestBox);
}/* ----- Equal height Ends ------*/

