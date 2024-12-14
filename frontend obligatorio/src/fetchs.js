
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
        console.log('Data:', data);
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
}


const updateVideoJuego = (idVideoJuego, descripcion, precio, imagen, cantCopias, categoria, setListaVideoJuegos, setError) => {
    fetch('http://localhost:5000/videoJuego', {
        method: 'PUT',
        body: JSON.stringify({
            id: idVideoJuego,
            descripcion: descripcion,
            precio: precio,
            imagen: imagen,
            cantCopias: cantCopias,
            categoria: categoria
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(errMessage => {
                throw new Error(errMessage || 'Error inesperado');
            });
        }
        return response.json();
    })
    .then(data => {
        setListaVideoJuegos(prevLista => 
            prevLista.map(vj => vj.id === idVideoJuego ? data : vj)
        );
        console.log('Videojuego actualizado:', data);
    })
    .catch(error => {
        setError(error.message)
    });
};


const getVideoJuego = (idVideoJuego) => {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:5000/videoJuego/' + idVideoJuego, {
            method: 'GET',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            resolve(data);
        })
        .catch(error => {
            reject(error);
        });
    });
}
const createCompra = (usuarioId, videojuegosIds, fechaCompra, total, setListaCompras, setError) => {
    
    
    const bodyData = {
        usuario: { id: parseInt(usuarioId) }, 
        videojuegos: videojuegosIds.map(id => ({ id: parseInt(id) })), 
        fechaCompra,
        total: parseFloat(total)
    };

    return fetch(`http://localhost:5000/compra`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData)
        
    })
    .then(response => {
        
        if (!response.ok) {
            return response.text().then(errMessage => {
                throw new Error(errMessage || 'Error inesperado');
            });
        }
        return response.json();
    })
    .then(data => {
        setListaCompras(prev => [...prev, data]);
    })
    .catch(error => {
        setError(error.message)
    });
};



const deleteVideoJuego = (idVideoJuego, setListaVideoJuegos) => {
    fetch('http://localhost:5000/videoJuego/' + idVideoJuego, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.text();
    })
    .then(data => {
        setListaVideoJuegos(prevLista => prevLista.filter(vj => vj.id !== idVideoJuego)); 
        console.log('Data:', data);
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
    
}
const listUsuarios = (setLista) => {
    fetch('http://localhost:5000/usuario')
      .then(response => response.json())
      .then(data => setLista(data))
      .catch(error => console.error('Error al listar usuarios:', error));
  };
  
  const getUsuario = (idUsuario) => {
    return fetch(`http://localhost:5000/usuario/${idUsuario}`)
      .then(response => response.json())
      .catch(error => console.error('Error al obtener usuario:', error));
  };
  
  // Crear un usuario
  const createUsuario = (tipoUsuario, nombre, correo, registro, inicioMembresia, setListaUsuarios, setError) => {
    return fetch('http://localhost:5000/usuario', {
      method: 'POST',
      body: JSON.stringify({
        tipoUsuario, nombre, correo, registro, inicioMembresia
      }),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(errMessage => {
                throw new Error(errMessage || 'Error inesperado');
            });
        }
        return response.json();
        
    })
      .then(data => setListaUsuarios(prev => [...prev, data]))
      .catch(error => {
        setError(error.message)});
  };
  const createVideoJuego = (descripcion, precio, imagen, cantCopias, categoria, setListaVideoJuegos, setError) => {
    fetch('http://localhost:5000/videoJuego', {
        method: 'POST',
        body: JSON.stringify({
            descripcion: descripcion,
            precio: precio,
            imagen: imagen,
            cantCopias: cantCopias,
            categoria: categoria
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(errMessage => {
                throw new Error(errMessage || 'Error inesperado');
            });
        }
        return response.json();
        
    })
    .then(data => {
        setListaVideoJuegos(prevLista => [...prevLista, data]); 
    })
    .catch(error => {
        setError(error.message)
    });
}
  // Actualizar un usuario
  const updateUsuario = (idUsuario, tipoUsuario, nombre, correo, registro, inicioMembresia, setListaUsuarios, setError) => {
    console.log(idUsuario)
    return fetch(`http://localhost:5000/usuario/${idUsuario}`, {
      method: 'PUT',
      body: JSON.stringify({
        tipoUsuario, nombre, correo, registro, inicioMembresia
      }),
      headers: { 'Content-Type': 'application/json' },
    }).then(response => {
        if (!response.ok) {
            return response.text().then(errMessage => {
                throw new Error(errMessage || 'Error inesperado');
            });
        }
        return response.json();
        
    })
      .then(() => listUsuarios(setListaUsuarios)) 
      .catch(error => {
        setError(error.message)})
  };
  
  // Eliminar un usuario
  const deleteUsuario = (idUsuario, setListaUsuarios) => {
    return fetch(`http://localhost:5000/usuario/${idUsuario}`, {
      method: 'DELETE',
    })
      .then(() => setListaUsuarios(prev => prev.filter(u => u.id !== idUsuario)))
      .catch(error => console.error('Error al eliminar usuario:', error));
  };
   const getCompras = () => {
    return fetch(`http://localhost:5000/compra`)
        .then(response => {
            if (!response.ok) throw new Error("Error al obtener las compras");
            return response.json();
        });
};

 const getCompra = (idCompra) => {
    return fetch(`http://localhost:5000/compra/${idCompra}`)
        .then(response => {
            if (!response.ok) throw new Error("Error al obtener la compra");
            return response.json();
        });
};





 const updateCompra = (id, usuario, videojuegos, fechaCompra, total, setListaCompras) => {
    return fetch(`http://localhost:5000/compra}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, videojuegos, fechaCompra, total })
    })
        .then(response => {
            if (!response.ok) throw new Error("Error al actualizar la compra");
            return response.json();
        })
        .then(data => {
            setListaCompras(prev => prev.map(compra => (compra.id === id ? data : compra)));
        });
};

 const deleteCompra = (id, setListaCompras) => {
    return fetch(`http://localhost:5000/compra/${id}`, { method: "DELETE" })
        .then(response => {
            if (!response.ok) throw new Error("Error al eliminar la compra");
            setListaCompras(prev => prev.filter(compra => compra.id !== id));
        });
};







export default {getCompra, createCompra, getCompras, updateVideoJuego, updateCompra, deleteCompra, listUsuarios, getUsuario, createUsuario, updateUsuario, deleteUsuario ,listVideoJuegos, getVideoJuego, createVideoJuego, deleteVideoJuego};