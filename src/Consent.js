import { tap } from "./helpers";

export class Consent {
    constructor(modules) {
        this.modules = modules || {};

        this.fetchSettings();
    }

    isExpired() {
        if (!this.settings.hasOwnProperty(expires)) {
            return true;
        }

        return Date.parse(this.settings.expires) <= new Date();
    }

    fetchSettings() {
        let settings = window.localStorage.getItem("_jar");
        this.settings = settings ? JSON.parse(settings) : {};
    }

    update(modules) {
        let now = new Date();

        // expires in 14 days
        let expires = now.setDate(now.getDate() + 14);

        window.localStorage.setItem(
            "_jar",
            JSON.stringify({ modules, expires })
        );

        this.handle(modules);
    }

    handle(keys) {
        let modules = Object.keys(this.modules);

        modules
            .filter((item) => keys.includes(item))
            .map((key) => tap(this.modules[key], (module) => module.enable()));

        modules
            .filter((item) => !keys.includes(item))
            .map((key) => tap(this.modules[key], (module) => module.disable()));
    }
}
