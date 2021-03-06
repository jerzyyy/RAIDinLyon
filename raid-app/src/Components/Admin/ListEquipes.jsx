import React from 'react';
import './ListEquipes.css'
import { BrowserRouter, NavLink } from 'react-router-dom';
import { Modal, ModalBody, ModalFooter, Breadcrumb, Card, Button, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import axios from 'axios';
import trash from './trash.jpg'

import "react-toggle-component/styles.css"

export default class ListEquipes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            equipe: [],
            actualisation: false,
            modal: false,
            idequipe: null,
            index: null
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/equipes/')
            .then(response => {

                this.setState({
                    equipe: response.data

                })
            })
            .catch(error => {
                throw (error);
            });
    }

    EquipeList = () => {
        return this.state.equipe.map((equipe, i) => {
            return (
                <BrowserRouter>
                    <Breadcrumb>
                        <ListGroup>
                            <NavLink to={`/Admin/equipe/${equipe._id}`} onClick={this.forceUpdate} className="navlink">
                                <ListGroupItem active>
                                    <ListGroupItemHeading>{equipe.nom}</ListGroupItemHeading>
                                    <ListGroupItemText>
                                    </ListGroupItemText>
                                </ListGroupItem>
                            </NavLink>
                            <img src={trash} onClick={() => this.willDelete(equipe._id, i)} className="trash" />
                        </ListGroup>
                    </Breadcrumb>
                </BrowserRouter>
            )
        })

    }

    // Fonctions qui gèrent l'ouverture de la modale de sureté //
    willDelete = (equipeid, index) => {
        this.setState({
            modal: !this.state.modal,
            idequipe: equipeid,
            index: index
        })
    }

    // Modale de sureté //
    deleteValidation = () => {
        const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={this.toggle}>&times;</button>;
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} external={externalCloseBtn}>
                    <ModalBody>
                        <p>Êtes-vous sûr de vouloir supprimer définitivement cette équipe ?</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.Delete(this.state.idequipe, this.state.index)}>Confirmer</Button>{' '}
                        <Button color="secondary" onClick={() => this.setState({ modal: !this.state.modal })}>Annuler</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }

    Delete = (equipeid, index) => {
        axios.delete(`http://localhost:5000/api/equipes/${equipeid}`)
            .then(response => {
                console.log(response)
                if (response.status === 200) {
                    const tab = this.state.equipe.slice()
                    delete tab[index]
                    this.setState({
                        equipe: tab,
                        modal: !this.state.modal
                    })
                    console.log(this.state.equipe)
                }
            })
    }

    addTeam = e => {
        e.preventDefault()
        window.location.href = 'AddTeam';
    }

    render() {
        return (
            <div>
                <h1 className="titre"> Liste des Equipes </h1>
                {this.EquipeList()}
                {this.deleteValidation()}
                <Card body>
                    <NavLink to='AddEquipes' onClick={this.forceUpdate}>
                        <Button onClick={this.addTeam}> Nouvelle Equipe </Button>
                        <NavLink to="/Admin/SessionPage"><Button>Retour</Button></NavLink>
                    </NavLink>
                </Card>
            </div>
        );
    }
}