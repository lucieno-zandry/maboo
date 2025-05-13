<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'order',
        'article_id'
    ];

    public function article()
    {
        return $this->belongsTo(Article::class);
    }

    public function subsections()
    {
        return $this->hasMany(Subsection::class);
    }
}
