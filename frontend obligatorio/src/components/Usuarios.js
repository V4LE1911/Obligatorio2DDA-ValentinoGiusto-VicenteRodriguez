import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';

import { useEffect, useState } from 'react';

import fetchs from '../fetchs';

import 'bootstrap/dist/css/bootstrap.min.css';

const Usuarios = (props) => {
    const [listaUsuarios, setListaUsuarios] = useState(props.listaUsuarios || []);
    const [usuario, setUsuario] = useState(null);
    const [tipoUsuario, setTipoUsuario] = useState("regular");
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [inicioMembresia, setInicioMembresia] = useState("");
    const [registro, setRegistro] = useState(new Date().toISOString().split("T")[0]);
    const [filtroTipoUsuario, setFiltroTipoUsuario] = useState("todos");
    const [error, setError] = useState(""); 


    const fillForm = (idUsuario) => {
        fetchs.getUsuario(idUsuario)
            .then(data => {
                setUsuario(data);
                setTipoUsuario(data.tipoUsuario || "regular");
                setNombre(data.nombre);
                setCorreo(data.correo);
                setRegistro(data.registro);
                setInicioMembresia(data.inicioMembresia || "");
            })
            .catch(error => {
                setError('Error al obtener el usuario: ' + error);
            });
    };

    const clearForm = () => {
        setUsuario(null);
        setTipoUsuario("regular");
        setNombre("");
        setCorreo("");
        setRegistro(new Date().toISOString().split("T")[0]);
        setInicioMembresia("");
    };

    const handleSubmit = () => {
        setError("");
        if (usuario) {
            fetchs.updateUsuario(usuario.id, tipoUsuario, nombre, correo, registro, inicioMembresia, setListaUsuarios, setError)
                .then(() => clearForm());
        } else {
            fetchs.createUsuario(tipoUsuario, nombre, correo, registro, inicioMembresia, setListaUsuarios, setError)
                .then(() => clearForm());
        }
    };

    const usuariosFiltrados = listaUsuarios.filter((usuario) => {
        if (filtroTipoUsuario === 'todos') return true; 
        return usuario.tipoUsuario === filtroTipoUsuario;
    });

    return (
        <div className='Usuarios' style={{ marginTop: "5%" }}>
            <Container>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Tipo de Usuario</Form.Label>
                                <Form.Select value={tipoUsuario} onChange={(e) => setTipoUsuario(e.target.value)}>
                                    <option value="regular">Regular</option>
                                    <option value="premium">Premium</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control value={nombre} onChange={(e) => setNombre(e.target.value)} type="text" placeholder="Nombre" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Correo</Form.Label>
                                <Form.Control value={correo} onChange={(e) => setCorreo(e.target.value)} type="email" placeholder="Correo" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Fecha de Registro</Form.Label>
                                <Form.Control value={registro} onChange={(e) => setRegistro(e.target.value)} type="date" />
                            </Form.Group>
                            {tipoUsuario === "premium" && (
                                <Form.Group className="mb-3">
                                    <Form.Label>Inicio de Membresía</Form.Label>
                                    <Form.Control value={inicioMembresia} onChange={(e) => setInicioMembresia(e.target.value)} type="date" />
                                </Form.Group>
                            )}
                            <Button
                                variant="primary"
                                type="button"
                                onClick={handleSubmit}
                                style={{ marginTop: '2.5%', width: '30%', marginLeft: '33.33%' }}
                            >
                                {'aceptar'}
                            </Button>
                            <Button
                                variant="secondary"
                                type="button"
                                onClick={clearForm}
                                style={{ marginTop: '2.5%', width: '30%', marginLeft: '5%' }}
                            >
                                Limpiar
                            </Button>
                            <h1 style={{ marginTop: '30px', fontSize: '20px', color: 'red' }}>
                                {error !== "" ? error : null}
                            </h1>
                        </Form>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Filtrar Usuarios</Form.Label>
                            <Form.Select value={filtroTipoUsuario} onChange={(e) => setFiltroTipoUsuario(e.target.value)}>
                                <option value="todos">Todos</option> 
                                <option value="regular">Regulares</option>
                                <option value="premium">Premium</option>
                            </Form.Select>
                        </Form.Group>

                        <Table striped bordered hover style={{ marginTop: '2.5%' }}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Correo</th>
                                    <th>Tipo</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuariosFiltrados.map((usuario) => (
                                    <tr key={usuario.id}>
                                        <td>{usuario.id}</td>
                                        <td>{usuario.nombre}</td>
                                        <td>{usuario.correo}</td>
                                        <td>{usuario.tipoUsuario}</td>
                                        <td>
                                            <ButtonGroup size="sm">
                                                <Button variant='danger' onClick={() => fetchs.deleteUsuario(usuario.id, setListaUsuarios)}>Eliminar</Button>
                                                <Button style={{ backgroundColor: '#007BFF', color: 'white', border: 'none' }} onClick={() => fillForm(usuario.id)}>Modificar</Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Usuarios;

