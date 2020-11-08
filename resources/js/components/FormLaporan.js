import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
import MonthYearPicker from 'react-month-year-picker';

class FormLaporan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            month: new Date().getMonth()+1,
            year: new Date().getFullYear(),
            alert: null,
            errors: []
        };
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleCreateNewPresensi = this.handleCreateNewLaporan.bind(this);
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
                Data Berhasil Ditemukan
            </SweetAlert>
        );
        this.setState({
            alert: getAlert()
        });
    }

    onSuccess() {
        this.props.history.push(
            `/laporan/cek/${this.state.year}/${this.state.month}`
        );
    }

    hideAlert() {
        this.setState({
            alert: null
        });
    }

    formatDate(date) {
        var d = new Date(date),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-");
    }

    handleCreateNewLaporan(event, year, month) {
        event.preventDefault();
        axios.get(`/api/laporan/${year}/${month}`).then(response => {
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
                            <div className="card-header">Form Laporan</div>
                            <div className="card-body">
                                <form onSubmit={event => this.handleCreateNewLaporan(event, this.state.year, this.state.month)}>
                                    <div className="form-group">
                                        <label htmlFor="tanggal">Tanggal</label>
                                        <MonthYearPicker
                                            selectedMonth={this.state.month}
                                            selectedYear={this.state.year}
                                            minYear={2000}
                                            maxYear={2030}
                                            onChangeYear={year =>
                                                this.setState({ year: year })
                                            }
                                            onChangeMonth={month =>
                                                this.setState({ month: month })
                                            }
                                        />
                                        <h3>
                                            Bulan yang dipilih: {this.state.month}
                                        </h3>
                                        <h3>
                                            Tahun yang dipilih: {this.state.year}
                                        </h3>
                                        {this.renderErrorFor("tanggal")}
                                    </div>
                                    <button className="btn btn-primary btn-block">
                                        Cek Laporan
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
export default FormLaporan;
