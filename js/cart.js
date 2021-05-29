$(function() {
    let buttonPlus  = $(".cart-qty-plus");
    let buttonMinus = $(".cart-qty-minus");

    let incrementPlus = buttonPlus.click(function() {
        let $n = $(this)
            .parent(".cart-qty-container")
            .parent(".cart-item-qty")
            .find(".qty");
        $n.val(Number($n.val())+1 );
    });

    let incrementMinus = buttonMinus.click(function() {
        let $n = $(this)
            .parent(".cart-qty-container")
            .parent(".cart-item-qty")
            .find(".qty");
        let amount = Number($n.val());
        if (amount > 1) {
            $n.val(amount-1);
        }
    });

    $('.delivery .tabs-nav a').click(function() {
        // Check for active
        $('.delivery .tabs-nav li').removeClass('active');
        $(this).parent().addClass('active');

        // Display active tab
        let currentTab = $(this).attr('href');
        $('.delivery .tabs-content > div').hide();
        $(currentTab).show();

        return false;
    });

    $('.payment-method .tabs-nav a').click(function() {
        $(this).parent().parent().attr("data-tab", 'tab-'+$(this).parent().attr('tab'));
        // Check for active
        $('.payment-method .tabs-nav li').removeClass('active');
        $(this).parent().addClass('active');

        // Display active tab
        let currentTab = $(this).attr('href');
        $('.payment-method .tabs-content > div').hide();
        $(currentTab).show();

        return false;
    });

    $('.lift-option-dropdown').click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).toggleClass('expanded');
        $('#' + $(e.target).attr('for')).prop('checked', true);
        $('#' + $(e.target).attr('for')).attr('area-checked', true).siblings().attr('area-checked', false);
        console.log($(e.target).attr('for'));
        if ($(e.target).attr('for') != "lift-default") {
            $("[for=lift-default]").empty();
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