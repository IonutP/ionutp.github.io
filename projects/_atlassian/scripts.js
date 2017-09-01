<script src="https://q4widgets.q4web.com/preview/js/toolbar.js"></script>
<script src="/files/js/companySearch.js"></script>
<script>
function lang_focus(name, element) {
    $(element).val(name);
    $(element).focus(function() {
        if (element.value == name) element.value = '';
    });

    $(element).blur(function() {
        if (!element.value.length) element.value = name;
    });
};

$('.PreviewToolBar').previewToolbar();

//Search with enter
$('.ModuleSearch input[type="text"]').removeAttr('onkeypress').on("keydown", function(e) {
    if (e.keyCode == 13) {
        $(this).closest('.ModuleSearch').find('input[type="submit"]').trigger('click');
        return false;
    }
});

$('.ModuleSearch').CompanySearch({
    url: 'https://www.atlassian.com/search?query='
});

$('.arrow-top').click(function() {
    $("html, body").animate({
        scrollTop: 0
    }, 600);
});

var isVisible = false;
$(window).scroll(function() {
    var shouldBeVisible = $(window).scrollTop() > 390;
    if (shouldBeVisible && !isVisible) {
        isVisible = true;
        $('.arrow-top').show();
    } else if (isVisible && !shouldBeVisible) {
        isVisible = false;
        $('.arrow-top').hide();
    }
});


// IR MOBILE MENU trigger
var navMobile = {
    nav: $('.MobileNav'),
    header: $('.PaneHeader'),
    $window: $(window),
    // currentScroll: navMobile.$window.scrollTop(),
    navOpen:function(){
        var $drop = $('.MobileNav .level2');
        return $drop.is(':visible') ? true : false;
    },
    sticky: function(){
        navMobile.$window.on('scroll',function(){
            navMobile.$window.scrollTop() > navMobile.header.outerHeight() ? navMobile.nav.addClass('nav--sticky') : navMobile.nav.removeClass('nav--sticky');
        }).scroll();
    },
    init: function(){
        navMobile.sticky();
        navMobile.nav.on('click', '.has-children > a', function(e) {
            var $this = $(this),
                $parent = $this.parent();

            if ( $parent.hasClass('home') ) {
                if ( !$parent.hasClass('js--expanded') ) {
                    e.preventDefault();
                }
                $parent.addClass('js--expanded');
                navMobile.navOpen() ? $('body').addClass('js--nav-open') : '';
            } else {
                if ( !$parent.hasClass('js--expanded') ) {
                    e.preventDefault();
                    $parent.siblings('.js--expanded').removeClass('js--expanded');
                    $parent.addClass('js--expanded');
                }
            }
        });
    }
}
navMobile.init();


$(document).ready(function() {
    $("a.fancybox").fancybox();
    $('a.fancyboxiframe').fancybox({
        type: 'iframe',
        height: '50%',
        width: '50%'
    });

    //Sticky slidebar nav
    var sideBar_posititon

    function set_sideBar_posititon() {
        if ($(window).width() > 800) {
            sideBar_posititon = 0;
        } else {
            sideBar_posititon = 0;
        }
    }

    set_sideBar_posititon();
    $(window).resize(function() {
        set_sideBar_posititon();
        if ($('#mainNav > ul > li').hasClass('active')) {
            $('#mainNav > ul > li.active > a').trigger('click');
        }
    })

    $('.ModuleSearch .SearchInput').filter(function() {
        $(this).removeAttr('onkeypress');
        var name = "Search";
        lang_focus(name, this);
    });

    $(window).on('scroll', function() {
        if ($(window).width() > 640) {
            var current = $(window).scrollTop(),
                //top trigger
                $trigger = $('.PaneLeft'),
                positionTrigger = $trigger.offset().top - sideBar_posititon,
                $navStiky = $('.navbar-collapse'),
                navStiky_height = $navStiky.outerHeight(),
                position_navStiky = $navStiky.offset().top,
                // bottom trigger
                $bottom_trigger = $('.PaneContentInner'),
                bottom_trigger_height = $bottom_trigger.outerHeight(),
                positionBottomTrigger = $bottom_trigger.offset().top + bottom_trigger_height - navStiky_height,
                pozBottom = positionBottomTrigger - current;
            //end variables
            if (current >= positionTrigger) {
                if (!$navStiky.hasClass('bottomSet')) {
                    $navStiky.addClass('fixed');
                };
            } else {
                $navStiky.removeClass('fixed');
            };
            if (sideBar_posititon >= pozBottom) {
                $navStiky.addClass('bottomSet');
                $navStiky.removeClass('fixed');
            } else {
                if ($navStiky.hasClass('bottomSet')) {
                    $navStiky.addClass('fixed');
                    $navStiky.removeClass('bottomSet');
                };
            };
        };
    }).scroll();

    //Side Nav
    $('.navbar-collapse .level2 > .has-children > a').click(function(e) {
        e.preventDefault();
        $(this).next().slideToggle();
        if (!$(this).parent().hasClass('open')) {
            $(this).parent().toggleClass('open');
            $(this).parent().siblings().removeClass('open');
        }
    });
    $('input[type="checkbox"]').iCheck({
        checkboxClass: 'icheckbox_flat-blue',
        radioClass: 'iradio_flat-blue'
    });
    $(".mail1 .MailingListCol2 input").on("change", function() {
        setTimeout($.proxy(function() {
            $(".mail2 .MailingListCol2 input").attr('value', this.value);
        }, this), 10);
    });
    $('.mail2 .SubmitButton').clone().appendTo('.mail1 .GridActions');
    $('.mail2 .MailingListUnsubscribeMessage').appendTo('.mail1 .ErrorContainer');
    $('.CustomTable tr:odd').addClass('alt');
});
</script>