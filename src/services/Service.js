export default class Service {
    constructor(domain, path) {
        path = path || "/";
        domain = domain || window.location.hostname;

        this.cookie = { domain, path };
    }

    enable() {
        //
    }

    disable() {
        //
    }
}
