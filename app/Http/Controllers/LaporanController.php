<?php

namespace App\Http\Controllers;
use \App\Models\Presensi;
use \App\Models\Pegawai;

use Illuminate\Http\Request;

class LaporanController extends Controller
{
    public function index(){
        $presensi = new Presensi;
        $hasil = $presensi->read_full();
        return $hasil->toJson();
    }

    private function hitungTotal($year, $month, $ignore) {
        $count = 0;
        $counter = mktime(0, 0, 0, $month, 1, $year);
        $cek = [];
        while (date("n", $counter) == $month) {
            array_push($cek,date("w", $counter));
            if (in_array(date("w", $counter), $ignore) == false) {
                
                $count++;
            }
            $counter = strtotime("+1 day", $counter);
        }
        // if($cek[count($cek)-1] < 6){
        //     $cek[count($cek)] = $cek[count($cek)-1]+1;
        //     if($cek[count($cek)-1] == 6){
        //         $count++;    
        //     }
        // } else {
        //     $cek[count($cek)] = 0;
        //     $count++;
        // }
        return $count;
    }

    public function getLaporan($year,$month){
        $presensi = new Presensi();
        $pegawai = new Pegawai();
        $semua_pegawai = $pegawai->read_full();
        $semua_pegawai = json_decode(json_encode($semua_pegawai),true);
        $total = $this->hitungTotal($year,$month,array(0,6));
        $result = [];
        foreach($semua_pegawai as $data){
            $hadir = $presensi->hadir($year,$month,$data['id_pegawai']);
            $izin = $presensi->izin($year,$month,$data['id_pegawai']);
            $sakit = $presensi->sakit($year,$month,$data['id_pegawai']);
            array_push($result,array(
                'nip' => $data['nip'],
                'nama_pegawai' => $data['nama_pegawai'],
                'nama_fungsional' => $data['nama_fungsional'],
                'nama_struktural' => $data['nama_struktural'],
                'hadir' => $hadir,
                'izin' => $izin,
                'sakit' => $sakit,
                'alpa' => $total - $hadir - $izin - $sakit,
                'total' => $total
            ));
        }
        if(!empty($result)){
            $msg = [
                'success' => true,
                'message' => 'Data ditemukan',
                'hasil' => $result
            ];
            return response()->json($msg);
        } else {
            $msg = [
                'success' => false,
                'message' => 'Tidak ada data'
            ];
            return response()->json($msg);
        }
    }
}
