import AsyncStorage from '@react-native-community/async-storage';

interface Response {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

const USER_KEY  = "@medapp:user";
const TOKEN_KEY = "@medapp:token";

export const isLogged = async () => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);

  return token;
}

export const clearToken = async () => {
  const test = await AsyncStorage.removeItem(TOKEN_KEY);

  return test;
}

/*export const onSignIn = async (TOKEN: string) => {
  await AsyncStorage.multiSet([
    ["@medapp:token", TOKEN],
  ]);
}*/

/*export const onSignIn = async (res: Response ) => {
  return await AsyncStorage.multiSet(
    ["@medapp:user", res.user],
    ["@medapp:token", res.token]
  )
  
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        token: 'skaodkodadkpdkaodasdpokapdoakdpaokdosapkpod',
        user: {
          name: 'Daniel',
          email: 'dani.edm@outlook.com'
        },
      })
    }, 2000);
  }); 
}
*/

