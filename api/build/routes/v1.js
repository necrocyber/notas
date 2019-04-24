"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var Controllers_1 = require("../controllers/Controllers");
exports.default = (function (app) {
    var apiRoutes = express.Router();
    var postRoutes = express.Router();
    // Post Routes
    apiRoutes.use('/posts', postRoutes);
    postRoutes.get('/', Controllers_1.getAllPost);
    //postRoutes.get('/', getPostById)
    postRoutes.post('/', Controllers_1.CreatePost);
    postRoutes.delete('/', Controllers_1.deletePost);
    postRoutes.put('/', Controllers_1.updatePost);
    app.use('/api', apiRoutes);
});
//# sourceMappingURL=v1.js.map