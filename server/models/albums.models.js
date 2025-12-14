import mongoose from "mongoose";

const albumsSchema = mongoose.Schema(
    {
        title: {
            type: String,
            minlength: [5, "short"],
            required: [true, "obligatory title"],
            unique: true
        },
        artist: {
            type: String,
            required: [true, "add artist"],
            minlength: [2, "minimum 2"]
        }, 
        yearOfRelease: {
            type: Date,
            required: [true, "The year is obligatory"],
            min: [new Date('1950-01-01'), "That's old, very old"],
            max: [new Date('2026-01-01'), "That's impossible, sir"]
        },
        genero: {
            type: String,
            required: [true, "you have to give it a genre"],
            minlength: [3, "minimum 3"]
        },
        amount: {
            type: Number,
            required: [true, "Cuantas canciones tiene el album?"],
            min: [1, "debe haber mas de 1 pista"],
            max: [10, "no puede haber mas de 10"]
        }
    },
    { timestamps: true }
);

const Albums = mongoose.model("albums", albumsSchema);

export { Albums, albumsSchema };
