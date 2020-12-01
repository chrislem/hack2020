// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:4000',
  arcServer: '10.21.189.120:32412',

  oauthTokenURI: 'http://localhost:4200/api/login/v1/sandbox/oidc/token',
  oauthClientID : 'addf7ed0-e8e9-4e8d-bbfe-0d2e3bbcabd5',
  oauthClientSecret : '5176765b-cd23-4c75-9a73-f4f6185b64bf',
  oauthScope : 'openid',

  bankingBaseURI : 'http://localhost:4200/api/retail-banking/customers/v1/'




};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
