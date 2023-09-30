import { fetchComponent } from "../js/index.js";


class Header extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        fetchComponent('./components/header.html').then((innerHtml) => {
            this.innerHTML = innerHtml
        });
    }
}

customElements.define('header-component', Header);