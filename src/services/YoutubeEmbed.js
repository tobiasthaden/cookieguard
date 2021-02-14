import Service from "./Service.js";
import { expireCookie } from "../helpers.js";

export default class YoutubeEmbed extends Service{
    constructor(fallbackUrl, domain, path) {
        super(domain, path);

        this._fetchEmbeds();

        this.fallbackUrl = fallbackUrl;
    }

    enable() {
        this.embeds.forEach(iframe => {
            let src = iframe.getAttribute('youtube-src');
            iframe.setAttribute('src', src);
        });
    }

    disable() {
        this.embeds.forEach(iframe =>
            iframe.setAttribute('src', this.fallbackUrl)
        );

        expireCookie('CONSENT', '.youtube.com', '/');
        expireCookie('PREF', '.youtube.com', '/');
        expireCookie('VISITOR_INFO1_LIVE', '.youtube.com', '/');
        expireCookie('YSC', '.youtube.com', '/');
    }

    _fetchEmbeds() {
        this.embeds = [...document.querySelectorAll("[youtube-src]")]
    }
}
