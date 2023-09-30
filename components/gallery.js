import { fetchComponent } from "../js/index.js";


class Gallery extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        fetchComponent('./components/gallery.html').then((innerHtml) => {
            this.innerHTML = innerHtml
        });
    }
}

customElements.define('gallery-component', Gallery);