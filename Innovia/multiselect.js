
//http://www.1stwebdesigns.com/blog/development/multiple-select-with-checkboxes-and-jquery
//Modified slightly
jQuery.fn.multiselect = function () {
    $(this).each(function () {
        $(this).find('input:checkbox').each(function () {
            // Highlight pre-selected checkboxes
            if ($(this).is(':checked')) {
                $(this).parent('label').addClass('ui-state-highlight');
            }

            // Highlight checkboxes that the user selects
            $(this).click(function () {
                if ($(this).is(':checked')) {
                    $(this).parent('label').removeClass('ui-state-default').addClass('ui-state-highlight');
                } else {
                    $(this).parent('label').removeClass('ui-state-highlight').addClass('ui-state-default');
                }
            });
        });
    });
};