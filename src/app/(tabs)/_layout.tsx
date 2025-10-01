import { Tabs } from 'expo-router';

const tabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: 'Your Profile',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'Profile',
        }}
      />
      <Tabs.Screen
        name="routines"
        options={{
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
