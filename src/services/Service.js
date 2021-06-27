export default class Service {
    constructor(domain, path) {
        this.path = path || '/';
        this.domain = domain || window.location.hostname;

        this.cookie = { domain, path };
    }

    enable() {
        //
    }

    disable() {
        //
    }
}
