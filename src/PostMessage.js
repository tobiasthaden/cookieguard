export default class PostMessage {
    constructor(cookieguard) {
        this.cookieguard = cookieguard;

        this._registerListener()
            ._setValidOrigins();
    }

    static enable(keys) {
        window.parent.postMessage({
            cookieguard: {
                modules: keys,
                type: 'enable'
            }
        }, window);
    }

    _registerListener() {
        window.addEventListener("message", (event) => {
            if (!this.postMessageOrigins.includes(event.origin)) {
                return;
            }

            if (event.data.cookieguard) {
                this.cookieguard[event.data.cookieguard.type](event.data.cookieguard.modules)
            }
        }, false);

        return this;
    }

    _setValidOrigins() {
        let modules = Object.keys(this.cookieguard.modules);

        let origins = modules.map((key) => {
            let url = this.cookieguard.modules[key]['fallbackUrl'];

            if (url) {
                let { origin } = new URL(url);
                return origin;
            }
        });

        this.postMessageOrigins = origins.filter(origin => origin);

        return this;
    }
}
