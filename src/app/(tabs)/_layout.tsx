import { Tabs } from 'expo-router';
import HomeIcon from '../../assets/home-icon.svg'

const tabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
      tabBarActiveTintColor: "#3b82f6",
      tabBarInactiveTintColor: "#ffffff",
    }}>
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          headerTitle: 'Your Profile',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'Profile',
          tabBarIcon: (color) => <HomeIcon className="stroke-blue-500 stroke-[85] p-0.5"/>,
          tabBarStyle: {
          backgroundColor: '#000',
          },
        }}
      />
      <Tabs.Screen
        name="routines"
        options={{
          headerShown: false,
          headerTitle: 'Routines',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: "Asignations",
          tabBarStyle: {
          backgroundColor: '#000',
          },
        }}
      />
    </Tabs>
  );
};

export default tabsLayout;
