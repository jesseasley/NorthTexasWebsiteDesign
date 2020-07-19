<?php
$files = scandir (".");
echo "({\"files\": [";
$skip_files = array (".", "..", "index.html", "index_helper.php");
for ($i = 0; $i < count($files); $i++){
    if (!(in_array($files[$i], $skip_files))){
        echo "{\"name\": \"" . $files[$i] . "\"}";
        if ($i < count($files)-1)
            echo ", ";
    }
}
echo "]})";
?>

//({"files": [{"name": "InputWithStyle.html"}, {"name": "datepicker.html"}]})
