// importing the angular modules
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// giving the condition and calling the modules/functions.
if (environment.production) {
  enableProdMode();
}

// using the bootstrap Appmodule
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
