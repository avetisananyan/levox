$(document).ready(function () {
    var hotelsSwiper = new Swiper(".hotels-swiper-container", {
        init: false,
        loop: false,
        slidesPerView: 'auto',
        spaceBetween: 10,
        centeredSlides: false,
        autoHeight: true,
        onSlideChangeEnd:function(e){
            hotelsSwiper.update(true);
        }
    });

    if(window.matchMedia("(max-width: 768px)").matches) {
        hotelsSwiper.init();
        $("body").addClass('mobile');
    } else {
        if ($("body").hasClass('mobile')) {
            $("body").removeClass('mobile');
        }
        $(".hotels-swiper-container .swiper-wrapper").addClass('disabled');
    }
});
