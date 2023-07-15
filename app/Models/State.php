<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class State extends Model
{
    use HasFactory;

    protected $fillable = [
        'state_id',
        'state_name',
    ];

    protected $table = 'states';
    protected $casts = [ 
        'state_id' => 'integer', 
        
        //'branch_id' => 'integer',
    ];
    protected $primaryKey = 'state_id';
    // protected $dates = [
    //     'created_at',
    //     'updated_at',
    // ];

 public function lga(){
    return $this->hasMany(LocalGovernment::class, 'state_id', 'state_id');
 }
}
