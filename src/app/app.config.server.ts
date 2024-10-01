import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
