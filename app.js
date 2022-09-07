const express = require('express')
const app = express()
app.use(express.json())
const port = 4000

let playlists = [
    {
        "nombre": "coldplay",
        "descripcion": "es una banda británica de pop rock y rock alternativo formada en Londres en 1996",
        "canciones": [
            {
                "titulo": "Paradise",
                "artista": "Chris Martin, Jon Buckland, Guy Berryman y Will Champion.",
                "album": "Mylo Xyloto",
                "año": "2011"
            },
            {
                "titulo": "higher Power",
                "artista": "Chris Martin, Jon Buckland, Guy Berryman y Will Champion.",
                "album": "Music of the Spheres",
                "año": "2021"
            }]
    }
]
//nueva linea
app.get('/playlists/:nombre', (pedido, respuesta) => {
    let nombre = pedido.params.nombre
    let resultado = playlists.filter(x => x.nombre == nombre)
    if (resultado.length != 1) {
        respuesta.status(404).send(resultado)
        return
    }
    respuesta.send(resultado)
})

app.get('/playlists', (pedido, respuesta) => {
    respuesta.send(playlists)
})
app.post('/playlists', (pedido, respuesta) => {
    if (pedido.body.nombre != "") {
        playlists.push(pedido.body)
        respuesta.status(201).send(pedido.body)

    }
    else respuesta.status(400).send(pedido.body)
})

app.put('/playlists/:nombre', (pedido, respuesta) => {
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

app.delete('/playlists/:nombre', (pedido, respuesta) => {
    let nombre = pedido.params.nombre
    let playlistAEliminar = playlists.filter(x => x.nombre == nombre).at(0)
    if (playlistAEliminar == null)
        respuesta.status(404).send("no se encuentra la playlist")

    let indice = playlists.indexOf(playlistAEliminar)
    playlists.splice(indice, 1)
    respuesta.send("se elimino la playlist")
})

app.get('/playlists/:nombre/canciones', (pedido, respuesta) => {
    let nombre = pedido.params.nombre
    let playlist = playlists.filter(x => x.nombre == nombre).at(0)
    if (playlist == null)
        respuesta.status(404).send("No se encuentra la playlist")

    respuesta.send(playlist.canciones)
})
app.get('/playlists/:nombre/canciones/:titulo', (pedido, respuesta) => {
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

app.post('/playlists/:nombre/canciones', (pedido, respuesta) => {
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

app.put('/playlists/:nombre/canciones/:titulo', (pedido, respuesta) => {
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
app.delete('/playlists/:nombre/canciones/:titulo', (pedido, respuesta) => {
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

app.listen(port)