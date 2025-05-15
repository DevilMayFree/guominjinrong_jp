$(document).ready(function () {

    var isMobile = $('#initial_mobile_header').is(':visible');
    if (isMobile) {
        $('body').css('max-width', '100%', 'overflow', 'hidden');
    }


    var _$contentBlock = $('.content-block');
    var _$width = $(document).width();
    var _$nav = _$contentBlock.find('.nav');
    var _$content = _$contentBlock.find('.content');
    var _$contentData = _$content.find('.content_data');
    var _$currentSelect = _$nav.find('.top_current');

    var _openHeight;
    var _closedHeight;
    var _open = false;
    var mobileNav = $('.mobile_animate_nav');

    if (_$width < 767) {
        desktopNavHeader = mobileNav.find('.primary_nav li');
        console.log(desktopNavHeader);
        console.log(desktopNavHeader.find("a.active").parent());
        desktopNavHeader.find("a.active").parent().hide();

    } else {
        $('#primary_nav li').find("a.active").parent().show();

    }

    if (_$contentBlock.length) {


        if (_$nav.length) {


            if (_$width < 767) {

                _openHeight = _$nav.height();
                _closedHeight = _$nav.find('li').first().height();
                _$nav.css('max-height', 70 + 'px');
                _$content.css('min-height', _openHeight + 'px');

                //todo:::::::

                _$currentSelect.html(_$contentBlock.find('.active').html());
                _$contentBlock.find('.active').hide();

                _$currentSelect.on('click', function (e) {
                    if (e.preventDefault) {
                        e.preventDefault();
                    } else {
                        e.returnValue = false;
                    }

                    if ($(this).hasClass('open')) {
                        _$currentSelect.removeClass('open');
                        _$nav.css('max-height', 70 + 'px');
                    } else {
                        _$currentSelect.addClass('open');
                        _$nav.css('max-height', _openHeight + 'px');
                    }

                });
            }

        }

    }

    $('.unstyled li').click(function (e) {

        if (_$contentBlock.length) {

            if (_$nav.length) {

                if (e.preventDefault) {
                    e.preventDefault();
                }

                var $this = $(this);
                var liIndexValue = $(this).index();
                //Todo: Need to work for Mobile Devices
                //for mobile devices
                if (_$width < 767) {

                    _$currentSelect.removeClass('open');
                    _$nav.css('max-height', 70 + 'px');

                    //todo:::::::

                    _$currentSelect.html($this.html());
                    $this.addClass('active');
                    setTimeout(function () {
                        _$nav.find('a:not(.top_current)').show();
                        $this.hide();
                    }, 500);


                } else {
                    // tablet & Desktop
                    _$nav.find('a').removeClass('active');
                    $this.addClass('active');
                    _$content.children('div').removeClass('active');
                    _$content.children('div').eq(liIndexValue - 1).addClass('active');

                }
            }
        }

    });
});