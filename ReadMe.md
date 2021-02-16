# Cookieguard
*Handle third party services in compliance with the GDPR*

Cookieguard allows the integration of third party services, like web analytics or social media trackers, at runtime. So you can make it your users choice which service they want to accept. 

## Getting started
The Cookieguard library consists of JavaScript modules, the main `Cookieguard` object, and several `Service` objects that enable or disable the dedicated service.

### Versioning Scheme
The cookieguard library is currently in **beta**. It is used in production by several websites, but expect that significant changes might be made. Therefore the current versioning scheme maintains the following convention: `0.MAJOR.MINOR`.

With the first `1.x` release we will switch to "Semantic Versioning": `MAJOR.MINOR.PATCH`.

### Installation
Cookieguard can be installed via NPM. Cookieguard does not offer precompiled or bundled versions, so we recommend using a module bundler like `webpack` or `browserify`.  
```sh
npm i cookieguard
```

> **Note:**
> Cookieguard uses ECMAScript 2015+. We recommend using `Babel` to support current and older browsers.

### Quick start
Cookieguard ships with a handful of integrations for the most common services. You may provide the requiered configurations to a `Service` instance and register this services with `Cookieguard`. Now we already have a fully configured cookieguard instance.

```js
import Cookieguard, { GoogleAnalytics } from 'cookieguard'

const cookieguard = new Cookieguard({
  ga: new GoogleAnalytics('UA-0000000-1')
});
```
By default, all registerted services are disabled. You can enable services by passing an array of services to the `update` method. 

```js
cookieguard.update(['ga']);
```

> *Note:* This configuration is also stored in the browsers `localeStorage` and next time cookieguard will automatically enable these services.

You may check if valid configurations are stored by using the "isExpired" helper method.
```js
if(cookieguard.isExpired()) {
  // Show the form to select the services.
  ...
  // Opt-in to the users selected services.
  cookieguard.update(selection)
}
```


## The cookieguard instance
The cookieguard instance acts as a container for your `Service` objects. You can register new services, enable or disable all or a subset of services, and hydrate previous configurations from the `localeStorage`.

### Register service providers
To register services, initialize a new `Cookieguard` instance with a set of services.
```js
const cookieguard = new Cookieguard({
  ga: new GoogleAnalytics('UA-0000000-1'),
  fb: new FacebookPixel('12345600000000'),
  yt: new YoutubeEmbed('https://example.com/youtube-fallback'),
  ...
})
```

### Hydrate from storage
Cookieguard automatically hydrates stored configurations within its `constructor`.

Nevertheless, you may manually hydrate these configurations by calling the `hydrate` method.

```js
cookieguard.hydrate();
```

### Enable or disable services
To enable or disable services, you can call the `update` method. All services that are provided will be enabled, all other registered services will be disabled.

```js
// This enables only `GoogleAnaltics`.
cookieguard.update(['ga']);

// This disables all services.
cookieguard.update([]);
```

In addition to the `update` method, you may call the `enable` method. The `enable` method does not update the expiration date.
```js
// This appends `Google Analytics` to the enabled services.
cookieguard.enable(['ga']);
```

## Service providers
Service providers are adapters to integrate services into cookieguard.

### Google Analytics
Cookieguard ships with a Google Analytics service provider. The service provider supports both the base implementation and the TagManager. The `anonomyzeIp` option is set automatically. To integrate Google Analytics, you just need to provide your *Tracking ID* and register the service.
```js
import { GoogleAnalytics } from 'cookieguard';

new GoogleAnalytics('UA-0000000-1');
```

### Facebook Pixel
To integrate a Facebook Pixel, you just need to provide your *Pixel ID* and register the service. The service automatically sets the `PageView` event.
```js
import { FacebookPixel } from 'cookieguard';

new FacebookPixel('12345600000000');
```

### YouTube Embeds

To handle embedded YouTube videos, Cookieguard ships with a `YoutubeEmbed` provider. When the service is enabled, it loads the video from a `youtube-src` attribute.

```html
<iframe width="560" height="315" youtube-src="https://www.youtube.com/embed/VIDEO_ID"></iframe>
```

The `YoutubeEmbed` provider expects a fallback URL to be rendered when the service is disabled.

> *Note:* You may allow to enable the service from your fallback via the `Cookieguard.post` method.

```js
import { YoutubeEmbed } from 'cookieguard';

new YoutubeEmbded('https://example.com/youtube-fallback');
```

## Post messaging
Cookieguard allows to enable services from within `iframe`s via the static `post` method.

```js
import Cookieguard from 'cookieguard';

Cookieguard.post().enable(['yt']);
```

## Extending cookieguard
You can easily extend cookieguard by creating your own service providers. A service provider must provide an `enable` and a `disable` method and should extend the base `Service` class.

```js
import Cookieguard, {Service} from 'cookieguard';

class AcmeService extends Service {
  enable() {
    // Enable my service...
  }

  disable() {
    // Disable my service...
  }
}

const cookieguard = new Cookieguard({
  acme: new AcmeService()
});
```
