
function removeLoader() {
    const loadingDiv = document.getElementById("loadingDiv");
    if (loadingDiv) {
        loadingDiv.style.transition = "opacity 0.5s";
        loadingDiv.style.opacity = "0";
        setTimeout(() => {
            loadingDiv.remove(); // remove the loading div after the fade out
        }, 100);
    }
}

window.addEventListener('load', function () {
    setTimeout(removeLoader, 2);
});

// ********************************************************************************************************************




// Social loading

function loadYouTube() {
    const placeholder = document.getElementById('youtube-placeholder');
    placeholder.innerHTML = `
    <iframe width="560" height="315"
    src="https://www.youtube.com/embed/9fJNumZA96U?si=RJYZ7pMOhRST1E4b"
    title="YouTube video player" frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen></iframe>
`;
}

function loadTikTok() {
    const placeholder = document.getElementById('tiktok-placeholder');
    placeholder.innerHTML = `
        <blockquote class="tiktok-embed"
        cite="https://www.tiktok.com/@australski.nogomet/video/7363277829460544801"
        data-video-id="7363277829460544801"
        style="max-width: 605px;min-width: 325px; max-height: 517px;">
        <section> <a target="_blank" title="@australski.nogomet"
            href="https://www.tiktok.com/@australski.nogomet?refer=embed">@australski.nogomet</a>
            Sesvete Double Blues <a title="sports" target="_blank"
            href="https://www.tiktok.com/tag/sports?refer=embed">#sports</a>
            <!-- other links -->
        </section>
        </blockquote>
    `;

    // Load TikTok script only when needed
    const script = document.createElement('script');
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
}

function loadInstagram(username) {
    const feed = document.createElement('div');
    feed.className = 'instagram-feed';

    // Fallback to Instagram embed widget
    const embedScript = document.createElement('script');
    embedScript.src = '//www.instagram.com/embed.js';
    embedScript.async = true;

    const widget = document.createElement('div');
    widget.innerHTML = `
    <blockquote 
        class="instagram-media" 
        data-instgrm-version="14"
        data-instgrm-permalink="https://www.instagram.com/${username}/"
    >
    </blockquote>
    `;

    feed.appendChild(widget);
    document.body.appendChild(embedScript);
    document.querySelector('#instagram-container').appendChild(feed);
}


// Function to be called when section needs to be displayed
function showSocialsSection() {
    loadYouTube()
    loadTikTok()
    loadInstagram('sesvetedoubleblues')
}


// Alternative: Use Intersection Observer for automatic loading when scrolled into view
// const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             showSocialsSection();
//             observer.unobserve(entry.target); // Stop observing once shown
//         }
//     });
// }, { threshold: 0.1 });

// Start observing the section or a trigger element
//observer.observe(document.getElementById('socials'));



// ********************************************************************************************************************




// Players

const root = $(document);

const ASSET_URL = './images/players/profil/';
const FUT_CARD_EMPTY_ASSET_URL = './images/players/fut/empty/';
const FUT_CARD_ASSET_URL = './images/players/fut/';
const PLAYER_ASSET_URL = './images/players/crop/';
const PLAYER_ASSET_PLAY_URL = './images/players/play/';

let $stage = null;
let $world = null;
let $terrain = null;



const $field = root.find('#field');
const $team = root.find('#team');
const $cards = root.find('#player-card-container');

let $teamListHome = null;
let $players = null;
let $playersHome = null;
let $playersAway = null;
let $switchBtn = null;
let $loadBtn = null;
let $closeBtn = null;
let $heading = null;
let $subHeading = null;
let $loading = null;
let $switcher = null;

let player = null;
let card = null;
let chart = null;
let team = null;
let field = null;
let playerDescription = null;
let futCardContainer = null;

const data = {
    players: {
        home: [
            {
                name: 'Duksi',
                asset: 'Duksi',
                origin: 'Peru',
                height: '1.84m',
                shirt: '14',
                pos: 'FB',
                dob: '36',
                goals: 1,
                games: 16,
                position: { x: [-31, -34], y: -152, z: 42, left: 50 }
            },
            {
                name: 'Dinko',
                asset: 'Dinko',
                origin: 'Peru',
                height: '1.84m',
                shirt: '14',
                pos: 'HB',
                dob: '36',
                goals: 1,
                games: 16,
                position: { x: [-21, -27], y: -111, z: 42, left: 26 }
            },
            {
                name: 'Neno',
                asset: 'Neno',
                origin: 'Peru',
                height: '1.84m',
                shirt: '14',
                pos: 'HB',
                dob: '36',
                goals: 1,
                games: 16,
                position: { x: [-35, -34], y: -111, z: 40, left: 72 }
            },
            {
                name: 'Mole',
                asset: 'Mole',
                origin: 'Peru',
                height: '1.84m',
                shirt: '14',
                pos: 'R',
                dob: '36',
                goals: 1,
                games: 16,
                position: { x: [-11, -27], y: 93, z: 42, left: 63 }
            },
            {
                name: 'Vele',
                asset: 'Vele',
                origin: 'Peru',
                height: '1.84m',
                shirt: '14',
                pos: 'R',
                dob: '36',
                goals: 1,
                games: 16,
                position: { x: [-28, -27], y: 114, z: 41, left: 49 }
            },
            {
                name: 'Piksi',
                asset: 'Piksi',
                origin: 'Peru',
                height: '1.84m',
                shirt: '14',
                pos: 'R',
                dob: '36',
                goals: 1,
                games: 16,
                position: { x: [-43, -27], y: 90, z: 42, left: 36 }
            },
            {
                name: 'Kolja',
                asset: 'Kolja',
                origin: 'Peru',
                height: '1.84m',
                shirt: '14',
                pos: 'HF',
                dob: '36',
                goals: 1,
                games: 16,
                position: { x: [-8, -27], y: 271, z: 42, left: 70 }
            },
            {
                name: 'Zgela',
                asset: 'Zgela',
                origin: 'Peru',
                height: '1.84m',
                shirt: '14',
                pos: 'HF',
                dob: '36',
                goals: 1,
                games: 16,
                position: { x: [-45, -27], y: 265, z: 35, left: 29 }
            },
            {
                name: 'Mac',
                asset: 'Mac',
                origin: 'Peru',
                height: '1.84m',
                shirt: '14',
                pos: 'FF',
                dob: '36',
                goals: 1,
                games: 16,
                position: { x: [-31, -34], y: 337, z: 42, left: 50 }
            }
        ],
        away: [
            {
                name: 'Pizarro',
                asset: 'bm-pizarro.jpg',
                origin: 'Peru',
                height: '1.84m',
                shirt: '14',
                pos: 'Forward',
                dob: '36',
                goals: 1,
                games: 16,
                x: 110,
                y: -190
            }
        ]
    }
};

const state = {
    home: true,
    playersArranged: false,
    disabHover: false,
    swapSides: function () {
        if (this.home) this.home = false;
        else this.home = true;
    },
    curSide: function () {
        return this.home ? 'home' : 'away';
    }
};

const pos = {
    world: {
        baseX: 0,
        baseY: 0,
        baseZ: -200
    },
    def: {
        goalie: [0, -50]
    }
};

const dom = {
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
    }
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
    }
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
        for (const key in data.players.home.concat(data.players.away)) {
            images.push(ASSET_URL + data.players.home.concat(data.players.away)[key].asset);
        }
        dom.preloadImages(images);
    },
    endLoading: function () {
        anim.fadeOutDir($loading, 300, 1000, 0, -20);
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
                translateZ: pos.world.baseZ - shiftY
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
                translateZ: pos.world.baseZ
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
    }
};

const anim = {
    fadeInDir: function ($el, dur, delay, deltaX = 0, deltaY = 0, deltaZ = 0, easing = null, opacity = 0) {
        $el.css('display', 'block');
        $el.velocity(
            {
                translateX: `-=${deltaX}`,
                translateY: `-=${deltaY}`,
                translateZ: `-=${deltaZ}`
            },
            0
        );

        $el.velocity(
            {
                opacity: 1,
                translateX: `+=${deltaX}`,
                translateY: `+=${deltaY}`,
                translateZ: `+=${deltaZ}`
            },
            {
                easing: easing,
                delay: delay,
                duration: dur
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
                translateZ: `+=${deltaZ}`
            },
            {
                easing: easing,
                delay: delay,
                duration: dur
            }
        ).velocity(
            {
                opacity: opacity,
                translateX: `-=${deltaX}`,
                translateY: `-=${deltaY}`,
                translateZ: `-=${deltaZ}`
            },
            {
                duration: 0,
                display: display
            }
        );
    },
    dropPlayers: function ($els, delay, delayInc) {
        $els.each(function () {
            const $el = $(this);
            $el.css({
                display: 'block',
                opacity: 0
            });
            anim.fadeInDir($el, 800, delay, 0, 50, 0, 'spring');
            anim.fadeInDir($el.find('.player__label'), 200, delay + 250);
            delay += delayInc;
        });
    }
};

