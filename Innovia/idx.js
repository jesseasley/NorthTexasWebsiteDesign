
/* When a push pin is near the edge, this causes the infobox to scroll into view. Value is in pixels.*/
globalBuffer = 130;
var ppLocations = [];
var windowDefaultHeight = 1250;
var windowHeight = ($(window).height() > windowDefaultHeight ? windowDefaultHeight : $(window).height());
var detailsPopup = $('<div id="details" />');
var markerNumber = 0;

$(document).ready(function () {
    if (typeof jQuery.fn.placeholder !== 'undefined' && !jQuery.fn.placeholder.input) {
        $('[placeholder]').placeholder();
    }

    if (jQuery.mask) {
        $('#phone').mask('(999) 999-9999');
    }

    if (jQuery.ui) {
        $('#error').dialog({
            autoOpen: false,
            title: 'Error',
            buttons: {
                'Ok': function () {
                    $(this).dialog('close');
                }
            }
        });

        if (typeof prop !== 'undefined') {
            var navRadioSet = $('#navRadioSet');
            navRadioSet.buttonset();
            navRadioSet.find('#' + prop).attr('checked', true).change(function () {
                $('#PropertyFormat').val($(this).val());
            });
            navRadioSet.buttonset('refresh');

            if (prop !== 'findAgent' && prop !== 'findFirm') {
                $('#saveProspect').button().click(function () {
                    saveProspect();
                    return false;
                });
                $('#search1', '#idxSearch').button();
                $('#search2', '#idxSearch').button();
                $('#search3', '#idxSearch').button();
                $('#search4', '#idxSearch').button();
                $('#reset1', '#idxSearch').button();
                $('#reset2', '#idxSearch').button();
                $('#reset3', '#idxSearch').button();
                $('#reset4', '#idxSearch').button();

                var searchCriteria = $('#searchCriteria');
                var advancedCriteria = $('#advancedCriteria');
                var openHouseCriteria = $('#openHouseCriteria');
                searchCriteria.collapsiblePanel();
                advancedCriteria.collapsiblePanel();
                openHouseCriteria.collapsiblePanel();
                advancedCriteria.find('.collapsibleContainerContent').hide();

                //don't hide when openhouse GET parameter set
                var par = [];
                var isOpenHouse = false;
                var getParams = window.location.search.replace("?", "").split('&');
                for (var i = 0; i < getParams.length; i++) {
                    par = getParams[i].split('=');
                    if (par[0] == 'openHouse' && par[1] == 1) {
                        isOpenHouse = true;
                        break;
                    }
                }
                if (!isOpenHouse) {
                    openHouseCriteria.find('.collapsibleContainerContent').hide();
                }

                CollapsibleContainerToggleIcon(searchCriteria);
                CollapsibleContainerToggleIcon(advancedCriteria);
                CollapsibleContainerToggleIcon(openHouseCriteria);

                $('.multiselect', '#idxSearch').multiselect();

                var idxSearch = $('#idxSearch', '#search');
                cleanDatepicker();
                var openHouseStartDt_B = $('input[name="openHouseStartDt_B"]', '#openHouseCriteria');
                var openHouseStartDt_E = $('input[name="openHouseStartDt_E"]', '#openHouseCriteria');
                if (openHouseStartDt_B.length > 0) {
                    openHouseStartDt_B.datepicker({
                        buttonImage: "/" + acct + "/idx/images/calendar.png",
                        buttonImageOnly: true,
                        changeMonth: true,
                        changeYear: true,
                        showButtonPanel: true,
                        showOn: 'both',
                        dateFormat: 'mm/dd/yy',
                        buttonText: '',
                        minDate: 0
                    });
                }

                if (openHouseStartDt_E.length > 0) {
                    openHouseStartDt_E.datepicker({
                        buttonImage: "/" + acct + "/idx/images/calendar.png",
                        buttonImageOnly: true,
                        changeMonth: true,
                        changeYear: true,
                        showButtonPanel: true,
                        showOn: 'both',
                        dateFormat: 'mm/dd/yy',
                        buttonText: '',
                        minDate: 0
                    });
                }

                //On reload, change() all non empty inputs to reload the search criteria
                idxSearch.find('input').each(function () {
                    if ($(this).attr('type') !== 'checkbox' && $(this).attr('type') !== 'button' && $(this).val() !== '') {
                        $(this).change();
                    }
                    if ($(this).attr('type') === 'checkbox' && $(this).attr('checked') === 'checked') {
                        $(this).change();
                    }
                });
            }
        }
        /* IDX check if window is higher than windowDefaultHeight so we can manually set the dimensions */
        if (windowHeight >= windowDefaultHeight) {
            var mapDiv = $('#map');
            mapDiv.css('bottom', 'auto').css('height', '600px');
            if (idx_orientation === 'vertical') {
                $('#search').css('bottom', 'auto').css('height', '600px');
            } else {
                $('#search').css('bottom', 'auto').css('height', '1230px');
            }
            $('#display').css({
                position: 'relative',
                top: '630px',
                height: '600px'
            });

            var copyrightPosition = $('#idxOneliner').height();
            if (mapDiv.is(':visible')) {
                copyrightPosition += 660;
            }
            $('#copyright').css('bottom', 'auto').css('top', copyrightPosition);
            $('#progress').addClass('progressFramed');
        }

        $(window).resize(divHeightCalculation);
        $(window).trigger('resize');
    }

    $('div.multiselect', '#idxSearch').on('mousewheel DOMMouseScroll', function (e) {
        e.stopImmediatePropagation();
    });
});

