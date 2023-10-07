export class Route {
    constructor(name, htmlName, defaultRoute) {
        if (!name || !htmlName) {
            throw 'error: name and htmlName params are mandatory';
        }

        this.name = name;
        this.htmlName = htmlName;
        this.default = defaultRoute;
    }

    isActiveRoute(hashedPath) {
        return hashedPath.replace('#', '') === this.name;
    }
}
