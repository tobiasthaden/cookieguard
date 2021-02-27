# Extending cookieguard

You can easily extend cookieguard by creating your own service providers. A service provider must provide an `enable` and a `disable` method and should extend the base `Service` class.

```js
import Cookieguard, { Service } from 'cookieguard';

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
