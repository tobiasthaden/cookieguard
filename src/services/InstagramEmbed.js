import Service from "./Service.js";
import { expireCookie } from "../helpers.js";

export default class InstagramEmbed extends Service {
    constructor(domain, path) {
        super(domain, path);
    }

    enable() {
        this._embedScript();

        //
    }

    disable() {
        //
    }

    _embedScript() {
        let script = document.createElement("script");
        script.async = true;
        script.src = '//www.instagram.com/embed.js';
        document.body.appendChild(script);
    }
}
