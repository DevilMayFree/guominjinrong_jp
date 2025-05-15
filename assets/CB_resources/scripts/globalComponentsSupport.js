/* eslint-disable no-undef */
/* eslint-disable no-console */
/* This Support js will have added js functions we need to handle out of GlobalcomponentJs*/
$(document).ready(function () {

    navigation();
    breadcrumbs();
    fetureSingle();
    cardshellmaster();

    genericYoutubeLink();
  
  	campaignCodeTracking();

    function humanize(str) {
        let i, frags = str.split('-');
        for (i = 0; i < frags.length; i++) {
            frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
        }
        return frags.join(' ');
    }

    function breadcrumbs() {


        if (document.getElementById("primNav_Breadcrumbs")) {
            if (!document.getElementById("dcom_navGlobal_bar")) {
                alert("Please add Navigation Global Component to the page to continue using Breadcrumbs.");
            }
            const pageUrl = window.location.href.toLowerCase();
            const pagehref = window.location.href;
            const prim = $(".dcom-c-navigation-bar__li--active").first();
            const secId = $(prim).attr("id").substring(8);
            const breadcrumb = { primNode: "", primUrl: "", secNode: "", secUrl: "", terNode: "", terUrl: "" };

            breadcrumb.primNode = prim.children("a").eq(0).text();
            breadcrumb.primUrl = prim.children("a").eq(0).attr("href");
            const n = (pagehref.match(/([^/])+$/))[0];
            const m = n.split(".")[0];
            breadcrumb.terNode = humanize(m);


            $("#" + secId + " nav ul li .dcom-c-navigation-bar__dropdown").each(function () {
                let match = false;

                breadcrumb.secNode = $(this).prev().text();
                breadcrumb.secUrl = $(this).children("a").eq(0).attr("href"); //assumption first anchor of teritary menu of navigaation global always has to be secondary node link url

                ($(this).children("a")).each(function (index) {

                    if (index != 0) {
                        const hrefPath = $(this).attr("href").split(/([^/])+$/)[0];
                        if (pageUrl.search(hrefPath.toLowerCase()) != -1) {
                            match = true;

                            return false;

                        }
                        breadcrumb.secNode = ""; breadcrumb.secUrl = "";

                    }
                    else {
                        const nodeHref = $(this).attr("href");
                        if (pageUrl.search(nodeHref.toLowerCase()) != -1) {//removing secondary link if page link sets to secondary url
                            match = true;
                            breadcrumb.terNode = humanize(breadcrumb.secNode);
                            breadcrumb.secNode = ""; breadcrumb.secUrl = "";
                            return false;


                        }
                    }

                });
                if (match) return false;
            });

            //alert(JSON.stringify(breadcrumb));
            $("#primNav_Breadcrumbs a span").text(breadcrumb.primNode);
            $("#primNav_Breadcrumbs a").attr("href", breadcrumb.primUrl);
            if (breadcrumb.secNode == "") {
                $("#secNav_Breadcrumbs").remove();
            }
            else {
                $("#secNav_Breadcrumbs a span").text(breadcrumb.secNode);
                $("#secNav_Breadcrumbs a").attr("href", breadcrumb.secUrl);

            }

            $("#terNav_Breadcrumbs span").text(breadcrumb.terNode);
            const prevNode = $(".dcom-c-breadcrumb a").last();
            $("#nav_mobileBreadcrumb a span").text("Back to " + prevNode.text());
            $("#nav_mobileBreadcrumb a").attr("href", prevNode.attr("href"));
        }
    }

    function cardshellmaster() {
        if (document.getElementsByClassName("dcom-c-multiColumn")) {/*this if condition confirms if tabbed component is added in the page and ensures no other page loads this js */
            document.querySelectorAll(".dcom-c-multiColumn").forEach(function (itemComp, indexComp) {
                itemComp.querySelectorAll(".dcom-c-shell-tablink").forEach(function (itemli, indexli) {
                    itemli.setAttribute("data-id", "id" + indexComp + indexli);
                    itemComp.querySelectorAll(".dcom-js-tabpanel")[indexli].setAttribute("data-id", "id" + indexComp + indexli);

                });
            });
        }
    }

    function genericYoutubeLink() {
        $(".dcom-c-card").children('a').each(function () {
            if ($(this).prop("href").toLowerCase().includes('youtube')) {
                $(this).click(function (event) {
                    event.preventDefault();
                    setGenericYoutubeLink($(this).prop("href"));
                });

            }
        });
    }
    function setGenericYoutubeLink(url) {
        const youtubeID = refineVideoLink(url);
        document.getElementById("video_1").src = "https://www.youtube.com/embed/" + youtubeID + "?mute=1&autoplay=1&autopause=0&rel=0";
    }

    function fetureSingle() {
        $(".dcom-c-featureSingle__videoLink").click(function () {
            const YTube_ID = refineVideoLink($(this).attr("data-video"));
            document.getElementById("video_1").src = "https://www.youtube.com/embed/" + YTube_ID + "?rel=0&showinfo=0&autohide=1";
           });


    }


    function refineVideoLink(url) {
        let ID = '';
        url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        if (url[2] !== undefined) {
            ID = url[2].split(/[^0-9a-z_-]/i);
            ID = ID[0];
        }
        else {
            ID = url;
        }
        return ID;
    }


    function navigation() {
        if (document.getElementById("dcom_navGlobal_bar")) {/*this if condition confirms if navigation component is added in the page and ensures no other page loads this js */
            login();
            search();
            setPrimaryNav();
            setPrimaryNavMobile();
            $("#dcom_navGlobal_bar").addClass('dcom-c-navigation-bar--hidden');
            $(".dcom-c-navigation-bar-mobile").removeClass('dcom-c-navigation-bar-mobile--active');
            $("#dcom-nav-secondary div nav ul li").each(function () {
                if ($(this).children("div").children().length != 0) {
                    $(this).children("a").attr("href", '#');
                }

            });
           }
         }
    function login() {

        $(".dcom-c-navigation-bar__login button").click(function () {
            const selectedIndex = $("#loginDropdown")[0].selectedIndex;
            $(".dcom-c-nav-login__main .dcom-c-custom-select__wrapper .dcom-c-custom-select__selected").text($("#loginDropdown option:selected").text());
            $(".dcom-c-custom-select__items").attr("aria-activedescendant", "option" + selectedIndex);
            $(".dcom-c-custom-select__items li").removeAttr("class");
            $(".dcom-c-custom-select__items li").removeAttr("aria-selected");
            $(".dcom-c-custom-select__items #option" + selectedIndex).attr("class", "same-as-selected");
            $(".dcom-c-custom-select__items #option" + selectedIndex).attr("aria-selected", "true");
            if ($("#loginDropdown option:selected").text() == "Personal/Small Business") { //setting trouble login on initial load
                $(".dcom-c-nav-login__cta").removeAttr("style");
                $(".dcom-c-nav-login__help").removeAttr("style");
            }
        });

        $(".dcom-c-nav-login__button button").click(function () {
            if ($("#loginDropdown").val() != "") {
                window.location = $("#loginDropdown").val();
            }
        });
        $("#dcom-nav-mobile-menu").click(function () { //closing popup on mobile hamburger menu click
            if ($(".dcom-c-navigation-bar__login .dcom-c-btn--inactive").length > 0) {
                $(".dcom-c-navigation-bar__login button").click();
            }

        });
        $("#dcom-nav-close").click(function () { //closing popup on mobile close button click
            if ($(".dcom-c-navigation-bar__login .dcom-c-btn--inactive").length > 0) {
                $(".dcom-c-navigation-bar__login button").click();
            }

        });
    }

    function search() {
        /* eslint-disable no-useless-escape */
        const specialChars = /[`^~<>"%\*#!()\]\[\{\}_\+\-\=\|\\\/]/;
        $("#dcom-desktop_search-query").on('keypress', function (e) {
            return valSearchInput(e);
        });

        function valSearchInput(e) {
            if (e.which === 13) return true;
            return !specialChars.test(String.fromCharCode(e.which));
        }
        $("#dcom-desktop-search-form").submit(function (event) {
            event.preventDefault();
            desktopSearch();
        });
        $("#dcom-mobile-search-form").submit(function (event) {
            event.preventDefault();
            mobileSearch();
        });
        $(".dcom-nav-desktop-search").click(function () {
            desktopSearch();
        });
        $(".dcom-nav-mobile-search").click(function () {
            mobileSearch();
        });

        function desktopSearch() {
            if ($("#dcom-desktop_search-query").val() != "") {
                const searchQuery = $("#dcom-desktop_search-query").val();
                window.location = '/search/answers.html?query=' + encodeURI(searchQuery);
            }

        }
        function mobileSearch() {
            if ($("#dcom-mobile_search-query").val() != "") {
                const searchQuery = $("#dcom-mobile_search-query").val();
                window.location = '/search/answers.html?query=' + encodeURI(searchQuery);
            }

        }

    }

    function setPrimaryNav() {
        const pageUrlPath = window.location.pathname.toLowerCase();
        const pageHref = window.location.href.toLowerCase();
        let urlKeyWords;
        let urlKey;
        if (pageHref.indexOf("citizensaccess") > -1) {
            urlKeyWords = pageUrlPath.split("/");
            urlKeyWords.shift();
            urlKey = urlKeyWords[1];
        }
        else {
            urlKeyWords = pageUrlPath.split("/");
            urlKey = "/" + urlKeyWords[1] + "/";
        }
        urlKey = urlKey.toLowerCase();
        let primNavSet = false;
        let secNavSet = false;
        $("#primary-dcom-navrow-0").addClass("dcom-c-navigation-bar__li--active");
        $("#dcom-nav-secondary #dcom-navrow-0").removeClass("dcom-c-navigation-bar__secondary-row--hidden");
        $("#dcom-nav-primary li a").each(function () {
            let pLink = $(this).attr("href").toLowerCase();
            if (pageHref.indexOf("citizensaccess") > -1) {
                pLink = pLink.replace('?', '').replace('/citizens/', '');
            }
            if (pLink.search(urlKey) != -1) {
                setNav($(this).parent().attr("id"));
                primNavSet = true;
                secNavSet = true;
                return false;
            }
        });
        $(`a[href*="${window.location.pathname}"]`).closest('li').addClass("dcom-c-navigation-bar__li--active");

        if (!primNavSet) {/*when url doesnt match with primary key, going for secondary urls key words*/
            $("#dcom-nav-secondary div nav ul li").each(function () {
                let pLink = $(this).children("a").attr("href").toLowerCase();
                if (pLink.search(urlKey) != -1) {
                    let primId = "primary-" + $(this).parent().parent().parent().attr("id");
                    setNav(primId);
                    secNavSet = true;
                    return false;
                }
            });
        }

        if (!secNavSet) {
            $("#dcom-nav-secondary div nav ul li .dcom-c-navigation-bar__dropdown a").each(function () {
                let tLink = $(this).attr("href").toLowerCase();
                if (tLink.search(urlKey) != -1) {
                    let primId = "primary-" + $(this).parent().parent().parent().parent().parent().attr("id");
                    setNav(primId);
                    secNavSet = true;
                    return false;
                }
            });
        }

    }
    function setNav(primaryId) {
        const secId = primaryId.substring(8);
        $("#dcom-nav-primary li").removeClass("dcom-c-navigation-bar__li--active");
        $("#" + primaryId).addClass("dcom-c-navigation-bar__li--active");
        $("#dcom-nav-secondary .dcom-c-navigation-bar__secondary-row").addClass("dcom-c-navigation-bar__secondary-row--hidden");
        $("#" + secId).removeClass("dcom-c-navigation-bar__secondary-row--hidden");

    }






    /**
     * Sets the active class for mobile based on what is active in desktop.
     */
    function setPrimaryNavMobile() {
        const idd = $(".dcom-c-navigation-bar__li--active").attr("id");
        const mobileLi = "mobile-" + idd;
        $("#" + mobileLi).addClass("dcom-c-navigation-bar__li--active");
        if (document.querySelector("#" + mobileLi))
            mobileSecondary_Resize(document.querySelector("#" + mobileLi), false);

    }

    /*
      mobileDom == the element we want to resize, which is going to be one of the primary mobile dom elements, dcom-c-navigation-bar__li children of dcom-nav-mobile-primary
      reset == a Boolean to determine if we are closing or opening the navigation element.
          if true, it closes it (sets height to 0)
          if false, it opens it (sets height 51px * number of children)
  */

    function mobileSecondary_Resize(mobileDom, reset) {
        const tempMobileDiv = mobileDom.children[1];
        const numChildren = tempMobileDiv.children[0].children.length;
        let tabIndex;
        if (reset) {
            tempMobileDiv.style.height = "0px";
            tabIndex = "-1";
        } else {
            tempMobileDiv.style.height = (51 * numChildren) + "px";
            tabIndex = "0";
        }
        for (let n = 0; n < numChildren; n++) {
            tempMobileDiv.children[0].children[n].tabIndex = tabIndex;
        }
    }


   /**
     * Sets campaigncode session storage.
     */
    function campaignCodeTracking() {

	const searchParams = new URLSearchParams(window.location.search);
	if(searchParams.has('ctzMode'))
	{
	// Save data to sessionStorage
	sessionStorage.setItem("campaign_code", searchParams.get('ctzMode'));
	}    
      
    }


});
