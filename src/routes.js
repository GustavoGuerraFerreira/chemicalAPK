import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import { Menu } from './screens/Menu/Index';
import  {QRCode} from './components/qrcode';
import { Product } from './screens/product';
const Stack = createStackNavigator();

export function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
      <Stack.Screen name="Menu" component={Menu} options={{headerShown: false}} />
      <Stack.Screen name="QRCode" component={QRCode} options={{headerShown: false}} />      
      <Stack.Screen name="Product" component={Product} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}