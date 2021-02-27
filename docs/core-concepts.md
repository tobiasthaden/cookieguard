
# The cookieguard instance

The cookieguard instance acts as a container for your `Service` objects. You can register new services, enable or disable all or a subset of services, and hydrate previous configurations from the `localeStorage`.

## Register service providers

To register services, initialize a new `Cookieguard` instance with a set of services.

```js
const cookieguard = new Cookieguard({
  ga: new GoogleAnalytics('UA-0000000-1'),
  fb: new FacebookPixel('12345600000000'),
  yt: new YoutubeEmbed('https://example.com/youtube-fallback'),
  ...
})
```

## Hydrate from storage

Cookieguard automatically hydrates stored configurations within its `constructor`.

Nevertheless, you may manually hydrate these configurations by calling the `hydrate` method.

```js
cookieguard.hydrate();
```

## Enable or disable services

To enable or disable services, you can call the `update` method. All services that are provided will be enabled, all other registered services will be disabled.

```js
// This enables only `GoogleAnaltics`.
cookieguard.update(['ga']);

// This disables all services.
cookieguard.update([]);
```

In addition to the `update` method, you may call the `enable` or `disable` methods. These methods does not update the expiration date.

```js
// This appends `Google Analytics` to the enabled services.
cookieguard.enable(['ga']);

// This removes `Google Analytics` from the enabled services.
cookieguard.disable(['ga']);
```

## Post messaging

Cookieguard allows to `enable`, `disable` or `update` services from within an `iframe` via the static `post` method.

```js
import Cookieguard from 'cookieguard';

Cookieguard.post().enable(['yt']);
```
