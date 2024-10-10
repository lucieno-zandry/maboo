<?php

function executeTasks($imageName, $containerName, $runCommands)
{
    // Pull the new image
    exec("docker pull $imageName", $output, $resultCode);
    if ($resultCode !== 0) {
        die("Failed to pull the new image: " . implode("\n", $output));
    }

    // Stop the running container
    exec("docker stop $containerName", $output, $resultCode);
    if ($resultCode !== 0) {
        die("Failed to stop the container: " . implode("\n", $output));
    }

    // Remove the stopped container
    exec("docker rm $containerName", $output, $resultCode);
    if ($resultCode !== 0) {
        die("Failed to remove the container: " . implode("\n", $output));
    }

    // Run the new image
    if (is_array($runCommands)) {
        foreach ($runCommands as $runCommand) {
            exec($runCommand, $output, $resultCode);
        }
    } else {
        exec($runCommands, $output, $resultCode);
    }

    if ($resultCode !== 0) {
        die("Failed to run the new image: " . implode("\n", $output));
    }

    echo "Container updated successfully.";
}