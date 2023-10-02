import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Shipping from '../screens/checkout/Shipping';
import Payment from '../screens/checkout/Payment';
import Confirm from '../screens/checkout/Confirm';

const Tab = createMaterialTopTabNavigator();

function CheckOutNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="shipping" component={Shipping} listeners={{
                tabPress: e => {
                    e.preventDefault(); // <-- this function blocks navigating to screen
                },
            }} />
            <Tab.Screen name="payment" component={Payment} listeners={{
                tabPress: e => {
                    e.preventDefault(); // <-- this function blocks navigating to screen
                },
            }} />
            <Tab.Screen name="confirm" component={Confirm} listeners={{
                tabPress: e => {
                    e.preventDefault(); // <-- this function blocks navigating to screen
                },
            }} />
        </Tab.Navigator>
    );
}

export default CheckOutNavigator;