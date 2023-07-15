<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnnoucedPUResult extends Model
{
    use HasFactory;

    protected $fillable = [
        'result_id',
        'polling_unit_uniqueid',
        'party_abbreviation',
        'party_score',
        'entered_by_user',
        'date_entered',
        'user_ip_address',
    ];

    protected $table = 'announced_pu_results';
    protected $casts = [ 
        'result_id' => 'integer', 
        
        //'branch_id' => 'integer',
    ];
    protected $primaryKey = 'result_id';
    // protected $dates = [
    //     'created_at',
    //     'updated_at',
    // ];

 public function polling_units(){
    return $this->belongsTo(PollingUnit::class, 'polling_unit_uniqueid', 'result_id');
 }

 
}
