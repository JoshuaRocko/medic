import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PageLoading from "./PageLoading";
import { Redirect } from "react-router-dom";
import './styles/modal.css';

class VentanaModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: null,
            data: undefined
        }
    }

    componentDidMount() {
        fetch(`/info/${this.props.cabecera}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                this.setState({
                    data,
                    loading: false,
                    error: null,
                });
            });

    }

    render() {
        if (this.state.loading === true) {
            return <PageLoading />;
        }
        if (this.state.data.info === undefined) {
            return <Redirect to="/" />; {/* redireccionar a una página de error */ }
        }


        return (<Modal {...this.props} size='lg' aria-labelledby='miModal' centered>
            <Modal.Header closeButton className='modal-header'>
                <Modal.Title id='miModal'>
                    {this.props.cabecera.toUpperCase()} - <small>Esta es una guía informativa</small>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body scrollable="true">
                <div>
                    <blockquote>{this.state.data.info}</blockquote>
                    <div>
                        <h4>Usos más comúnes</h4>
                        <ul>
                            {this.state.data.usos
                                .filter((uso) => {
                                    return uso !== "\n";
                                })
                                .map((uso) => {
                                    return <li key={uso}>{uso.trim()}</li>;
                                })}
                        </ul>
                    </div>
                    <div>
                        <h4>Contradicciones y advertencias</h4>
                        <ul>
                            {this.state.data.contradicciones
                                .filter((uso) => {
                                    return uso !== "\n";
                                })
                                .map((uso) => {
                                    return <li key={uso}>{uso.trim()}</li>;
                                })}
                        </ul>
                        {console.log(this.state.data.contradicciones)}
                    </div>
                    <div>
                        <h4>Efectos Secundarios</h4>
                        <h5>Este medicamento podría provocar algunos efectos secundarios tales como:</h5>
                        <ul>
                            {this.state.data.ad
                                .filter((uso) => {
                                    return uso !== "\n";
                                })
                                .map((uso) => {
                                    return <li key={uso}>{uso.trim()}</li>;
                                })}
                        </ul>
                        {console.log(this.state.data.ad)}
                    </div>
                    <div>
                        <h6>
                            Para más información visita:
                        </h6>
                        <p><a href={'https://quefarmacia.com/medicamentos/' + this.props.cabecera}>https://quefarmacia.com/medicamentos/{this.props.cabecera}</a></p>
                        <center><blockquote>Consulta a tu médico siempre <br /> NO te automediques</blockquote></center>
                    </div>
                    </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='dark' onClick={this.props.onHide}>
                    Cerrar
                    </Button>
            </Modal.Footer>
        </Modal>);
    }
}
export default VentanaModal;