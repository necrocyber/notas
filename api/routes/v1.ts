import * as express from 'express'
import {
    getAllPost,
    getPostById,
    CreatePost,
    updatePost,
    deletePost
} from '../controllers/Controllers'

export default (app) => {
    const apiRoutes = express.Router()
    const postRoutes = express.Router()

    
    // Post Routes
    apiRoutes.use('/posts', postRoutes)

    postRoutes.get('/', getAllPost)

    //postRoutes.get('/', getPostById)

    postRoutes.post('/', CreatePost)

    postRoutes.delete('/', deletePost)

    postRoutes.put('/', updatePost)


    app.use('/api', apiRoutes)

}