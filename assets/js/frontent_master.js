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
$(window).on("load", function () {
    $(".page-loading-animation-holder").addClass("hide-page-loader");
})

// ------------------------------------------- js for pages -------------------------------------------

// ------------------------------------------- js for Index page start -------------------------------------------

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

// ------------------------------------------- js for Index page end -------------------------------------------

// ------------------------------------------- js for Contact page start -------------------------------------------

// ------------------------ weather information ------------------------
$(document).ready(function () {
    const apiKey = 'f01c4a8aaffa1a70c447df8cb8aedb50';
    const cityName = 'Titahari';
    async function fetchWeather(city) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        return data;
    }
    function displayWeather(data) {
        var celsius = data.main.temp;
        var fahrenheit = (celsius * 9 / 5) + 32;
        var weatherIcon = `assets/source/weather-icon/${data.weather[0].icon}.svg`;
        var temperatureCelsius = `${celsius}`;
        var temperatureFahrenheit = `${fahrenheit.toFixed(1)}`;
        var humidity = `${data.main.humidity}%`;
        var windSpeed = `${data.wind.speed}m/s`;
        var weatherMain = `${data.weather[0].main}`;
        var weatherDescription = `${data.weather[0].description}`;
        $('#weatherDiscription').text(weatherDescription);
        $('#temperatureCelsius').text(temperatureCelsius);
        $('#temperatureFahrenheit').text(temperatureFahrenheit);
        $('#humidity').text(humidity);
        $('#windSpeed').text(windSpeed);
        document.getElementById('weather-icon').src = weatherIcon;
    }
    fetchWeather(cityName).then(displayWeather).catch((error) => {
    });
})

// ------------------------ Current date and time ------------------------
$(document).ready(function () {
    // office time
    const officeHours = {
        Sunday: { open: '07:00:00', close: '19:00:00' },
        Monday: { open: '07:00:00', close: '19:00:00' },
        Tuesday: { open: '07:00:00', close: '19:00:00' },
        Wednesday: { open: '07:00:00', close: '19:00:00' },
        Thursday: { open: '07:00:00', close: '19:00:00' },
        Friday: { open: '07:00:00', close: '19:00:00' },
        Saturday: { open: null, close: null }
    };
    // Current time
    function getCurrentTime() {
        const now = new Date();
        let hours = now.getHours();
        const hours24 = String(now.getHours()).padStart(2, '0');
        const minutes = now.getMinutes();
        const minutes24 = String(now.getMinutes()).padStart(2, '0');
        const seconds = now.getSeconds();
        const seconds24 = String(now.getSeconds()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const strMinutes = minutes < 10 ? '0' + minutes : minutes;
        const strSeconds = seconds < 10 ? '0' + seconds : seconds;
        const timeString = hours + ':' + strMinutes + ':' + strSeconds + ' ' + ampm;
        const currentTime24 = `${hours24}:${minutes24}:${seconds24}`;
        $('#current-time').text(timeString);
        return {
            timeString: timeString,
            currentTime24: currentTime24,
            hours: hours,
            minutes: strMinutes,
            seconds: strSeconds,
            ampm: ampm
        };
    }
    //    Current date
    function getCurrentDateAndDay() {
        const now = new Date();
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const currentDayName = dayNames[now.getDay()];
        const dayOfMonth = now.getDate();
        const currentMonth = now.getMonth() + 1;
        const month = monthNames[now.getMonth()];
        const year = now.getFullYear();
        const dateString = `${month} ${dayOfMonth}, ${year}`;
        const currentDate = `${currentMonth}/${dayOfMonth}/${year}`;
        $('#current-date').text(dateString);
        return {
            dateString: dateString,
            currentDate: currentDate,
            currentDayName: currentDayName,
            dayOfMonth: dayOfMonth,
            month: month,
            year: year
        };
    }

    const currentDateAndDay = getCurrentDateAndDay();
    const currentTime = getCurrentTime();
    const currentDay = currentDateAndDay.currentDayName;

    const todayOfficeHours = officeHours[currentDay];
    const opening = new Date(`${currentDateAndDay.currentDate} ${todayOfficeHours.open}`).getTime();
    const closing = new Date(`${currentDateAndDay.currentDate}  ${todayOfficeHours.close}`).getTime();
    const current = new Date(`${currentDateAndDay.currentDate} ${currentTime.currentTime24}`).getTime();
     
    if (currentDateAndDay.currentDayName === 'Saturday') {
        $('#office-status').text('Office is Closed');
    } else if (current >= opening && current <= closing) {
        $('#office-status').text('Office is Open');
    } else {
        $('#office-status').text('Office is Closed');
    }
})
// ------------------------------------------- js for Contact page end ------------------------------------------


