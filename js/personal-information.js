$(function() {
    $('.address-modal .lift-option-dropdown').click(function(e) {
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

    $(".calendar").datepicker({
        dateFormat: 'dd/mm/yy',
        firstDay: 1
    });
    
    $(document).on('click', '.date-picker .input', function(e) {
        var $me = $(this),
        $parent = $me.parents('.date-picker');
        $parent.toggleClass('open');
    });
    
    $(".calendar").on("change", function() {
        var $me = $(this),
        $selected = $me.val(),
        $parent = $me.parents('.date-picker');
        $parent.find('.result').children('span').html($selected);
    });
});