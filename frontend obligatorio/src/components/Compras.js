import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import fetchs from '../fetchs'; 

const Compras = (props) => {
    const [listaCompras, setListaCompras] = useState([]);
    const [compra, setCompra] = useState(null);
    const [usuario, setUsuario] = useState("");
    const [videojuego, setVideojuego] = useState([]); 
    const [videojuegos, setVideojuegos] = useState([]); 
    const [fechaCompra, setFechaCompra] = useState(new Date().toISOString().split("T")[0]);
    const [total, setTotal] = useState(0);
    const [error, setError] = useState(""); 

    useEffect(() => {
        listVideoJuegos(setVideojuegos);
    }, []);
    
    const listVideoJuegos = (setLista) => {
        fetch('http://localhost:5000/videoJuego')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setLista(data);
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    };
    
    const actualizarTotal = () => {
        if (usuario && videojuego.length > 0) {
            const juegosSeleccionados = videojuegos.filter(v => videojuego.includes(String(v.id)));
            const totalSinDescuento = juegosSeleccionados.reduce((acc, juego) => acc + juego.precio, 0);
    
            const usuarioSeleccionado = props.listaUsuarios.find(u => u.id === parseInt(usuario));
            const esPremium = usuarioSeleccionado?.tipoUsuario === 'premium';
    
            const totalConDescuento = esPremium ? totalSinDescuento * 0.8 : totalSinDescuento;
    
            setTotal(totalConDescuento.toFixed(2));
        }
    };

    useEffect(() => {
        actualizarTotal();
    }, [videojuego, usuario, videojuegos]);

    const fillForm = (idCompra) => {
        fetchs.getCompra(idCompra)
            .then(data => {
                setCompra(data);
                setUsuario(data.usuario.id);
                setVideojuego(data.videojuegos.map(v => v.id));
                setFechaCompra(data.fechaCompra);
                setTotal(data.total);
            })
            .catch(error => {
                setError('Error al obtener el videojuego: ' + error.message);
            });
    };

    const clearForm = () => {
        setCompra(null);
        setUsuario("");
        setVideojuego([]);
        setFechaCompra(new Date().toISOString().split("T")[0]);
        setTotal(0);
    };

    const handleSubmit = () => {
        setError(""); 
        if (compra) {
            fetchs.updateCompra(compra.id, usuario, videojuego, fechaCompra, total, setListaCompras, setError)
                .then(() => {
                    clearForm();
                })
                .catch((error) => {
                    setError('Error al actualizar la compra: ' + error.message);
                });
        } else {
            fetchs.createCompra(usuario, videojuego, fechaCompra, total, setListaCompras, setError)
                .then(() => {
                    clearForm();
                })
                .catch((error) => {
                    setError('Error al crear la compra: ' + error.message);
                });
        }
    };

    return (
        <Container>
            <Row>
                <Col>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Usuario</Form.Label>
                            <Form.Select value={usuario} onChange={(e) => setUsuario(e.target.value)}>
                                <option value="">Seleccione un Cliente</option>
                                {props.listaUsuarios.map((u) => (
                                    <option key={u.id} value={u.id}>
                                        {u.nombre} 
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Videojuegos</Form.Label>
                            <Form.Select 
                                multiple 
                                value={videojuego} 
                                onChange={(e) => setVideojuego(Array.from(e.target.selectedOptions, option => option.value))}
                            >
                                <option value="">Seleccione uno o más videojuegos</option>
                                {videojuegos.map((v) => (
                                    <option key={v.id} value={v.id}>
                                        {v.descripcion}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Fecha de Compra</Form.Label>
                            <Form.Control 
                                value={fechaCompra} 
                                onChange={(e) => setFechaCompra(e.target.value)} 
                                type="date" 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Total</Form.Label>
                            <Form.Control 
                                value={total} 
                                onChange={(e) => setTotal(parseFloat(e.target.value))} 
                                type="number" 
                                disabled 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <button type="button" onClick={handleSubmit}>
                                {compra ? 'Actualizar Compra' : 'Crear Compra'}
                            </button>
                            {error && (
                                <h1 style={{ marginTop: '30px', fontSize: '20px', color: 'red' }}>
                                    {error}
                                </h1>
                            )}
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Compras;

