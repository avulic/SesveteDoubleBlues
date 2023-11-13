'use strict';
import { Route } from "./route.js";
import { Router } from "./router.js";
import { Kolo1 } from '../../components/games/1_kolo.js'
import { Players } from '../../components/players/player.js'

(function () {
    function init() {
        var router = new Router([
            new Route('1_kolo', new Kolo1()),
            new Route('2_kolo', 'games/2_kolo.html'),
            new Route('3_kolo', 'games/1_kolo.html'),
            new Route('4_kolo', 'games/1_kolo.html'),
            new Route('5_kolo', 'games/1_kolo.html'),
            new Route('shop', 'shop.html'),
            new Route('about', 'about.html'),
            new Route('players', new Players(), true)
        ]);
    }
    init();
}());
