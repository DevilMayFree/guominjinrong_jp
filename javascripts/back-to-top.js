/**
 * Copyright (c) 2007-2012 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * @author Ariel Flesler
 * @version 1.4.3.1
 */
;(function($j){var h=$j.scrollTo=function(a,b,c){$j(window).scrollTo(a,b,c)};h.defaults={axis:'xy',duration:parseFloat($j.fn.jquery)>=1.3?0:1,limit:true};h.window=function(a){return $j(window)._scrollable()};$j.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$j.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$j.fn.scrollTo=function(e,f,g){if(typeof f=='object'){g=f;f=0}if(typeof g=='function')g={onAfter:g};if(e=='max')e=9e9;g=$j.extend({},h.defaults,g);f=f||g.duration;g.queue=g.queue&&g.axis.length>1;if(g.queue)f/=2;g.offset=both(g.offset);g.over=both(g.over);return this._scrollable().each(function(){if(e==null)return;var d=this,$elem=$j(d),targ=e,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$j(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$j(targ)).offset()}$j.each(g.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=h.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(g.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=g.offset[pos]||0;if(g.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*g.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(g.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&g.queue){if(old!=attr[key])animate(g.onAfterFirst);delete attr[key]}});animate(g.onAfter);function animate(a){$elem.animate(attr,f,g.easing,a&&function(){a.call(this,e,g)})}}).end()};h.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$j(a).is('html,body'))return a[scroll]-$j(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);

$j.fn.topLink = function (settings) {
    settings = jQuery.extend({
        min: 1,
        fadeSpeed: 200,
        ieOffset: 50
    }, settings);
    return this.each(function () {
        //listen for scroll
        var el = $j(this);
        el.css('display', 'none'); //in case the user forgot
        $j(window).scroll(function () {
            if (!jQuery.support.hrefNormalized) {
                el.css({
                    //'position': 'absolute',
                    //'top': $j(window).scrollTop() + $j(window).height() - settings.ieOffset
                });
            }
            if ($j(window).scrollTop() >= settings.min) {
                el.fadeIn(settings.fadeSpeed);
            } else {
                el.fadeOut(settings.fadeSpeed);
            }
        });
    });
};

$j(document).ready(function () {
    $j("#footer-wrapper").append('<style type="text/css">#auto-top-link{ display:none; position:fixed; float:left; bottom:50px; right:15px; color:#fff; border:1px solid #fff; background-color:#1b9f75; font-weight:normal; text-decoration:none; padding:10px; z-index:99999; "}</style>');
    $j("#footer-wrapper").append('<a href="#MainForm" id="auto-top-link">Top of Page</a>');
    $j('#auto-top-link').topLink({
        min: 400,
        fadeSpeed: 500
    });

    //smoothscroll
    $j('#auto-top-link').click(function (e) {
        e.preventDefault();
        $j.scrollTo(0, 300);
    });
});