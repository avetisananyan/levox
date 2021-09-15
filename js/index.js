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

        $("body").toggleClass('hidden');
        let height = $(window).height() - 258;
        $("#" + $el + " .menu-sub-content ul").css("max-height", height + "px");
        $()
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
        $("body").removeClass('hidden');
    });

    $(document).on("click", "body #menu-button-open", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $("body").removeClass('hidden');
    });

    $(document).on("click", "body a.location.btn-address", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $("body").addClass('popup-active');
    });

    $(document).on("click", "body .header-address-modal a.close", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $("body").removeClass('popup-active');
    });

    if(window.matchMedia("(max-width: 991px)").matches) {
        moreText();
    }

    $("#switch-id, #switch-id-mobile").change(function () {
        if ($(this).is(":checked")) {
            $("body").addClass("opt");
        } else {
            $("body").removeClass("opt");
        }
    });

    if(!window.matchMedia("(max-width: 768px)").matches) {
        function alignModal() {
            var modalDialog = $(this).find(".modal-dialog");
            // Applying the top margin on modal to align it vertically center
            modalDialog.css("margin-top", Math.max(0, ($(window).height() - modalDialog.height()) / 2));
        }
        // Align modal when it is displayed
        $(".modal").on("shown.bs.modal", alignModal);
        // Align modal when user resize the window
        $(window).on("resize", function(){
            $(".modal:visible").each(alignModal);
        });
    }
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
    document.getElementById('my-dropdown-' + id).parentElement.classList.toggle('active')
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