function arrangePlayers() {
    const playersContainers = root.find('.player-container').get();
    playersContainers.forEach(function (container) {
        const player = container.childNodes[0];
        $(player.childNodes[0]).css('opacity', 1);
        $(player).css('opacity', 1);
        
        const [[x1, x2], y, z, left] = [
            player.attributes['data-x'].value.split(','),
            player.attributes['data-y'].value,
            player.attributes['data-z'].value,
            player.attributes['data-left'].value
        ];

        anime({
            targets: player,
            translateX: x1,
            translateY: y,
            translateZ: z,
            rotateX: -90,
            duration: 4000,
            delay: 50
        });

        $(player).css('left', left + '%');
    });
    state.playersArranged = true;
}
function resetPlayers() {
    const playersContainers = root.find('.player-container').get();
    playersContainers.forEach(function (container) {
        const player = container.childNodes[0];
        // Reset anime.js animations
        anime.remove(player); // Remove active animations
        anime.remove(player.childNodes[0]);
        
        // Reset styles to initial state
        $(player).css({
            'transform': 'none', // Reset transforms
            'opacity': 0, // Reset opacity
            'left': '0%' // Reset left position
        });
        $(player.childNodes[0]).css('opacity', 0); // Reset child opacity
    });
    state.playersArranged = false; // Update state
}

function addPlayers(side) {
    for (const key in data.players[side]) {
        const playerData = data.players[side][key];
        playerData.side = side;
        const $container = $(`<div class="player-container"></div>`);

        $team.append(makePlayer(playerData, $container));
        $team.append(addPlayerDescription(playerData, $container));
    }
    addCanvas();
    $players = root.find('.player');
    $playersHome = $('.player[data-side="home"]');
    $playersAway = $('.player[data-side="away"]');



}

function makePlayer(data, container) {
    const $player = $(`<div class="player ${data.pos}" data-x="${data.position.x}" data-y="${data.position.y}" data-z="${data.position.z}" data-left="${data.position.left}"></div>`);
    const $el = $(`<div class="circle"></div>`);
    $el.append(`<img src="${ASSET_URL}${data.asset}.jpg" height="60" width="60">`);
    $player.append($el);
    container.append($player);
    return container;
}

