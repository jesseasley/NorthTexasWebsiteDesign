$(document).ready(function () {
    //if there's a hash on the url, switch to that active menu item in the config xml instead of the default
    if (location.hash > "") {
        $m = $config.find("info[active='yes']");
        $m.attr("active", "");
        $m = $config.find("info[hash='" + location.hash + "']");
        $m.attr("active", "yes");
    }
    siteLevelSettings();
    loadMenus();
});
function siteLevelSettings() {
    $m = $config.find("site");
    if ($m.attr("logo") > "")
        $("#logo").html("<center><img src='" + $m.attr("logo") + "' height='50px' /></center>");
    if ($m.attr("title") > "")
        document.title = $m.attr("title");
    if ($m.attr("header_background") > "")
        $("#header").css("background-color", $m.attr("header_background"));
    if ($m.attr("page_background") > "") {
        $("#page").css("background-color", $m.attr("page_background"));
        document.body.style.backgroundColor = $m.attr("page_background");
    }
    if ($m.attr("favicon") > "")
        $("#favicon").attr("href", $m.attr("favicon"));
    socialMediaSettings($m);
}
function socialMediaSettings($m) {
    if ($m.attr("facebook") > "")
        $("#facebook").html("<a href='" + $m.attr("facebook") +
            "' title='Facebook' target='_empty'><img src='images/facebook.gif' width=15px></a>");
    if ($m.attr("twitter") > "")
        $("#twitter").html("<a href='" + $m.attr("twitter") +
            "' title='Twitter' target='_empty'><img src='images/twitter.gif' width=15px></a>");
    if ($m.attr("blog") > "")
        $("#blog").html("<a href='" + $m.attr("blog") +
            "' title='Blogger' target='_empty'><img src='images/blog.gif' width=15px></a>");
    if ($m.attr("linkedin") > "")
        $("#linkedin").html("<a href='" + $m.attr("linkedin") +
            "' title='LinkedIn' target='_empty'><img src='images/linkedin.gif' width=25px></a>");

    if ($m.attr("youtube") > "")
        $("#youtube").html("<a href='" + $m.attr("youtube") +
            "' title='YouTube' target='_empty'><img src='images/youtube.gif' width=25px></a>");
    if ($m.attr("instagram") > "")
        $("#instagram").html("<a href='" + $m.attr("instagram") +
            "' title='Instagram' target='_empty'><img src='images/instagram.gif' width=20px></a>");
    if ($m.attr("pinterest") > "")
        $("#pinterest").html("<a href='" + $m.attr("pinterest") +
            "' title='Pinterest' target='_empty'><img src='images/pinterest.gif' width=20px></a>");
    if ($m.attr("tumblr") > "")
        $("#tumblr").html("<a href='" + $m.attr("tumblr") +
            "' title='Tumblr' target='_empty'><img src='images/tumblr.gif' width=20px></a>");
    if ($m.attr("flickr") > "")
        $("#flickr").html("<a href='" + $m.attr("flickr") +
            "' title='Flickr' target='_empty'><img src='images/flickr.gif' width=20px></a>");
    if ($m.attr("googleplus") > "")
        $("#googleplus").html("<a href='" + $m.attr("googleplus") +
            "' title='Google+' target='_empty'><img src='images/googleplus.gif' width=20px></a>");
    if ($m.attr("snapchat") > "")
        $("#snapchat").html("<a href='" + $m.attr("snapchat") +
            "' title='Snapchat' target='_empty'><img src='images/snapchat.gif' width=20px></a>");
}
function loadMenus() {
    phoneMenu = "<div class=\"icon-bar\">";

    //create the menus based on the config
    menuHTML = "<nav class=\"navbar navbar-default\" role=\"navigation\">";
    menuHTML += "<div class=\"container-fluid\">";
    menuHTML += "<ul class=\"nav navbar-nav\">";
    $config.find("info").each(
        function (j, f) {
            menuHTML += "<li id=\"" + $(f).attr("name") + "\"";
            phoneMenu += "<a style=\"max-width:30px;\" id=\"phone" + $(f).attr("name") + "\"";
            if (($(f).attr("active") == "yes") || (location.hash.indexOf($(f).attr("hash")) > -1)){
                menuHTML += "class=\"active \"";
                phoneMenu += "class=\"active\" ";
                //load the page for the active menu item
                loadForm($(f).attr("page"));
            }
            phoneMenu += "href=\"" + $(f).attr("hash") + "\"";
            phoneMenu += " onclick=\"loadForm('" + $(f).attr("page") + "');\"";
            phoneMenu += "><i class=\"fa " + $(f).attr("mobile_icon") + "\"></i></a>";
            menuHTML += "><a href=\"" + $(f).attr("hash") + "\"";
            menuHTML += " onclick=\"loadForm('" + $(f).attr("page") + "');\">";
            menuHTML += "<i class=\"fa fa-fw " + $(f).attr("mobile_icon") + "\"></i> <label>" + $(f).attr("name") + "</label>";
            menuHTML += "</a>";
            menuHTML += "</li>";
        });
    menuHTML += "</ul></div></nav>";
    phoneMenu += "</div>";
    if (window.innerWidth < 750)
        $("#menus").html(phoneMenu);
    else
        $("#menus").html(menuHTML);
}
function loadForm(formName) {
    //switch the active flag on the config xml from the currently active item to the new selected item
    $m = $config.find("info[active='yes']");
    $m.attr("active", "");
    $m = $config.find("info[page='" + formName + "']");
    $m.attr("active", "yes");

    //switch the active class on the menu from the currently active item to the new selected item
    $("li[class='active']").removeClass("active");
    $("li[id='" + $m.attr("name") + "']").addClass("active");
    $("a[class='active']").removeClass("active");
    $("li[id='" + $m.attr("name") + "']").addClass("active");
    $("a[id='phone" + $m.attr("name") + "']").addClass("active");

    //load the selected page 
    $.ajax({
        type: "GET",
        url: formName,
        success: function (data) {
            $("#page").html(data);
            if (formName == "pages/contact.php")
                $("#thankspage").hide();
        }
    });
}
function sendMail() {
    if (validateFields()) {
        $.ajax({
            type: "POST",
            async: false,
            url: "pages/email.php",
            data: "name=" + $("#nameText").val() +
                "&email=" + $("#emailText").val() +
                "&phone=" + $("#phoneText").val() +
                "&subject=" + $("#subjectText").val() +
                "&body=" + $("#bodyTextArea").val() +
                "&from_name=" + $config.find("email").attr("from_name") +
                "&from_email=" + $config.find("email").attr("from_email") +
                "&to_name=" + $config.find("email").attr("to_name") +
                "&to_email=" + $config.find("email").attr("to_email"),
            success: function (data) {
                //alert(data);
                $("#contactuspage").hide();
                $("#thankspage").show();
                if (data == "success")
                    $("#emailResults").html("Thanks for contacting us.<br /><br />Someone will respond to your request shortly.");
                else if (data == "error")
                    $("#emailResults").html("Something went wrong and we were unable to send your mail.<br /><br />Please try again later.");
                else
                    $("#emailResults").html(data);
            },
            error: function (j, err) {
                msg("error on sendMail: " + j.status);
            }
        }).fail(function () {
            msg("AJAX Call failed on sendMail");
        });
    }
}
function validateFields() {
    var requiredMissing = "";
    var validEmail = "";
    var vmsg = "";
    if ($("#nameText").val() == "") {
        requiredMissing = "Name";
    }
    if ($("#emailText").val() == "") {
        if (requiredMissing == "") {
            requiredMissing = "Email";
        }
        else {
            requiredMissing += ", Email";
        }

    }
    if ($("#phoneText").val() == "") {
        if (requiredMissing == "") {
            requiredMissing = "Phone";
        }
        else {
            requiredMissing += " and Phone";
        }
    }
    if (requiredMissing != "")
        vmsg = "Missing required fields: " + requiredMissing;
    if (!(isEmail($("#emailText").val()))) {
        validEmail = "Please check the format of the email address.";
        vmsg += "<br>" + validEmail;
    }
    if (vmsg == "") {
        return true;
    }
    else {
        msg(vmsg);
        return false;
    }
}
function isEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}
function msg(msg) {
    $("#systemMessageModal").modal("show");
    $("#systemMessage").html(msg);
    $("#systemMessageCloseButton").focus();
}
function validateField(field, prefix) {
    if ($("#" + field).val() == "") {
        $("#div" + prefix + field).removeClass("has-success");
        $("#div" + prefix + field).removeClass("has-error");
        $("#div" + prefix + field).addClass("has-error");
    }
    else {
        $("#div" + prefix + field).removeClass("has-error");
        $("#div" + prefix + field).removeClass("has-success");
        $("#div" + prefix + field).addClass("has-success");
    }
    if ((prefix == "Contact") && (field == "emailText")) {
        if (!(isEmail($("#emailText").val()))) {
            $("#divContactemailText").removeClass("has-success");
            $("#divContactemailText").removeClass("has-error");
            $("#divContactemailText").addClass("has-error");
        }
    }
}
