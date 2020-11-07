import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";

class PresensiCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id_pegawai: "",
            jenis_presensi: "",
            keterangan: "",
            tanggal: "",
            alert: null,
            errors: []
        };
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleCreateNewPresensi = this.handleCreateNewPresensi.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
    }

    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
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
                confirmBtnText="Oke Siap"
            >
                Presensi Berhasil Ditambahkan
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

    handleCreateNewPresensi(event) {
        event.preventDefault();
        const presensi = {
            id_pegawai: this.state.id_pegawai,
            jenis_presensi: this.state.jenis_presensi,
            keterangan: this.state.keterangan,
            tanggal: this.state.tanggal,
        };
        axios.post("/api/presensi/store", presensi).then(response => {
            var msg = response.data.success;
            if (msg == true) {
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
                            <div className="card-header">Input Presensi</div>
                            <div className="card-body">
                                <form onSubmit={this.handleCreateNewPegawai}>
                                    
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
                                    <div className="form-group">
                                        <label htmlFor="id_fungsional">
                                            Fungsional
                                        </label>
                                        <select
                                            id="id_fungsional"
                                            className={`form-control ${
                                                this.hasErrorFor(
                                                    "id_fungsional"
                                                )
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            name="id_fungsional"
                                            value={this.state.id_fungsional}
                                            onChange={this.handleFieldChange}
                                            
                                        >
                                            <option value="DEFAULT">
                                                Pilih Fungsional
                                            </option>
                                            <option value="1">Engineer</option>
                                            <option value="2">
                                                Administrasi
                                            </option>
                                            <option value="3">Support</option>
                                        </select>
                                        {this.renderErrorFor("id_fungsional")}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="id_struktural">
                                            Struktural
                                        </label>
                                        <select
                                            id="id_struktural"
                                            className={`form-control ${
                                                this.hasErrorFor(
                                                    "id_struktural"
                                                )
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            name="id_struktural"
                                            value={this.state.id_struktural}
                                            onChange={this.handleFieldChange}
                                            
                                        >
                                            <option value="DEFAULT">
                                                Pilih Struktural
                                            </option>
                                            <option value="1">Manager</option>
                                            <option value="2">
                                                Team Leader
                                            </option>
                                            <option value="3">Staff</option>
                                        </select>
                                        {this.renderErrorFor("id_struktural")}
                                    </div>
                                    <Link
                                        className="btn btn-secondary"
                                        to={`/`}
                                    >
                                        Kembali
                                    </Link>
                                    <button className="btn btn-primary">
                                        Tambah
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
export default PresensiCreate;
