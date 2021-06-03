$.fn.responsiveTabs = function () {
    var container = this;

    container.on('show.bs.collapse', '.panel-collapse', function () {
        $(this).addClass('active').siblings('.panel-collapse').removeClass('active').collapse('hide');
    }).on('show.bs.tab', '.nav-tabs a', function () {
        $($(this).attr('href')).addClass('in').siblings('.tab-pane').removeClass('in');
        container.find('.nav-tabs a[href="' + $(this).attr('href') + '"]').parent().addClass('active').siblings().removeClass('active');
    }).on('click', '.panel-heading', function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        }
        $(this).addClass('active').siblings().removeClass('active');
    });
};

$(document).ready(function () {
    $('.product-view-tabs').responsiveTabs();

    var swiper = new Swiper(".product-view-review-images", {
        loop: false,
        slidesPerView: 3,
        spaceBetween: 10,
        observer: true,
        observeParents: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            640: {
                spaceBetween: 20,
            },
            768: {
                spaceBetween: 30,
            },
            1024: {
                spaceBetween: 40,
            },
        },
    });

    var galleryThumbs = new Swiper('.gallery-thumbs', {
        spaceBetween: 10,
        slidesPerView: 5,
        loop: false,
        centeredSlides: false,
        watchSlidesVisibility: true,
        watchSlidesProgress: true
    });

    var galleryTop = new Swiper('.gallery-top', {
        spaceBetween: 10,
        centeredSlides: true,
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        thumbs: {
            swiper: galleryThumbs,
        },
    });

    var execOptionsSwiper = new Swiper(".exec-options-swiper-container", {
        init: false,
        loop: false,
        slidesPerView: 3,
        spaceBetween: 10,
        observer: true,
        observeParents: true,
        allowTouchMove: true,
    });

    var allCollectionSwiper = new Swiper(".all-collection-swiper-container.active", {
        init: false,
        loop: false,
        slidesPerView: 3,
        spaceBetween: 10,
        observer: true,
        observeParents: true
    });

    var equipmentSwiper = new Swiper(".divTable.product-view-equipment", {
        init: false,
        loop: false,
        slidesPerView: 3,
        spaceBetween: 10,
        observer: true,
        observeParents: true,
        allowTouchMove: true,
    });

    var ratingReviewSwiper = new Swiper(".product-view-rating-review-tab .product-view-review", {
        init: false,
        loop: false,
        slidesPerView: 1,
        spaceBetween: 10,
        observer: true,
        observeParents: true,
        freeMode: true
    });

    if(window.matchMedia("(max-width: 768px)").matches) {
        equipmentSwiper.init();
        execOptionsSwiper.init();
        allCollectionSwiper.init();
        ratingReviewSwiper.init();
        $("body").addClass('mobile');
    } else {
        if ($("body").hasClass('mobile')) {
            $("body").removeClass('mobile');
        }
        $(".divTable.product-view-equipment .divTableBody").addClass('disabled');
        $(".exec-options-swiper-container .swiper-wrapper").addClass('disabled');
        $(".all-collection-swiper-container .swiper-wrapper").addClass('disabled');
        $(".product-view-rating-review-tab .product-view-review .swiper-wrapper").addClass('disabled');
    }

    $(window).resize(function () {
        if(window.matchMedia("(max-width: 768px)").matches) {
            if (!($("body").hasClass('mobile'))) {
                $("body").addClass('mobile');
                equipmentSwiper.init();
                execOptionsSwiper.init();
                allCollectionSwiper.init();
                ratingReviewSwiper.init();
                $(".divTable.product-view-equipment .divTableBody").removeClass('disabled');
                $(".exec-options-swiper-container .swiper-wrapper").removeClass('disabled');
                $(".all-collection-swiper-container .swiper-wrapper").removeClass('disabled');
                $(".product-view-rating-review-tab .product-view-review .swiper-wrapper").removeClass('disabled');
            }
        } else {
            if ($("body").hasClass('mobile')) {
                $("body").removeClass('mobile');
                $(".divTable.product-view-equipment .divTableBody").addClass('disabled');
                $(".exec-options-swiper-container .swiper-wrapper").addClass('disabled');
                $(".all-collection-swiper-container .swiper-wrapper").addClass('disabled');
                $(".product-view-rating-review-tab .product-view-review .swiper-wrapper").addClass('disabled');
            }
        }
    });

    $(".like-count-container").on('click', function() {
        if ($(this).closest('.review-like-dislike').find('.dislike-count-container').hasClass('clicked')) {
            let valueCount = $(this).closest('.review-like-dislike').find('.dislike-count').html();
            $(this).closest('.review-like-dislike').find('.dislike-count').html(--valueCount);
            $(this).closest('.review-like-dislike').find('.dislike-count-container').removeClass('clicked')
        }

        if ($(this).hasClass('clicked')) {
            $(this).removeClass('clicked');
            let valueCount = $(this).children('.like-count').html();
            $(this).children('.like-count').html(--valueCount);
        } else {
            $(this).addClass('clicked');
            let valueCount = $(this).children('.like-count').html();
            $(this).children('.like-count').html(++valueCount);
        }
    });

    $(".dislike-count-container").on('click', function() {
        if ($(this).closest('.review-like-dislike').find('.like-count-container').hasClass('clicked')) {
            let valueCount = $(this).closest('.review-like-dislike').find('.like-count').html();
            $(this).closest('.review-like-dislike').find('.like-count').html(--valueCount);
            $(this).closest('.review-like-dislike').find('.like-count-container').removeClass('clicked')
        }

        if ($(this).hasClass('clicked')) {
            $(this).removeClass('clicked');
            let valueCount = $(this).children('.dislike-count').html();
            $(this).children('.dislike-count').html(--valueCount);
        } else {
            $(this).addClass('clicked');
            let valueCount = $(this).children('.dislike-count').html();
            $(this).children('.dislike-count').html(++valueCount);
        }
    });

    $(".all-collection-tabs .tab-link").on('click', function() {
        let tabID = $(this).attr('data-tab');
        $(this).addClass('active').siblings().removeClass('active');
        $('#tab-'+tabID).addClass('active').siblings().removeClass('active');
        if(window.matchMedia("(max-width: 768px)").matches) {
            new Swiper('#tab-'+tabID, {
                init: true,
                loop: false,
                slidesPerView: 3,
                spaceBetween: 10,
                observer: true,
                observeParents: true
            });
        }
    });
});
