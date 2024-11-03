// import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomStack from './BottomStack';
import { AnnouncementDetail, ChurchDetail } from '../screen';


// const Stack = createStackNavigator();
const Stack = createNativeStackNavigator()

export default function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName='BottomStack'
      screenOptions={{ headerShown: false, }}
    >
      <Stack.Screen name="BottomStack" component={BottomStack} />
      <Stack.Screen name="ChurchDetail" component={ChurchDetail} />
      <Stack.Screen name="AnnouncementDetail" component={AnnouncementDetail} />

    </Stack.Navigator>
  );
}