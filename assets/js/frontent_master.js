// ------------------------ Navbar on scroll ------------------------
$(document).ready(function () {
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 0) {
            $('.navbar').addClass('navbar-on-scroll');
            $('.logo-text').addClass('logo-text-on-scroll');
            $('.navbar-toggler').addClass('navbar-toggler-on-scroll');
            $('.nav-link').addClass('nav-link-on-scroll');
            $('.nav-item').addClass('nav-item-on-scroll');
            $('.navbar-toggler').addClass('primary-color');
            $('.navbar-collapse').addClass('navbar-collapse-on-scroll');
        } else {
            $('.navbar').removeClass('navbar-on-scroll');
            $('.logo-text').removeClass('logo-text-on-scroll');
            $('.navbar-toggler').removeClass('navbar-toggler-on-scroll');
            $('.nav-link').removeClass('nav-link-on-scroll');
            $('.nav-item').removeClass('nav-item-on-scroll');
            $('.navbar-toggler').removeClass('primary-color');
            $('.navbar-collapse').removeClass('navbar-collapse-on-scroll');
        }
    });
});

// ------------------------ Navbar toggle ------------------------
$(document).ready(function () {
    $('#navbar-toggler').on('click', function () {
        $('.body-content').toggleClass('body-content-on-toggle');
        $('.navbar').toggleClass('navbar-on-toggle');
        $('.navbar-collapse').toggleClass('navbar-collapse-on-toggle');
    });
});

// ------------------------ Back to top ------------------------
var btn = $('#back-to-top-button');
$(window).scroll(function () {
    if ($(window).scrollTop() > 1) {
        btn.addClass('back-to-top-on-scroll');
    } else {
        btn.removeClass('back-to-top-on-scroll');
    }
});

btn.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, '300');
});

// ------------------------ Loading animation ------------------------
$(window).on("load", function() {
    $(".page-loading-animation-holder").addClass("hide-page-loader");
})

// ------------------------------------------- js for pages -------------------------------------------

// ------------------------ Auto type and erease ------------------------
var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];
    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
    this.el.innerHTML = '<span class="typing-line">' + this.txt + '</span>';
    var that = this;
    var delta = 200 - Math.random() * 100;
    if (this.isDeleting) { delta /= 2; }
    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }
    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .typing-line { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};

// ------------------------ brand card carausel ------------------------
$(document).ready(function () {
    $('#brand-carousel').owlCarousel({
        loop: true,
        nav: false,
        autoplay: true,
        responsive: {
            0: {
                items: 3,
                margin: 70
            },
            600: {
                items: 4,
                margin: 80
            },
            900: {
                items: 5,
                margin: 90
            },
            1100: {
                items: 6,
                margin: 100
            }
        }
    });
});

// ------------------------ profile card carausel ------------------------
$(document).ready(function () {
    $('#team-owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        navText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ],
        autoplay: true,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            900: {
                items: 3
            },
            1100: {
                items: 4
            }
        }
    });
});

// ------------------------ Count on scroll ------------------------
function visible(partial) {
    var $t = partial,
        $w = jQuery(window),
        viewTop = $w.scrollTop(),
        viewBottom = viewTop + $w.height(),
        _top = $t.offset().top,
        _bottom = _top + $t.height(),
        compareTop = partial === true ? _bottom : _top,
        compareBottom = partial === true ? _top : _bottom;

    return ((compareBottom <= viewBottom) && (compareTop >= viewTop) && $t.is(':visible'));

}

$(window).scroll(function () {
    if (visible($('.count-digit'))) {
        if ($('.count-digit').hasClass('counter-loaded')) return;
        $('.count-digit').addClass('counter-loaded');
        $('.count-digit').each(function () {
            var $this = $(this);
            var finalValue = parseInt($this.text());
            jQuery({ Counter: 0 }).animate({ Counter: finalValue }, {
                duration: 3000,
                easing: 'swing',
                step: function () {
                    var currentValue = Math.ceil(this.Counter);
                    if (currentValue > 999) {
                        $this.text((currentValue / 1000).toFixed(1) + 'k');
                    } else {
                        $this.text(currentValue);
                    }
                },
                complete: function () {
                    if (finalValue > 999) {
                        $this.text((finalValue / 1000).toFixed(1) + 'k');
                    } else {
                        $this.text(finalValue);
                    }
                }
            });
        });
    }
})