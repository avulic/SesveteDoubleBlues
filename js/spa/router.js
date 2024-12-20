import { parseElement } from '../index.js'
export class Router {
    constructor(routes) {
        if (!routes) {
            throw new Error('Routes parameter is mandatory');
        }
        this.BASE_PATH = this.getBasePath();
        this.routes = routes;
        this.rootElem = document.getElementById('app');
        this.init();
    }

    init() {
        window.addEventListener('hashchange', () => this.hasChanged());
        this.hasChanged();
    }

    hasChanged() {
        const hash = window.location.hash.substr(1);
        const route = this.routes.find((r) => r.isActiveRoute(hash)) || this.routes.find((r) => r.default);
        if (route) {
            this.goToRoute(route.htmlName);
        }
    }

    getBasePath() {
        // Check if running on GitHub Pages
        if (window.location.hostname === 'avulic.github.io') {
            return '/SesveteDoubleBlues';
        }
        // Local development
        return '';
    }


    goToRoute(htmlName) {
        if (typeof htmlName === 'string') {
            const url = `${this.BASE_PATH}/components/${htmlName}`.replace(/\/+/g, '/');
            fetch(url)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`Error fetching ${url}`);
                    }
                    return response.text();
                })
                .then((html) => {
                    const newChild = parseElement(html);
                    this.rootElem.innerHTML = html;
                    this.executeScriptTag(newChild);
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            this.rootElem.innerHTML = ""
            this.rootElem.appendChild(htmlName);
        }
    }


    executeScriptTag(element) {
        // Get the script element in the Shadow DOM.
        const scriptElements = element.getElementsByTagName('script');

        // Check if a script element exists.
        if (scriptElements.length > 1) {
            scriptElements.forEach((scriptElement) => {
                const script = document.createElement('script');
                script.textContent = scriptElement.textContent;
                document.body.appendChild(script);
            });
            //scriptElements.remove();
        }
        if (scriptElements.length === 1) {
            const script = document.createElement('script');
            script.textContent = scriptElements[0].textContent;
            document.body.appendChild(script);
        }
    }
}