function cleanDatepicker() {
    var old_fn = $.datepicker._updateDatepicker;

    $.datepicker._updateDatepicker = function (inst) {
        old_fn.call(this, inst);

        var buttonPane = $(this).datepicker("widget").find(".ui-datepicker-buttonpane");

        $("<button type='button' class='ui-datepicker-clean ui-state-default ui-priority-primary ui-corner-all'>Clear</button>").appendTo(buttonPane).click(function () {
            $.datepicker._clearDate(inst.input);
        });
    };
}

var showDisplay = false;

function divHeightCalculation(callback) {
    var navigationHeight = $('#navigation').height(),
        footerHeight = $('#copyright').height(),
        mapBottomPercentage = (showDisplay) ? 40 : 0,
        idxHeaderHeight = $('#idxHeader').height(),
        windowHeight = parseFloat($(window).height()),
        display = $('#display'),
        map = $('#map'),
        results = $('#results'),
        displayTop,
        displayHeight;

    // if (windowHeight >= windowDefaultHeight) {
    //     return;
    // }

    if (!showDisplay) {
        displayTop = windowHeight - footerHeight;
        displayHeight = 0;
    } else if ($('#showMap').css('display') === 'inline-block') {
        //displayTop = 30;
        displayHeight = windowHeight - navigationHeight - footerHeight - idxHeaderHeight;
    } else {
        //displayTop = 'auto';
        displayHeight = (windowHeight - footerHeight) * (mapBottomPercentage / 100) - idxHeaderHeight;
    }
    //display.css('top', displayTop);
    display.css('height', displayHeight);
    if (showDisplay) {
        if (!display.is('.half, .full')) {
            display.addClass('half');
            map.addClass('half');
        }
    } else {
        map.removeClass('half');
        display.removeClass('half full');
    }

    if (typeof (idx_orientation) !== 'undefined' && idx_orientation === 'vertical') {
        // $('#search').css({
        //     bottom: mapBottomPercentage !== 0 ? (windowHeight + navigationHeight) * (mapBottomPercentage / 100) : footerHeight
        // });
    }

    if (results.css('display') === 'inline-block') {
        results.css('height', (windowHeight - navigationHeight - footerHeight) - idxHeaderHeight - 14);
        results.find('table').css('width', '100%');
    }

    if (callback !== undefined && typeof (callback) === "function") {
        callback();
    }
}

function formReset(form) {
    $('#' + form, '#search')[0].reset();
    $('.multiselect label', '#idxSearch').removeClass('ui-state-highlight').addClass('ui-state-default');
    $('#idxOneliner').html('');
    $('#search').removeClass('half');
    $('#myMap').find('#clear').click();
    window.InnoVia.Mapping.clearMarkers();
    (window.InnoVia.Mapping.getClusterObject()).clearMarkers();
    pp = [];
    ppLocations = [];

    $('#matches').html('');
    showDisplay = false;
    divHeightCalculation(function () {
        $('.listing').remove();
    });
    $('#myMap').find('#clear').click();
    $('#regroup').hide();
    $('#showAll').hide();
    $('#compare').hide();
}

function isNumber(id) {
    var obj = $('#' + id);
    if (isNaN(obj.val())) {
        var error = $('#error');
        error.html('Please enter a number.').dialog('open');
        obj.val('');
        error.dialog({
            close: function () {
                $('#' + id).focus();
            }
        });
    }
}

function formatPhone(phonenum) {
    var regexObj = /^(?:\+?1[\-. ]?)?(?:\(?([0-9]{3})\)?[\-. ]?)?([0-9]{3})[\-. ]?([0-9]{4})$/;
    if (regexObj.test(phonenum)) {
        var parts = phonenum.match(regexObj);
        var phone = '';
        if (parts[1]) {
            phone += '(' + parts[1] + ') ';
        }
        phone += parts[2] + '-' + parts[3];
        return phone;
    } else {
        //invalid phone number
        return phonenum;
    }
}

