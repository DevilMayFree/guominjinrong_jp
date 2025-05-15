/*!
 * jQuery lightweight responsive web adaptation plugin
 * Original author: @stildv
 * Copyright ? 2011: Devrim Vardar, @stildv -- http://stild.com/
 * Further changes, comments: @stildv -- http://stild.com/code/jquery-responsive-web/
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://stild.com/license/
 * Date: Thu Oct 20 01:27:32 2011 +0300
 * Version: 1.00 (20-OCT-2010)
 * PS. I am not a wonderful coder, I neither have the patience nor the repertoire so this is almost as good as I get. Cheers. :)
 */
;
mode = "";
(function($j, window, document, undefined) {

    $j.responsiveWeb = function(element, options) {

        var windowadaptTimeout;
        var tempCounter = 0;
        var winWidth;
        var winHeight;

        this.options = {};
        var that = this;
        element.data('responsiveWeb', this);

        this.init = function(element, options) {
            this.options = $j.extend({}, $j.responsiveWeb.defaultOptions, options);
            options = this.options;
            element.resize(checkResize);
            checkResize();
            if (options.manipulateDesign) {
                manipulateDesign();
            }
        };

        function delayedResize() {
            options = that.options;
            //window.status = ++tempCounter;
            var winNewWidth = $j(window).width();
            var winNewHeight = $j(window).height();
            if (winWidth != winNewWidth || winHeight != winNewHeight) {
                winWidth = winNewWidth;
                winHeight = winNewHeight;

                if (options.applyBodyClasses) {
                    applyBodyClasses();
                }
                if (options.rearrangeObjects) {
                    rearrangeObjects();
                }
            }
            //$j('body div.loadingDiv').remove();
        }

        function checkResize() {
            //window.scrollTo(0, 1);
            //$j('body').append('<div class="loadingDiv" style="width:100%;height:100%;position:absolute;left:0;top:0;zoom:1;filter:alpha(opacity=85);opacity:0.85;background:#AAA url(\'img/loading.gif\') no-repeat center center;">loading...</div>');
            window.clearTimeout(windowadaptTimeout);
            windowadaptTimeout = window.setTimeout(delayedResize, 250);
        }

        function applyBodyClasses() {
            options = that.options;
            clearBodyClasses();

            var currcC = '';
            var tmpWidth = decideResolution();
            var tmpArrWidth = tmpWidth.split(" ");
            tmpWidth = tmpArrWidth[0];
            if (options.applyPlatform) {
                currcC += decidePlatform();
            }
            if (options.applyBrowser) {
                currcC += decideBrowser();
            }
            if (options.applyResolution) {
                currcC += decideResolution();
            }
            $j('body').addClass(currcC);
            $j('body').attr("data-width", tmpWidth.substr(1));

            if (options.debug) {
                log(winWidth + 'x' + winHeight + ' || ' + $j('body').attr('class'));
            }
        }

        function log(str) {
            var debugDiv = '<div class="debugDiv" style="position:absolute;top:0;right:0;padding:2px;background:black;color:lime;font-size:9px;line-height:9px;"></div>';
            if ($j('.debugDiv ul').length) {
                $j('.debugDiv ul').append('<li>' + str + '</li>');
            } else {
                $j('body').append(debugDiv);
                $j('.debugDiv').append('<ul></ul>');
                $j('.debugDiv ul').append('<li>' + str + '</li>');
            }
        }

        function decidePlatform() {
            var cC = '';

            var platform = navigator.userAgent;
            if (platform.indexOf('Windows') > 0) {
                cC = 'windows' + ' ';
            } else if (platform.indexOf('Linux') > 0 && platform.indexOf('Android') < 0) {
                cC = 'linux' + ' ';
            } else if (platform.indexOf('Mac') > 0 && (platform.indexOf('iphone') < 0 || platform.indexOf('ipad') < 0)) {
                cC = 'mac' + ' ';
            } else if (platform.indexOf('iPhone') > 0) {
                cC = 'iphone' + ' ';
            } else if (platform.indexOf('iPad') > 0) {
                cC = 'ipad' + ' ';
            } else if (platform.indexOf('Android') > 0) {
                cC = 'android' + ' ';
            }

            return cC;
        }

        function decideBrowser() {
            var cC = '';
            options = that.options;

            var nVer = navigator.appVersion;
            var nAgt = navigator.userAgent;
            var browserName = navigator.appName;
            var fullVersion = '' + parseFloat(navigator.appVersion);
            var majorVersion = parseInt(navigator.appVersion, 10);
            var nameOffset, verOffset, ix;

            if ((verOffset = nAgt.indexOf("Opera")) != -1) {
                browserName = "opera";
                fullVersion = nAgt.substring(verOffset + 6);
                if ((verOffset = nAgt.indexOf("Version")) != -1)
                    fullVersion = nAgt.substring(verOffset + 8);
            } else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
                browserName = "msie";
                fullVersion = nAgt.substring(verOffset + 5);
            } else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
                browserName = "chrome";
                fullVersion = nAgt.substring(verOffset + 7);
            } else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
                browserName = "safari";
                fullVersion = nAgt.substring(verOffset + 7);
                if ((verOffset = nAgt.indexOf("Version")) != -1)
                    fullVersion = nAgt.substring(verOffset + 8);
            } else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
                browserName = "firefox";
                fullVersion = nAgt.substring(verOffset + 8);
            } else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
                browserName = nAgt.substring(nameOffset, verOffset);
                fullVersion = nAgt.substring(verOffset + 1);
                if (browserName.toLowerCase() == browserName.toUpperCase()) {
                    browserName = navigator.appName;
                }
            }
            if ((ix = fullVersion.indexOf(";")) != -1) fullVersion = fullVersion.substring(0, ix);
            if ((ix = fullVersion.indexOf(" ")) != -1) fullVersion = fullVersion.substring(0, ix);

            majorVersion = parseInt('' + fullVersion, 10);
            if (isNaN(majorVersion)) {
                fullVersion = '' + parseFloat(navigator.appVersion);
                majorVersion = parseInt(navigator.appVersion, 10);
            }

            if (options.applyBrowser) {
                cC += browserName + ' ';
            }
            if (options.applyBrowserVersion) {
                cC += browserName + majorVersion + ' ';
            }

            return cC;
        }

        function decideResolution() {
            var h = $j(window).height();
            var w = $j(window).width();
            var cC = '';

            if (w >= 1880) {
                cC = 'w1920' + ' ';
            } else if (w >= 1560) {
                cC = 'w1600' + ' ';
            } else if (w >= 1400) {
                cC = 'w1440' + ' ';
            } else if (w >= 1240) {
                cC = 'w1280' + ' ';
            } else if (w >= 984) {
                cC = 'w1024' + ' ';
            } else if (w >= 728) {
                cC = 'w768' + ' ';
            } else if (w >= 440) {
                cC = 'w480' + ' ';
            } else if (w >= 280) {
                cC = 'w320' + ' ';
            } else {
                cC = 'wtiny' + ' ';
            }

            if (h >= 864) {
                cC += 'h1024' + ' ';
            } else if (h >= 740) {
                cC += 'h900' + ' ';
            } else if (h >= 608) {
                cC += 'h768' + ' ';
            } else if (h >= 440) {
                cC += 'h600' + ' ';
            } else if (h >= 320) {
                cC += 'h480' + ' ';
            } else {
                cC += 'htiny' + ' ';
            }

            return cC;
        }

        function clearBodyClasses() {
            $j('body').removeClass('w1920 w1600 w1440 w1280 w1024 w768 w480 w320 wtiny h1024 h900 h768 h600 h480 htiny');
        }

        this.init(element, options);
    };

    $j.fn.responsiveWeb = function(options) {
        return this.each(function() {
            (new $j.responsiveWeb($j(this), options));
        });
    };


    $j.responsiveWeb.defaultOptions = {
        applyBodyClasses: true,
        applyResolution: true,
        applyPlatform: true,
        applyBrowser: true,
        applyBrowserVersion: true,
        manipulateDesign: true,
        rearrangeObjects: true,
        debug: false
    };

})($j, window, document);

