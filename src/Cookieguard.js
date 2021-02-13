import { tap } from "./helpers.js";

export default class Cookieguard {
    constructor(modules) {
        this.modules = modules || {};

        this.fetchSettings();

        this.hydrate();
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

        keys = keys || [];

        modules
            .filter((item) => keys.includes(item))
            .map((key) => tap(this.modules[key], (module) => module.enable()));

        modules
            .filter((item) => !keys.includes(item))
            .map((key) => tap(this.modules[key], (module) => module.disable()));
    }
}
