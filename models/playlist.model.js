import mongoose from "mongoose"

const playlistSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    canciones:{
        type: String,
        required: true
    }
},
    {       
        timestamps: true,
        versionKey: false
    }
)

const playlist = mongoose.model('playlist', playlistSchema)

export default playlist