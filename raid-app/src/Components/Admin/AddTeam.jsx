
import React from 'react';
import { Breadcrumb, BreadcrumbItem, Collapse, Button, CardBody, Card, InputGroup, InputGroupAddon, Input } from 'reactstrap';

export default class AddTeam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false
        };
    }

    toggle = () => {
        this.setState({
            collapse: !this.state.collapse
        });
    }
    render() {
        return (
            <div>
                <h1>Nom de l'équipe</h1>

                <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Ajouter un participant</Button>
                <Collapse isOpen={this.state.collapse}>
                    <Card>
                        <CardBody>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">Prenom, Nom</InputGroupAddon>
                                <Input placeholder="username" />
                            </InputGroup>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">Email</InputGroupAddon>
                                <Input placeholder="username" />
                            </InputGroup>
                            <Button>Ajouter</Button>
                        </CardBody>
                    </Card>
                </Collapse>

                <Breadcrumb>
                    <BreadcrumbItem active>Jean-Pierre</BreadcrumbItem>
                    <Button close />
                </Breadcrumb>

                <Breadcrumb>
                    <BreadcrumbItem active>Maryvonne</BreadcrumbItem>
                    <Button close />
                </Breadcrumb>

                <Breadcrumb>
                    <BreadcrumbItem active>Claire-Andrée</BreadcrumbItem>
                    <Button close />
                </Breadcrumb>

                <Card body>
                    <Button>Enregistrer les modifications</Button>
                </Card>
            </div>

        );
    }
}