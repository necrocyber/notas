import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
//import { MDBDataTable } from 'mdbreact'

class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notas : [],
            query : '',
            error : false,
            title : '',
            content : '',
            id : ''
        }

        // Tener control del scope??
        this.handlerInputContent = this.handlerInputContent.bind(this)
        this.handlerInputTitle = this.handlerInputTitle.bind(this)
        this.handlerSubmit = this.handlerSubmit.bind(this)
        this.deleteInput = this.deleteInput.bind(this)
        this.editInput = this.editInput.bind(this)
        this.handlerEdit = this.handlerEdit.bind(this)
    }

    componentDidMount() {
        fetch('http://localhost:3000/api/posts')
        .then((response) => {
            return response.json()
        })
        .then((result) => {
            this.setState({ notas : result.posts });
        })
    }

    handlerInputTitle(evt) {
        this.setState({
            title : evt.target.value
        }) 
    }

    handlerInputContent(evt) {
        this.setState({
            content : evt.target.value
        })
    }

    handlerSubmit() {
        fetch('http://localhost:3000/api/posts', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: this.state.title,
                content: this.state.content,
            })
        }).then((response) => {
            return response.json()
        }).then((result) => {
            document.getElementById('titulo').value = '';
            document.getElementById('contenido').value = '';
            this.setState({
                notas : [...this.state.notas, result.post]
            })
        }) 
    }

    editInput(evt) {
        console.log(evt);
        this.setState({
            title : evt.title,
            content : evt.content,
            id : evt._id
        })
        document.getElementById('titulo').value = evt.title
        document.getElementById('contenido').value = evt.content
    }

    handlerEdit() {
        
        if(document.getElementById('titulo').value === '') {
            alert('Debes seleccionar una nota para editarla')
            return false;
        }
        fetch('http://localhost:3000/api/posts', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this.state.id,
                title: this.state.title,
                content: this.state.content 
            })
        }).then((response) => {
            return response.json()
        }).then((result) => {
            document.getElementById('titulo').value = ''
            document.getElementById('contenido').value = ''
            let notas = [...this.state.notas];  
            let index = notas.findIndex((item) => {  
                return item._id === result.post._id  
            });
            console.log(index);
            notas[index].title = this.state.title
            notas[index].content = this.state.content                   
            this.setState({ notas }); 
        })
    }



    deleteInput(evt) {
        fetch('http://localhost:3000/api/posts', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: evt._id
            })
        }).then((response) => {
            return response.text()
        }).then((result) => {
            /* 
            Aqui como en el resto de peticiones se pueden agregar validaciones que dependen
            de la respuesta del servidor
            */
            this.setState({
                notas : this.state.notas.filter((nota) => {  return nota._id !== evt._id  })
            })
        })
    }

    render() {
        const textAlign = { textAlign: 'center' }
        const icon = { cursor: 'pointer' }
        const notas = this.state.notas.map((entry) => {
            return (
                <tr>
                    <td>{ entry.title }</td>
                    <td>{ entry.content }</td>
                    <td style={textAlign}><FontAwesomeIcon onClick={this.editInput.bind(this, entry)} style={icon} color="green" icon={faEdit} /></td>
                    <td style={textAlign}><FontAwesomeIcon onClick={this.deleteInput.bind(this, entry)} style={icon} color="red" icon={faTrash} /></td>
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
                                        <input type="text" onChange={this.handlerInputTitle} className="form-control form-control-sm" id="titulo"/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">Contenido</label>
                                    <div className="col-sm-8">
                                        <textarea onChange={this.handlerInputContent} id="contenido" className="form-control"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="footer">
                                    <button onClick={this.handlerSubmit} type="submit" className="btn btn-primary btn-sm">Guardar</button>
                                    <button onClick={this.handlerEdit} type="submit" className="btn btn-success btn-sm">Editar</button>
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
                                        <th></th>
                                        <th></th>
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