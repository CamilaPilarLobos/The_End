import {mongoose} from "mongoose";

const albumsSchema = mongoose.Schema(
    {
        title : {
            type : String,
            minLength : [5, "short"],
            required : [true, "obligatory titel"],
            unique: true
        },
        artist : {
            type: String,
            required : [ true, "add artist"],
            minLength : [2, " minimum 2"],
        },
        yearOfRealease : {
            type: Date,
            required: [true, "the year is obligatory"],
            min: [1900, "Thats Old, very old"],
            max : [2026, "thats imposible sir"]
        },
        genero: {
            type: String,
            required: [true, "you have to give it a genra"],
            minLength : [3, " minimum 3"],
        },
        amount: {
            type: Number,
            required: [true, "Cuantas canciones tiene el album?"],
            min: [1, "debe haber mas de 1 pista"],
            max : [10, "no puede haber mas de 10"]
        }
    },
        {timestamps: true}
)


const Albums = mongoose.model('Albums',albumsSchema)

export {Albums,albumsSchema };