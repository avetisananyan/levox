$(function() {
    $('.order-dropdown-toggle').click(function() {
        // $('.order-dropdown:not(this)').slideUp();
        $(this).toggleClass('active');
        $(this).next('.order-dropdown').slideToggle();
    });
});
