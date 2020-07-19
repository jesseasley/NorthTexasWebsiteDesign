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

$sql = "insert into NTWebDes_Users (username, password, email, account, ts) values ('test user','','','','')";

if ($conn->query($sql) === TRUE) {
    echo "test user inserted<br>";
} else {
    echo "Error inserting test user: " . $conn->error . "<br>";
}

$sql = "update NTWebDes_Users set password = 'test password' where username = 'test user'";

if ($conn->query($sql) === TRUE) {
    echo "password updated<br>";
} else {
    echo "Error updating password: " . $conn->error . "<br>";
}

$sql = "delete from NTWebDes_Users where username = 'test user'";

if ($conn->query($sql) === TRUE) {
    echo "test user deleted<br>";
} else {
    echo "Error deleting test user: " . $conn->error . "<br>";
}

$conn->close();
?>
</body>
</html>
