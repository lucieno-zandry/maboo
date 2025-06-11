<?php

namespace App\Models;

use App\Traits\WithPagination;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory, WithPagination;

    protected $fillable = [
        'url',
        'caption',
        'order',
        'article_id'
    ];

    public function article()
    {
        return $this->belongsTo(Article::class);
    }
}
