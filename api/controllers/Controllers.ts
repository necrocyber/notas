import * as express from 'express'

import Post from '../models/models'

export function getAllPost(req, res, next) {
    Post.find((err, posts) => {
        if(err) {
            res.status(500).json({err})
        }

        res.status(200).json({posts})
    })
}

export function getPostById(req, res, next) {
    const id = req.params.id

    Post.findById(id, (err, post) => {
        if(err) {
            res.status(500).json({err})
        }

        res.status(200).json({post})
    })
}

export function CreatePost(req, res, next) {
    const title = req.body.title
    const content = req.body.content

    if(!title) {
        res.status(422).json({err: 'El titulo es requerido'})
        return
    }

    if(!content) {
        res.status(422).json({err: 'El contenido es requerido'})
        return
    }

    const post = new Post({
        title,
        content
    })

    post.save((err, post) => {
        if(err) {
            res.status(500).json({err})
        }

        res.status(200).json({post})
    })
}

export function updatePost(req, res, next) {
    const id = req.params.id 
    Post.findByIdAndUpdate(id, req.body, (err, post) => {
        if(err) {
            res.status(500).json({err})
        }

        res.status(200).json({post})
    })
}

export function deletePost(req, res, next) {
    const id = req.params.id
    Post.findByIdAndRemove(id, (err, post) => {
        if(err) {
            res.status(500).json({err})
        }

        res.status(200).json({post})
    })
}