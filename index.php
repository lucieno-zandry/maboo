<?php
$BACKEND_REPOSITORY_NAME = "lucienozandry/maboo_backend_production";
$FRONTEND_REPOSITORY_NAME = "lucienozandry/maboo_frontend_production";
$WEBSOCKET_REPOSITORY_NAME = "lucienozandry/maboo_websocket";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $payload = json_decode(file_get_contents("php://input"));
    $output = $resultCode = null;

    switch ($payload->repository->repo_name) {

        case $BACKEND_REPOSITORY_NAME:
            exec("php backend.php", $output, $resultCode);
            break;

        case $FRONTEND_REPOSITORY_NAME:
            exec("php frontend.php", $output, $resultCode);
            break;

        case $WEBSOCKET_REPOSITORY_NAME:
            exec("php websocket.php", $output, $resultCode);
            break;

        default:
            break;
    }

    if ($resultCode !== 0) {
        http_response_code(500);
        echo "Failed to update container: " . implode("\n", $output);
    } else {
        echo "Container updated successfully.";
    }
} else {
    http_response_code(405);
    echo "Method Not Allowed";
}
