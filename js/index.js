$(document).ready(function() {
    $(document).on("click", "body.non-home-page #side-menu .side-menu-img", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(".page-wrapper .page-content").toggleClass('active');
    });

    $(document).on("click", "body #side-menu .side-menu-title", function (e) {
        e.preventDefault();
        e.stopPropagation();
        let $el = $(this).attr("menu-sub");
        $("#" + $el).toggleClass('current');
    });

    const $submenu = $('.menu-sub');
    const $sidemenu = $('.side-menu');
    $(document).mouseup(e => {
        if (!$submenu.is(e.target) && $submenu.has(e.target).length === 0) {
            $submenu.removeClass('current');
        }
    });

    $(document).on("click", "body #side-menu .menu-sub-close", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $submenu.removeClass('current');
    });

    if(window.matchMedia("(max-width: 767px)").matches) {
        moreText();
    }

    $("#switch-id, #switch-id-mobile").change(function () {
        if ($(this).is(":checked")) {
            $("body").addClass("opt");
        } else {
            $("body").removeClass("opt");
        }
    });
});

function openCloseSideMenu (mouse) {
    let sideMenu = document.getElementById('side-menu');
    let openCloseIcon = document.getElementById('menu-open-close-icon');

    if(mouse === 'over' || sideMenu.style.display === 'block'){
        sideMenu.style.display = 'none';
        openCloseIcon.setAttribute('src', './assets/icons/menu.svg')
    } else {
        sideMenu.style.display = 'block';
        openCloseIcon.setAttribute('src', './assets/icons/close.svg')
    }
}

function myFunction (id) {
    document.getElementById('my-dropdown-' + id).classList.toggle('d-block')
}

//Nav Sticky
window.onscroll = function() {
    navStickyFunction();
};

let header = document.getElementById("side-menu");
let sticky = header.offsetTop;

function navStickyFunction() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}

function moreText() {
    $('.advantage-item-text').each(function () {
        $(this).html(formatWords($(this).html(), 30));
        $(this).children('span').hide();
    }).click(function () {
        let more_text = $(this).children('span.more_text');
        let more_link = $(this).children('a.more_link');

        if (more_text.hasClass('hide')) {
            more_text.show();
            more_link.html(' « Скрыть');
            more_text.removeClass('hide');
        } else {
            more_text.hide();
            more_link.html(' Подробнее »');
            more_text.addClass('hide');
        }
        return false;
    });
}

function formatWords(sentence, show) {
    let words = sentence.split(' ');
    let new_sentence = '';
    for (let i = 0; i < words.length; i++) {
        if (i <= show) {
            new_sentence += words[i] + ' ';
        } else {
            if (i == (show + 1)) new_sentence += ' <span class="more_text hide">';
            new_sentence += words[i] + ' ';
            if (words[i+1] == null) new_sentence += '</span><a href="#" class="more_link"> Подробнее »</a>';
        }
    }
    return new_sentence;
}