function randomInt(min, max) {  
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addEmtpyCard(element, container) {
    const card = $(`<div id="fut-card-container" class="${element.name}"></div>`);
    const card_image_container = $(`<div id="fut-card"></div>`);
    const card_image = $(`<img src="${FUT_CARD_EMPTY_ASSET_URL}Empty_${randomInt(1, 2)}.png" width="200" height="250">`);
    const cardName = $(`<span id="fut-card-name">${element.name}</span>`);
    const cardValue = $(`<span id="fut-card-value">94</span>`);
    const cardPosition = $(`<span id="fut-card-position">Ruckman</span>`);

    card_image_container.append(card_image);
    card_image_container.append(cardName);
    card_image_container.append(cardValue);
    card_image_container.append(cardPosition);

    const card_player_image = $(`<div id="fut-card-player"><img src="${PLAYER_ASSET_URL}Jure_crop.png" width="250" height="300"></div>`);

    card.append(card_image_container);
    card.append(card_player_image);
    container.append(card);
    return container;
}


function addPlayerCard(element, container) {
    const card = $(`<div id="fut-card-container" class="${element.name}"></div>`);
    const card_image_container = $(`<div id="fut-card"></div>`);
    const card_image = $(`<img src="${FUT_CARD_ASSET_URL}${element.name}.webp" width="200" height="250">`);
    
    card_image_container.append(card_image);

    card.append(card_image_container);
    container.append(card);
    return container;
}

function fadeOut(element) {
    anime({
        targets: element,
        opacity: [1, 0.3],
        duration: 3000
    });
}

function fadeIn(element) {
    anime({
        targets: element,
        opacity: 1,
        duration: 2000
    });
}

function animateCard(card) {
    const card_img = $(card).children()[0];

    anime({
        targets: card_img,
        rotateY: 360,
        rotate: '1turn',
        easing: 'easeOutElastic(1, 1.5)'
    });;
}

function showDescription(description, graphVisible = false) {
    futCardContainer = $(description).find("#fut-card-container");
    futPlayerContainer = $(description).find("#player-card-container");
    playerChartContainer = $(description).find("#canvasContainer");

    description.attr('id', 'player-description-container');
    description.css('visibility', 'visible');

    $(futPlayerContainer).show();

    animateCard(futPlayerContainer);

    graphVisible ? showGraph(playerChartContainer) : null;
}

function hideField(fieldTexture, field) {
    fieldTexture.addClass('field-texture-hidden');
    hidePoles()
    //fieldTexture.filter("#poles-home").addClass('poles-hidden');
}

function showField(fieldTexture) {
    fieldTexture.removeClass('field-texture-hidden');
    showPoles();
}

function hidePoles() {
    $("#poles-home").addClass('poles-hidden');
}

function showPoles() {
    $("#poles-home").removeClass('poles-hidden');
}

function hidePlayers(team) {
    team.addClass('player-hidden');
}

function showPlayers(team) {
    team.removeClass('player-hidden');
}

function addPlayerDescription(playerData, container) {
    const playerDescriptionContainer = $("<div>", {
        id: "player-description-container",
        class: "d-flex flex-column"
    }).appendTo(container);

    const flexRow = $("<div>", {
        class: "d-flex flex-column justify-content-center",
        style: "transform-style: preserve-3d"
    }).appendTo(playerDescriptionContainer);

    const playerCardContainer = $("<div>", {
        id: "player-card-container",
        css: {
            width: "276px",
            height: "100px"
        }
    }).appendTo(flexRow);

    //addEmtpyCard(playerData, playerCardContainer);
    addPlayerCard(playerData, playerCardContainer);

    const canvasContainer = $("<div>", {
        id: "canvasContainer",
        width: "225",
        height: "225"
    }).appendTo(flexRow);

    addCanvas(canvasContainer);

    const playerDescription = $("<div>", {
        id: "player-description",
        style: "transform-style: preserve-3d;font-size: small;"
    }).appendTo(playerDescriptionContainer);

    return container;
}

let myChart;

function showGraph(cartContainer) {
    const values = [2, 7, 10, 5, 8, 3, 2];
    const labels = ["Kick", "Pass", "Mark", "Contest Mark", "Jump", "Sprint", "Tackle"];
    const chart = $(cartContainer).children()[0];
    if (myChart) {
        myChart.destroy();
    }

    const data = {
        labels: labels,
        datasets: [{
            label: "Skills",
            data: values,
            backgroundColor: 'rgba(75, 192, 192, 0.3)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2
        }]
    };

    myChart = new Chart(chart, {
        type: 'radar',
        data: data,
        options: {
            scales: {
                r: {
                    pointLabels: {
                        font: { size: 15 },
                        color: 'rgba(255, 255, 255, 1)'
                    },
                    grid: {
                        display: true,
                        color: 'rgba(255, 255, 255, 1)'
                    },
                    ticks: {
                        display: false,
                        beginAtZero: true,
                        max: 10
                    }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

function preLoadCards() {
    const images = [];
    for (const key in data.players.home) {
        if (data.players.home.hasOwnProperty(key)) {
            const asset = data.players.home[key].asset;
            images.push(ASSET_URL + asset);
        }
    }

    const promises = images.map((url) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = resolve;
            img.src = url;
        });
    });

    Promise.all(promises)
        .then(() => { })
        .catch((error) => {
            console.error("Error preloading images:", error);
        });
}

function hideDescription(description) {
    $(description).css('visibility', 'hidden');
}

function addCanvas(canvasContainer) {
    const canvas = $("<canvas>", {
        id: "chartRadar",
        width: "225",
        height: "225"
    }).appendTo(canvasContainer);
}

function resetParameters(playerDescription) {
    futCardContainer = $(playerDescription).find("#fut-card-container");
    // $(futCardContainer).find("#fut-card").attr("style", "transform: none");
    // $($(futCardContainer).find("#fut-card").children()[0]).attr("style", "transform: none");
    // $(futCardContainer).find("#fut-card-player").attr("style", "transform: none");
    // $($(futCardContainer).find("#fut-card-player").children()[0]).attr("style", "transform: none");
}



root.find("#field-container").click(function (event) {
    field = root.find("#field");
    team = root.find('#team .player');
    fieldTexture = $(root.find("#field-texture-container")).children();

    const clickedPlayer = event.target.closest('.player-container');

    if (playerDescription && $(playerDescription).css('visibility') === 'visible') {
        hideDescription(playerDescription);
        resetParameters(playerDescription);
        showField(fieldTexture, field);
        showPlayers(team);
    } else if (clickedPlayer) {
        playerDescription = $(clickedPlayer).find("#player-description-container");
        futCardContainer = $(playerDescription).find("#fut-card-container");
        hideField(fieldTexture, field);
        hidePlayers(team);
        showDescription(playerDescription, true);
    }
});

addPlayers('home');

window.loadPlayers = function () {
    //preloadImages();

    root.find("#team").ready(function () {
        arrangePlayers();

    });
}


// Format image data helper function
const formatImageData = (name, imageString) => {
    return imageString.split("\n")
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(imageUrl => ({
            user: {
                name: 'Sesvete Double Blues',
                avatar: './images/logo.png'
            },
            image: `./images/${name}/${imageUrl.trim()}`,
            duration: 3000
        }));
};



// ********************************************************************************************************************



var currentStorysLenght;

var kolo_1 = `1.webp
10.webp
11.webp
12.webp
13.webp
14.webp
15.webp
16.webp
17.webp
18.webp
19.webp
2.webp
20.webp
21.webp
22.webp
23.webp
24.webp
25.webp
26.webp
27.webp
28.webp
29.webp
3.webp
30.webp
31.webp
32.webp
33.webp
34.webp
35.webp
36.webp
37.webp
38.webp
39.webp
4.webp
40.webp
41.webp
42.webp
5.webp
6.webp
7.webp
8.webp
9.webp
`

var kolo_2 = `1.webp
10.webp
11.webp
12.webp
13.webp
14.webp
2.webp
3.webp
4.webp
5.webp
6.webp
7.webp
8.webp
9.webp
`

var kolo_3 = `1.webp
10.webp
11.webp
12.webp
13.webp
14.webp
15.webp
16.webp
17.webp
18.webp
19.webp
2.webp
20.webp
21.webp
22.webp
23.webp
24.webp
25.webp
26.webp
27.webp
28.webp
29.webp
3.webp
30.webp
31.webp
32.webp
33.webp
34.webp
35.webp
36.webp
37.webp
38.webp
39.webp
4.webp
40.webp
41.webp
42.webp
43.webp
44.webp
45.webp
46.webp
47.webp
48.webp
49.webp
5.webp
50.webp
51.webp
52.webp
53.webp
54.webp
55.webp
56.webp
57.webp
58.webp
59.webp
6.webp
60.webp
61.webp
62.webp
63.webp
64.webp
65.webp
66.webp
67.webp
68.webp
69.webp
7.webp
70.webp
71.webp
72.webp
73.webp
74.webp
75.webp
76.webp
77.webp
78.webp
79.webp
8.webp
80.webp
81.webp
82.webp
83.webp
84.webp
85.webp
9.webp`


// ********************************************************************************************************************





// Pictures section data for StoryPlayer
const picturesHighlightsData = [
    {
        name: 'Paris',
        avatar: './images/story_icon.png',
        stories: formatImageData("kolo_1", kolo_1)
    },
    {
        name: 'Amsterdam',
        avatar: './images/story_icon.png',
        stories: formatImageData("kolo_2", kolo_2)
    },
    {
        name: 'Lyon',
        avatar: './images/story_icon.png',
        stories: formatImageData("kolo_3", kolo_3)
    }
];

class StoryViewer {
    constructor() {
        this.highlightsContainer = document.querySelector('.story-highlights');
        this.viewerContainer = document.querySelector('.story-viewer');
        this.prevBtn = document.querySelector('.story-nav-btn.prev');
        this.nextBtn = document.querySelector('.story-nav-btn.next');
        this.currentHighlightIndex = 0;
        this.currentStoryIndex = 0;
        this.isPlaying = true;
        this.progressAnimation = null;
        this.fallbackImage = '/api/placeholder/600/1000';
        this.init();
    }

    init() {
        this.renderHighlights();
        this.loadStory(this.currentHighlightIndex, this.currentStoryIndex);
        this.bindEvents();
    }

    reset() {
        this.currentHighlightIndex = 0;
        this.currentStoryIndex = 0;
        this.isPlaying = true;
        this.stopProgress();
        this.renderHighlights();
        this.loadStory(this.currentHighlightIndex, this.currentStoryIndex);
    }

    renderHighlights() {
        this.highlightsContainer.innerHTML = picturesHighlightsData.map((highlight, index) => `
        <div class="story-highlight" data-highlight-index="${index}">
            <img src="${highlight.avatar}" alt="${highlight.name}" onerror="this.src='${this.fallbackImage}'">
            <p>${highlight.name}</p>
        </div>
    `).join('');
    }

    loadStory(highlightIndex, storyIndex) {
        const highlight = picturesHighlightsData[highlightIndex];
        if (!highlight || !highlight.stories[storyIndex]) {
            console.error('Invalid highlight or story index:', { highlightIndex, storyIndex });
            return;
        }

        const story = highlight.stories[storyIndex];

        // Create story progress bars
        let progressBarsHTML = '';
        for (let i = 0; i < highlight.stories.length; i++) {
            progressBarsHTML += `
            <div class="progress-bar-container">
                <div class="progress-bar-fill" style="width: ${i < storyIndex ? '100%' : i === storyIndex ? '0%' : '0%'};"></div>
            </div>
        `;
        }

        this.viewerContainer.innerHTML = `
        <div class="story-progress">${progressBarsHTML}</div>
        <img src="${story.image}" alt="${highlight.name}" onerror="this.src='${this.fallbackImage}'">
    `;

        this.prevBtn.disabled = highlightIndex === 0 && storyIndex === 0;
        this.nextBtn.disabled = highlightIndex === picturesHighlightsData.length - 1 && storyIndex === highlight.stories.length - 1;

        if (this.isPlaying) {
            this.startProgress(story.duration);
        }
    }

    startProgress(duration) {
        this.stopProgress();
        const progressBar = this.viewerContainer.querySelectorAll('.progress-bar-fill')[this.currentStoryIndex];
        if (!progressBar) return;

        progressBar.style.transitionDuration = `${duration}ms`;
        progressBar.style.width = '0%';
        requestAnimationFrame(() => {
            progressBar.style.width = '100%';
        });

        this.progressAnimation = setTimeout(() => {
            this.nextStory();
        }, duration);
    }

    stopProgress() {
        if (this.progressAnimation) {
            clearTimeout(this.progressAnimation);
            this.progressAnimation = null;
        }
        const progressBar = this.viewerContainer.querySelectorAll('.progress-bar-fill')[this.currentStoryIndex];
        if (progressBar) {
            progressBar.style.transitionDuration = '0ms';
        }
    }

    nextStory() {
        const currentHighlight = picturesHighlightsData[this.currentHighlightIndex];
        if (this.currentStoryIndex < currentHighlight.stories.length - 1) {
            this.currentStoryIndex++;
        } else if (this.currentHighlightIndex < picturesHighlightsData.length - 1) {
            this.currentHighlightIndex++;
            this.currentStoryIndex = 0;
        } else {
            return;
        }
        this.loadStory(this.currentHighlightIndex, this.currentStoryIndex);
    }

    prevStory() {
        if (this.currentStoryIndex > 0) {
            this.currentStoryIndex--;
        } else if (this.currentHighlightIndex > 0) {
            this.currentHighlightIndex--;
            this.currentStoryIndex = picturesHighlightsData[this.currentHighlightIndex].stories.length - 1;
        } else {
            return;
        }
        this.loadStory(this.currentHighlightIndex, this.currentStoryIndex);
    }

    bindEvents() {
        // Remove existing listeners to prevent duplicates
        this.highlightsContainer.removeEventListener('click', this.handleHighlightClick);
        this.nextBtn.removeEventListener('click', this.handleNextClick);
        this.prevBtn.removeEventListener('click', this.handlePrevClick);
        this.viewerContainer.removeEventListener('click', this.handleViewerClick);

        // Store bound methods to use with removeEventListener
        this.handleHighlightClick = (e) => {
            const highlight = e.target.closest('.story-highlight');
            if (highlight) {
                this.currentHighlightIndex = parseInt(highlight.dataset.highlightIndex);
                this.currentStoryIndex = 0;
                this.isPlaying = true;
                this.loadStory(this.currentHighlightIndex, this.currentStoryIndex);
            }
        };

        this.handleNextClick = () => {
            this.isPlaying = true;
            this.nextStory();
        };

        this.handlePrevClick = () => {
            this.isPlaying = true;
            this.prevStory();
        };

        this.handleViewerClick = (e) => {
            if (e.target.closest('.story-progress')) return;
            this.isPlaying = !this.isPlaying;
            if (this.isPlaying) {
                this.startProgress(picturesHighlightsData[this.currentHighlightIndex].stories[this.currentStoryIndex].duration);
            } else {
                this.stopProgress();
            }
        };

        // Add event listeners
        this.highlightsContainer.addEventListener('click', this.handleHighlightClick);
        this.nextBtn.addEventListener('click', this.handleNextClick);
        this.prevBtn.addEventListener('click', this.handlePrevClick);
        this.viewerContainer.addEventListener('click', this.handleViewerClick);
    }
}

function displayPlayerCard(playerData) {
    // const container = $('#players #player-card-container');
    // if (!container.length) {
    //     $('#players').append('<div id="player-card-container"></div>');
    // }
    // container.html(`
    //     <div class="player-card">
    //         <h2>${playerData.name}</h2>
    //         <p>Position: ${playerData.pos}</p>
    //         <p>Height: ${playerData.height}</p>
    //         <p>Origin: ${playerData.origin}</p>
    //         <p>Games: ${playerData.games}</p>
    //         <p>Goals: ${playerData.goals}</p>
    //     </div>
    // `);
}


let storyViewer = null;



// ********************************************************************************************************************



// Content loading

function loadContent(contentType) {
    console.log(`Loading content: ${contentType}`);

    // Hide all story sections
    $('.story-section').attr('hidden', true);

    if (contentType !== 'live') {
        const videoFrame = document.getElementById('videoFrame');
        if (videoFrame) {
            videoFrame.src = 'about:blank'; // Stop the video
        }
    }

    let sectionId;
    switch (contentType.toLowerCase()) {
        case 'pictures':
            sectionId = 'pictures';
            if (!storyViewer) {
                storyViewer = new StoryViewer();
            } else {
                storyViewer.reset();
            }
            // // Initialize the navbar
            // const highlightsNavbar = new HighlightsNavbar(
            //     picturesHighlightsData,
            //     '#highlightsNavbar',
            //     (selectedHighlight) => {
            //         // This callback is called when a highlight is selected
            //         if (storyPlayer) {
            //             // Update existing player with new stories
            //             storyPlayer.updateStories(selectedHighlight.stories);
            //         } else {
            //             // Create a new player if none exists
            //             storyPlayer = new StoryPlayer(
            //                 selectedHighlight.stories,
            //                 '#stories',
            //                 '#prevButton',
            //                 '#nextButton'
            //             );
            //         }
            //     }
            // );

            // Auto-select the first highlight to start
            //highlightsNavbar.selectHighlight(0);
            break;
        case 'players':
            sectionId = 'players';
            // const playersNavbar = new HighlightsNavbar(playersHighlightsData, '#highlightsNavbar', (selectedPlayer) => {
            //     displayPlayerCard(selectedPlayer.playerData);
            // });
            if (state.playersArranged == true) {
                resetPlayers();
                setTimeout(() => {
            arrangePlayers();
        }, 100); // Slight delay to ensure reset completes
            } else {
                loadPlayers();
            }

            //if (playersHighlightsData.length > 0) playersNavbar.selectHighlight(0);
            break;
        case 'live':
            sectionId = 'live';
            // Add live section logic if needed
            break;
        case 'socials':
            sectionId = 'socials';
            showSocialsSection()
            break;
        case 'stadium':
            // sectionId = 'stadium';
            // loadStadium(); 
            break;
        case 'about':
            sectionId = 'about';
            break;
        default:
            console.log(`Unknown content type: ${contentType}`);
            return;
    }

    // Show the selected section
    if (sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.hidden = false;
            //section.style.display = 'block';

        } else {
            console.log(`Section with ID '${sectionId}' not found`);
        }
    }
}


    // Initialize StoryViewer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        if (!storyViewer) {
                storyViewer = new StoryViewer();
            } else {
                storyViewer.reset();
            }
    } catch (error) {
        console.error('Failed to initialize StoryViewer:', error);
    }
});




