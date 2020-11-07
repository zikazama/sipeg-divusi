<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\Presensi;

class PresensiController extends Controller
{
    public function index(){
        $presensi = new Presensi;
        $hasil = $presensi->read_full();
        return $hasil->toJson();
    }

    public function store(Request $request){
        $validatedData = $request->validate([
            'id_pegawai' => 'required',
            'jenis_presensi' => 'required',
            'tanggal' => 'required',
          ]);

          $presensi = \App\Models\Presensi::create();
          $presensi->id_pegawai = $validatedData['id_pegawai'];
          $presensi->jenis_presensi = $validatedData['jenis_presensi'];
          $presensi->keterangan = $request->input('keterangan');
          $presensi->tanggal = $validatedData['tanggal'];
          $presensi->save();

          $msg = [
              'success' => true,
              'message' => 'Presensi created successfully!'
          ];
   
          return response()->json($msg);
    }

    public function getPresensi($id_presensi){
        $presensi = new Presensi();
        $hasil = $presensi->read_full_where([['id_presensi', '=' ,$id_presensi]]);
        return $hasil->toJson();
    }

    public function update(Request $request, $id_presensi)
    {
        $validatedData = $request->validate([
            'jenis_presensi' => 'required',
            'tanggal' => 'required'
          ]);
 
        $presensi = \App\Models\Presensi::find($id_presensi);
        $presensi->jenis_presensi = $validatedData['jenis_presensi'];
        $presensi->keterangan = $request->input('keterangan');
        $presensi->tanggal = $validatedData['tanggal'];
        $presensi->save();
 
        $msg = [
            'success' => true,
            'message' => 'Presensi updated successfully'
        ];
 
        return response()->json($msg);
    }
 
    public function delete($id_presensi)
    {
        $presensi = \App\Models\Presensi::find($id_presensi);
        if(!empty($presensi)){
            $presensi->delete();
            $msg = [
                'success' => true,
                'message' => 'Presensi deleted successfully!'
            ];
            return response()->json($msg);
        } else {
            $msg = [
                'success' => false,
                'message' => 'Presensi deleted failed!'
            ];
            return response()->json($msg);
        }
    }
}
