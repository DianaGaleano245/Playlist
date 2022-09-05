import express, { json } from 'express'
import morgan from 'morgan'
import 'dotenv/config'
const app = express()
app.use(json())
app.use(morgan('dev'))

const port = process.env.PORT

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
app.get('/playlists/:nombre', (req, res) => {
    let nombre = req.params.nombre
    let resultado = playlists.find(x => x.nombre == nombre)
    if (resultado == null) {
        res.status(404).send(resultado)
        return
    }
    res.send(resultado)
})

app.get('/playlists', (req, res) => {
    res.send(playlists)
})
app.post('/playlists', (req, res) => {
    if (req.body.nombre != "") {
        playlists.push(req.body)
        res.status(201).send(req.body)

    }
    else
        res.status(400).send(req.body)
})

app.put('/playlists/:nombre', (req, res) => {
    let nombre = req.params.nombre
    let playlist = playlists.find(x => x.nombre == nombre)
    playlist.descripcion = req.body.descripcion
    res.status(204).send(playlist)
    if (req.body.nombre != "") {
        playlists.playlist = req.body.playlist
        res.status(204).send(req.body)

    }
    else res.status(404).send(req.body)
    res.status(409).send(req.body)
})

app.delete('/playlists/:nombre', (req, res) => {
    let nombre = req.params.nombre
    let playlist = playlists.find(x => x.nombre == nombre)
    if (playlist == null) {
        response.status(404).send("no se encuentra la playlist")
        return
    }
    let indice = playlists.indexOf(playlist)
    playlists.splice(indice, 1)
    res.send("se elimino la playlist")
})

app.get('/playlists/:nombre/canciones', (req, res) => {
    let nombre = req.params.nombre
    let playlist = playlists.find(x => x.nombre == nombre)
    if (playlist == null) {
        res.status(404).send("No se encuentra la playlist")
        return
    }
    res.send(playlist.canciones)
})
app.get('/playlists/:nombre/canciones/:titulo', (req, res) => {
    let nombre = req.params.nombre
    let titulo = req.params.titulo

    let playlist = playlists.find(x => x.nombre == nombre)

    if (playlist == null) {
        response.status(404).send("No se encuentra la playlist")
        return
    }

    let cancion = playlist.canciones.find(x => x.titulo == titulo)

    if (cancion == null) {
        res.status(404).send("No se encuentra la cancion")
        return
    }

    res.send(cancion)
})

app.post('/playlists/:nombre/canciones', (req, res) => {
    let nombre = req.params.nombre

    let playlist = playlists.find(x => x.nombre == nombre)

    if (playlist == null) {
        res.status(404).send("No se encuentra la playlist")
        return
    }

    if (req.body.nombre != "") {
        playlist.canciones.push(req.body)
        res.status(201).send(req.body)
    }
    else
        res.status(400).send()
})

app.put('/playlists/:nombre/canciones/:titulo', (req, res) => {
    let nombre = req.params.nombre
    let playlist = playlists.find(x => x.nombre == nombre)

    if (playlist == null) {
        res.status(404).send("No se encuentra la playlist")
        return
    }
    let titulo = req.params.titulo

    let cancion = playlist.canciones.find(x => x.titulo == titulo)
    if (cancion == null) {
        res.status(404).send("No se encuentra la cancion")
        return
    }
    cancion.artista = req.body.artista
    cancion.album = req.body.album
    cancion.año = req.body.año
    res.send()
})
app.delete('/playlists/:nombre/canciones/:titulo', (req, res) => {
    let nombre = req.params.nombre
    let titulo = req.params.titulo
    let playlist = playlists.find(x => x.nombre == nombre)
    let cancionAEliminar = playlist.canciones.find(x => x.titulo == titulo)
    if (cancionAEliminar == null)
        res.status(404).send("no se encuentra la playlist")

    let indice = playlist.canciones.indexOf(cancionAEliminar)
    playlists.splice(indice, 1)
    res.send("se elimino la cancion")
})

app.listen(port)