var parseQueryString = function () {
    var str = window.location.search;
    var objURL = {};

    str.replace(
        new RegExp("([^?=&]+)(=([^&]*))?", "g"),
        function ($0, $1, $2, $3) {
            objURL[$1] = $3;
        }
    );
    return objURL;
};

function showDetails(mls, key, gallery) {
    if (arguments.length === 2) {
        gallery = false;
    }

    /** @param {{openHouse: integer}} params */
    var params = parseQueryString(),
        custom = '';

    if (params.openHouse !== undefined && params.openHouse === '1') {
        custom = 'openHouse';
    }

    if (params.sold !== undefined && params.sold === '1') {
        custom = 'sold';
    }

    $.ajax({
        url: 'detail.php',
        type: 'post',
        data: { mls: mls, key: key, gallery: gallery, custom: custom },
        success: function (data) {
            detailsPopup.html(data);
            detailsPopup.dialog({
                width: 760,
                height: windowHeight - 100,
                title: 'Details',
                modal: true,
                draggable: true,
                resizable: false
            });
            if (windowHeight >= windowDefaultHeight) {
                detailsPopup.dialog('option', 'position', { my: 'top', at: 'top', of: window });
            }
            /* Fix for IE8 to prevent ESC from closing all dialogs. */
            $([document, window]).unbind('.dialog-overlay');
            if (jQuery.mask) {
                $('#showingPhone').mask('(999) 999-9999');
            }
            if (gallery) {
                $('#displayedImage').click();
            }
            $('.ui-dialog-titlebar-close').on('mousedown', function (event) {
                detailsPopup.dialog('close');
                event.preventDefault();
                event.stopPropagation();

            });
        }
    });
}

function showContact(fmtString, mls) {
    var contactDialog = $('#contact' + mls).dialog({
        title: 'Contact Agent',
        modal: true,
        draggable: true,
        resizable: false,
        buttons: {
            "Send": function () {
                if (sendMail(true, fmtString, mls)) {
                    $(this).dialog("close");
                }
            },
            "Cancel": function () {
                $(this).dialog("close");
            }
        }
    });
    if (windowHeight >= windowDefaultHeight) {
        contactDialog.dialog('option', 'position', { my: 'top', at: 'top', of: window });
    }
}

var mailResponse = $('<div id="mailResponse" />');

function sendMail(isContact, fmtString, mls) {
    isContact = typeof isContact !== 'undefined' && isContact ? 1 : 0;

    var form = (isContact) ? $('#contactForm' + mls) : $('#mailForm');

    var reg = /^([A-Za-z0-9_\-\.])+@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    var address = '';


    if ($(form).find('#fromContactName' + mls).val() === '') {
        alert("Please enter your name.");
        return false;
    }
    if ($(form).find('#fromContactEmail' + mls).val() === '') {
        alert("Please enter your email.");
        return false;
    } else {
        address = $(form).find('#fromContactEmail' + mls).val();
        if (reg.test(address) === false) {
            alert('Invalid Email Address');
            return false;
        }
    }


    var data = (isContact) ? '&isContact=1' : '';
    var property = (fmtString != '') ? '&prop=' + fmtString : '';

    $.ajax({
        url: 'sendMail.php',
        type: 'POST',
        data: $(form).serialize() + data + property,
        success: function (data) {
            if (isContact && typeof agent_email_sent_callback === 'function') {
                agent_email_sent_callback();
            }
            $(mailResponse).html(data);
            $(mailResponse).dialog({
                modal: true,
                buttons: {
                    'Ok': function () {
                        $(this).dialog('close');
                    }
                }
            });
        }
    });
    return true;
}

var showingResponse = $('<div id="showingResponse" />');

