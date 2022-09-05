router.get('/playlists/:nombre', (pedido, respuesta) => {
    let nombre = pedido.params.nombre
    let resultado = playlists.filter(x => x.nombre == nombre)
    if (resultado.length != 1) {
        respuesta.status(404).send(resultado)
        return
    }
    respuesta.send(resultado)
})

router.get('/playlists', (pedido, respuesta) => {
    respuesta.send(playlists)
})
router.post('/playlists', (pedido, respuesta) => {
    if (pedido.body.nombre != "") {
        playlists.push(pedido.body)
        respuesta.status(201).send(pedido.body)

    }
    else respuesta.status(400).send(pedido.body)
})

router.put('/playlists/:nombre', (pedido, respuesta) => {
    let nombre = pedido.params.nombre
    let playlist = playlists.filter(x => x.nombre == nombre).at(0)
    playlist.descripcion = pedido.body.descripcion
    respuesta.status(204).send(playlist)
    if (pedido.body.nombre != "") {
        playlists.push(pedido.body)
        respuesta.status(204).send(pedido.body)

    }
    else respuesta.status(404).send(pedido.body)
    respuesta.status(409).send(pedido.body)
})

router.delete('/playlists/:nombre', (pedido, respuesta) => {
    let nombre = pedido.params.nombre
    let playlistAEliminar = playlists.filter(x => x.nombre == nombre).at(0)
    if (playlistAEliminar == null)
        respuesta.status(404).send("no se encuentra la playlist")

    let indice = playlists.indexOf(playlistAEliminar)
    playlists.splice(indice, 1)
    respuesta.send("se elimino la playlist")
})

router.get('/playlists/:nombre/canciones', (pedido, respuesta) => {
    let nombre = pedido.params.nombre
    let playlist = playlists.filter(x => x.nombre == nombre).at(0)
    if (playlist == null)
        respuesta.status(404).send("No se encuentra la playlist")

    respuesta.send(playlist.canciones)
})
router.get('/playlists/:nombre/canciones/:titulo', (pedido, respuesta) => {
    let nombre = pedido.params.nombre
    let titulo = pedido.params.titulo

    let playlist = playlists.filter(x => x.nombre == nombre).at(0)

    if (playlist == null) {
        respuesta.status(404).send("No se encuentra la playlist")
        return
    }

    let cancion = playlist.canciones.filter(x => x.titulo == titulo).at(0)

    if (cancion == null) {
        respuesta.status(404).send("No se encuentra la cancion")
        return
    }

    respuesta.send(cancion)
})

router.post('/playlists/:nombre/canciones', (pedido, respuesta) => {
    let nombre = pedido.params.nombre

    let playlist = playlists.filter(x => x.nombre == nombre).at(0)

    if (playlist == null) {
        respuesta.status(404).send("No se encuentra la playlist")
        return
    }

    if (pedido.body.nombre != "") {
        playlist.canciones.push(pedido.body)
        respuesta.status(201).send(pedido.body)
    }
    else
        respuesta.status(400).send()
})

router.put('/playlists/:nombre/canciones/:titulo', (pedido, respuesta) => {
    let nombre = pedido.params.nombre
    let playlist = playlists.filter(x => x.nombre == nombre).at(0)

    if (playlist == null) {
        respuesta.status(404).send("No se encuentra la playlist")
        return
    }
    let titulo = pedido.params.titulo

    let cancion = playlist.canciones.filter(x => x.titulo == titulo).at(0)
    if (cancion == null) {
        respuesta.status(404).send("No se encuentra la cancion")
        return
    }
    cancion.artista = pedido.body.artista
    cancion.album = pedido.body.album
    cancion.año = pedido.body.año
    respuesta.send()
})
router.delete('/playlists/:nombre/canciones/:titulo', (pedido, respuesta) => {
    let nombre = pedido.params.nombre
    let titulo = pedido.params.titulo
    let playlist = playlists.filter(x => x.nombre == nombre).at(0)
    let cancionAEliminar = playlist.canciones.filter(x => x.titulo == titulo).at(0)
    if (cancionAEliminar == null)
        respuesta.status(404).send("no se encuentra la playlist")

    let indice = playlist.canciones.indexOf(cancionAEliminar)
    playlists.splice(indice, 1)
    respuesta.send("se elimino la cancion")
})