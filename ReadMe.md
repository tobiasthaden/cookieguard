# Cookieguard 

_Handle third party services in compliance with the GDPR_

![npm](https://img.shields.io/npm/v/cookieguard) ![license](https://img.shields.io/npm/l/cookieguard) ![npm](https://img.shields.io/npm/dt/cookieguard)

## Installation

The library can be installed via NPM. Cookieguard does not offer precompiled or bundled versions, so we recommend using a module bundler like `webpack` or `browserify`.

```sh
npm i cookieguard
```

## Quick start

Cookieguard consists of JavaScript modules, the main `Cookieguard`, and several `ServiceProvider` that enable or disable the dedicated service.

Cookieguard ships with a handful of integrations for the most common services. You may provide the requiered configurations to a `Service` instance and register this services with `Cookieguard`. Now we already have a fully configured cookieguard instance.

For more detailed informations see the full [documentation](//cookieguard.js.org).

```js
import Cookieguard, { GoogleAnalytics } from 'cookieguard';

const cookieguard = new Cookieguard({
  ga: new GoogleAnalytics('UA-0000000-1')
});
```

By default, all registerted services are disabled. You can enable services by passing an array of services to the `update` method.

```js
cookieguard.update(['ga']);
```

> **Note:**
> This configuration is also stored in the browsers `localeStorage` and next time cookieguard will automatically enable these services.

You may check if valid configurations are stored by using the "isExpired" helper method.

```js
if(cookieguard.isExpired()) {
  // Show the form to select the services.
  ...
  // Opt-in to the users selected services.
  cookieguard.update(selection)
}
```

## License
Cookieguard is open-sourced software licensed under the MIT license.
