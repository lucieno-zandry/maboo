<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    const TYPE_ORDER = 'ORDER';
    const TYPE_SUBSCRIPTION = 'SUBSCRIPTION';
    const STATUS_SUCCESS = 'SUCCESS';
    const STATUS_FAILED = 'FAILED';
    const STATUS_CANCELLED = 'CANCELLED';
    const METHOD_ORANGEMONEY = 'ORANGEMONEY';

    protected $fillable = [
        'description',
        'transactionnable_id',
        'status',
        'method',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
