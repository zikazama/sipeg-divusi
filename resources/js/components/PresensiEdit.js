import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class PresensiEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nama_pegawai: "",
            jenis_presensi: "",
            keterangan: "",
            tanggal: new Date(),
            opt_presensi: [
                { value: "hadir", label: "Hadir" },
                { value: "izin", label: "Izin" },
                { value: "sakit", label: "Sakit" }
            ],
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

    handleFieldPresensi(e){
        this.setState({jenis_presensi:e.value})
    }

    componentDidMount() {
        const presensiId = this.props.match.params.id_presensi;

        axios.get(`/api/presensi/edit/${presensiId}`).then(response => {
            this.setState({
                nama_pegawai: response.data[0].nama_pegawai,
                jenis_presensi: response.data[0].jenis_presensi,
                keterangan: response.data[0].keterangan ?? null,
                tanggal: new Date(response.data[0].tanggal),
            });
        });
    }

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
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
        this.props.history.push("/presensi/all");
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
            tanggal: this.formatDate(this.state.tanggal),
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
                                <form onSubmit={this.handleUpdatePresensi}>
                                
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
                                            readOnly
                                        />
                                        {this.renderErrorFor("nama_pegawai")}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="jenis_presensi">
                                            Presensi
                                        </label>
                                        <Select
                                            name="jenis_presensi"
                                            value={this.state.opt_presensi.filter(option => option.value === this.state.jenis_presensi)}
                                            onChange={this.handleFieldPresensi.bind(this)}
                                            options={this.state.opt_presensi}
                                        />
                                        {this.renderErrorFor("jenis_presensi")}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="keterangan">
                                            Keterangan
                                        </label>
                                        <textarea
                                            id="keterangan"
                                            className={`form-control ${
                                                this.hasErrorFor("keterangan")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            name="keterangan"
                                            value={this.state.keterangan}
                                            onChange={this.handleFieldChange}
                                        ></textarea>
                                        {this.renderErrorFor("keterangan")}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="tanggal">Tanggal</label>
                                        <br/>
                                        <DatePicker
                                            id="tanggal"
                                            name="tanggal"
                                            selected={this.state.tanggal}
                                            onChange={date =>
                                                this.setState({
                                                    tanggal: date
                                                })
                                            }
                                        />

                                        {this.renderErrorFor("tanggal")}
                                    </div>
                                    <Link
                                        className="btn btn-secondary"
                                        to={`/presensi/all`}
                                    >
                                        Kembali
                                    </Link>
                                    <button className="btn btn-primary float-right">
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