// ********************************************************************************************************************





window.addEventListener('load', () => {
    luxy.init();
});


const mainElement = document.querySelector('#main');
const yearElement = document.getElementById('year');
const navigationNavbar = document.getElementById('navigation');

if (yearElement) {
    yearElement.innerHTML = new Date().getFullYear();
}

function smoothScrollToManual(targetY, duration, callback) {
    const startY = window.pageYOffset;
    const distance = targetY - startY;
    let startTime = null;

    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    function step(currentTime) {
        if (startTime === null) startTime = currentTime;
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(1, elapsedTime / duration);
        const easedProgress = easeInOutQuad(progress);

        window.scrollTo(0, startY + distance * easedProgress);

        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            window.scrollTo(0, targetY); // Ensure exact position
            console.log("Manual scroll completed to:", targetY);
            if (typeof callback === 'function') {
                callback(targetY);
            }
        }
    }

    console.log(`Starting smooth scroll to ${targetY}, from ${startY}, distance ${distance}`);
    requestAnimationFrame(step);
}

document.addEventListener('DOMContentLoaded', function () {
    let isAutoScrolling = false;
    let lastScrollPosition = window.pageYOffset;
    const highlightTriggerPosition = 550; // Trigger when scrolling down
    const upwardTriggerThreshold = 100; // Buffer when scrolling up
    const scrollDuration = 1000; // Duration of smooth scroll in ms

    const highlightsNavbar = document.getElementById('navigation');

    function scrollToHighlightsNavbar() {
        if (!highlightsNavbar || isAutoScrolling) {
            console.log("Highlights Navbar not found or already scrolling");
            return;
        }

        isAutoScrolling = true;

        // Calculate position using offsetTop, walking up the DOM
        let navbarPos = 0;
        let element = highlightsNavbar;
        while (element) {
            navbarPos += element.offsetTop;
            element = element.offsetParent;
        }

        // Adjust for any padding or margins
        const navStyle = window.getComputedStyle(highlightsNavbar);
        const navPaddingTop = parseFloat(navStyle.paddingTop) || 0;

        console.log("Target highlights navbar position:", navbarPos, "Nav padding:", navPaddingTop);

        smoothScrollToManual(navbarPos, scrollDuration, (finalTargetY) => {
            window.scrollTo(0, finalTargetY);

            // Sync Luxy's internal state
            if (luxy) {
                try {
                    luxy.scrollTop = finalTargetY;
                    luxy.wapperOffset = finalTargetY;
                    luxy.wrapper.style.transform = `translate3d(0, ${Math.round(-finalTargetY * 100) / 100}px, 0)`;
                    luxy.scroll();
                    console.log("Luxy synced to:", finalTargetY, "Luxy transform:", luxy.wrapper.style.transform);
                } catch (err) {
                    console.error("Error syncing Luxy:", err);
                }
            }

            setTimeout(() => {
                isAutoScrolling = false;
                console.log("Auto-scroll completed at:", window.pageYOffset);
            }, 250);
        });
    }

    function preventDefaultScroll(e) {
        if (isAutoScrolling) {
            e.preventDefault();
            e.stopPropagation();
        }
    }

    window.addEventListener('wheel', preventDefaultScroll, { passive: false });
    window.addEventListener('touchmove', preventDefaultScroll, { passive: false });

    window.addEventListener('scroll', function () {
        const scrollPosition = window.pageYOffset;

        // Determine scroll direction
        const isScrollingUp = scrollPosition < lastScrollPosition;

        // Calculate highlights navbar top for trigger
        let navbarTop = 0;
        let element = highlightsNavbar;
        while (element) {
            navbarTop += element.offsetTop;
            element = element.offsetParent;
        }

        // Downward trigger
        if (!isAutoScrolling && !isScrollingUp && scrollPosition >= highlightTriggerPosition && scrollPosition < navbarTop) {
            console.log("Triggering scroll to highlights navbar (down) at scroll position:", scrollPosition, "Navbar top:", navbarTop);
            scrollToHighlightsNavbar();
        }

        // Upward trigger
        if (!isAutoScrolling && isScrollingUp && scrollPosition > navbarTop && scrollPosition <= (navbarTop + upwardTriggerThreshold)) {
            console.log("Triggering scroll to highlights navbar (up) at scroll position:", scrollPosition, "Navbar top:", navbarTop);
            scrollToHighlightsNavbar();
        }

        // Update last scroll position
        lastScrollPosition = scrollPosition;
    }, { passive: true });
});



