import mongoose from "mongoose"

const pleylistSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    canciones:[
        type: String,
        required: true
    ]
},
    {       

        timestamps: true,
        versionKey: false
    }
)

const Usuario = mongoose.model('Usuario', usuarioSchema)

export default Usuario