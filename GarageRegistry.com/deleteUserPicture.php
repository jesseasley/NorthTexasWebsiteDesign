<?php
if ($_SERVER['SERVER_NAME'] == "localhost"){
  $servername = "DESKTOP-PSN6TIK";
  $username = "MyDB1138";
  $password = "HeTaretEC2u!";
  $dbname = "mydb1138";
}
else{
  $servername = "45.40.164.103";
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

//see if the image exists first
$sql = "select * from trackmuse_userimages where filename = '" . $_POST["filename"] . "'";
$res = $conn->query($sql);
if ($res->num_rows > 0) {

  // delete the image
  $sql = "delete from trackmuse_userimages where filename = '" . $_POST["filename"] . "'";

  if ($conn->query($sql) === TRUE) {
      echo "Successfully deleted " . $_POST["filename"] . "<br>";
  } else {
      echo "Error deleting " . $_POST["filename"] . ": " . $conn->error . "<br>";
  }
}
else
  echo $_POST["filename"] . " wasn't found";

$conn->close();
?>