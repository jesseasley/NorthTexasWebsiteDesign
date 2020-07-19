<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"
            integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
            crossorigin="anonymous"></script>    <link rel="stylesheet" href="https://code.jquery.com/jquery-ui.css">
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

// sql to create table
$sql = "CREATE TABLE NT_WebDes_Table_Test (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY
)";

if ($conn->query($sql) === TRUE) {
    echo "Table NT_WebDes_Table_Test created successfully<br>";
} else {
    echo "Error creating NT_WebDes_Table_Test table: " . $conn->error . "<br>";
}

// sql to create table
$sql = "drop TABLE NT_WebDes_Table_Test";

if ($conn->query($sql) === TRUE) {
    echo "Table NT_WebDes_Table_Test removed successfully<br>";
} else {
    echo "Error removing NT_WebDes_Table_Test table: " . $conn->error . "<br>";
}


$conn->close();
?>
</body>
</html>