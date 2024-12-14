import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const ListaCompras = () => {
    const [listaCompras, setListaCompras] = useState([]);
    const [filtroFecha, setFiltroFecha] = useState('');
    const [filtroCliente, setFiltroCliente] = useState('');
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/compra')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setListaCompras(data);
                const clientesList = [...new Set(data.map(compra => compra.usuario.nombre))];
                setClientes(clientesList);
            })
            .catch(error => {
                console.error('Fetch error:', error); 
            });
    }, []);

    const filtrarCompras = () => {
        let comprasFiltradas = listaCompras;

        if (filtroFecha) {
            comprasFiltradas = comprasFiltradas.filter(compra =>
                compra.fechaCompra === filtroFecha
            );
        }

        if (filtroCliente) {
            comprasFiltradas = comprasFiltradas.filter(compra =>
                compra.usuario.nombre === filtroCliente
            );
        }

        return comprasFiltradas;
    };

    return (
        <Container>
            <Row className="my-3">
                <Col md={4}>
                    <Form.Group controlId="filtroFecha">
                        <Form.Label>Filtrar por Fecha</Form.Label>
                        <Form.Control
                            type="date"
                            value={filtroFecha}
                            onChange={(e) => setFiltroFecha(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group controlId="filtroCliente">
                        <Form.Label>Filtrar por Cliente</Form.Label>
                        <Form.Control
                            as="select"
                            value={filtroCliente}
                            onChange={(e) => setFiltroCliente(e.target.value)}
                        >
                            <option value="">Seleccionar Cliente</option>
                            {clientes.map((cliente, index) => (
                                <option key={index} value={cliente}>
                                    {cliente}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Button
                        variant="primary"
                        onClick={() => {
                            setFiltroFecha('');
                            setFiltroCliente('');
                        }}
                        className="mt-4"
                    >
                        Limpiar Filtros
                    </Button>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Usuario</th>
                                <th>Videojuegos</th>
                                <th>Fecha de Compra</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtrarCompras().map((compra) => (
                                <tr key={compra.id}>
                                    <td>{compra.usuario.nombre}</td>
                                    <td>{compra.videojuegos.map(v => v.descripcion).join(', ')}</td>
                                    <td>{compra.fechaCompra}</td>
                                    <td>{compra.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default ListaCompras;
