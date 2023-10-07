import { fetchComponent, parseElement } from "../js/index.js";

class Header extends HTMLElement {
    constructor() {
        super();

    }

    connectedCallback() {
        // Fetch the HTML template and append it to the Shadow DOM
        fetchComponent('./components/header.html').then((content) => {
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
        } else {

            const script = document.createElement('script');
            script.textContent = scriptElements[0].textContent;
            document.body.appendChild(script);


        }
    }
}
customElements.define('header-component', Header);
