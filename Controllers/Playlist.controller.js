import playlist from '../models/playlist.model'

export const leerPlaylists = async (req, res) => {
    try {
        const playlist = await Playlist.find()
        res.send(playlist)
    } catch (err) {
        res.status(500).send(err)
    }
}

export const leerPlaylist = async (req, res) => {
    try {
        let nombrePlaylist = req.params.nombre
        const playlist = await playlist.indOne({ nombre: nombrePlaylist })
        res.send(playlist);
    } catch (err) {
        res.status(500).send(err)
    }
}

export const crearplaylist = async (req, res) => {
    try {
        const playlist = req.body
        await playlist.create(playlist)
        res.status(201).send(playlist)
    } catch (err) {
        res.status(500).send(err)
    }
}

export const actualizarplaylist = async (req, res) => {
    try {
        let nombreplaylist = req.params.nombre
        let playlist = req.body
        await playlist.findOneAndUpdate({ nombre: nombreplaylist }, playlist)
        const playlistResponse = await playlist.findOne({ nombre: nombreplaylist })
        res.send(playlistResponse)
    } catch (err) {
        res.status(500).send(err)
    }
}

export const borrarplaylist = async (req, res) => {
    try {
        let nombreplaylist = req.params.nombre
        await playlist.findOneAndRemove({ nombre: nombreplaylist })
        res.status(204).send()
    } catch (err) {
        res.status(500).send(err)
    }
};

export const leerRoles = async (req, res) => {
    try {
        let nombreplaylist = req.params.nombre
        const playlist = await playlist.findOne({ nombre: nombreplaylist })
        res.send(playlist.roles)
    } catch (err) {
        res.status(500).send(err)
    }
}