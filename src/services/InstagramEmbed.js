import Service from "./Service.js";
import { expireCookie } from "../helpers.js";

export default class InstagramEmbed extends Service {
    constructor(domain, path) {
        super(domain, path);
    }

    enable() {
        this._embedScript();

        this.isEnabled = true;
    }

    disable() {
        if (this.isEnabled) {
            throw 'Could not disable Instagram embeds at runtime. Page refresh required.';
        }
    }

    _embedScript() {
        let script = document.createElement("script");
        script.async = true;
        script.src = '//www.instagram.com/embed.js';
        document.body.appendChild(script);
    }
}