function sendShowingRequest(isContact, mls) {
    var form = (isContact) ? $('#contactForm') : $('#showingForm' + mls);

    if (isContact) {
        if ($(form).find('input[name="name"]').val() === '') {
            alert("Please enter your contact name.");
            return false;
        }
        var radio = $(form).find('input[name="preferredContact"]:checked');
        if (!radio.length) {
            alert('You must select your preferred method of contact');
            return false;
        } else {
            if ($(form).find('input[name="preferredContact"]:checked').val() === 'E-Mail') {
                if ($(form).find('input[name="email"]').val() === '') {
                    alert("Please enter your email address.");
                    return false;
                } else {
                    var regex = /^([a-zA-Z0-9_\.\-\+])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                    if (!regex.test($(form).find('input[name="email"]').val())) {
                        alert("Please enter a valid email address.");
                        return false;
                    }
                }
            } else if ($(form).find('input[name="preferredContact"]:checked').val() === 'Phone') {
                if ($(form).find('input[name="showingPhone"]').val() === '') {
                    alert("Please enter your phone number with area code.");
                    return false;
                }
            }
        }

        if ($(form).find('#showDate').val() === '') {
            alert("Please enter the preferred date you would like to schedule.");
            return false;
        }

        if ($(form).find('select[name="showTime"]').val() === '') {
            alert("Please enter the preferred time you would like to schedule.");
            return false;
        }
    } else {
        if ($(form).find('#name' + mls).val() === '') {
            alert("Please enter your contact name.");
            return false;
        }
        var $radio = $(form).find('input[name="preferredContact' + mls + '"]:checked');
        if (!$radio.length) {
            alert('You must select your preferred method of contact');
            return false;
        } else {
            if ($(form).find('input[name="preferredContact' + mls + '"]:checked').val() === 'E-Mail') {
                if ($(form).find('#email' + mls).val() === '') {
                    alert("Please enter your email address.");
                    return false;
                } else {
                    var regex = /^([a-zA-Z0-9_\.\-\+])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                    if (!regex.test($(form).find('#email' + mls).val())) {
                        alert("Please enter a valid email address.");
                        return false;
                    }
                }
            } else if ($(form).find('input[name="preferredContact' + mls + '"]:checked').val() === 'Phone') {
                if ($(form).find('#showingPhone' + mls).val() === '') {
                    alert("Please enter your phone number with area code.");
                    return false;
                }
            }
        }

        if ($(form).find('#showDate' + mls).val() === '') {
            alert("Please enter the preferred date you would like to schedule.");
            return false;
        }

        if ($(form).find('select[name="showTime' + mls + '"]').val() === '') {
            alert("Please enter the preferred time you would like to schedule.");
            return false;
        }
    }

    var data = (isContact) ? '&isContact=1' : '';
    var showing = '&scheduleShowing=1';
    var property;
    if (typeof (prop) === "undefined") {
        property = '&prop=';
    } else {
        property = '&prop=' + prop;
    }

    $.ajax({
        url: 'sendMail.php',
        type: 'POST',
        data: form.serialize() + data + showing + property,
        success: function (data) {
            if (typeof agent_email_sent_callback === 'function') {
                agent_email_sent_callback();
            }
            $(showingResponse).html(data);
            $(showingResponse).dialog({
                modal: true,
                buttons: {
                    'Ok': function () {
                        $(this).dialog('close');
                    }
                }
            });
        }
    });

    return true;
}

function sendShowRequest(isContact) {
    var form = $('#showingForm');

    if (isContact) {
        if ($(form).find('input[name="name"]').val() === '') {
            alert("Please enter your contact name.");
            return false;
        }
        var radio = $(form).find('input[name="preferredContact"]:checked');
        if (!radio.length) {
            alert('You must select your preferred method of contact');
            return false;
        } else {
            if ($(form).find('input[name="preferredContact"]:checked').val() === 'E-Mail') {
                if ($(form).find('input[name="email"]').val() === '') {
                    alert("Please enter your email address.");
                    return false;
                } else {
                    var regex = /^([a-zA-Z0-9_\.\-\+])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                    if (!regex.test($(form).find('input[name="email"]').val())) {
                        alert("Please enter a valid email address.");
                        return false;
                    }
                }
            } else if ($(form).find('input[name="preferredContact"]:checked').val() === 'Phone') {
                if ($(form).find('input[name="showingPhone"]').val() === '') {
                    alert("Please enter your phone number with area code.");
                    return false;
                }
            }
        }

        if ($(form).find('#showDate').val() === '') {
            alert("Please enter the preferred date you would like to schedule.");
            return false;
        }

        if ($(form).find('select[name="showTime"]').val() === '') {
            alert("Please enter the preferred time you would like to schedule.");
            return false;
        }
    } else {
        if ($(form).find('#name').val() === '') {
            alert("Please enter your contact name.");
            return false;
        }

        var radio = $(form).find('input[name="preferredContact"]:checked');

        if (!radio.length) {
            alert('You must select your preferred method of contact');
            return false;
        } else {
            if ($(form).find('input[name="preferredContact"]:checked').val() === 'E-Mail') {
                if ($(form).find('#email').val() === '') {
                    alert("Please enter your email address.");
                    return false;
                } else {
                    var regex = /^([a-zA-Z0-9_\.\-\+])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                    if (!regex.test($(form).find('#email').val())) {
                        alert("Please enter a valid email address.");
                        return false;
                    }
                }
            } else if ($(form).find('input[name="preferredContact"]:checked').val() === 'Phone') {
                if ($(form).find('#showingPhone').val() === '') {
                    alert("Please enter your phone number with area code.");
                    return false;
                }
            }
        }

        if ($(form).find('#showDate').val() === '') {
            alert("Please enter the preferred date you would like to schedule.");
            return false;
        }

        if ($(form).find('select[name="showTime"]').val() === '') {
            alert("Please enter the preferred time you would like to schedule.");
            return false;
        }
    }

    var data = (isContact) ? '&isContact=1' : '';
    var showing = '&scheduleShowing=1';
    var property;
    if (typeof (prop) === "undefined") {
        property = '&prop=';
    } else {
        property = '&prop=' + prop;
    }

    $.ajax({
        url: 'sendMail.php',
        type: 'POST',
        data: form.serialize() + data + showing + property,
        success: function (data) {
            $(showingResponse).html(data);
            $(showingResponse).dialog({
                modal: true,
                buttons: {
                    'Ok': function () {
                        $(this).dialog('close');
                    }
                }
            });
        }
    });

    return true;
}

