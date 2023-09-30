'use strict';
import { Route } from "./route.js";
import { Router } from "./router.js";

(function () {
    function init() {
        var router = new Router([
            new Route('home', 'home.html'),
            new Route('gallery', 'gallery.html', true),
            new Route('shop', 'shop.html')

        ]);
    }
    init();
}());
