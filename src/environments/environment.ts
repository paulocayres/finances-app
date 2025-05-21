// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// src/environments/environment.ts
export const environment = {
  production: false,
  //apiUrl: 'https://10.0.2.2:3000' // ou 10.0.2.2 no emulador
  //apiUrl: 'https://35c7-2804-14c-6583-5d12-ec40-95d7-57d5-6e3e.ngrok-free.app' // ou 10.0.2.2 no emulador
  apiUrl: 'http://192.168.0.239:3000' // ou 10.0.2.2 no emulador
  //apiUrl: 'http://localhost:3000' // ou 10.0.2.2 no emulador
  //apiUrl: 'http://127.0.0.1:4040/' // ou 10.0.2.2 no emulador  
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
