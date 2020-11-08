<?php
// src/Annotation/UserAware.php

namespace App\Annotation;

use Doctrine\Common\Annotations\Annotation;

/**
 * @Annotation
 * @Target("CLASS")
 */
final class UserAware
{
    public $userFieldName;
}