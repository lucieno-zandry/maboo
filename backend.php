<?php

require "./executeTasks.php";

// Define the container and image names
$containerName = 'backend';
$imageName = 'lucienozandry/maboo_backend_production:latest';
$runCommand = "docker run --name $containerName -p 8000:80 -v /etc/docker/compose/laravel_storage:/var/www/html/storage -v /etc/docker/compose/laravel_env.env:/var/www/html/.env -d $imageName";
$runCommand2 = "docker exec $containerName php artisan queue:work";

executeTasks($imageName, $containerName, [$runCommand, $runCommand2]);

exec("docker exec -it backend bash && php artisan queue:work", $output, $resultCode);