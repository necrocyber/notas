import React, { Component } from 'react'

class Body extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="card col-6 offset-md-3 custom-top">
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
                                    <input type="password" className="form-control form-control-sm" id="inputPassword"/>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div className="footer">
                                    <button type="submit" className="btn btn-primary btn-sm">Guardar</button>
                                    <button type="submit" className="btn btn-success btn-sm">Editar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Body