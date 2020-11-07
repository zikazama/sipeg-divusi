import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class PegawaiShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pegawai: {}
        };
    }

    componentDidMount() {
        const pegawaiId = this.props.match.params.id_pegawai;

        axios.get(`/api/pegawai/${pegawaiId}`).then(response => {
            this.setState({
                pegawai: response.data[0]
            });
        });
    }

    render() {
        const { pegawai } = this.state;

        return (
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">
                                NIP : {pegawai.nip}
                            </div>
                            <div className="card-body">
                                <h6>Nama Pegawai : {pegawai.nama_pegawai}</h6>
                                <h6>Fungsional : {pegawai.nama_fungsional}</h6>
                                <h6>Struktural : {pegawai.nama_struktural}</h6>

                                <Link className="btn btn-primary" to={`/`}>
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

export default PegawaiShow;
