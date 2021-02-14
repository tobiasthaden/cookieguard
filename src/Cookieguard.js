import { tap } from "./helpers.js";

export default class Cookieguard {
    constructor(modules) {
        this.modules = modules || {};

        this.fetchSettings();

        this._listenForPostMessages();

        this.hydrate();

        console.log(this.modules);
        console.log(this.settings);
    }

    isExpired() {
        if (!this.settings.hasOwnProperty('expires')) {
            return true;
        }

        return parseInt(this.settings.expires) <= (new Date()).getTime();
    }

    fetchSettings() {
        let settings = window.localStorage.getItem("_jar");
        this.settings = settings ? JSON.parse(settings) : {};
    }

    hydrate() {
        if (! this.isExpired()) {
            this.handle(this.settings.modules);
        }
    }

    update(modules) {
            let now = new Date();

            // expires in 14 days
            let expires = now.setDate(now.getDate() + 14);

            this.settings = { modules, expires };

            window.localStorage.setItem(
                "_jar",
                JSON.stringify(this.settings)
            );

            this.handle(modules);
    }

    handle(keys) {
        let modules = Object.keys(this.modules);

        this._setValidPostMessageOrigins(modules);

        keys = keys || [];

        modules
            .filter((item) => keys.includes(item))
            .map((key) => tap(this.modules[key], (module) => module.enable()));

        modules
            .filter((item) => !keys.includes(item))
            .map((key) => tap(this.modules[key], (module) => module.disable()));
    }

    static updateFromIFrame(key) {
        window.parent.postMessage({ cookieguard: {module: key}}, window);
    }

    _setValidPostMessageOrigins(modules) {
        let origins = modules.map((key) => {
            if (this.modules[key]['fallbackUrl']) {
                let url = new URL(this.modules[key]['fallbackUrl']);
                let { origin } = url;
                return origin;
            }
        }).filter(origin => origin);

        this.postMessageOrigins = origins;
    }

    _listenForPostMessages() {
        window.addEventListener("message", (event) => {
            if (!this.postMessageOrigins.includes(event.origin)) {
                return;
            }

            if (event.data.cookieguard) {
                this.settings.modules.push(event.data.cookieguard.module)
                this.hydrate();
            }

          }, false);
    }
}