function scheduleShowing(mls) {
    var showingDialog = $('#showing' + mls);
    showingDialog.dialog({
        title: 'Schedule a Showing',
        width: 700,
        modal: true,
        draggable: true,
        resizable: false,
        buttons: {
            "Send": function () {
                if (sendShowingRequest(false, mls)) {
                    $(this).dialog("close");
                }
            },
            "Cancel": function () {
                $(this).dialog("close");
            }
        },
        open: function () {
            var showDate = $('#showDate' + mls);
            if (showDate.length > 0) {
                showDate.datepicker({
                    buttonImage: '/' + acct + '/idx/images/calendar.png',
                    buttonImageOnly: true,
                    changeMonth: true,
                    changeYear: true,
                    showButtonPanel: true,
                    showOn: 'both',
                    dateFormat: 'mm/dd/yy',
                    buttonText: ''
                });
            }
        }
    });
    $("#ui-datepicker-div").css("z-index", "9999");
    if (windowHeight >= windowDefaultHeight) {
        showingDialog.dialog('option', 'position', { my: 'top', at: 'top', of: window });
    }
}

function ntrVirtualTours(mls) {
    var vtsPopup = $('<div id="vts" style="display:none"><div id="vtsContent" /></div>');

    jQuery.ajax({
        url: '/' + acct + '/idx/ntrVirtualTourLinks.php?mls=' + mls,
        success: function (data) {
            jQuery(vtsPopup).find('#vtsContent').html(data);
            vtsPopup.dialog({
                width: 300,
                height: windowHeight - 200,
                title: 'Virtual Tours',
                modal: true,
                draggable: true,
                resizable: false
            });

            if (windowHeight >= windowDefaultHeight) {
                vtsPopup.dialog('option', 'position', { my: 'top', at: 'top', of: window });
            }
        }
    });
}

var calcPopup;

function showCalc(price) {
    if (typeof calcPopup !== 'undefined') {
        calcPopup.dialog('destroy').remove();
    }
    var calc = $('#calc');
    if (calc.length == 0) {
        calcPopup = $('<div id="calc" style="display:none"><div id="calcContent" /></div>');
    } else {
        calcPopup = calc;
    }
    var priceStr;
    if (typeof (price) === 'undefined') {
        priceStr = '';
        price = 0;
    } else {
        priceStr = '&HomeValue=' + price;
    }

    jQuery.ajax({
        url: '/' + acct + '/calculators/mortgage-payment-calculator.php?idx',
        data: { HomeValue: price, Amount: (price * 0.9) },
        success: function (data) {
            jQuery(calcPopup).find('#calcContent').html(data);
            calcPopup.dialog({
                width: 620,
                height: windowHeight - 100,
                title: 'Mortgage Payment Calculator',
                modal: true,
                draggable: true,
                resizable: false
            });
            $('#btnCalculate').button();
            if (windowHeight >= windowDefaultHeight) {
                calcPopup.dialog('option', 'position', { my: 'top', at: 'top', of: window });
            }
        }
    });
}

function submitCalc() {
    $.ajax({
        url: '/' + acct + '/calculators/mortgage-payment-calculator.php?idx',
        type: 'post',
        data: $('#CalcForm').serialize(),
        success: function (data) {
            jQuery(calcPopup).html(data);
            $('#PDFEmail').val(0);
            $('#btnCalculate').button();
        }
    });
}

function printDetail(key, mls) {
    $('<div id="printDialog"><p>Do you want to print all photos on the display?</p></div>').dialog({
        title: 'Print Display',
        modal: true,
        width: 420,
        resizable: false,
        buttons: {
            'Print with all photos': function () {
                $(this).dialog('close');
                var uri = '/' + acct + '/idx/detail.php?key=' + key + '&mls=' + mls + '&print' + '&photos=default';
                window.open(uri, 'idxWindow', 'height=760,width=640');
            },
            'Print with a single main photo': function () {
                $(this).dialog('close');
                var uri = '/' + acct + '/idx/detail.php?key=' + key + '&mls=' + mls + '&print' + '&photos=single';
                window.open(uri, 'idxWindow', 'height=760,width=640');
            }
        }
    });
}

