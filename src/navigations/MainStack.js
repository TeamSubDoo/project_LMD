import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Channel, ChannelCreation } from '../screens';
import { CharacterList } from '../screens';
import ScheduleList from '../screens/ScheduleList';

const Stack = createStackNavigator();

const MainStack = () => {
  const theme = useContext( ThemeContext );
  return(
    <Stack.Navigator
    initialRouteName='Main'
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: theme.headerTintColor,
        cardStyle: { backgroundColor: theme.backgroundColor},
        headerBackTitleVisible: false,
      }}>
        <Stack.Screen name="Main" component={CharacterList} />
        <Stack.Screen name="ScheduleList" component={ ScheduleList } />
        <Stack.Screen name="Channel Creation" component={ChannelCreation} />
        <Stack.Screen name="Channel" component={Channel} />
      </Stack.Navigator>
  );
};

export default MainStack;