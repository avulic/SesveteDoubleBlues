'use strict';
import { Route } from "./route.js";
import { Router } from "./router.js";

(function () {
    function init() {
        var router = new Router([
            new Route('games', './components/games/1_kolo.html', true),
            new Route('1_kolo', './components/games/1_kolo.html'),
            new Route('2_kolo', './components/games/2_kolo.html'),
            new Route('3_kolo', './components/games/1_kolo.html'),
            new Route('4_kolo', './components/games/1_kolo.html'),
            new Route('5_kolo', './components/games/1_kolo.html'),
            new Route('shop', 'shop.html'),
            new Route('about', 'about.html'),
            new Route('players', 'players.html')

        ]);
    }
    init();
}());
