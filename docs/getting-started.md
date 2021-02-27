# Getting started

Cookieguard allows the integration of third party services, like web analytics or social media trackers, at runtime. So you can make it your users choice which service they want to accept.

The library consists of JavaScript modules, the main `Cookieguard` object, and several `Service` objects that enable or disable the dedicated service.

## Installation

Cookieguard can be installed via NPM. Cookieguard does not offer precompiled or bundled versions, so we recommend using a module bundler like `webpack` or `browserify`.

```sh
npm i cookieguard
```

> **Note:**
> Cookieguard uses ECMAScript 2015+. We recommend using [Babel](//babeljs.io/) to support current and older browsers.

## Versioning Scheme

The cookieguard library is currently in **beta**. It is used in production by several websites, but expect that significant changes might be made. Therefore the current versioning scheme maintains the following convention: `0.MAJOR.MINOR`.

With the first `1.x` release we will switch to "Semantic Versioning": `MAJOR.MINOR.PATCH`.

## Quick start

Cookieguard ships with a handful of integrations for the most common services. You may provide the requiered configurations to a `Service` instance and register this services with `Cookieguard`. Now we already have a fully configured cookieguard instance.

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
