import Service from "./Service.js";
import { expireCookie } from "../helpers.js";

export default class GoogleAnalytics extends Service{
    constructor(id, domain, path) {
        super(domain, path);

        this.id = id;
    }

    enable() {
        this._embedScript();

        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag("js", new Date());
        gtag("config", this.id, { anonymize_ip: true });
    }

    disable() {
        let _gtag = `_gat_gtag_${this.id.replace(/-/g, "_")}`;

        expireCookie("_ga", this.cookie.domain, this.cookie.path);
        expireCookie("_gid", this.cookie.domain, this.cookie.path);
        expireCookie("_gat", this.cookie.domain, this.cookie.path);
        expireCookie(_gtag, this.cookie.domain, this.cookie.path);
    }

    _embedScript() {
        let script = document.createElement("script");
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${this.id}`;
        document
            .getElementsByTagName("head")[0]
            .appendChild(script, document.getElementsByTagName("head")[0]);
    }
}
