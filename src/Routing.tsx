import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import jwt_decode from 'jwt-decode';
import React, { useEffect, useMemo, useReducer } from 'react';
import { signIn } from './constants/AuthAPI';
import { AuthContext } from './context/AuthContext';
import CameraScreen from './views/CameraScreen';
import LoginScreen from './views/LoginScreen';

const Stack = createStackNavigator();
const AppTab = createBottomTabNavigator();
const MainStack = createStackNavigator();

function App() {
    return(
        <AppTab.Navigator>
            {/* <AppTab.Screen name="Home" component={HomeScreen} /> */}
            {/* <AppTab.Screen name="Search" component={SearchScreen} /> */}
            <AppTab.Screen name="Camera" component={CameraScreen} />
            {/* <AppTab.Screen name="Home" component={Home} /> */}
            {/* <AppTab.Screen name="Profile" component={ProfileScreen} /> */}
        </AppTab.Navigator>
    );
}

function Auth() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false}}>
            <Stack.Screen name="Login" component={LoginScreen}/>
        </Stack.Navigator>
    );
}


export default function Routing(){
    const initialLoginState = {
        isLoading: true,
        email: null,
        userToken: null,
        isSignout: false,
        refreshToken: null,
    }
    const [state, dispatch] = useReducer(
        (prevState: any, action: any) => {
          switch (action.type) {
            case 'RESTORE_TOKEN':
              return {
                ...prevState,
                userToken: action.token,
                isLoading: false,
              };
            case 'SIGN_IN':
              return {
                ...prevState,
                isSignout: false,
                userToken: action.token,
              };
            case 'SIGN_OUT':
              return {
                ...prevState,
                isSignout: true,
                userToken: null,
              };
          }
        },
        initialLoginState,
);

  const authContext = useMemo(() => ({
    login: async (email: string, password: string) => {
        const loginResponse = await signIn({email, password});
        if (loginResponse) {
            const { jwtToken, payload } = loginResponse;
            const decoded = jwt_decode(jwtToken);
            const { email } = payload;
            await AsyncStorage.setItem('userToken', jwtToken);
            dispatch({ type: 'SIGN_IN', id: email, token: jwtToken, userId: email });
        }
    },
    logout: async () => {
      try {
        await AsyncStorage.removeItem('userToken');
      } catch (err) {
        console.log(err);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: async (email: string, password: string) => {
      try {
        // const value = await authSignUp(email, password);
        // dispatch({ type: 'SIGNUP', id: value.user.email, token: value.user.token, userId: value.user.id });
      } catch (error) {
      }
    },
  }), []);

  useEffect(() => {
    setTimeout(async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
        //   const valid = await verifyToken(token);
          dispatch({ type: 'RESTORE_TOKEN', token: token });
        }
      } catch (err) {
        console.log(err);
      }
    }, 1000);
  }, []);

    return (
        
        <NavigationContainer>  
            <AuthContext.Provider value={authContext}>
                { state.userToken ? 
                <MainStack.Navigator screenOptions={{ headerShown: false}}>
                    <MainStack.Screen name="App" component={App} />
                </MainStack.Navigator> :
                <Auth /> 
                }
            </AuthContext.Provider>
        </NavigationContainer>
    );
}