// ********************************************************************************************************************



// Stadium
    

//         async function loadStadium() {
//             await new Promise(resolve => setTimeout(resolve, 1000))

//             const containerElement = document.querySelector("#stadium");
//             const containerWidth = containerElement.clientWidth;
//             const containerHeight = containerElement.clientHeight;
//             console.log(containerElement)


//             const scene = new THREE.Scene();
//             const cssScene = new THREE.Scene(); // Separate scene for CSS objects

//             const camera = new THREE.PerspectiveCamera(
//                 75,
//                 window.innerWidth / window.innerHeight,
//                 0.1,
//                 1000
//             );
//             scene.background = new THREE.Color(0xcccccc);

//             // Create both WebGL and CSS renderers
//             const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//             const cssRenderer = new THREE.CSS3DRenderer();

//             renderer.setSize(containerWidth, containerHeight);
//             cssRenderer.setSize(containerWidth, containerHeight);

//             renderer.shadowMap.enabled = true;
//             renderer.shadowMap.type = THREE.PCFSoftShadowMap;
//             renderer.outputColorSpace = THREE.SRGBColorSpace;
//             renderer.toneMapping = THREE.ACESFilmicToneMapping;
//             renderer.toneMappingExposure = 1;

//             // Style and position CSS renderer
//             cssRenderer.domElement.style.position = "absolute";
//             cssRenderer.domElement.style.top = "0";
//             cssRenderer.domElement.style.pointerEvents = "none"; // Let events pass through to WebGL

//             // Add both renderers
//             var root = $(document);
//             const container = root.find("#stadium");

//             container.append(renderer.domElement);
//             container.append(cssRenderer.domElement);

//             const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//             scene.add(ambientLight);

//             const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//             directionalLight.position.set(5, 5, 5);
//             directionalLight.castShadow = true;
//             scene.add(directionalLight);

//             // Function to create a CSS 3D object
//             function createCSS3DElement(innerHTML, position, rotation, scale) {
//                 // Create div element
//                 const element = document.createElement("div");
//                 element.innerHTML = innerHTML;
//                 element.style.background = "rgba(0, 127, 127, 0.8)";
//                 element.style.padding = "20px";
//                 element.style.borderRadius = "10px";
//                 element.style.transform = "translate(-50%, -50%)";

//                 // Create CSS3D object
//                 const objectCSS = new THREE.CSS3DObject(element);
//                 objectCSS.position.copy(position);
//                 objectCSS.rotation.copy(rotation);
//                 objectCSS.scale.copy(scale);

//                 return objectCSS;
//             }

//             // Example CSS elements
//             const cssContent1 = `
//         <div style="width: 200px; transform-style: preserve-3d;">
//             <h2 style="color: white; margin: 0;">Welcome!</h2>
//             <p style="color: white; margin: 10px 0;">This is a 3D transformed element</p>
//             <div style="
//                 background: white;
//                 width: 50px;
//                 height: 50px;
//                 margin: 10px auto;
//                 animation: spin 4s linear infinite;
//             "></div>
//         </div>
//         <style>
//             @keyframes spin {
//                 from { transform: rotateY(0deg); }
//                 to { transform: rotateY(360deg); }
//             }
//         </style>
//     `;

//             const cssContent2 = `
//         <div style="
//             width: 150px;
//             height: 150px;
//             background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
//             transform-style: preserve-3d;
//             animation: float 3s ease-in-out infinite;
//         ">
//         </div>
//         <style>
//             @keyframes float {
//                 0%, 100% { transform: translateY(0); }
//                 50% { transform: translateY(-20px); }
//             }
//         </style>
//     `;

//             // Add CSS elements to the scene
//             const cssObject1 = createCSS3DElement(
//                 cssContent1,
//                 new THREE.Vector3(10, 5, 0),
//                 new THREE.Euler(0, -Math.PI / 4, 0),
//                 new THREE.Vector3(0.01, 0.01, 0.01)
//             );
//             cssScene.add(cssObject1);

//             const cssObject2 = createCSS3DElement(
//                 cssContent2,
//                 new THREE.Vector3(-10, 5, 0),
//                 new THREE.Euler(0, Math.PI / 4, 0),
//                 new THREE.Vector3(0.01, 0.01, 0.01)
//             );
//             cssScene.add(cssObject2);

//             // Add orbit controls
//             const controls = new THREE.OrbitControls(camera, renderer.domElement);
//             const cameraInfo = document.createElement("div");
//             let initialCameraPosition = null;

//             function updateCameraInfo() {
//                 cameraInfo.innerHTML = `
//         Camera Position:
//         X: ${camera.position.x.toFixed(2)}
//         Y: ${camera.position.y.toFixed(2)}
//         Z: ${camera.position.z.toFixed(2)}
        
//         Target Position:
//         X: ${controls.target.x.toFixed(2)}
//         Y: ${controls.target.y.toFixed(2)}
//         Z: ${controls.target.z.toFixed(2)}
        
//         Distance to Target: ${camera.position
//                         .distanceTo(controls.target)
//                         .toFixed(2)}
//     `.replace(/\n/g, "<br>");
//             }

//             function showCoordinates() {
//                 cameraInfo.style.position = "absolute";
//                 cameraInfo.style.top = "10px";
//                 cameraInfo.style.left = "10px";
//                 cameraInfo.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
//                 cameraInfo.style.color = "white";
//                 cameraInfo.style.padding = "10px";
//                 cameraInfo.style.fontFamily = "monospace";
//                 cameraInfo.style.fontSize = "12px";
//                 root.find("#stadium").append(cameraInfo);

//                 // Create camera control panel
//                 const controlPanel = document.createElement("div");
//                 controlPanel.style.position = "absolute";
//                 controlPanel.style.top = "10px";
//                 controlPanel.style.right = "10px";
//                 controlPanel.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
//                 controlPanel.style.color = "white";
//                 controlPanel.style.padding = "10px";
//                 controlPanel.innerHTML = `
//     <div style="margin-bottom: 10px;">
//         <button onclick="moveCamera('x', 1)">X+</button>
//         <button onclick="moveCamera('x', -1)">X-</button>
//         <button onclick="moveCamera('y', 1)">Y+</button>
//         <button onclick="moveCamera('y', -1)">Y-</button>
//         <button onclick="moveCamera('z', 1)">Z+</button>
//         <button onclick="moveCamera('z', -1)">Z-</button>
//     </div>
//     <div>
//         <button onclick="orbitCamera('horizontal', 0.1)">Orbit Left</button>
//         <button onclick="orbitCamera('horizontal', -0.1)">Orbit Right</button>
//         <button onclick="orbitCamera('vertical', 0.1)">Orbit Up</button>
//         <button onclick="orbitCamera('vertical', -0.1)">Orbit Down</button>
//     </div>
//     <div style="margin-top: 10px;">
//         <button onclick="resetCamera()">Reset Camera</button>
//     </div>
// `;
//                 root.find("#stadium").append(controlPanel);

//                 // Store initial camera position for reset
//                 //let initialCameraPosition = null;

