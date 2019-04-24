import React, { Component } from 'react'
//import { MDBDataTable } from 'mdbreact'

class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notas : [],
            query : '',
            error : false
        }
    }

    componentDidMount() {
        fetch('http://localhost:3000/api/posts')
        .then((response) => {
            return response.json()
        })
        .then((result) => {
            this.setState({ notas : result.posts });
            console.log(this.state.notas);
        })
    }
    render() {

        const notas = this.state.notas.map((entry) => {
            return (
                <tr>
                    <td>{ entry.title }</td>
                    <td>{ entry.content }</td>
                </tr>
            )
        })

        return (
            <div className="container">
                <div className="row">
                    <div className="col-5">
                        <div className="card custom-top">
                            <div className="card-body">
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">Título</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control form-control-sm" id="staticEmail"/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">Contenido</label>
                                    <div className="col-sm-8">
                                        <textarea className="form-control"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="footer">
                                    <button type="submit" className="btn btn-primary btn-sm">Guardar</button>
                                    <button type="submit" className="btn btn-success btn-sm">Editar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-7">
                        <div className="card custom-top">
                            <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">Título</th>
                                        <th scope="col">Contenido</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { notas }
                                </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}

export default Body