import React, { useContext, useEffect, useState } from 'react';
import { Alert, FlatList, View } from 'react-native';
import styled, { ThemeContext } from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons';
import { Button } from '../components';
import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import config from '../../firebase.json'


const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background };
`;

const ItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.listBorder};
  padding: 15px 20px;
`;

const ItemTextContainer = styled.View`
  flex: 1;
  flex-direction: column;
`;

const ItemTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
`;

const ItemDescription = styled.Text`
  font-size: 16px;
  margin-top: 5px;
  color: ${({ theme }) => theme.listTime};
`;

const ItemTime = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.listTime}
`;

const schedules = [];
for( let idx = 0 ; idx< 10 ; idx++) {
  schedules.push({
    id: idx,
    name: `스케쥴 No.${idx}`,
    description: `설명${idx}`,
    createdAt: idx,
  });
}

const Item = React.memo(
  ({ item: { id, title, description, createdAt }, onPress, onMatching }) => {
  const theme = useContext(ThemeContext);

  return (
    <ItemContainer onPress={() => onPress({ id, title })}>
      <ItemTextContainer>
        <ItemTitle>{title}</ItemTitle>
        <ItemDescription>{description}</ItemDescription>
      </ItemTextContainer>
      <View>
        <Button
          title="매칭"
          onPress={onMatching}
          />
      </View>
    </ItemContainer>
  )
}
);

const ScheduleList = ({navigation}) => {
  const [channels, setChannels] = useState([]);

  const app = initializeApp(config);

  const DB = getFirestore(app);

  useEffect(async () => {
    const q = query(collection(DB, 'channels'), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    const list =[]
    snapshot.forEach(doc => {
      console.log(doc.data());
      list.push(doc.data());
    });
    setChannels(list);
  }, []);

  const _handleItemPress = params => {
    navigation.navigate('Channel', params);
  };

  const _handleMatching = params => {
    navigation.navigate('Channel', params);
  };

  
  return (
    <Container>
      <FlatList
        keyExtractor={item => item['id']}
        data={channels}
        renderItem={({ item }) => (
          <Item item={item} onPress={_handleItemPress} onMatching={_handleMatching} />
        )}
        windowSize={3}
      />
      <Button title="채널 추가하기" onPress={() => {navigation.navigate('Channel Creation')}}/>
    </Container>
  )
}

export default ScheduleList;