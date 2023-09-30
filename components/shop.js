import { fetchComponent } from "../js/index.js";


class Shop extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        fetchComponent('./components/shop.html').then((innerHtml) => {
            this.innerHTML = innerHtml
        });
    }
}

customElements.define('shop-component', Shop);