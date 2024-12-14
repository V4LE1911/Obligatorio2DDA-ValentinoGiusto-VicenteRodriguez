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

const VideoJuegos = (props) => {
    const [listaVideoJuegos, setListaVideoJuegos] = useState(props.listaVideoJuegos || []);
    const [videoJuego, setVideoJuego] = useState(null);
    const [error, setError] = useState("");
    const [msg, setMsg] = useState(null);
    const [success, setSuccess] = useState(null);

    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");
    const [imagen, setImagen] = useState("");
    const [cantCopias, setCantCopias] = useState("");
    const [categoria, setCategoria] = useState("");

    const [stockFiltro, setStockFiltro] = useState("");


    const fillForm = (idVideoJuego) => {
        fetchs.getVideoJuego(idVideoJuego)
            .then(data => {
                setVideoJuego(data);
                setDescripcion(data.descripcion);
                setPrecio(data.precio);
                setImagen(data.imagen);
                setCantCopias(data.cantCopias);
                setCategoria(data.categoria);
            })
            .catch(error => {
                setError('Error al obtener el videojuego: ' + error);
            });
    };

    useEffect(() => {
        fetchs.listVideoJuegos(setListaVideoJuegos);
    }, []);

    const listaFiltrada = stockFiltro 
        ? listaVideoJuegos.filter(vj => vj.cantCopias < stockFiltro) 
        : listaVideoJuegos;

    return (
        <div className='VideoJuegos' style={{ marginTop: "5%" }}>
            <Container>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control value={descripcion} onChange={(e) => setDescripcion(e.target.value)} type="text" placeholder="Descripción del videojuego" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Precio</Form.Label>
                                <Form.Control value={precio} onChange={(e) => setPrecio(e.target.value)} type="number" placeholder="Precio en USD" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Imagen (URL)</Form.Label>
                                <Form.Control value={imagen} onChange={(e) => setImagen(e.target.value)} type="text" placeholder="URL de la imagen" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Cantidad de Copias</Form.Label>
                                <Form.Control value={cantCopias} onChange={(e) => setCantCopias(e.target.value)} type="number" placeholder="Cantidad disponible" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Categoría</Form.Label>
                                <Form.Control value={categoria} onChange={(e) => setCategoria(e.target.value)} type="text" placeholder="Categoría del videojuego" />
                            </Form.Group>
                            <h1 style={{ marginTop: '30px', fontSize: '20px', color: 'red' }}>
                                {error !== "" ? error : null}
                            </h1>

                            <Button
                                variant="primary"
                                type="button"
                                onClick={() => {
                                    setError("");
                                    if (videoJuego) {
                                        fetchs.updateVideoJuego(
                                            videoJuego.id,
                                            descripcion,
                                            precio,
                                            imagen,
                                            cantCopias,
                                            categoria,
                                            setListaVideoJuegos,
                                            setError
                                        );
                                    } else {
                                        fetchs.createVideoJuego(
                                            descripcion,
                                            precio,
                                            imagen,
                                            cantCopias,
                                            categoria,
                                            setListaVideoJuegos,
                                            setError
                                        );
                                    }
                                }}
                                style={{ marginTop: '2.5%', width: '30%', marginLeft: '33.33%' }}
                            >
                                Aceptar
                            </Button>

                        </Form>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Filtrar por cantidad de copias</Form.Label>
                            <Form.Control 
                                value={stockFiltro} 
                                onChange={(e) => setStockFiltro(e.target.value)} 
                                type="number" 
                                placeholder="Cantidad de copias" 
                            />
                        </Form.Group>

                        <Table striped bordered hover style={{ marginTop: '2.5%' }}>
                            <thead>
                                <tr>
                                    <th>Descripción</th>
                                    <th>Precio</th>
                                    <th>Imagen</th>
                                    <th>Cantidad</th>
                                    <th>Categoría</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaFiltrada.map((vj) => (
                                    <tr key={vj.id}>
                                        <td>{vj.descripcion}</td>
                                        <td>{vj.precio}</td>
                                        <td>
                                            <img src={vj.imagen} alt={vj.descripcion} style={{ width: '50px' }} />
                                        </td>
                                        <td>{vj.cantCopias}</td>
                                        <td>{vj.categoria}</td>
                                        <td>
                                            <ButtonGroup size="sm">
                                                <Button variant='danger' onClick={() => fetchs.deleteVideoJuego(vj.id, setListaVideoJuegos)}>Eliminar</Button>
                                                <Button onClick={() => fillForm(vj.id)}>Modificar</Button>
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

export default VideoJuegos;
