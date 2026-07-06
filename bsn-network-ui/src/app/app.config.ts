import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { HttpTokenInterceptor } from './services/interceptor/http-token-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withFetch(),  withInterceptorsFromDi()),
    provideRouter(routes),
    {provide : HTTP_INTERCEPTORS, useClass : HttpTokenInterceptor, multi: true},
  ]
};
