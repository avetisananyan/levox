$(function() {
    $('.hotels-catalog .tabs-nav a').click(function() {
        // Check for active
        $('.hotels-catalog .tabs-nav li').removeClass('active');
        $(this).parent().addClass('active');

        // Display active tab
        let currentTab = $(this).attr('href');
        $('.hotels-catalog .tabs-content > div').hide();
        $(currentTab).show();

        return false;
    });
});

$(document).ready(function () {
    var hotelsSwiper1 = new Swiper(".hotels-swiper-container1", {
        init: false,
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 10,
        centeredSlides: true,
        autoHeight: true,
    });
    var hotelsSwiper2 = new Swiper(".hotels-swiper-container2", {
        init: false,
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 10,
        centeredSlides: true,
        autoHeight: true,
    });
    var hotelsSwiper3 = new Swiper(".hotels-swiper-container3", {
        init: false,
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 10,
        centeredSlides: true,
        autoHeight: true,
    });

    if(window.matchMedia("(max-width: 768px)").matches) {
        hotelsSwiper1.init();
        hotelsSwiper2.init();
        hotelsSwiper3.init();
        $("body").addClass('mobile');
    } else {
        if ($("body").hasClass('mobile')) {
            $("body").removeClass('mobile');
        }
        $(".promotions .swiper-wrapper").addClass('disabled');
    }
});
