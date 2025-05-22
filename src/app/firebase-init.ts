import { initializeApp } from "firebase/app";
import { environment} from "src/environments/environment";
console.log('config: ', environment.firebase);
export const firebaseApp = initializeApp(environment.firebase);
