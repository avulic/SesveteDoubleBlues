import { fetchComponent, parseElement } from "../../js/index.js";


export class Players extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        fetchComponent('./components/players/Players.html').then((content) => {
            if (content) {
                this.innerHTML = content;
                var element = parseElement(content)
                this.executeScriptTag(element);
            }
        });
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


function updateStyle() {
    // Apply external styles to the shadow dom
    const linkElem = document.createElement("link");
    linkElem.setAttribute("rel", "stylesheet");
    linkElem.setAttribute("href", "styles.css");
}

customElements.define('players-component', Players);