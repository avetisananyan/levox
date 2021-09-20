$(function() {
    $('.delivery-container .delivery .tabs-nav a').click(function() {
        // Check for active
        $('.delivery-container .delivery .tabs-nav li').removeClass('active');
        $(this).parent().addClass('active');

        // Display active tab
        let currentTab = $(this).attr('href');
        $('.delivery-container .delivery .tabs-content > div').hide();
        $(currentTab).show();

        return false;
    });
});




