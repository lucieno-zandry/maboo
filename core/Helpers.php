<?php

namespace Core;

class Helpers
{
    private static function path($connection): string
    {
        return $connection->httpRequest->getUri()->getPath();
    }

    private static function pathArray($connection): array
    {
        $path = self::path($connection);
        $array = explode('/', $path);

        if (isset($array[0]) && count($array) >= 2) {
            $array = array_slice($array, 2);
        }

        return $array;
    }

    public static function token($connection): ?string
    {
        $array = self::pathArray($connection);

        if (isset($array[2])) {
            return $array[2];
        }

        return null;
    }

    public static function network($connection): ?string
    {
        $prefix = '\\App';

        $array = self::pathArray($connection);

        if (isset($array[1])) {
            $class = ucfirst($array[1]);
            return "$prefix\\$class";
        }

        return null;
    }

    public static function side($connection): ?string
    {
        $array = self::pathArray($connection);

        if (isset($array[0]))
            return $array[0];

        return null;
    }
}