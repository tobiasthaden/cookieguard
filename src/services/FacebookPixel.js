import Service from './Service.js';
import { expireCookie } from '../helpers.js';

export default class FacebookPixel extends Service {
    constructor(id, domain, path) {
        super(domain, path);

        this.id = id;
    }

    enable() {
        this._embedScript();

        let fbq = (window.fbq = function() {
            fbq.callMethod
                ? fbq.callMethod.apply(fbq, arguments)
                : fbq.queue.push(arguments);
        });

        if (!window._fbq) {
            window._fbq = fbq;
        }

        fbq.push = fbq;
        fbq.loaded = true;
        fbq.version = '2.0';
        fbq.queue = [];

        fbq('init', this.id);
        fbq('track', 'PageView');
    }

    disable() {
        expireCookie('_fbp', this.cookie.domain, this.cookie.path);
        expireCookie('_fr', this.cookie.domain, this.cookie.path);
        expireCookie('fr', 'facebook.com', '/');
    }

    _embedScript() {
        let script = document.createElement('script');
        script.async = true;
        script.src = 'https://connect.facebook.net/en_US/fbevents.js';
        document
            .getElementsByTagName('head')[0]
            .appendChild(script, document.getElementsByTagName('head')[0]);
    }
}