//                 // Function to move camera
//                 window.moveCamera = function (axis, amount) {
//                     const moveAmount = 1; // Amount to move per click
//                     switch (axis) {
//                         case "x":
//                             camera.position.x += amount * moveAmount;
//                             controls.target.x += amount * moveAmount;
//                             break;
//                         case "y":
//                             camera.position.y += amount * moveAmount;
//                             controls.target.y += amount * moveAmount;
//                             break;
//                         case "z":
//                             camera.position.z += amount * moveAmount;
//                             controls.target.z += amount * moveAmount;
//                             break;
//                     }
//                     controls.update();
//                 };

//                 // Function to orbit camera
//                 window.orbitCamera = function (direction, amount) {
//                     const radius = camera.position.distanceTo(controls.target);
//                     const currentAzimuth = Math.atan2(
//                         camera.position.x - controls.target.x,
//                         camera.position.z - controls.target.z
//                     );
//                     const currentPolar = Math.acos(
//                         (camera.position.y - controls.target.y) / radius
//                     );

//                     if (direction === "horizontal") {
//                         const newAzimuth = currentAzimuth + amount;
//                         camera.position.x =
//                             controls.target.x +
//                             radius * Math.sin(newAzimuth) * Math.sin(currentPolar);
//                         camera.position.z =
//                             controls.target.z +
//                             radius * Math.cos(newAzimuth) * Math.sin(currentPolar);
//                     } else if (direction === "vertical") {
//                         const newPolar = Math.max(
//                             0.1,
//                             Math.min(Math.PI - 0.1, currentPolar - amount)
//                         );
//                         camera.position.y = controls.target.y + radius * Math.cos(newPolar);
//                         const sinPolar = Math.sin(newPolar);
//                         camera.position.x =
//                             controls.target.x + radius * Math.sin(currentAzimuth) * sinPolar;
//                         camera.position.z =
//                             controls.target.z + radius * Math.cos(currentAzimuth) * sinPolar;
//                     }

//                     camera.lookAt(controls.target);
//                     controls.update();
//                 };

//                 // Function to reset camera
//                 window.resetCamera = function () {
//                     if (initialCameraPosition) {
//                         camera.position.copy(initialCameraPosition);
//                         controls.target.set(0, 0, 0);
//                         camera.lookAt(controls.target);
//                         controls.update();
//                     }
//                 };
//             }

//             function cameraSetup() {
//                 // Existing camera controls setup
//                 controls.enableDamping = true;
//                 controls.dampingFactor = 0.05;
//                 controls.screenSpacePanning = false;
//                 controls.rotateSpeed = 0.3;

//                 // More restrictive camera movement limits
//                 controls.minPolarAngle = Math.PI / 6; // Limit vertical rotation (prevent looking directly up/down)
//                 controls.maxPolarAngle = (Math.PI * 5) / 9; // Prevent flipping camera upside down

//                 // Distance limits (adjust these based on your scene)
//                 controls.minDistance = 20; // Minimum zoom in distance
//                 controls.maxDistance = 50; // Maximum zoom out distance

//                 // Optionally, limit horizontal rotation if needed
//                 //controls.minAzimuthAngle = -Math.PI / 6;  // Left rotation limit
//                 //controls.maxAzimuthAngle = Math.PI / 6;   // Right rotation limit
//             }

//             const loader = new THREE.GLTFLoader();

//             loader.load(
//                 "./assets/stadion/export/web_stadion_v2.glb",
//                 function (gltf) {
//                     gltf.scene.traverse((child) => {
//                         if (child.isMesh) {
//                             if (child.material) {
//                                 if (child.material.name === "Material.004") {
//                                     child.material.color.setRGB(1, 0, 0);
//                                 }
//                                 child.material.needsUpdate = true;
//                                 child.material.metalness = 0;
//                                 child.material.roughness = 0.5;
//                             }
//                         }
//                     });

//                     const box = new THREE.Box3().setFromObject(gltf.scene);
//                     const center = box.getCenter(new THREE.Vector3());
//                     gltf.scene.position.sub(center);

//                     scene.add(gltf.scene);

//                     const size = box.getSize(new THREE.Vector3());
//                     const maxDim = Math.max(size.x, size.y, size.z);
//                     const fov = camera.fov * (Math.PI / 180); // from degrees to radians
//                     let cameraZ = Math.abs(maxDim / Math.tan(fov / 2));

//                     // Calculate camera position for 90-degree rotation
//                     const angle = Math.PI / 1; // 90 degrees in radians
//                     const cameraX = cameraZ * Math.cos(angle);
//                     const cameraY = cameraZ * Math.sin(angle);

//                     //camera.position.set(cameraX, cameraZ, cameraY);
//                     camera.position.x = 53;
//                     camera.position.y = 30;
//                     camera.position.z = 0;

//                     camera.lookAt(new THREE.Vector3(0, 0, 0));

//                     controls.target.x = 38;
//                     controls.target.y = 17;
//                     controls.target.z = 0;

//                     controls.update();
//                     controls.saveState();

//                     initializePlayerCards();
//                     showCoordinates();
//                     cameraSetup();
//                     updateCSSPosition();

//                     animate();
//                 },
//                 function (xhr) {
//                     console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
//                 },
//                 function (error) {
//                     console.log("An error happened" + { error });
//                 }
//             );

//             // Handle window resizing
//             window.addEventListener("resize", onWindowResize, false);

//             function onWindowResize() {
//                 camera.aspect = window.innerWidth / window.innerHeight;
//                 camera.updateProjectionMatrix();

//                 renderer.setSize(window.innerWidth, window.innerHeight);
//                 cssRenderer.setSize(window.innerWidth, window.innerHeight);
//             }

//             const futCardStyles = `
//                 #fut-card-container {
//                     position: relative;
//                     width: 200px;
//                     margin: 20px;
                    
//                 }

//                 #fut-card {
//                     position: relative;
//                     width: 200px;
//                     height: 250px;
                    
//                 }

//                 #fut-card img {
//                     width: 200px;
//                     height: 250px;
//                 }

//                 #fut-card-name {
//                     position: absolute;
//                     bottom: 60px;
//                     left: 50%;
//                     transform: translateX(-50%);
//                     color: #000;
//                     font-weight: bold;
//                     font-size: 14px;
//                     text-align: center;
//                 }

//                 #fut-card-value {
//                     position: absolute;
//                     top: 40px;
//                     left: 50%;
//                     transform: translateX(-50%);
//                     color: #000;
//                     font-weight: bold;
//                     font-size: 24px;
//                 }

//                 #fut-card-position {
//                     position: absolute;
//                     top: 70px;
//                     left: 50%;
//                     transform: translateX(-50%);
//                     color: #000;
//                     font-size: 14px;
//                 }

//                 #fut-card-player {
//                     position: absolute;
//                     top: -20px;
//                     left: 50%;
//                     transform: translateX(-50%);
//                     width: 250px;
//                     height: 300px;
//                     z-index: 2;
//                 }

//                 #fut-card-player img {
//                     width: 100%;
//                     height: 100%;
//                     object-fit: contain;
//                 }

//                 .remove-button {
//                     position: absolute;
//                     right: 10px;
//                     top: 10px;
//                     border: none;
//                     background: none;
//                     cursor: pointer;
//                     font-size: 20px;
//                     z-index: 3;
//                 }
//                 `;

//             function createFutCard(player) {
//                 return `
//             <style>${futCardStyles}</style>
//             <div id="fut-card-container" class="${player.name}">
//                 <button class="remove-button" onclick="this.parentElement.remove()">×</button>
//                 <div id="fut-card">
//                     <img src="${FUT_CARD_EMPTY_ASSET_URL}Empty.png" alt="Card Background">
//                     <span id="fut-card-name">${player.name}</span>
//                     <span id="fut-card-value">"94"</span>
//                     <span id="fut-card-position">"Ruckman"</span>
//                 </div>
//                 <div id="fut-card-player">
//                     <img src="${PLAYER_ASSET_URL}Jure_crop.png" alt="Player Image">
//                 </div>
//             </div>
//         `;
//             }

//             // Function to create player cards as CSS3D objects
//             function createPlayerCards(scene, cssScene) {
//                 ASSET_URL = "./images/players/profil/";
//                 FUT_CARD_EMPTY_ASSET_URL = "./images/players/fut/";
//                 PLAYER_ASSET_URL = "./images/players/crop/";