function addMarker(lat, lon, index, status) {
    var typeName = 'marker' + index,
        marker,
        clusterObj = window.InnoVia.Mapping.getClusterObject();

    markerNumber++;

    //HTML that generates the frame for the custom infobox
    var markerFrameHTML = '<div class="infoBox"><div class="mapInfoWindowContent"><div class="InfoWindow">{content}</div></div></div>';
    // // Create the info box for the pushpin
    marker = window.InnoVia.Mapping.createMarker({
        name: typeName,
        latitude: lat,
        longitude: lon,
        mls: index,
        status: status,
        index: markerNumber
    }, markerFrameHTML.replace('{content}', $('#infoBox' + index).html()));

    marker.addListener('click', highlightOneliner);
    clusterObj.addMarker(marker);
    pp[index] = marker;
}

function doSort() {
    var sortBy = $('#sortBy'),
        sortOrder = $(':selected', sortBy).data('order') || 'asc',
        selector = 'span[class="' + sortBy.val() + '"]',
        listings = $('.listing', '#display');

    if (typeof isNearby === 'undefined' || isNearby == 0) {
        listings.tsort(selector, { order: sortOrder });
    } else {
        //Sort all but first element (subject property)
        listings.slice(1).tsort(selector, { order: sortOrder });
    }

    numberPins();

    //Put Numbers next to the listings that coorespond to the pin numbers
    $('.listing .checkbox #indexNumber', '#display').each(function (index) {
        $(this).html(index + 1);
    });
}

function doSortWithAds() {
    var sortBy = $('#sortBy'),
        sortOrder = $(':selected', sortBy).data('order') || 'asc',
        selector = 'span[class="' + sortBy.val() + '"]';
    listings = $('.listing', '#display');

    if (typeof removeAds === 'function') {
        removeAds();
    }

    if (typeof isNearby === 'undefined' || isNearby == 0) {
        listings.tsort(selector, { order: sortOrder });
    } else {
        //Sort all but first element (subject property)
        listings.slice(1).tsort(selector, { order: sortOrder });
    }

    numberPins();

    //Put Numbers next to the listings that coorespond to the pin numbers
    $('.listing .checkbox #indexNumber', '#display').each(function (index) {
        $(this).html(index + 1);
    });
    if (typeof displayAds === 'function') {
        //displayAds();
    }
}

function numberPins() {
    var i = 1;

    $('.listing', '#display').each(function () {
        var mls = $(this).find('.mls').html();

        if ($(this).css('display') !== 'none') {
            var text = i.toString();
            var zIndex = 2000 - i;
            if (pp[mls]) {
                pp[mls].setOptions({
                    label: {
                        text: text,
                        color: 'white'
                    },
                    zIndex: zIndex,
                    visible: true
                });
            }
            i++;
        } else if (pp[mls]) {
            pp[mls].setOptions({ visible: false });
        }
    });
}

function updateIdxHeader(param) {
    var regroup = $('#regroup');
    var showAll = $('#showAll');
    var compare = $('#compare');

    var hiddenListings = 0;
    var visibleListings = 0;
    var listingsChecked = 0;
    $('.listing', '#idxOneliner').each(function () {
        if ($(this).css('display') != 'block') {
            hiddenListings++;
        } else {
            visibleListings++;
            if ($(this).find('[type="checkbox"]').prop('checked')) {
                listingsChecked++;
            }
        }
    });

    if (listingsChecked > 0) {
        regroup.show();
    } else {
        regroup.hide();
    }

    if (hiddenListings > 0) {
        showAll.show();
    } else {
        showAll.hide();
    }

    if (listingsChecked > 0) {
        compare.show();
    } else {
        compare.hide();
    }

    var matches = $('#matches', '#display');
    if (param && param > 0) {
        var cnt = visibleListings - 1;
        matches.html('Found ' + cnt + ' Matches');
    } else {
        matches.html('Found ' + visibleListings + ' Matches');
    }
}

function highlightMarker(index) {
    var map = window.InnoVia.Mapping.getMapObject(),
        marker = pp[index];

    if (typeof (marker) === 'undefined') {
        $('#mapAlertMessage').html('<h4>Listing ' + index + ' does not have a marker.</h4>');
        $('#divMapAlert').modal();
        return;
    }

    marker.setOptions({
        zIndex: 3000
    });
    map.setOptions({
        center: marker.getPosition(),
        zoom: 18
    })
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function () {
        marker.setAnimation(null);
    }, 750);
}

