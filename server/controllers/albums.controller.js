import {Albums} from "../models/albums.models.js";

const albumsController = {
    getAll : async  (req, res)=> {
        try{
            const albums = await Albums.find();
            return res.status(201).json(albums)
        }catch(e){
            return res.status(400).json({message: "Error al encontrar los ablums"})
        }
    },
    createOne : async (req, res)=> {
        const {title, artist, yearOfRelease, genero, amount}  = req.body;
        const newArray = {title, artist, yearOfRelease, genero, amount} 
        try{
            const newAlbum = await Albums.create(newArray)
            res.status(201).json(newAlbum)
        }catch(e){

            const messages = {};
            if(e.name === "ValidationError"){
                Object.keys(e.errors).forEach(key => {
                    messages[key] = e.errors[key].message;
                })
                
            }
            if(e.code== 11000){
                messages['title'] = "no se puede repetir el nombre"
            }

            return res.status(400).json({errors : {...messages}})
        }
    },
    getOne: async (req, res)=> {
        console.log("Entre a la ruta para verificar get one")
        const id = req.params.id;
        try{
            const oneAlbum = await Albums.findById(id)
            if(!oneAlbum){
                return res.status(404).json({message: "The id you indicated does not exist"})
            }
            res.status(201).json(oneAlbum)
        }catch(e){
            return res.status(400).json(e)
        }
    },
    deleteOne: async (req,res)=> {
        const id = req.params.id;
        try{
            const deletedAlbum = await Albums.findByIdAndDelete(id)
            if(!deletedAlbum){
                return res.status(404).json({message: "The id does not exist"})
            }
            res.status(201).json({message: "The album was succesfully deleted"})
        }catch(e){
            return res.status(400).json(e)
        }
    },

    updateOne: async (req, res)=> {
        const id = req.params.id;
        const {title, artist, yearOfRelease, genero, amount}  = req.body;
        const dataTobeUpdated = {};
        if(title){
            dataTobeUpdated.title = title
        }
        if(artist){
            dataTobeUpdated.artist = artist
        }
        if(yearOfRelease){
            dataTobeUpdated.yearOfRelease = yearOfRelease
        }
        if(genero){
            dataTobeUpdated.genero = genero
        }
        if(amount){
            dataTobeUpdated.amount = amount
        }
        try{
            const oneUpdated = await Albums.findByIdAndUpdate(id, dataTobeUpdated, {new: true, runValidators: true})
            if(!oneUpdated){
                return res.status(404).json({message: "The id does not exist"})
            }
            res.status(201).json(oneUpdated)
        }catch(e){

            const messages = {};
            if(e.name === "ValidationError"){
                Object.keys(e.errors).forEach(key => {
                    messages[key] = e.errors[key].message;
                })
                
            }

            if(e.code== 11000){
                messages['title'] = "The title is already present in the BD"
            }
            return res.status(400).json({errors : {...messages}})
        }
    }
}


export default albumsController;