import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cayres.financesapp',
  appName: 'finances-app',
  webDir: 'www',

  plugins: {
    FirebaseAuthentication: {
      providers: ['google.com']
    }
  },

}



export default config;
