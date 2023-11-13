import { fetchComponent, parseElement, parseTemplateElement } from "../../js/index.js";


export class Kolo1 extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        if (!this.shadowRoot) {
            fetchComponent('./components/games/1_kolo.html').then((content) => {
                const shadow = this.attachShadow({ mode: "open" });
                if (content) {
                    this.innerHTML = '';
                    var template = parseTemplateElement(content)
                    shadow.appendChild(template.content);
                }
            });
        }
    }
}


function updateStyle() {
    // Apply external styles to the shadow dom
    const linkElem = document.createElement("link");
    linkElem.setAttribute("rel", "stylesheet");
    linkElem.setAttribute("href", "styles.css");
}

customElements.define('kolo1-component', Kolo1);