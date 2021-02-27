
# Service providers

Service providers are adapters to integrate services into cookieguard. You can easily create your own `ServiceProvider` by [extending cookieguard](package-development).

## Google Analytics

Cookieguard ships with a Google Analytics service provider. The service provider supports both the base implementation and the TagManager. The `anonomyzeIp` option is set automatically. To integrate Google Analytics, you just need to provide your _Tracking ID_ and register the service.

```js
import { GoogleAnalytics } from 'cookieguard';

new GoogleAnalytics('UA-0000000-1');
```

## Facebook Pixel

To integrate a Facebook Pixel, you just need to provide your _Pixel ID_ and register the service. The service automatically sets the `PageView` event.

```js
import { FacebookPixel } from 'cookieguard';

new FacebookPixel('12345600000000');
```

## YouTube Embeds

To handle embedded YouTube videos, Cookieguard ships with a `YoutubeEmbed` provider. When the service is enabled, it loads the video from a `youtube-src` attribute.

```html
<iframe width="560" height="315" youtube-src="https://www.youtube.com/embed/VIDEO_ID"></iframe>
```

The `YoutubeEmbed` provider expects a fallback URL to be rendered when the service is disabled.

> _Note:_ You may allow to enable the service from your fallback via the `Cookieguard.post` method.

```js
import { YoutubeEmbed } from 'cookieguard';

new YoutubeEmbded('https://example.com/youtube-fallback');
```
