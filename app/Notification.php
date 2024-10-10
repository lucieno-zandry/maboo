<?php

namespace App;

use Core\Helpers;
use Ratchet\MessageComponentInterface;

class Notification implements MessageComponentInterface
{

    private $clientGroups = [];

    private function clientOnOpen($connection)
    {
        $token = Helpers::token($connection);

        if (!isset($this->clientGroups[$token])) {
            $this->clientGroups[$token] = new \SplObjectStorage;
        }

        $this->clientGroups[$token]->attach($connection);
    }

    private function clientOnClose($connection)
    {
        $token = Helpers::token($connection);
        $this->clientGroups[$token]->detach($connection);
    }

    public function onOpen($connection)
    {
        $token = Helpers::token($connection);

        if ($token) {
            $side = Helpers::side($connection);

            switch ($side) {
                case 'client':
                    $this->clientOnOpen($connection);
                    break;

                default:
                    break;
            }
        }
    }

    public function onMessage(\Ratchet\ConnectionInterface $connection, $message)
    {
        $side = Helpers::side($connection);

        switch ($side) {
            case 'server':
                $token = Helpers::token($connection);
                $clients = $this->clientGroups[$token];

                foreach ($clients as $client) {
                    $client->send($message);
                }

                break;

            default:
                break;
        }
    }

    public function onError(\Ratchet\ConnectionInterface $connection, \Exception $e)
    {
        $side = Helpers::side($connection);
    }

    public function onClose($connection)
    {
        $side = Helpers::side($connection);

        switch ($side) {
            case 'client':
                $this->clientOnClose($connection);
                break;

            default:
                break;
        }
    }
}