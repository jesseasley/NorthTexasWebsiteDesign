var config = "" +
"<root>" +
"    <menu>" +
"        <info name=\"Home\" page=\"pages/home.php\" active=\"yes\" hash=\"#home\" mobile_icon=\"fa-home\" />" +
"        <info name=\"Contact Us\" page=\"pages/contact.php\" active=\"\" hash=\"#contact\" mobile_icon=\"fa-envelope\" />" +
"    </menu>" +
"    <email from_name=\"Template Website\" from_email=\"template@NorthTexasWebsiteDesign.com\" " +
"           to_name=\"Jess Easley\" to_email=\"jess@NorthTexasWebsiteDesign.com\" />" +
"    <site " +
"           title=\"Template\" " +
"           logo=\"images/logo.jpg\" " +
"           favicon=\"images/favicon.ico\" " +
"           header_background=\"#01064C\" " +
"           header_background_image=\"#01064C\" " +
"           page_background=\"#147CA3\" " +
"           page_background_image=\"#147CA3\" " +

"           facebook=\"https://www.facebook.com\" " +
"           twitter=\"https://twitter.com\" " +
"           blog=\"https://www.blogger.com\" " +
"           linkedin=\"https://www.linkedin.com\" " +
//"           youtube=\"https://www.youtube.com\" " +
"           instagram=\"https://www.instagram.com\" " +
"           pinterest=\"https://www.pinterest.com\" " +
"           tumblr=\"https://www.tumblr.com\" " +
"           flickr=\"https://www.flickr.com\" " +
"           googleplus=\"https://plus.google.com\" " +
"           snapchat=\"https://www.snapchat.com\" " +
"    />" +
"</root>";
var $config = $($.parseXML(config));
