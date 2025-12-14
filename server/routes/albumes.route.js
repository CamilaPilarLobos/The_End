import {Router} from "express"
import validateToken from "../middleware/validateToken.js";
import albumsController from "../controllers/albums.controller.js"

const albumsRoutes = Router();

albumsRoutes.get('/', validateToken , albumsController.getAll )
albumsRoutes.post('/new', validateToken, albumsController.createOne)
albumsRoutes.get('/:id', validateToken, albumsController.getOne)
albumsRoutes.delete('/destroy/:id', validateToken, albumsController.deleteOne)
albumsRoutes.put('/update/:id',validateToken,  albumsController.updateOne)

export default albumsRoutes;