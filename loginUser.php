<?php
if ($_SERVER['SERVER_NAME'] == "localhost"){
    $servername = "DESKTOP-PSN6TIK";
    $username = "MyDB1138";
    $password = "HeTaretEC2u!";
    $dbname = "mydb1138";
}
else{
    //$servername = "45.40.164.103"; //old windows server
    $servername = "107.180.41.155"; //new cpanel server
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

// get the user

//built in protection from cross site scripting
$allowed_tags = "<div><img><h1><h2><p><br><string><em><ul><li>";
$username = strip_tags($_POST["username"], $allowed_tags);

$sql = "select * from NTWebDes_Users where username = '" . $_POST["username"] . "' and password  = '" . $_POST["password"] . "'";
$res = $conn->query($sql);
if ($res->num_rows > 0) {
  $row = $res->fetch_assoc();
  $sql = "select * from NTWebDes_Accounts where account = '" . $row["account"] . "'";
  $acct = $conn->query($sql);
  echo "{\"user\": {\"username\": \"" . $row["username"] . "\", \"account\": \"" . $row["account"];
  echo "\", \"password\": \"" . $row["password"] . "\", \"email\": \"" . $row["email"] . "\", \"ts\": \"";
  echo $row["ts"] . "\", \"bill\": \"";
  if ($acct->num_rows > 0) {
    $acctrow = $acct->fetch_assoc();
    echo $acctrow["bill"] . "\"";
  }
  else{
    echo "\"";
  }
  echo "}}";
} 
else{
  echo "{\"user\": {\"error\": \"Unable to login.  Invalid username or password\"}}";
}

$conn->close();
?>