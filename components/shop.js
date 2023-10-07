import { fetchComponent, parseElement } from "../js/index.js";


class Shop extends HTMLElement {
    constructor() {
        super();

    }
    connectedCallback() {
        fetchComponent('./components/shop.html').then((content) => {
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
            console.log(scriptElements);
            const script = document.createElement('script');
            script.textContent = scriptElements[0].textContent;
            document.body.appendChild(script);
        }
    }
}


customElements.define('shop-component', Shop);