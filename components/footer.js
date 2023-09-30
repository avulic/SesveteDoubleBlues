import { fetchComponent } from "../js/index.js";


class Footer extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        fetchComponent('./components/footer.html').then((innerHtml) => {
            this.innerHTML = innerHtml
        });
    }
}

customElements.define('footer-component', Footer);