function highlightOneliner() {
    var idxOneliner = $('#idxOneliner');
    var scrollTop = idxOneliner.scrollTop();
    var index = this.id;
    index = index.substring(6);
    var oneliner = $('#Listing' + index);
    var pos = $(oneliner).position();
    var fixedBarHeight = 30;
    var top = Math.floor(scrollTop + pos.top) - fixedBarHeight;
    var speed = (top === scrollTop) ? 0 : 500;
    idxOneliner.animate({ scrollTop: top }, speed, function () {
        oneliner.effect('highlight', {}, 2000);
    });
}

function toggleHighlight(checkbox) {
    var listingDiv = $(checkbox).closest('.listing', '#display');
    if (checkbox.checked) {
        $(listingDiv).addClass('ui-state-highlight');
    } else {
        $(listingDiv).removeClass('ui-state-highlight');
    }

    updateIdxHeader();
}

function getListingData(mls) {
    /** @param {{openHouse: integer}} params */
    var params = parseQueryString(),
        custom = '';

    if (params.openHouse !== undefined && params.openHouse === '1') {
        custom = 'openHouse';
    }

    if (params.sold !== undefined && params.sold === '1') {
        custom = 'sold';
    }

    //removeAds();
    pp = [];
    ppLocations = [];
    $('#backToSearch').hide();
    window.InnoVia.Mapping.clearMarkers();
    (window.InnoVia.Mapping.getClusterObject()).clearMarkers();
    var isLink = (typeof (mls) === 'undefined') ? 0 : 1;
    $('#progress').show();
    $.ajax({
        url: '/' + acct + '/idx/search.php',
        type: 'post',
        data: $('#idxSearch').serialize() + '&isLink=' + isLink + '&custom=' + custom,
        success: function (response) {
            $('#idxOneliner').html(response);
            //Only get bounding location when there are results.
            if (response.search('NO LISTINGS') === -1) {
                window.InnoVia.Mapping.viewByBoundingLocations();
            }
            showDisplay = true;
            divHeightCalculation();
            //displayAds();
            $('#progress').hide();
        }
    });
}

/**
 * setUpperLimit
 *
 * @param lowerID ID of the lower limit
 * @param upperID ID of the upper limit
 * @param upperLimit Value of the upper limit
 */
function setUpperLimit(lowerID, upperID, upperLimit) {
    var lower = $('#' + lowerID);
    var upper = $('#' + upperID);
    if (lower.prop('selectedIndex') <= 0 ||
        typeof lower.prop('selectedIndex') === 'undefined') {
        upper.val('');
    } else {
        upper.val(upperLimit);
    }
}

function saveProspect() {
    var emailReg = /^([A-Za-z0-9_\-\.])+@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    $('#prospectInfo').dialog({
        title: 'Contact Me',
        modal: true,
        width: 500,
        height: windowHeight - 100,
        buttons: {
            'Send': function () {
                var validated = true;
                $('.error').remove();
                $('#prospectForm input#fname, #prospectForm input#lname, #prospectForm input#email').each(function () {
                    if ($(this).val() === '') {
                        $(this).after('&nbsp;&nbsp;<span class="error">This field is required</span>');
                        validated = false;
                    }
                });
                var emailaddressVal = $('#email').val();
                if (!emailReg.test(emailaddressVal)) {
                    $("#email").after('&nbsp;&nbsp;<span class="error">Enter a valid email address.</span>');
                    validated = false;
                }

                if (validated) {
                    $.ajax({
                        url: 'saveProspect.php',
                        type: 'post',
                        data: $('form#idxSearch, form#prospectForm').serialize(),
                        success: function () {
                            $('#prospectThankYou').dialog({
                                title: 'Thank you!',
                                modal: true,
                                width: 500,
                                buttons: {
                                    'Ok': function () {
                                        $(this).dialog('close');
                                    }
                                }
                            });
                        }
                    });

                    $(this).dialog('close');
                }
            },
            'Cancel': function () {
                $(this).dialog('close');
            }
        }
    });
}

$(function () {
    $('<button>')
        .attr('id', 'backToSearch')
        .html('Back to Search')
        .button({ icons: { primary: 'ui-icon-arrowthick-1-w' } })
        .hide()
        .appendTo('#idxHeader')
        .click(function () {
            getListingData();
        });
});

function displayRoute(origin, destination, service, display) {
    service.route({
        origin: origin,
        destination: destination,
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        optimizeWaypoints: true
    }, function (response, status) {
        if (status === 'OK') {
            display.setDirections(response);
        } else {
            alert('Could not display directions due to: ' + status);
        }
    });
}

function neighboring(key, mls) {
    //removeAds();
    pp = [];
    ppLocations = [];

    $.ajax({
        url: 'search.php',
        type: 'post',
        data: 'key=' + key + '&subjectMLS=' + mls,
        success: function (response) {
            detailsPopup.dialog('close');
            $("#idxOneliner").html(response);
            //Only get bounding location when there are results.
            if (response.search('NO LISTINGS') === -1) {
                window.InnoVia.Mapping.viewByBoundingLocations();
                //displayAds();
            }
            $('#backToSearch').show();
        }
    });
}

