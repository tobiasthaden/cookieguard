export default class Service {
    constructor(domain, path) {
        path = path || "";
        domain = domain || "";

        this.cookie = { domain, path };
    }

    enable() {
        //
    }

    disable() {
        //
    }
}
