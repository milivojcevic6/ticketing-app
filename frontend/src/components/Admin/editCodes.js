import React, {Component} from 'react';
import {Table} from "react-bootstrap";
import {MdEdit,MdDeleteForever} from 'react-icons/md';

export class EditCodes extends Component {
    state = {
        codes: []
    };

    async componentDidMount() {
        const response = await fetch('/api/codes');
        const body = await response.json();
        this.setState({codes: body});
    }

    render() {
        const {codes} = this.state;
        return (
            <div className="container">
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Code</th>
                        <th>Opis</th>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.codes.map((code) => (
                            <tr key={code.id}>
                                <td>{code.id}</td>
                                <td>{code.code}</td>
                                <td>{code.slo}</td>
                                <td>{code.eng}</td>
                                <td className="text-center"><a href={'/api/update/' + code.id}><MdEdit/></a></td>
                                <td className="text-center"><a href={'/api/delete/' + code.id}><MdDeleteForever/></a></td>
                            </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default EditCodes;