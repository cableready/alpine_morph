## Package `@cable_ready/alpine_morph`

The [`Alpine.morph()`](https://alpinejs.dev/plugins/morph) function as a CableReady custom operation meant to be used with [`cable_ready`](https://github.com/stimulusreflex/cable_ready).

### Installation

Install `@cable_ready/alpine_morph` in your application:

```bash
yarn add @cable_ready/alpine_morph

# or

npm install --save @cable_ready/alpine_morph
```

### Usage

Add the Alpine morph operation to CableReady:

```javascript
// app/javascript/packs/application.js

import CableReady from 'cable_ready'
import AlpineMorph from '@cable_ready/alpine_morph'

CableReady.addOperations(AlpineMorph)
```

And configure CableReady on the Ruby-side to include the new operation:

```ruby
# config/initializers/cable_ready.rb

CableReady.configure do |config|
  config.add_operation_name :alpine_morph
end
```
