<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://code.jquery.com/ui/1.11.1/jquery-ui.js"></script>
    <link rel="stylesheet" href="https://code.jquery.com/jquery-ui.css">
    <script src="https://code.jquery.com/jquery-1.10.2.js"></script>
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>
    <link rel="stylesheet" href="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css" />
</head>
<body>
<?php
    $headers = "From: North Texas Website Design <jess@northtexaswebsitedesign.com>\r\n"; 
    $headers .= "MIME-Version: 1.0\nContent-type: text/html; charset=iso-8859-1\r\n";
    $to = "jess.c.easley@gmail.com";
    if (mail($to, "test subject", "test body", $headers))
        echo "mail sent to " . $to . "<br>";
    else
        echo "mail failed<br>";
?>
</body>
</html>
