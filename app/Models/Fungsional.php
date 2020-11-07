<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fungsional extends Model
{
    use HasFactory;

    protected $table = "fungsional";
    protected $fillable = ['nama_fungsional'];
    protected $primaryKey = 'id_fungsional';
}
