import express from 'express'
const router = express.Router()
import playlist from '../models/playlist.model'
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
router.get('/playlists/:nombre', async (req, res) => {
    let nombre = req.params.nombre
    let resultado = playlists.find(x => x.nombre == nombre)
    if (resultado.length != 1) {
        res.status(404).send(resultado)
        return
    }
    res.send(resultado)
})

router.get('/playlists', (req, res) => {
    res.send(playlists)
})
router.post('/playlists', (req, res) => {
    if (req.body.nombre != "") {
        playlists.push(req.body)
        res.status(201).send(req.body)

    }
    else res.status(400).send(req.body)
})

router.put('/playlists/:nombre', (req, res) => {
    let nombre = req.params.nombre
    let playlist = playlists.find(x => x.nombre == nombre).at(0)
    playlist.descripcion = req.body.descripcion
    res.status(204).send(playlist)
    if (req.body.nombre != "") {
        playlists.push(req.body)
        res.status(204).send(req.body)

    }
    else res.status(404).send(req.body)
    res.status(409).send(req.body)
})

router.delete('/playlists/:nombre', (req, res) => {
    let nombre = req.params.nombre
    let playlistAEliminar = playlists.find(x => x.nombre == nombre).at(0)
    if (playlistAEliminar == null)
        res.status(404).send("no se encuentra la playlist")

    let indice = playlists.indexOf(playlistAEliminar)
    playlists.splice(indice, 1)
    res.send("se elimino la playlist")
})

router.get('/playlists/:nombre/canciones', (req, res) => {
    let nombre = req.params.nombre
    let playlist = playlists.find(x => x.nombre == nombre).at(0)
    if (playlist == null)
        res.status(404).send("No se encuentra la playlist")

    res.send(playlist.canciones)
})
router.get('/playlists/:nombre/canciones/:titulo', (req, res) => {
    let nombre = req.params.nombre
    let titulo = req.params.titulo

    let playlist = playlists.find(x => x.nombre == nombre).at(0)

    if (playlist == null) {
        res.status(404).send("No se encuentra la playlist")
        return
    }

    let cancion = playlist.canciones.find(x => x.titulo == titulo).at(0)

    if (cancion == null) {
        res.status(404).send("No se encuentra la cancion")
        return
    }

    res.send(cancion)
})

router.post('/playlists/:nombre/canciones', (req, res) => {
    let nombre = req.params.nombre

    let playlist = playlists.find(x => x.nombre == nombre).at(0)

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

router.put('/playlists/:nombre/canciones/:titulo', (req, res) => {
    let nombre = req.params.nombre
    let playlist = playlists.find(x => x.nombre == nombre).at(0)

    if (playlist == null) {
        res.status(404).send("No se encuentra la playlist")
        return
    }
    let titulo = req.params.titulo

    let cancion = playlist.canciones.find(x => x.titulo == titulo).at(0)
    if (cancion == null) {
        res.status(404).send("No se encuentra la cancion")
        return
    }
    cancion.artista = req.body.artista
    cancion.album = req.body.album
    cancion.año = req.body.año
    res.send()
})
router.delete('/playlists/:nombre/canciones/:titulo', (req, res) => {
    let nombre = req.params.nombre
    let titulo = req.params.titulo
    let playlist = playlists.find(x => x.nombre == nombre).at(0)
    let cancionAEliminar = playlist.canciones.find(x => x.titulo == titulo).at(0)
    if (cancionAEliminar == null)
        res.status(404).send("no se encuentra la playlist")

    let indice = playlist.canciones.indexOf(cancionAEliminar)
    playlists.splice(indice, 1)
    res.send("se elimino la cancion")
})

export default router