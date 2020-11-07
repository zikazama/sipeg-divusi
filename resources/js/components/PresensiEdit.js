import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";

class PresensiEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nama_pegawai: "",
            jenis_presensi: "",
            keterangan: "",
            tanggal: "",
            alert: null,
            message: "",
            errors: []
        };
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleUpdatePresensi = this.handleUpdatePresensi.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
    }

    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    componentDidMount() {
        const presensiId = this.props.match.params.id_presensi;

        axios.get(`/api/presensi/edit/${presensiId}`).then(response => {
            this.setState({
                nama_pegawai: response.data[0].nama_pegawai,
                jenis_presensi: response.data[0].jenis_presensi,
                keterangan: response.data[0].keterangan,
                tanggal: response.data[0].tanggal,
            });
        });
    }

    goToHome() {
        const getAlert = () => (
            <SweetAlert
                success
                title="Success!"
                onConfirm={() => this.onSuccess()}
                onCancel={this.hideAlert()}
                timeout={2000}
                confirmBtnText="Oke"
            >
                {this.state.message}
            </SweetAlert>
        );
        this.setState({
            alert: getAlert()
        });
    }

    onSuccess() {
        this.props.history.push("/");
    }

    hideAlert() {
        this.setState({
            alert: null
        });
    }

    handleUpdatePresensi(event) {
        event.preventDefault();

        const presensi = {
            jenis_presensi: this.state.jenis_presensi,
            keterangan: this.state.keterangan,
            tanggal: this.state.tanggal,
        };

        const presensiId = this.props.match.params.id_presensi;

        axios.put(`/api/presensi/${presensiId}`, presensi).then(response => {
            // redirect to the homepage
            var msg = response.data.success;
            if (msg == true) {
                this.setState({
                    message: response.data.message
                });
                return this.goToHome();
            }
        });
    }

    hasErrorFor(field) {
        return !!this.state.errors[field];
    }

    renderErrorFor(field) {
        if (this.hasErrorFor(field)) {
            return (
                <span className="invalid-feedback">
                    <strong>{this.state.errors[field][0]}</strong>
                </span>
            );
        }
    }

    render() {
        return (
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                Edit Pegawai
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.handleUpdatePegawai}>
                                
                                    <div className="form-group">
                                        <label htmlFor="nama_pegawai">
                                            Nama Pegawai
                                        </label>
                                        <input
                                            id="nama_pegawai"
                                            type="text"
                                            className={`form-control ${
                                                this.hasErrorFor("nama_pegawai")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            name="nama_pegawai"
                                            value={this.state.nama_pegawai}
                                            onChange={this.handleFieldChange}
                                        />
                                        {this.renderErrorFor("nama_pegawai")}
                                    </div>
                                    
                                    <Link
                                        className="btn btn-secondary"
                                        to={`/`}
                                    >
                                        Kembali
                                    </Link>
                                    <button className="btn btn-primary">
                                        Perbarui
                                    </button>
                                    {this.state.alert}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default PresensiEdit;
