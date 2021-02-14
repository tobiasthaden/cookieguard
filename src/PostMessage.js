export default class PostMessage {
    constructor(cookieguard) {
        this.cookieguard = cookieguard;

        this._registerListener()
            ._setValidPostMessageOrigins();
    }

    static enable(key) {
        window.parent.postMessage({
            cookieguard: { module: key }
        }, window);
    }

    _registerListener() {
        window.addEventListener("message", (event) => {
            if (!this.postMessageOrigins.includes(event.origin)) {
                return;
            }

            if (event.data.cookieguard) {
                this.cookieguard.enable(event.data.cookieguard.module)
            }
        }, false);

        return this;
    }

    _setValidPostMessageOrigins() {
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
