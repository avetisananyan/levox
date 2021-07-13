$(function() {
    const $filterContent = $('.filter-content');
    $(document).on("click", "body .filter-sort-mobile .filter-mobile", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $($filterContent).addClass('active');
        $("body").addClass('filter-active');
        $("body").scrollTop(0);
    });

    $(document).on("click", "body .filter-content .filter-sort-mobile-close", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $filterContent.removeClass('active');
        $("body").removeClass('filter-active');
    });

    $('.filter-option-dropdown').click(function(e) {
        $('.sort-dropdown > .sort-caption').parent().removeClass('open');
        $('.composition-dropdown > .filter-composition').parent().removeClass('open');
        e.preventDefault();
        e.stopPropagation();
        $('.filter-option-dropdown').not(this).removeClass('expanded');
        $(this).toggleClass('expanded');
        $('#' + $(e.target).attr('for')).prop('checked', true);
    });

    $(document).click(function(e) {
        e.stopPropagation();
        $('.filter-option-dropdown').removeClass('expanded');
        $('.sort-dropdown > .sort-caption').parent().removeClass('open');
        $('.composition-dropdown > .filter-composition').parent().removeClass('open');
    });

    $('.sort-dropdown > .sort-caption').on('click', function(e) {
        $('.composition-dropdown > .filter-composition').parent().removeClass('open');
        e.preventDefault();
        e.stopPropagation();
        $('.filter-option-dropdown').removeClass('expanded');
        $(this).parent().toggleClass('open');
    });

    $('.sort-dropdown > .sort-list > .sort-item').on('click', function() {
        $('.sort-dropdown > .sort-list > .sort-item').removeClass('selected');
        $(this).addClass('selected').parent().parent().removeClass('open').children('.sort-caption').text( $(this).text() );
        if ($(this).hasClass('sort-item-default')) {
            $(".filter-sort-block").removeClass('sort-default');
        } else {
            $(".filter-sort-block").addClass('sort-default');
        }
    });

    $(document).on('keyup', function(evt) {
        if ( (evt.keyCode || evt.which) === 27 ) {
            $('.sort-dropdown').removeClass('open');
            $('.composition-dropdown').removeClass('open');
        }
    });

    $(document).on('click', function(evt) {
        if ( $(evt.target).closest(".sort-dropdown > .sort-caption").length === 0 ) {
            $('.sort-dropdown').removeClass('open');
        }
    });

    $('.sort-modal-toggle').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $('.sort-modal').toggleClass('is-visible');
        $("body").toggleClass('sort-active');
    });

    $('.filter-sort .filter-feature').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $('.filter-content').slideToggle(100);
        $(this).toggleClass('is-visible');
        $('.filter-content').toggleClass('is-visible');
    });

    $('.composition-dropdown > .filter-composition').on('click', function(e) {
        $('.sort-dropdown > .sort-caption').parent().removeClass('open');
        e.preventDefault();
        e.stopPropagation();
        $('.filter-option-dropdown').removeClass('expanded');
        $(this).parent().toggleClass('open');
    });

    $('.composition-dropdown > .composition-list > .composition-item').on('click', function() {
        $('.composition-dropdown > .composition-list > .composition-item').removeClass('selected');
        $(this).addClass('selected').parent().parent().removeClass('open').children('.composition-caption').text( $(this).text() );
        if ($(this).hasClass('composition-item-default')) {
            $(".filter-sort-block").removeClass('composition-default');
        } else {
            $(".filter-sort-block").addClass('composition-default');
        }
    });

    $('.composition-modal-toggle').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $('.composition-modal').toggleClass('is-visible');
        $("body").toggleClass('composition-active');
    });
});