function manipulateDesign() {}

function rearrangeObjects() {
    //window.setTimeout(FrameManager.resizeFrames, 300);
    currWidth = $j(window).width();

    if (currWidth >= 851) {
        $j("#sidr").trigger("close.mm");
    }

    /*  For mobi sidr menu
	if (currWidth >= 851) {
		if($j('#sidr').css({ 'display' : 'block' }))
		{
			$j('.show-slider-menu').trigger('click');
			$j('#sidr').css({ 'display' : 'none' });
			$j('body').css({'width':'100%'});
			$j('body').css({'left':'0'});
		}
	}
	*/


    //setEqualHeight($j('.home-box1-inner'), $j('.home-box2-inner'), $j('.news-box-inner'), 768);

    if (currWidth > 767) {
        setTimeout(function() {
            if ($j('.content-main-wrapper').length > 0) {
                setEqualHeight(".hrow1");

                function setEqualHeight(arr) {
                    var highestBox = 0;

                    $j(arr).each(function() {

                        if ($j(this).height() > highestBox) {
                            highestBox = $j(this).height();
                        }
                    });

                    $j(arr).height(highestBox);

                }
            }
        }, 500);
    }
	if (currWidth <= 991 && currWidth > 767) {
		setEqualHeight($j(".content-right-col > div.right-col-equal-hgt"));
	}
	else if(currWidth > 991)
	{
		$j(".content-right-col > div.right-col-equal-hgt").css("height","auto");
	}
			
			console.log("sdlkfj");
    if ($j('.home-wrapper').length > 0) {

        if (currWidth > 991) {
            setTimeout(function() {
                setEqualHeight(".hrow1");
				
                function setEqualHeight(arr) {
                    var highestBox = 0;

                    $j(arr).each(function() {

                        if ($j(this).height() > highestBox) {
                            highestBox = $j(this).height();
                        }
                    });

                    $j(arr).height(highestBox);

                }
            }, 300);
			
        }
        if (currWidth <= 991 && currWidth > 767) {
            setTimeout(function() {
                var h = $j('.news-box').next().height();
                $j('.news-box .news-box-inner').css('min-height', h - 1);
            }, 300);
        }

        if (currWidth < 788) {
            setTimeout(function() {
                var h = $j('.news-box').next().height();
                $j('.news-box .news-box-inner').css('min-height', h - 1);
            }, 300);
        }


    }

    //  For Ul LI slider in 640 starts	

    if (currWidth >= 640) {
        if (mode != "desktop") {
            //var temp = $j('ul.rad-popup').bxSlider();
            //temp.destroySlider();
            mode = "desktop";
        }

    } else {
        if (mode != "mobi") {

            $j('ul.rad-popup').bxSlider({
                slideWidth: 140,
                minSlides: 2,
                maxSlides: 2,
                controls: false
            });
            mode = "mobi";
        }
    }

    //   For Ul LI slider in 640 ends

    // mobi menu for ipad starts
    /*
    if (currWidth < 770) {
    if ($j('#sidr li').hasClass('current')) {
            $j('#sidr li.current').parents('ul.sub-child').show();
            $j('#sidr li.current').parent().show();
            $j('#sidr li.current').parent().prev().find('span.dd-arrw').removeClass('selected');
            $j('#sidr li.current').parents('ul.sub-child').prev().find('span.dd-arrw').removeClass('selected');
        }
    }
    */
    // mobi menu for ipad ends


}

$j(document).ready(function() {

    $j(window).responsiveWeb({
        applyBodyClasses: true,
        applyResolution: true,
        applyPlatform: true,
        applyBrowser: true,
        applyBrowserVersion: false,
        manipulateDesign: true,
        rearrangeObjects: true
    });

});