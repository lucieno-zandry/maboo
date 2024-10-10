<?php

require "./executeTasks.php";

$containerName = 'frontend';
$imageName = 'lucienozandry/maboo_frontend_production:latest';
$runCommand = "docker run --name $containerName -p 3000:80 -d $imageName";

executeTasks($imageName, $containerName, $runCommand);