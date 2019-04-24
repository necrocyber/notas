"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models/models");
function getAllPost(req, res, next) {
    models_1.default.find(function (err, posts) {
        if (err) {
            res.status(500).json({ err: err });
        }
        res.status(200).json({ posts: posts });
    });
}
exports.getAllPost = getAllPost;
function getPostById(req, res, next) {
    var id = req.body.id;
    models_1.default.findById(id, function (err, post) {
        if (err) {
            res.status(500).json({ err: err });
        }
        res.status(200).json({ post: post });
    });
}
exports.getPostById = getPostById;
function CreatePost(req, res, next) {
    var title = req.body.title;
    var content = req.body.content;
    if (!title) {
        res.status(422).json({ err: 'El titulo es requerido' });
        return;
    }
    if (!content) {
        res.status(422).json({ err: 'El contenido es requerido' });
        return;
    }
    var post = new models_1.default({
        title: title,
        content: content
    });
    post.save(function (err, post) {
        if (err) {
            res.status(500).json({ err: err });
        }
        res.status(200).json({ post: post });
    });
}
exports.CreatePost = CreatePost;
function updatePost(req, res, next) {
    var id = req.body.id;
    models_1.default.findByIdAndUpdate(id, req.body, function (err, post) {
        if (err) {
            res.status(500).json({ err: err });
        }
        res.status(200).json({ post: post });
    });
}
exports.updatePost = updatePost;
function deletePost(req, res, next) {
    var id = req.body.id;
    console.log(id);
    models_1.default.findByIdAndRemove(id, function (err, post) {
        if (err) {
            res.status(500).json({ err: err });
        }
        res.status(200).json({ post: post });
    });
}
exports.deletePost = deletePost;
//# sourceMappingURL=Controllers.js.map