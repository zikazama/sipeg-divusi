import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class PresensiShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            presensi: {}
        };
    }

    componentDidMount() {
        const presensiId = this.props.match.params.id_presensi;

        axios.get(`/api/presensi/${presensiId}`).then(response => {
            this.setState({
                presensi: response.data[0]
            });
        });
    }

    render() {
        const { presensi } = this.state;

        return (
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">
                                NIP : {presensi.nip}
                            </div>
                            <div className="card-body">
                                <h6>Nama Pegawai : {presensi.nama_pegawai}</h6>
                                <h6>Tanggal : {presensi.tanggal}</h6>
                                <h6>Presensi : {presensi.jenis_presensi}</h6>
                                <h6>Keterangan : {presensi.keterangan}</h6>
                                <Link className="btn btn-primary" to={`/presensi`}>
                                    Kembali
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PresensiShow;
