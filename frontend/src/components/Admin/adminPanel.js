import React, {Component} from 'react';

export class AdminPanel extends Component {
    render() {
        return (
            <div className="container-fluid">
                <table style={{height: 600, tableLayout: "fixed"}} className="container-fluid text-center">
                    <tbody>
                    <tr>
                        <td className="align-middle">
                            <button type="button"
                                    className="btn btn-secondary h-50 w-50" onClick={(e) => {
                                e.preventDefault();
                                window.location.href = '/admin/editCodes';
                            }}>Edit Codes
                            </button>
                        </td>
                        <td className="align-middle">
                            <button type="button"
                                    className="btn btn-secondary h-50 w-50">Modify Roles
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default AdminPanel;