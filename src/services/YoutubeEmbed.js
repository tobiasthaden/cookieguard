import Service from "./Service.js";
import { expireCookie } from "../helpers.js";

export default class YoutubeEmbed extends Service{
    constructor(fallbackUrl, domain, path) {
        super(domain, path);

        this.fallbackUrl = fallBackUrl;
    }

    enable() {
        // TODO: fetch all youtube iframes and hydrate the src attribute from data attribute.
    }

    disable() {
        // TODO: fetch all youtube iframes, set src attribute to the fallback url and expire cookies.
    }
}
