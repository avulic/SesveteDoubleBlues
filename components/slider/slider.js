import { fetchComponent, parseElement, parseTemplateElement } from "../../js/index.js";


export class Slider extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        if (!this.shadowRoot) {
            fetchComponent('./components/slider/slider.html').then((content) => {
                const shadow = this.attachShadow({ mode: "open" });
                if (content) {
                    this.innerHTML = '';
                    var template = parseTemplateElement(content)
                    shadow.appendChild(template.content);
                }
            });
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
        }
        if (scriptElements.length === 1) {
            const script = document.createElement('script');
            script.textContent = scriptElements[0].textContent;
            document.body.appendChild(script);
        }
    }
}




customElements.define('slider-component', Slider);