import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import { MaterialIcons } from '@expo/vector-icons';
import { getCurrentUser, createMessage } from '../utils/firebase';
import { initializeApp } from 'firebase/app';
import config from '../../firebase.json'
import { collection, getFirestore, onSnapshot, orderBy, query } from 'firebase/firestore';
import { FlatList, Text } from 'react-native';
import { Input } from '../components';

const Container = styled.View`
  flex:1;
  background-color: ${({ theme }) => theme.background};
`;

const SendButton = props => {
  const theme = useContext(ThemeContext);

  return (
    <Send
      {...props}
      disabled={!props.text}
      containerStyle={{
        width: 44,
        height:44,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 4
      }}
      >
        <MaterialIcons
          name="send"
          size={24}
          color={
            props.text ?  theme.sendButtonActivate : theme.sendButtonInActivate
          }
          /> 
      </Send>
  )
}

const Channel = ({ navigation, route: { params } }) => {
  const theme = useContext(ThemeContext);
  const { uid, name, photoUrl } = getCurrentUser();
  const [ messages, setMessages ] = useState([]);
  const [text, setText] = useState('');
  const _handleMessageSend = () => {};

  // useEffect(() => {
  //   const app = initializeApp(config);
  //   const DB = getFirestore(app);
  //   const q = query(collection(DB, 'channels'), orderBy('createdAt', 'desc'));
  //   onSnapshot(q, qs => {
  //     const list = [];
  //     qs.forEach(doc => {
  //       list.push(doc.data());
  //     });
  //     setMessages(list);
  //   })
  // }, []);
  // useLayoutEffect(() => {
  //   console.log(params.title)
  //   navigation.setOptions({ headerTitle: params.title || 'Channel'});
  // }, []);


  return (
    <Container>
      {/* <GiftedChat
        listViewProps={{
          style: { backgroundColor: theme.background },
        }}
        placeholder="Enter a message..."
        messages={messages}
        user={{ _id: uid, name, avatar: photoUrl }}
        onSend={_handleMessageSend}
        alwaysShowSend={true}
        textInputProps={{
          autoCapitalize: 'none',
          autoCorrect: false,
          textContentType: 'none',
          underlineColorAndriod: 'tansparent'
        }}
        multiline={false}
        renderUsernameOnMessage={true}
        scrollToBottom={true}
        renderSend={props => <SendButton {...props}/>}
        /> */}
      <FlatList
        keyExtractor={item => item['id']}
        data={messages}
        renderItem={({item}) => (
          <Text style={{ fontSize: 24}}>{item.text}</Text>
        )}
        />
        {/* <Input value={text}
          onChangeText={text => setText(text)}
          onSubmitEditing={() => createMessage({ channelId: params.id, text})}/> */}
    </Container>
  );
};

export default Channel;