//                 data = {
//                     players: {
//                         home: [
//                             {
//                                 name: "Duksi",
//                                 asset: "Duksi",
//                                 origin: "Peru",
//                                 height: "1.84m",
//                                 shirt: "14",
//                                 pos: "FB",
//                                 dob: "36",
//                                 goals: 1,
//                                 games: 16,
//                                 position: { x: [-31, -34], y: -210, z: 42, left: 50 },
//                             },
//                             {
//                                 name: "Dinko",
//                                 asset: "Dinko",
//                                 origin: "Peru",
//                                 height: "1.84m",
//                                 shirt: "14",
//                                 pos: "HB",
//                                 dob: "36",
//                                 goals: 1,
//                                 games: 16,
//                                 position: { x: [-21, -27], y: -111, z: 42, left: 26 },
//                             },
//                             {
//                                 name: "Neno",
//                                 asset: "Neno",
//                                 origin: "Peru",
//                                 height: "1.84m",
//                                 shirt: "14",
//                                 pos: "HB",
//                                 dob: "36",
//                                 goals: 1,
//                                 games: 16,
//                                 position: { x: [-22, -34], y: -111, z: 40, left: 72 },
//                             },
//                             {
//                                 name: "Mole",
//                                 asset: "Mole",
//                                 origin: "Peru",
//                                 height: "1.84m",
//                                 shirt: "14",
//                                 pos: "R",
//                                 dob: "36",
//                                 goals: 1,
//                                 games: 16,
//                                 position: { x: [-21, -27], y: 51, z: 42, left: 63 },
//                             },
//                             {
//                                 name: "Vele",
//                                 asset: "Vele",
//                                 origin: "Peru",
//                                 height: "1.84m",
//                                 shirt: "14",
//                                 pos: "R",
//                                 dob: "36",
//                                 goals: 1,
//                                 games: 16,
//                                 position: { x: [-21, -27], y: 128, z: 42, left: 49 },
//                             },
//                             {
//                                 name: "Piksi",
//                                 asset: "Piksi",
//                                 origin: "Peru",
//                                 height: "1.84m",
//                                 shirt: "14",
//                                 pos: "R",
//                                 dob: "36",
//                                 goals: 1,
//                                 games: 16,
//                                 position: { x: [-21, -27], y: 51, z: 42, left: 36 },
//                             },
//                             {
//                                 name: "Kolja",
//                                 asset: "Kolja",
//                                 origin: "Peru",
//                                 height: "1.84m",
//                                 shirt: "14",
//                                 pos: "HF",
//                                 dob: "36",
//                                 goals: 1,
//                                 games: 16,
//                                 position: { x: [-21, -27], y: 267, z: 42, left: 70 },
//                             },
//                             {
//                                 name: "Zgela",
//                                 asset: "Zgela",
//                                 origin: "Peru",
//                                 height: "1.84m",
//                                 shirt: "14",
//                                 pos: "HF",
//                                 dob: "36",
//                                 goals: 1,
//                                 games: 16,
//                                 position: { x: [-21, -27], y: 265, z: 42, left: 29 },
//                             },
//                             {
//                                 name: "Mac",
//                                 asset: "Mac",
//                                 origin: "Peru",
//                                 height: "1.84m",
//                                 shirt: "14",
//                                 pos: "FF",
//                                 dob: "36",
//                                 goals: 1,
//                                 games: 16,
//                                 position: { x: [-31, -34], y: 337, z: 42, left: 50 },
//                             },
//                         ],
//                         away: [
//                             {
//                                 name: "Pizarro",
//                                 asset: "bm-pizarro.jpg",
//                                 origin: "Peru",
//                                 height: "1.84m",
//                                 shirt: "14",
//                                 pos: "Forward",
//                                 dob: "36",
//                                 goals: 1,
//                                 games: 16,
//                                 x: 110,
//                                 y: -190,
//                             },
//                             {
//                                 name: "Pizarro",
//                                 asset: "bm-pizarro.jpg",
//                                 origin: "Peru",
//                                 height: "1.84m",
//                                 shirt: "14",
//                                 pos: "Forward",
//                                 dob: "36",
//                                 goals: 1,
//                                 games: 16,
//                                 x: 110,
//                                 y: -190,
//                             },
//                             {
//                                 name: "Pizarro",
//                                 asset: "bm-pizarro.jpg",
//                                 origin: "Peru",
//                                 height: "1.84m",
//                                 shirt: "14",
//                                 pos: "Forward",
//                                 dob: "36",
//                                 goals: 1,
//                                 games: 16,
//                                 x: 110,
//                                 y: -190,
//                             },
//                             {
//                                 name: "Pizarro",
//                                 asset: "bm-pizarro.jpg",
//                                 origin: "Peru",
//                                 height: "1.84m",
//                                 shirt: "14",
//                                 pos: "Forward",
//                                 dob: "36",
//                                 goals: 1,
//                                 games: 16,
//                                 x: 110,
//                                 y: -190,
//                             },
//                             {
//                                 name: "Pizarro",
//                                 asset: "bm-pizarro.jpg",
//                                 origin: "Peru",
//                                 height: "1.84m",
//                                 shirt: "14",
//                                 pos: "Forward",
//                                 dob: "36",
//                                 goals: 1,
//                                 games: 16,
//                                 x: 110,
//                                 y: -190,
//                             },
//                         ],
//                     },
//                 };

//                 const position = getObjectSizeFromBoundingBox("Circle002");
//                 const position2 = get3DObjectScreenPosition(
//                     "Circle002",
//                     camera,
//                     renderer
//                 );

//                 const players = data.players.home;
//                 const fieldWidth = position2.width; // meters
//                 const fieldLength = position2.height; // meters
//                 const players_coord = generatePlayerPositions(fieldWidth, fieldLength);
//                 var i = 0;
//                 players.forEach((player) => {
//                     // Function to create FUT card HTM
//                     cardHTML = createFutCard(player);

//                     // Create CSS3D object
//                     const element = document.createElement("div");
//                     element.innerHTML = cardHTML;
//                     const objectCSS = new THREE.CSS3DObject(element);

//                     // Convert field coordinates to 3D space
//                     // Adjust these multipliers based on your stadium scale
//                     const x = players_coord[i].x;
//                     const y = players_coord[i].y;
//                     const z = 1;

//                     // Position the card
//                     objectCSS.position.set(x, -10, y);

//                     //objectCSS.position.set(x, z, 0);
//                     // Rotate to face camera
//                     // objectCSS.rotation.set(Math.PI / 4, Math.PI / 2, 0);
//                     // Rotate around X axis to tilt upwards
//                     //objectCSS.rotateX(0);

//                     // Then rotate around Y axis
//                     objectCSS.rotateY(Math.PI / 2);
//                     //objectCSS.rotateZ(0);

//                     // console.log("🚀 ~ players.forEach ~ objectCSS.rotation.x:", objectCSS.rotation.x)
//                     // console.log("🚀 ~ players.forEach ~ objectCSS.rotation.y:", objectCSS.rotation.y)
//                     // console.log("🚀 ~ players.forEach ~ objectCSS.rotation.z:", objectCSS.rotation.z)
//                     // Scale to fit in the scene
//                     objectCSS.scale.set(0.07, 0.07, 0.07);

//                     // Add click interaction
//                     element.addEventListener("click", () => {
//                         showPlayerDetails(player);
//                     });

//                     // Add to CSS scene
//                     cssScene.add(objectCSS);
//                     i = i + 1;
//                 });

//             }

//             // Function to show detailed player card
//             function showPlayerDetails(player) {
//                 const detailCard = document.createElement("div");
//                 detailCard.style.position = "fixed";
//                 detailCard.style.top = "50%";
//                 detailCard.style.left = "50%";
//                 detailCard.style.transform = "translate(-50%, -50%)";
//                 detailCard.style.zIndex = "1000";
//                 detailCard.style.background = "white";
//                 detailCard.style.padding = "20px";
//                 detailCard.style.borderRadius = "10px";
//                 detailCard.style.boxShadow = "0 0 20px rgba(0,0,0,0.2)";

