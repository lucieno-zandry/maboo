<?php

require "./executeTasks.php";

$containerName = 'websocket';
$imageName = 'lucienozandry/maboo_websocket:latest';
$runCommand = "docker run --name $containerName -p 9000:9000 -d $imageName";

executeTasks($imageName, $containerName, $runCommand);