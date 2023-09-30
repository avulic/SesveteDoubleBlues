import { fetchComponent } from "../js/index.js";

class Navigation extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        fetchComponent('./components/navigation.html').then((innerHtml) => {
            this.innerHTML = innerHtml
        });
    }
}


function showContent() {
    let temp = document.getElementsByTagName("template")[0];
    let clon = temp.content.cloneNode(true);
    document.body.appendChild(clon);
}



customElements.define('navigation-component', Navigation);
