import Service from './Service.js';

export default class ETracker extends Service {
    constructor(id, domain, path) {
        super(domain, path);

        this.id = id;

        window._etracker = null;

        this._embedScript();
    }

    enable() {
        if (_etracker) {
            _etracker.enableCookies(this.domain);
        }
    }

    disable() {
        if (_etracker) {
            _etracker.disableCookies(this.domain);
        }
    }

    _embedScript() {
        let script = document.createElement('script');
        script.id = '_etLoader';
        script.setAttribute('data-block-cookies', 'true');
        script.setAttribute('data-respect-dnt', 'dnt');
        script.setAttribute('data-secure-code', this.id);
        script.src = 'https://static.etracker.com/code/e.js';
        document
            .getElementsByTagName('head')[0]
            .appendChild(script, document.getElementsByTagName('head')[0]);
    }
}
