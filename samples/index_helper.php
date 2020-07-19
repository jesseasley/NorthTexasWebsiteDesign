<?php
$files = scandir (".");
echo "({\"files\": [";
$skip_files = array (".", "..", "index.html", "index_helper.php", "drag_n_drop.css", "drag_n_drop.js", "file-upload");
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
