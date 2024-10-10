<?php

namespace Core;

use Ratchet\MessageComponentInterface;

class Dispatcher implements MessageComponentInterface
{
    protected $instances = [];

    public function onOpen($connection)
    {

        $network = Helpers::network($connection);

        if ($network && class_exists($network)) {
            if (empty($this->instances) || !isset($this->instances[$network])) {
                $this->instances[$network] = new $network;
            }

            $this->instances[$network]->onOpen($connection);
        }
    }

    public function onMessage(\Ratchet\ConnectionInterface $connection, $message)
    {
        $network = Helpers::network($connection);

        if ($network && isset($this->instances[$network])) {
            $this->instances[$network]->onMessage($connection, $message);
        }
    }

    public function onError(\Ratchet\ConnectionInterface $connection, \Exception $e)
    {
        $network = Helpers::network($connection);

        if ($network && isset($this->instances[$network])) {
            $this->instances[$network]->onError($connection, $e);
        }
    }

    public function onClose($connection)
    {
        $network = Helpers::network($connection);

        if ($network && isset($this->instances[$network])) {
            $this->instances[$network]->onClose($connection);
        }
    }
}