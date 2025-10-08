import { Tabs } from 'expo-router';
import HomeIcon from '../../assets/home-icon.svg'

const tabsLayout = () => {
  return (
    <Tabs>
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
          tabBarIcon: () => <HomeIcon />,
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
          title: "Let's train!",
        }}
      />
    </Tabs>
  );
};

export default tabsLayout;