//                 detailCard.innerHTML = `
//     <div style="position: relative;">
//         <button onclick="this.parentElement.parentElement.remove()" 
//                 style="position: absolute; right: 10px; top: 10px; 
//                        border: none; background: none; cursor: pointer;">×</button>
//         <img src="${FUT_CARD_EMPTY_ASSET_URL}Empty.png" style="width: 300px;">
//         <div style="position: absolute; top: 50px; width: 100%; text-align: center;">
//             <h2>${player.name}</h2>
//             <p>Position: ${player.pos}</p>
//             <p>Height: ${player.height}</p>
//             <p>Origin: ${player.origin}</p>
//             <p>Games: ${player.games}</p>
//             <p>Goals: ${player.goals}</p>
//         </div>
//     </div>
// `;

//                 document.body.appendChild(detailCard);
//             }

//             // Initialize the player cards
//             function initializePlayerCards() {
//                 // console.log(scene.children.find(e => e.name == "Scene").children.find(a => a.name == "Circle001"))
//                 // console.log(scene.getObjectByName('Circle002'))

//                 //console.log(Math.PI)
//                 // Create the player cards
//                 createPlayerCards(scene, cssScene);
//             }

//             function get3DObjectScreenPosition(objectName, camera, renderer) {
//                 // Get the object
//                 const object = scene.getObjectByName(objectName);

//                 // Check if object exists and is loaded
//                 if (!object) {
//                     console.warn(`Object ${objectName} not found`);
//                     return null;
//                 }

//                 // Ensure object is updated
//                 object.updateMatrixWorld(true);

//                 // Create vectors for calculations
//                 const vector = new THREE.Vector3();

//                 try {
//                     // Get the object's bounding box
//                     const boundingBox = new THREE.Box3();
//                     boundingBox.setFromObject(object);

//                     // Check if bounding box is valid
//                     if (boundingBox.min.x === Infinity || boundingBox.max.x === -Infinity) {
//                         console.warn("Invalid bounding box");
//                         return null;
//                     }

//                     // Get center point
//                     boundingBox.getCenter(vector);

//                     // Get size
//                     const size = new THREE.Vector3();
//                     boundingBox.getSize(size);

//                     // Project to screen space
//                     vector.project(camera);

//                     // Convert to screen coordinates
//                     const widthHalf = renderer.domElement.width / 2;
//                     const heightHalf = renderer.domElement.height / 2;

//                     return {
//                         x: vector.x * widthHalf + widthHalf,
//                         y: -(vector.y * heightHalf) + heightHalf,
//                         scale: size.length() / Math.max(0.1, vector.z),
//                         width: size.x,
//                         height: size.y,
//                     };
//                 } catch (error) {
//                     console.warn("Error calculating object position:", error);
//                     return null;
//                 }
//             }

//             function getObjectSizeFromBoundingBox(object) {
//                 // Create a new bounding box
//                 const boundingBox = new THREE.Box3().setFromObject(
//                     scene.getObjectByName(object)
//                 );

//                 // Get the dimensions
//                 const size = {
//                     width: boundingBox.max.x - boundingBox.min.x,
//                     height: boundingBox.max.z - boundingBox.min.z,
//                     depth: boundingBox.max.y - boundingBox.min.y,
//                 };

//                 // Get the center point
//                 const center = new THREE.Vector3();
//                 boundingBox.getCenter(center);

//                 return {
//                     dimensions: size,
//                     center: center,
//                 };
//             }

//             // Update CSS element position   in animation loop
//             function updateCSSPosition() {
//                 // Assuming you have your 3D object from Blender
//                 //const position = getObjectSizeFromBoundingBox('Circle001');
//                 //console.log(position)
//                 // Apply to your CSS element
//                 // const cssElement = root.find('#fut-card-container');
//                 // cssElement.style.position = 'absolute';
//                 // cssElement.style.left = `${position.x}px`;
//                 // cssElement.style.top = `${position.y}px`;
//                 // // // Optional: Scale the CSS element based on distance
//                 // const scale = Math.min(Math.max(position.scale, 0.5), 2); // Limit scale between 0.5 and 2
//                 // cssElement.style.transform = `translate(-50%, -50%) scale(${scale})`;
//             }

//             ASSET_URL = "../../images/players/profil/";
//             FUT_CARD_EMPTY_ASSET_URL = "../../images/players/fut/";
//             PLAYER_ASSET_URL = "../../images/players/crop/";

//             // const card = `
//             //     <style>${futCardStyles}</style>
//             //         <div id="fut-card-container" class="sdas">
//             //             <button class="remove-button" onclick="this.parentElement.remove()">×</button>
//             //             <div id="fut-card">
//             //                 <img src="${FUT_CARD_EMPTY_ASSET_URL}Empty.png" alt="Card Background">
//             //                 <span id="fut-card-name">"fvsd"</span>
//             //                 <span id="fut-card-value">"94"</span>
//             //                 <span id="fut-card-position">"Ruckman"</span>
//             //             </div>
//             //             <div id="fut-card-player">
//             //                 <img src="${PLAYER_ASSET_URL}Jure_crop.png" alt="Player Image">
//             //             </div>
//             //         </div>`;

//             // const cardObject1 = createCSS3DElement(
//             //     card,
//             //     new THREE.Vector3(48, -10, 20),
//             //     new THREE.Euler(0, Math.PI / 2, 0),
//             //     new THREE.Vector3(0.05, 0.05, 0.05)
//             // );
//             // cssScene.add(cardObject1);

//             function animate() {
//                 requestAnimationFrame(animate);
//                 controls.update();
//                 updateCameraInfo();
//                 //updateCSSPosition();

//                 // Render both scenes
//                 renderer.render(scene, camera);
//                 cssRenderer.render(cssScene, camera);
//             }

//             function generatePlayerPositions() {
//                 // Field dimensions based on given coordinates
//                 const fieldWidth = 50; // Now using the original length as width
//                 const fieldLength = 90; // Now using the original width as length

//                 // Player height range (in meters)
//                 const minHeight = 0;
//                 const maxHeight = 0.1;

//                 const positions = [
//                     // 1 Goalkeeper
//                     {
//                         x: 40,
//                         y: 0,
//                         z: Math.random() * (maxHeight - minHeight) + minHeight,
//                         position: "Goalkeeper",
//                     },

//                     // 2 Defenders
//                     {
//                         x: 45 * 0.5,
//                         y: 25 * 0.4,
//                         z: Math.random() * (maxHeight - minHeight) + minHeight,
//                         position: "Left Defender",
//                     },
//                     {
//                         x: 45 * 0.5,
//                         y: -25 * 0.4,
//                         z: Math.random() * (maxHeight - minHeight) + minHeight,
//                         position: "Right Defender",
//                     },

//                     // 3 Midfielders
//                     {
//                         x: 0,
//                         y: 25 * 0.4,
//                         z: Math.random() * (maxHeight - minHeight) + minHeight,
//                         position: "Left Defensive Midfielder",
//                     },
//                     {
//                         x: 15,
//                         y: 0,
//                         z: Math.random() * (maxHeight - minHeight) + minHeight,
//                         position: "Central Midfielder",
//                     },
//                     {
//                         x: 0,
//                         y: -25 * 0.4,
//                         z: Math.random() * (maxHeight - minHeight) + minHeight,
//                         position: "Right Defensive Midfielder",
//                     },

//                     // 2 Attacking Midfielders
//                     {
//                         x: -45 * 0.6,
//                         y: -25 * 0.4,
//                         z: Math.random() * (maxHeight - minHeight) + minHeight,
//                         position: "Left Attacking Midfielder",
//                     },
//                     {
//                         x: -45 * 0.6,
//                         y: 25 * 0.4,
//                         z: Math.random() * (maxHeight - minHeight) + minHeight,
//                         position: "Right Attacking Midfielder",
//                     },

//                     // 1 Striker
//                     {
//                         x: -40,
//                         y: 0,
//                         z: Math.random() * (maxHeight - minHeight) + minHeight,
//                         position: "Striker",
//                     },
//                 ];

//                 return positions;
//             }

//         };
    

// ********************************************************************************************************************


    
// Video playre
    
function playVideo(videoId, title, channel) {
    const iframe = document.getElementById('videoFrame');

    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

    iframe.style.display = 'block';

    document.getElementById('videoTitle').textContent = title;
    document.getElementById('videoChannel').textContent = channel;
}


// ********************************************************************************************************************


