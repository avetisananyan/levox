$.fn.responsiveTabs = function () {
    var container = this;

    if(!window.matchMedia("(max-width: 768px)").matches) {
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
    } else {
        container.find('.tab-pane').siblings().removeClass('active');
        $(".panel-heading").on('click', function() {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            } else {
                $(this).addClass('active');
            }
        });
    }


};

(function() {
    const dropzone = document.getElementById("dropzone");
    const uploads = document.getElementById("uploads");
    var fileInput = document.getElementById("drag-drop");
    var text, i, dropped = false;

    var generateNames = function(files) {
        for (i = 0; i < files.length; i++) {
            if (
                files[i].type === "image/jpeg" ||
                files[i].type === "image/png" ||
                files[i].type === "image/jpg"
            ) {
                const fsize = files[i].size;
                const file = Math.round((fsize / 1024));
                if (file >= 8192) {
                    text = document.createTextNode("File too Big, please select a file less than 8mb.");
                } else {
                    if (files.length != i + 1) {
                        text = document.createTextNode(files[i].name + " | ");
                    } else {
                        text = document.createTextNode(files[i].name);
                    }
                }

                uploads.appendChild(text);
            } else {
                text = document.createTextNode("Error! One or more files is not an image.");
                uploads.appendChild(text);
            }
        }
    };
    dropzone.ondragover = function() {
        this.className = "dropzone dragover";
        return false;
    };
    dropzone.ondragleave = function() {
        this.className = "dropzone";
        return false;
    };
    dropzone.ondrop = function(e) {
        e.preventDefault();
        dropped = true;
        uploads.innerHTML = "";
        fileInput.files = e.dataTransfer.files;
        generateNames(e.dataTransfer.files);
        this.className = "dropzone";
    };
    dropzone.onclick = function(e) {
        e.preventDefault();
        fileInput.click();
    };
    fileInput.onchange = function() {
        uploads.innerHTML = "";
        if(!dropped)
            generateNames(this.files);
        dropped = false;
    };
})();

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

    $(document).on("click", "body.non-home-page #side-menu .side-menu-img", function (e) {
        e.preventDefault();
        e.stopPropagation();

        var galleryThumbsNew = new Swiper('.gallery-thumbs', {
            spaceBetween: 10,
            slidesPerView: 5,
            loop: false,
            centeredSlides: false,
            watchSlidesVisibility: true,
            watchSlidesProgress: true
        });

        var galleryTopNew = new Swiper('.gallery-top', {
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
                swiper: galleryThumbsNew,
            },
        });
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

    $(".img-count-container").on('click', function() {
        if($(".checkbox input").is(":checked")) {
            $(".checkbox input").prop('checked', false);
        } else {
            $(".checkbox input").prop('checked', true);
        }
    });
});
