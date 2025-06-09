// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// src/environments/environment.ts
export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAK1jVnCE6c2-l1WIsZTvVWN3xeruN0a5o",
    authDomain: "cayresfinances-app.firebaseapp.com",
    projectId: "cayresfinances-app",
    storageBucket: "cayresfinances-app.firebasestorage.app",
    messagingSenderId: "332663746330",
    appId: "1:332663746330:web:a6759fcf314ed4122d86a3",
    measurementId: "G-PE1ZH43L5N"
  },

  //apiUrl: 'https://10.0.2.2:3000' // ou 10.0.2.2 no emulador
  apiUrl: 'https://finances-api-bu32.onrender.com'
   //apiUrl: 'https://cayresfinance.loca.lt'
  //apiUrl: 'https://192.168.0.239:3000' // ou 10.0.2.2 no emulador
  //apiUrl: 'https://localhost:3000' // ou 10.0.2.2 no emulador
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
