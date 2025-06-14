import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cayres.financesapp',
  appName: 'Cayres Finances',
  webDir: 'www',

  plugins: {
    FirebaseAuthentication: {
      providers: ['google.com']
    }
  },

}



export default config;
