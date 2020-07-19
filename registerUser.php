<?php
if ($_SERVER['SERVER_NAME'] == "localhost"){
    $servername = "DESKTOP-PSN6TIK";
    $username = "MyDB1138";
    $password = "HeTaretEC2u!";
    $dbname = "mydb1138";
}
else{
    $servername = "107.180.41.155";
    $username = "MyDB1138";
    $password = "HeTaretEC2u!";
    $dbname = "MyDB1138";
}

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

// get current time
date_default_timezone_set('America/Chicago');
$d = new DateTime();
$sd = $d->format('m-d-Y H:i:s');

$bill = "";
// get the user
$sql = "select * from NTWebDes_Users where username = '" . $_POST["username"] . "'";
$res = $conn->query($sql);
if ($res->num_rows > 0) {
  echo "{\"user\": {\"error\": \"Username '" . $_POST["username"] . "' already exists.\"}}";
}
else{
  $sql = "insert into NTWebDes_Users (username, password, email, account, ts) values ('" . $_POST["username"];
  $sql .= "', '" . $_POST["password"] . "', '" . $_POST["email"] . "', '" . $_POST["account"] . "', '" . $sd . "')";
  if ($conn->query($sql) === TRUE) {
    $sql = "select * from NTWebDes_Accounts where account = '" . $_POST["account"] . "'";
    $acct = $conn->query($sql);
    echo "{\"user\": {\"username\": \"" . $_POST["username"] . "\", \"account\": \"" . $_POST["account"];
    echo "\", \"password\": \"" . $_POST["password"] . "\", \"email\": \"" . $_POST["email"];
    echo "\", \"ts\": \"" . $sd . "\", ";
    echo "\"bill\": \"";
    if ($acct->num_rows > 0) {
        $acctrow = $acct->fetch_assoc();
        $bill = "account found. Bill = " . $acctrow["bill"];
        echo $acctrow["bill"] . "\"";
    }
    else{
        echo "\"";
        $bill = "account not found";
    }
    echo "}}";
  }
  else{
    echo "{\"user\": {\"error\": \"Unable to add '" . $_POST["username"] . "'.\"" . mysqli_error($conn) . "}}";
  }
} 

$headers = "From: North Texas Website Design <info@NorthTexasWebsiteDesign.com>\r\n"; 
$headers .= "MIME-Version: 1.0\nContent-type: text/html; charset=iso-8859-1\r\n";
$headers .= "BCC: jess@NorthTexasWebsiteDesign.com\r\n";  

$body = "Someone has registered on the web site.<br><br>";
$body .= "Username:        " . $_POST["username"] . "<br>";
$body .= "Account:         " . $_POST["account"] . "<br>"; 
$body .= "Account lookup:  " . $bill;

$send_to = "Jess Easley <jess@NorthTexasWebsiteDesign.com>";
	
if ($_SERVER["SERVER_NAME"] != "localhost")
	mail($send_to, "New registration on North Texas Website Design", $body, $headers);

$conn->close();

?>