function drivingDirections(endingAddress, mls) {
    var origin = $('#ddOrigin');
    var destination = $('#ddDestination');
    destination.val(endingAddress);

    var dd = $('#drivingDirections');
    if (dd.length === 1) {
        dd.dialog({
            title: 'Driving Directions',
            modal: true,
            width: 600,
            buttons: {
                'Search': function () {
                    var newOrigin = origin.val();
                    var newDestination = destination.val();
                    var directions = $('#directions');
                    if (directions.length === 0) {
                        $('<div id="directions" style="display: none;">' +
                            '<div style="font-weight:bold;font-size:14pt;text-align:center;">Driving Directions</div>' +
                            '<br /><div id="myDiv" style="height: 350px; width: 820px;"></div><div' +
                            ' id="directionsPanel"></div></div>').dialog({
                                title: 'Driving Directions',
                                modal: true,
                                width: 875,
                                height: windowHeight - 30 - 60,
                                position: ['center', 'middle'],
                                buttons: {
                                    'Print': function () {
                                        var content = document.getElementById('directions').innerHTML;
                                        var win = window.open();
                                        win.document.write('<!DOCTYPE html><html><head><title>Print</title>');
                                        win.document.write(document.head.innerHTML);
                                        win.document.write('</head><body >');
                                        win.document.write(content);
                                        win.document.write('</body></html>');
                                        setTimeout(function () {
                                            win.print();
                                            win.close();
                                        }, 3000);
                                    },
                                    'Close': function () {
                                        $(this).dialog('close');
                                    }
                                }
                            });

                        var dd_map = new google.maps.Map(document.getElementById('myDiv'), {
                            streetViewControl: false
                        });

                        var directionsService = new google.maps.DirectionsService;
                        var directionsDisplay = new google.maps.DirectionsRenderer({
                            draggable: true,
                            map: dd_map,
                            panel: document.getElementById('directionsPanel')
                        });
                        displayRoute(newOrigin, newDestination, directionsService, directionsDisplay);
                    } else {
                        directions.dialog('open');

                        var dd_map = new google.maps.Map(document.getElementById('myDiv'), {
                            streetViewControl: false
                        });

                        var directionsService = new google.maps.DirectionsService;
                        var directionsDisplay = new google.maps.DirectionsRenderer({
                            draggable: true,
                            map: dd_map,
                            panel: document.getElementById('directionsPanel')
                        });
                        displayRoute(newOrigin, newDestination, directionsService, directionsDisplay);
                    }

                    $(this).dialog('close');
                }, 'Cancel': function () {
                    $(this).dialog('close');
                }
            }
        });
        if (windowHeight >= windowDefaultHeight) {
            dd.dialog('option', 'position', { my: 'top', at: 'top', of: window });
        }
    } else {
        dd.dialog('open');
    }
}

function toggleByID(id) {
    var img = '<img src="/' + acct + '/idx/css/images/icon_open_house.png" title="Open House Available" />';
    var startText = '<span>';
    var endText = 'Open House information</span>';
    var div = $('#div' + id);
    var tag = $('#tag' + id);
    if (div.css('display') === 'none') {
        tag.html(img + startText + 'Hide ' + endText);
    } else {
        tag.html(img + startText + 'Show ' + endText);
    }
    div.slideToggle(500);
}

var wsTimer;
var wsIdle = true;

function idxWSVis(type) {
    if (!wsIdle) {
        return;
    }
    wsIdle = false;
    $(document).unbind('ajaxStart');
    data = '';
    if (typeof (type) != 'undefined') {
        data = 'type=' + type;
    }

    $.ajax({
        type: 'POST',
        url: 'idxWSVis.php',
        data: data,
        success: function () {
            wsIdle = true;
        }
    });
    // $(document).ajaxStart(function () {
    //     $('#progress').show();
    // });

    wsTimer = setTimeout(function () {
        idxWSVis(type)
    }, 30000);
}

//Fix to make the datepicker TODAY button actually select the
//   date and populate it into the select box, then close

// save original function to call in our new one
if ($.datepicker) {
    var _gotoToday = $.datepicker._gotoToday;

    // make a new _gotoToday function that does the additional work
    $.datepicker._gotoToday = function (id) {
        _gotoToday.call(this, id);
        var target = $(id),
            inst = this._getInst(target[0]);

        // return the value when the person selects the TODAY button
        this._selectDate(id, this._formatDate(inst,
            inst.selectedDay, inst.drawMonth, inst.drawYear));
    };
}
