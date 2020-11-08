<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Pegawai extends Model
{
    use HasFactory;

    protected $table = 'pegawai';
    protected $fillable = ['nip, nama_pegawai, id_fungsional, id_struktural'];
    protected $primaryKey = 'id_pegawai';

    public function read_full(){
        $query = DB::table($this->table)->join('fungsional','fungsional.id_fungsional','=','pegawai.id_fungsional')
                ->join('struktural','struktural.id_struktural','=','pegawai.id_struktural')
                ->get();
        return $query;
    }

    public function read_full_where($where){
        $query = DB::table($this->table)->join('fungsional','fungsional.id_fungsional','=','pegawai.id_fungsional')
                ->join('struktural','struktural.id_struktural','=','pegawai.id_struktural')
                ->where($where)
                ->get();
        return $query;
    }

    public function read_max_nip($where){
        $query = DB::table($this->table)
                ->where($where)
                ->orderByDesc('nip')
                ->first();
        return $query;
    }

    public function read_max_all(){
        $query = DB::table($this->table)
                ->get();
        return $query;
    }

    public function read_one_where($where){
        $query = DB::table($this->table)->join('fungsional','fungsional.id_fungsional','=','pegawai.id_fungsional')
                ->join('struktural','struktural.id_struktural','=','pegawai.id_struktural')
                ->where($where)
                ->first();
        return $query;
    }
}
