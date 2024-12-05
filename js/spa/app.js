'use strict';
import { Route } from "./route.js";
import { Router } from "./router.js";
import { Kolo_1 } from '../../components/games/1_kolo.js'
import { Kolo_2 } from '../../components/games/2_kolo.js'
import { Players } from '../../components/players/player.js'
import { About } from '../../components/about/about.js'
import { Stadion } from '../../components/stadion/stadion.js'
import { Shop } from '../../components/shop.js'
import { Insta } from '../../components/games/instaStory.js'

(function () {
    function init() {
        var router = new Router([
            new Route('1_kolo', new Kolo_1()),
            new Route('2_kolo', new Kolo_2()),
            new Route('3_kolo', 'games/1_kolo.html'),
            new Route('4_kolo', 'games/1_kolo.html'),
            new Route('5_kolo', 'games/1_kolo.html'),
            new Route('about', new About(), true),
            new Route('players', new Players()),
            new Route('stadion', new Stadion()),
            new Route('shop', new Shop()),
            new Route('insta', new Insta())
        ]);
    }
    init();
}());
