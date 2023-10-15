// Function to load and display content
export async function fetchComponent(fileName) {
    return fetch(fileName)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error loading ${fileName}: ${response.status}`);
            }

            return response.text(); // Read the response body once
        })
        // .then((html) => {
        //     contentContainer.innerHTML = html;
        // })
        .catch((error) => {
            console.error(error);
        });
}

export function parseElement(content) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    if (doc) {
        return doc;
    }
}

export function parseTemplateElement(content) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const template = doc.querySelector('template');
    if (template) {
        return template;
    }
}



function makeElement() {
    // Array of image sources
    const imageSources = [
        "./images/tim.jpg",
        "./images/tim2.jpg",
        "./images/tim.jpg",
        "./images/tim.jpg",
        "./images/tim.jpg",
        "./images/tim.jpg",
        "./images/tim.jpg",
        "./images/tim.jpg",
        "./images/tim.jpg",
        "./images/tim.jpg",
        // Add more image sources as needed
    ];

    // Get the target container element
    const imageContainer = document.getElementById("imageContainer");

    // Loop through the image sources and create components
    imageSources.forEach((src) => {
        // Create a new column div
        const colDiv = document.createElement("div");
        colDiv.classList.add("col-lg-4", "mb-4", "mb-lg-0");

        // Create an image element
        const imgElement = document.createElement("img");
        imgElement.src = src;
        imgElement.classList.add("w-100", "shadow-1-strong", "rounded", "mb-4");
        imgElement.alt = "Image"; // You can set alt text as needed

        // Append the image element to the column div
        colDiv.appendChild(imgElement);

        // Append the column div to the image container
        imageContainer.appendChild(colDiv);
    });
}

window.addEventListener('load', function () {
    setTimeout(removeLoader, 200); // wait for page load PLUS two seconds.
    // makeElement();
});

function removeLoader() {
    const loadingDiv = document.getElementById("loadingDiv");
    if (loadingDiv) {
        loadingDiv.style.transition = "opacity 0.5s";
        loadingDiv.style.opacity = "0";
        setTimeout(() => {
            loadingDiv.remove(); // remove the loading div after the fade out
        }, 500);
    }
}





function toggleGallery() {
    var galleryDiv = document.getElementById("insta-content");
    if (galleryDiv.style.display === "none") {
        galleryDiv.style.display = "block";
    } else {
        galleryDiv.style.display = "none";
    }
}

function toggleShop() {
    var galleryDiv = document.getElementById("navigation-inside");
    if (galleryDiv.style.display === "none") {
        galleryDiv.style.display = "block";
    } else {
        galleryDiv.style.display = "none";
    }
}
// $(window).scroll(function () {
//     $("#section01").css("opacity", 1 - $(window).scrollTop() / 1100);
// });



function parallax() {
    // Get the element with class 'fixme'
    var fixme = document.querySelector('.fixme');

    // Get the initial top position of the 'fixme' element
    var fixmeTop = fixme.getBoundingClientRect().top;

    // Add a scroll event listener to the window
    window.addEventListener('scroll', function () {
        // Get the current scroll position
        var currentScroll = window.scrollY;

        // Check if the current scroll position is greater than or equal to the initial top position of 'fixme'
        if (currentScroll >= fixmeTop) {
            // If true, set the position of 'fixme' to 'fixed'
            fixme.style.position = 'fixed';
            fixme.style.top = '0';
            fixme.style.left = '0';
        } else {
            // If false, set the position of 'fixme' to 'static'
            fixme.style.position = 'static';
        }
    });

}





const ASSET_URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/215059/';

let $stage = null;
let $world = null;
let $terrain = null;
let $team = null;
let $teamListHome = null;
let $players = null;
let $playersHome = null; // Subset of $players
let $playersAway = null; // Subset of $players
let $switchBtn = null;
let $loadBtn = null;
let $closeBtn = null;
let $heading = null;
let $subHeading = null;
let $loading = null;
let $switcher = null;

const data = {
    players: {
        home: [
            {
                name: 'Pizarro', asset: 'bm-pizarro.jpg', origin: 'Peru', height: '1.84m', shirt: '14', pos: 'Forward', dob: '36', goals: 1, games: 16, x: 110, y: -190
            }
            // Add other player data for the home team
        ],
        away: [
            {
                name: 'Benzema', asset: 'rm-benzema.jpg', origin: 'France', height: '1.87m', shirt: '9', pos: 'Forward', dob: '36', goals: 1, games: 16, x: 110, y: -190
            }
            // Add other player data for the away team
        ],
    }
};

const state = {
    home: true,
    disabHover: false,
    swapSides: function () {
        if (this.home) this.home = false;
        else this.home = true;
    },
    curSide: function () {
        return this.home ? 'home' : 'away';
    },
};

const pos = {
    world: {
        baseX: 0,
        baseY: 0,
        baseZ: -200,
    },
    def: {
        goalie: [0, -50],
    },
};

const dom = {
    addPlayers: function (side) {
        for (const key in data.players[side]) {
            const val = data.players[side][key];
            val.side = side;
            const $el = this.addPlayer(val);
            $team.append($el);
        }
        $players = $('.js-player');
        $playersHome = $('.js-player[data-side="home"]');
        $playersAway = $('.js-player[data-side="away"]');
    },
    addPlayer: function (data) {
        const $el = $(`<div class="js-player player" data-name="${data.name}" data-side="${data.side}" data-x="${data.x}" data-y="${data.y}"></div>`);
        $el.append(`<div class="player__label"><span>${data.name}</span></div>`);
        $el.append(`<div class="player__img"><img src="${ASSET_URL}${data.asset}"></div>`);
        $el.prepend('<div class="player__card"> </div>');
        $el.prepend('<div class="player__placeholder"></div>');
        this.populateCard($el.find('.player__card'), data);
        return $el;
    },
    preloadImages: function (preload) {
        const promises = [];
        let i = 0;
        while (i < preload.length) {
            ((url, promise) => {
                const img = new Image();
                img.onload = () => promise.resolve();
                img.src = url;
            })(preload[i], (promises[i] = $.Deferred()));
            i++;
        }
        $.when.apply($, promises).done(() => {
            scenes.endLoading();
            scenes.loadIn(1600);
        });
    },
    populateCard: function ($el, data) {
        $el.append(
            `<h3>${data.name}</h3>` +
            '<ul class="player__card__list"><li><span>DOB</span><br/>' +
            `${data.dob} yr</li><li><span>Height</span><br/>${data.height}</li>` +
            `<li><span>Origin</span><br/>${data.origin}</li></ul>` +
            '<ul class="player__card__list player__card__list--last">' +
            `<li><span>Games</span><br/>${data.games}</li>` +
            `<li><span>Goals</span><br/>${data.goals}</li></ul>`
        );
    },
    displayNone: function ($el) {
        $el.css('display', 'none');
    },
};

const events = {
    attachAll: function () {
        $switchBtn.on('click', (e) => {
            e.preventDefault();
            const $el = $(this);
            if ($el.hasClass('disabled')) return;
            scenes.switchSides();
            $switchBtn.removeClass('disabled');
            $el.addClass('disabled');
        });

        $loadBtn.on('click', (e) => {
            e.preventDefault();
            scenes.loadIn();
        });

        $players.on('click', (e) => {
            e.preventDefault();
            const $el = $(this);
            if ($('.active').length) return false;
            $el.addClass('active');
            scenes.focusPlayer($el);
            setTimeout(() => events.attachClose(), 1);
        });
    },
    attachClose: function () {
        $stage.one('click', (e) => {
            e.preventDefault();
            scenes.unfocusPlayer();
        });
    },
};

const scenes = {
    preLoad: function () {
        $teamListHome.velocity({ opacity: 0 }, 0);
        $players.velocity({ opacity: 0 }, 0);
        $loadBtn.velocity({ opacity: 0 }, 0);
        $switcher.velocity({ opacity: 0 }, 0);
        $heading.velocity({ opacity: 0 }, 0);
        $subHeading.velocity({ opacity: 0 }, 0);
        $playersAway.css('display', 'none');
        $world.velocity({ opacity: 0, translateZ: -200, translateY: -60 }, 0);
        $('main').velocity({ opacity: 1 }, 0);
    },
    loadIn: function (delay = 0) {
        $world.velocity({ opacity: 1, translateY: 0, translateZ: -200 }, { duration: 1000, delay: delay, easing: 'spring' });
        anim.fadeInDir($heading, 300, delay + 600, 0, 30);
        anim.fadeInDir($subHeading, 300, delay + 800, 0, 30);
        anim.fadeInDir($teamListHome, 300, delay + 800, 0, 30);
        anim.fadeInDir($switcher, 300, delay + 900, 0, 30);
        delay += 1200;
        const delayInc = 30;
        anim.dropPlayers($playersHome, delay, delayInc);
    },
    startLoading: function () {
        anim.fadeInDir($loading, 300, 0, 0, -20);
        const images = [];
        for (const key in data.players.home, data.players.away) {
            images.push(ASSET_URL + val.asset);
        }
        dom.preloadImages(images);
    },
    endLoading: function () {
        anim.fadeOutDir($loading, 300, 1000, 0, -20);
    },
    arrangePlayers: function () {
        $players.each(function () {
            const $el = $(this);
            $el.velocity({
                translateX: parseInt($el.attr('data-x')),
                translateZ: parseInt($el.attr('data-y')), // Z is the Y axis on the field
            });
        });
    },
    focusPlayer: function ($el) {
        const data = $el.data();
        let shiftY = data.y;
        if (shiftY > 0) shiftY = data.y / 2;

        $(`.js-player[data-side="${state.curSide()}"]`)
            .not('.active')
            .each(function () {
                const $unfocus = $(this);
                anim.fadeOutDir($unfocus, 300, 0, 0, 0, 0, null, 0.2);
            });

        $world.velocity(
            {
                translateX: pos.world.baseX - data.x,
                translateY: pos.world.baseY,
                translateZ: pos.world.baseZ - shiftY, // Z is the Y axis on the field
            },
            600
        );

        $terrain.velocity({ opacity: 0.66 }, 600);
        this.showPlayerCard($el, 600, 600);
    },
    unfocusPlayer: function () {
        const $el = $('.js-player.active');
        const data = $el.data();
        anim.fadeInDir($(`.js-player[data-side="${state.curSide()}"]`).not('.active'), 300, 300, 0, 0, 0, null, 0.2);
        $el.removeClass('active');
        $world.velocity(
            {
                translateX: pos.world.baseX,
                translateY: pos.world.baseY,
                translateZ: pos.world.baseZ, // Z is the Y axis on the field
            },
            600
        );

        $terrain.velocity({ opacity: 1 }, 600);
        this.hidePlayerCard($el, 600, 600);
    },
    hidePlayerCard: function ($el, dur, delay) {
        const $card = $el.find('.player__card');
        const $image = $el.find('.player__img');
        $image.velocity({ translateY: 0 }, 300);
        anim.fadeInDir($el.find('.player__label'), 200, delay);
        anim.fadeOutDir($card, 300, 0, 0, -100);
    },
    showPlayerCard: function ($el, dur, delay) {
        const $card = $el.find('.player__card');
        const $image = $el.find('.player__img');
        $image.velocity({ translateY: '-=150px' }, 300);
        anim.fadeOutDir($el.find('.player__label'), 200, delay);
        anim.fadeInDir($card, 300, 200, 0, 100);
    },
    switchSides: function () {
        let delay = 0;
        const delayInc = 20;
        const $old = $playersHome;
        const $new = $playersAway;
        if (!state.home) {
            $old = $playersAway;
            $new = $playersHome;
        }
        state.swapSides();
        $old.each(function () {
            const $el = $(this);
            anim.fadeOutDir($el, 200, delay, 0, -60, 0);
            anim.fadeOutDir($el.find('.player__label'), 200, delay + 700);
            delay += delayInc;
        });
        $terrain.velocity({ rotateY: '+=180deg' }, { delay: 150, duration: 1200 });
        anim.dropPlayers($new, 1500, 30);
    },
};

const anim = {
    fadeInDir: function ($el, dur, delay, deltaX = 0, deltaY = 0, deltaZ = 0, easing = null, opacity = 0) {
        $el.css('display', 'block');
        $el.velocity(
            {
                translateX: `-=${deltaX}`,
                translateY: `-=${deltaY}`,
                translateZ: `-=${deltaZ}`,
            },
            0
        );

        $el.velocity(
            {
                opacity: 1,
                translateX: `+=${deltaX}`,
                translateY: `+=${deltaY}`,
                translateZ: `+=${deltaZ}`,
            },
            {
                easing: easing,
                delay: delay,
                duration: dur,
            }
        );
    },
    fadeOutDir: function ($el, dur, delay, deltaX = 0, deltaY = 0, deltaZ = 0, easing = null, opacity = 0) {
        let display = 'none';
        if (opacity) {
            display = 'block';
        }
        $el.velocity(
            {
                opacity: opacity,
                translateX: `+=${deltaX}`,
                translateY: `+=${deltaY}`,
                translateZ: `+=${deltaZ}`,
            },
            {
                easing: easing,
                delay: delay,
                duration: dur,
            }
        )
            .velocity(
                {
                    opacity: opacity,
                    translateX: `-=${deltaX}`,
                    translateY: `-=${deltaY}`,
                    translateZ: `-=${deltaZ}`,
                },
                {
                    duration: 0,
                    display: display,
                }
            );
    },
    dropPlayers: function ($els, delay, delayInc) {
        $els.each(function () {
            const $el = $(this);
            $el.css({
                display: 'block',
                opacity: 0,
            });
            anim.fadeInDir($el, 800, delay, 0, 50, 0, 'spring');
            anim.fadeInDir($el.find('.player__label'), 200, delay + 250);
            delay += delayInc;
        });
    },
};

function init() {
    $stage = $('.js-stage');
    $world = $('.js-world');
    $switchBtn = $('.js-switch');
    $loadBtn = $('.js-load');
    $heading = $('.js-heading');
    $switcher = $('.js-switcher');
    $closeBtn = $('.js-close');
    $subHeading = $('.js-subheading');
    $terrain = $('.js-terrain');
    $team = $('.js-team');
    $teamListHome = $('.js-team-home');
    $loading = $('.js-loading');

    dom.addPlayers('home');
    dom.addPlayers('away');
    scenes.preLoad();
    scenes.arrangePlayers();
    events.attachAll();
    scenes.startLoading();
}

$(document).ready(init);
