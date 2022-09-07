import express from 'express'
import { send } from 'express/lib/response'
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
    try {
        res.send(playlist)
        res.status(404).send(resultado)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.get('/playlists', async (req, res) => {
    try {
        let nombrePlaylist = req.params.nombre
        const playlist = await playlists.findOne({ nombre: nombrePlaylist })
        res.send(playlist)
    } catch (err) {
        res.status(500).send(err)
    }
})
router.post('/playlists', async (req, res) => {
    try {
        const playlist = req.body
        await playlist.create(playlist)
        res.status(201).send(playlist)
    } catch (err) {
        res.status(500).send(err)
    }
})
router.put('/playlists/:nombre', async (req, res) => {
    try {
        let nombrePlaylist = req.params.nombre
        let playlist = req.body
        await playlist.findOneAndUpdate({ nombre: nombrePlaylist }, nombre)
        const playlistResponse = await playlist.findOne({ nombre: nombrePlaylist })
        res.send(playlistResponse)
    } catch (err) {
        res.status(500).send(err)
    }
})
router.delete('/playlists/:nombre', async (req, res) => {
    try {
        let nombrePlaylist = req.params.nombre
        await playlist.findOneAndRemove({ nombre: nombrePlaylist })
        res.status(204).send()
    } catch (err) {
        res.status(500).send(err)
    }
});
router.get('/playlists/:nombre/canciones', async (req, res) => {
    try {
        let nombrePlaylist = req.params.nombre
        const playlist = await playlists.findOne({ nombre: nombrePlaylist })
        res.send(playlist.canciones)
    } catch (err) {
        res.status(500).send(err)
    }
})


//se termino 
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