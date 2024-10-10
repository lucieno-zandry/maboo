<?php
use Core\Dispatcher;
use Ratchet\Http\HttpServer;
use Ratchet\Server\IoServer;
use Ratchet\WebSocket\WsServer;

    require __DIR__ . DIRECTORY_SEPARATOR . 'vendor' . DIRECTORY_SEPARATOR . 'autoload.php';

    $server = IoServer::factory(
        new HttpServer(
            new WsServer(
                new Dispatcher()
            )
        ),
        9000
    );
    $server->run();