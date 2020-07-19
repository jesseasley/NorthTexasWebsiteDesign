<?php
  $headers = "From: " . $_POST["from_name"] . " <" . $_POST["from_email"] . "\r\n"; 
  $headers .= "MIME-Version: 1.0\nContent-type: text/html; charset=iso-8859-1\r\n";
//  $headers .= "BCC: a@a.com\r\n";
  $headers .= "BCC: jess@NorthTexasWebsiteDesign.com\r\n";  

	$body = "You've received an email from the web site.<br><br>" .
		"Name:       " . $_POST["name"] . "<br>" . 
		"Email:      " . $_POST["email"] . "<br>" . 
		"Phone:      " . $_POST["phone"] . "<br>" . 
		"Subject:    " . $_POST["subject"] . "<br>" . 
		"Message:	 " . $_POST["body"] . "<br>"; 
	$send_to = $_POST["to_name"] . " <" . $_POST["to_email"] . ">";
	//$send_to = "Jess Easley <a@a.com>";
	
	if ($_SERVER["SERVER_NAME"] == "localhost")
		echo "Can't send email using localhost.";
	else
		if (mail($send_to, "Email submitted to Website", $body, $headers))
		    if (mail($_POST["name"] . " <" . $_POST["email"] . ">", "Email submitted to Website", "Thank you for your email.<br><br>Someone will respond shortly.", $headers))
				echo "success";
			else
				echo "error";
		else
			echo "error";
?>
