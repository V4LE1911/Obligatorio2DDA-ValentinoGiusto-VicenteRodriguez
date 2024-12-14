import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

import Videojuegos from './components/VideoJuegos';
import Usuarios from './components/Usuarios';
import Compras from './components/Compras';
import Filtros from './components/Filtros';

import fetchs from './fetchs';

function App() {
  const [showVideojuegosMenu, setShowVideojuegosMenu] = useState(false);
  const [showUsuariosMenu, setShowUsuariosMenu] = useState(false);
  const [showComprasMenu, setShowComprasMenu] = useState(false);
  const [showFiltrosMenu, setShowFiltrosMenu] = useState(false);

  const [listaVideojuegos, setListaVideojuegos] = useState([]);
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [listaCompras, setListaCompras] = useState([]);
  const [msg, setMsg] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleShowVideojuegosMenu = () => {
    setShowVideojuegosMenu(true);
    setShowUsuariosMenu(false);
    setShowComprasMenu(false);
    setShowFiltrosMenu(false);
  };

  const handleShowUsuariosMenu = () => {
    setShowVideojuegosMenu(false);
    setShowUsuariosMenu(true);
    setShowComprasMenu(false);
    setShowFiltrosMenu(false);
  };

  const handleShowComprasMenu = () => {
    setShowVideojuegosMenu(false);
    setShowUsuariosMenu(false);
    setShowComprasMenu(true);
    setShowFiltrosMenu(false);
  };

  const handleShowFiltrosMenu = () => {
    setShowVideojuegosMenu(false);
    setShowUsuariosMenu(false);
    setShowComprasMenu(false);
    setShowFiltrosMenu(true);
  };

  useEffect(() => {
    fetchs.listVideoJuegos(setListaVideojuegos);
    fetchs.listUsuarios(setListaUsuarios);
    fetchs.getCompras(setListaCompras);
  }, []);

  return (
    <div className="App">
      <Navbar bg="primary" data-bs-theme="dark" expand="sm">
        <Container>
          <Navbar.Brand href="#home">Tienda</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={handleShowVideojuegosMenu}>Videojuegos</Nav.Link>
            <Nav.Link onClick={handleShowUsuariosMenu}>Usuarios</Nav.Link>
            <Nav.Link onClick={handleShowComprasMenu}>Compras</Nav.Link>
            <Nav.Link onClick={handleShowFiltrosMenu}>Filtros</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {success ? (
        <Alert
          variant={"success"}
          style={{
            width: "30%",
            margin: 'auto',
            marginTop: '2.5%',
            textAlign: "center",
          }}
        >
          {msg}
        </Alert>
      ) : null}
      {success != null && !success ? (
        <Alert
          variant={"danger"}
          style={{
            width: "30%",
            margin: 'auto',
            marginTop: '2.5%',
            textAlign: "center",
          }}
        >
          {msg}
        </Alert>
      ) : null}

      {showVideojuegosMenu ? (
        <Videojuegos listaVideojuegos={listaVideojuegos} />
      ) : null}

      {showUsuariosMenu ? (
        <Usuarios listaUsuarios={listaUsuarios} />
      ) : null}

      {showComprasMenu ? (
        <Compras
          listaCompras={listaCompras}
          listaUsuarios={listaUsuarios}
          listaVideojuegos={listaVideojuegos}
        />
      ) : null}

      {showFiltrosMenu ? <Filtros /> : null}
    </div>
  );
}

export default App;
