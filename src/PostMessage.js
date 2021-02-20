export default class PostMessage {
    constructor(cookieguard) {
        this.cookieguard = cookieguard;

        this._registerListener()._setValidOrigins();
    }

    static enable(keys) {
        window.parent.postMessage(
            {
                cookieguard: {
                    modules: keys,
                    type: 'enable'
                }
            },
            window
        );
    }

    static disable(keys) {
        window.parent.postMessage(
            {
                cookieguard: {
                    modules: keys,
                    type: 'disable'
                }
            },
            window
        );
    }

    static update(keys) {
        window.parent.postMessage(
            {
                cookieguard: {
                    modules: keys,
                    type: 'update'
                }
            },
            window
        );
    }

    _registerListener() {
        window.addEventListener(
            'message',
            event => {
                if (!this.origins.includes(event.origin)) {
                    return;
                }

                if (event.data.cookieguard) {
                    this.cookieguard[event.data.cookieguard.type](
                        event.data.cookieguard.modules
                    );
                }
            },
            false
        );

        return this;
    }

    _setValidOrigins() {
        let modules = Object.keys(this.cookieguard.modules);

        let origins = modules.map(key => {
            let url = this.cookieguard.modules[key]['fallbackUrl'];

            if (url) {
                let { origin } = new URL(url);
                return origin;
            }
        });

        this.origins = origins.filter(origin => origin);

        return this;
    }
}
