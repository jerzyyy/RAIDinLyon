import React, { Component } from 'react';
import { Button, Alert, Input, FormGroup, Label, FormText } from 'reactstrap';
import Editable from 'react-x-editable';
import { NavLink } from 'react-router-dom';
import './UnEnigme.css';
const axios = require('axios');


export default class UnEnigme extends Component {
    constructor(props) {
        super(props);
        this.state = {
            button: "invisible",
            collapse: false,
            coordonnees: [],
            titre: null,
            enonce: null,
            question: null,
            nouvellerep: null,
            reponse: null,
            nouvelindice: null,
            indices: [],
            info: null,
            image: null,
            id: null
        }
        this.page = this.props.match.params._id;
        this.addResp = [];
        this.Clue1 = null;
        this.Clue2 = null;
        this.Clue3 = null;
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/api/enigmes/${this.page}`)
            .then(response => {
                console.log(response)
                this.setState({
                    id: response.data[0]._id,
                    titre: response.data[0].titre,
                    image: response.data[0].img,
                    enonce: response.data[0].enonce,
                    question: response.data[0].question,
                    indices: response.data[0].indices,
                    reponse: response.data[0].reponse,
                    coordonnees: response.data[0].coordonnee,
                    info: response.data[0].info
                })
            });
    }

    modifyImage = (e) => {
        this.setState({
            image: e.target.value,
            button: "visible"
        })
    }

    modifyTitle = (value) => {
        this.setState({
            titre: value,
            button: "visible"
        })
    }

    modifyAnnouncement = (value) => {
        this.setState({
            enonce: value,
            button: "visible"
        })
    }

    modifyQuestion = (value) => {
        this.setState({
            question: value,
            button: "visible"
        })
    }
    /* _________________________________
    MODIFICATION REPONSES
    _________________________________ */

    addResponse = (value) => {
        this.setState({
            responses: value,
            button: "visible"
        })
    }
    /* ________________________________
    MODIFICATION INDICES
    _________________________________ */

    add1Clue = (value) => {
        const indices = this.state.indices.slice()
        indices[0] = value
        this.setState({ indices: indices, button: "visible" })
    }
    add2Clue = (value) => {
        const indices = this.state.indices.slice()
        indices[1] = value
        this.setState({ indices: indices, button: "visible" })
    }
    add3Clue = (value) => {
        const indices = this.state.indices.slice()
        indices[2] = value
        this.setState({ indices: indices, button: "visible" })
    }

    /* ________________________________
    MODIFICATION LOCALISATION
    _________________________________ */

    modifyLat = (value) => {
        const newLat = this.state.coordonnees.slice()
        newLat[0] = value
        this.setState({ coordonnees: newLat, button: "visible" })
    }
    modifyLong = (value) => {
        const newLong = this.state.coordonnees.slice()
        newLong[1] = value
        this.setState({ coordonnees: newLong, button: "visible" })
    }
    modifyInfo = (value) => {
        this.setState({
            info: value,
            button: "visible"
        })
    }


    sendModifications = () => {
        axios.put(`http://localhost:5000/api/enigmes/${this.page}`,
            {
                titre: this.state.titre,
                question: this.state.question,
                enonce: this.state.enonce,
                indices: [this.state.indices[0], this.state.indices[1], this.state.indices[2]],
                info: this.state.info,
                coordonnee: [this.state.coordonnees[0], this.state.coordonnees[1]],
                img: this.state.image,
                reponse: this.state.reponse,
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    render() {
        return (
            <div>
                
                {this.state.titre ?
                    <div>
                        <Alert color="dark">
                        Id de l'énigme : {this.state.id}
                        </Alert>
                        <Alert color="dark">
                            Titre :
                            <Editable
                                name="username"
                                dataType="text"
                                value={this.state.titre}
                                validate={(value) => {
                                    if (!value) {
                                        return 'Required';
                                    }
                                    else {
                                        this.modifyTitle(value)
                                    }
                                }
                                }
                            />
                        </Alert>

                        <Alert color="dark">
                            Image utilisée (Ne fonctionne pas pour l'instant): <Editable
                                name="username"
                                dataType="image"
                                value={this.state.img}
                                validate={(value) => {
                                    if (!value) {
                                        return 'Required';
                                    }
                                    else {
                                        this.modifyImage(value)
                                    }
                                }
                                }
                            />
                        </Alert>
                        <Alert color="dark">
                            Énoncé : <Editable
                                name="username"
                                dataType="textarea"
                                value={this.state.enonce}
                                validate={(value) => {
                                    if (!value) {
                                        return 'Required';
                                    }
                                    else {
                                        this.modifyAnnouncement(value)
                                    }
                                }
                                }
                            />

                        </Alert>
                        <Alert color="dark">
                            Question : <Editable
                                name="username"
                                dataType="textarea"
                                value={this.state.question}
                                validate={(value) => {
                                    if (!value) {
                                        return 'Required';
                                    }
                                    else {
                                        this.modifyQuestion(value)
                                    }
                                }
                                }
                            />
                        </Alert>
                        <Alert color="dark">
                            Indices :
                        <Editable
                                name="username"
                                dataType="text"
                                value={this.state.indices[0]}
                                validate={(value) => {
                                    if (!value) {
                                        return 'Required';
                                    }
                                    else {
                                        this.add1Clue(value)
                                    }
                                }
                                }
                            />
                            <Editable
                                name="username"
                                dataType="text"
                                value={this.state.indices[1]}
                                validate={(value) => {
                                    if (!value) {
                                        return 'Required';
                                    }
                                    else {
                                        this.add2Clue(value)
                                    }
                                }
                                }
                            />
                            <Editable
                                name="username"
                                dataType="text"
                                value={this.state.indices[2]}
                                validate={(value) => {
                                    if (!value) {
                                        return 'Required';
                                    }
                                    else {
                                        this.add3Clue(value)
                                    }
                                }
                                }
                            />
                        </Alert>
                        <Alert color="dark">
                            Réponse :
                            <Editable
                                name="username"
                                dataType="text"
                                value={this.state.reponse}
                                validate={(value) => {
                                    if (!value) {
                                        return 'Required';
                                    }
                                    else {
                                        this.addResponse(value)
                                    }
                                }
                                }
                            />
                        </Alert>
                        <h3>Informations géographiques du lieu :</h3>
                        <Alert color="dark">
                            Lattitude : <Editable
                                name="username"
                                dataType="text"
                                value={this.state.coordonnees[0]}
                                validate={(value) => {
                                    if (!value) {
                                        return 'Required';
                                    }
                                    else {
                                        this.modifyLat(value)
                                    }
                                }
                                }
                            />
                            Longitude :
                            <Editable
                                name="username"
                                dataType="text"
                                value={this.state.coordonnees[1]}
                                validate={(value) => {
                                    if (!value) {
                                        return 'Required';
                                    }
                                    else {
                                        this.modifyLong(value)
                                    }
                                }
                                }
                            />
                        </Alert>
                        <Alert color="dark">
                            Précautions sur le lieu :
                            <Editable
                                name="username"
                                dataType="text"
                                value={this.state.info}
                                validate={(value) => {
                                    if (!value) {
                                        return 'Required';
                                    }
                                    else {
                                        this.modifyInfo(value)
                                    }
                                }
                                }
                            />
                        </Alert>
                    </div>
                    : null}
                <NavLink to='/Admin/ListEnigmes'>
                    <Button className={this.state.button} onClick={this.sendModifications}>Valider les modifications</Button>
                    <Button>Retour</Button>
                </NavLink>
            </div>
        );
    }
}


