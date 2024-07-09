"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class Route {
    constructor(path, controller, middlewareList) {
        const _middlewareList = middlewareList || [];
        this.path = path;
        this.controller = controller;
        this.router = (0, express_1.Router)();
        this.router.get(this.path, ..._middlewareList, this.controller.get);
        this.router.put(this.path, ..._middlewareList, this.controller.put);
        this.router.post(this.path, ..._middlewareList, this.controller.post);
        this.router.delete(this.path, ..._middlewareList, this.controller.delete);
    }
    getRoute() {
        return this.router;
    }
}
exports.default = Route;
