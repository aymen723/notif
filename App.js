import { StatusBar } from "expo-status-bar";
import { useState, useEffect, useRef } from "react";

import {
  StyleSheet,
  Text,
  View,
  Platform,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import NotificationContainer from "./comp/NotificationContainer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CompassArrow from "./comp/Compass";
import axios from "axios";
import {
  Notifier,
  Easing,
  NotifierWrapper,
  NotifierComponents,
} from "react-native-notifier";
import CustomNotification from "./comp2/CustomNotification";
import Container from "./comp2/Container";
import ContainerNotif from "./comp3/ContainerNotif";
import TestScroll from "./comp3/testScroll";

export default function App() {
  const [Title, setTitle] = useState("test of title");
  const [Body, setBody] = useState("test of Body");
  let i = 1;

  function OnChangeTitle(e) {
    setTitle(e);
  }
  function OnChangeBody(e) {
    setBody(e);
  }

  function SendNotification() {
    const obj = {
      id: i,
      title: Title,
      hint: "this is the four ",
      direction: {
        altitude: 0,
        longitude: 0,
      },
      url: "https://example.com",
      AlreadySaved: true,
      imageurl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiyIK6lw7E4PWgSvrHUftodq9HVvl5ZPkHnvV-xW5d2w&s",
      ShortDescription:
        "A short description of the  thethethe contentcontentcontentcontentcontentcontentcontentcontentcontentcontent contentcontentcontentcontentcontentcontentcontentcontentcontent",
      Content:
        "<div><p>This is some text in a paragraph.</p> <img src='https://www.google.com/logos/doodles/2024/celebrating-etel-adnan-6753651837110479-ldrk.png'></div>",
    };
    axios
      .post("https://exp.host/--/api/v2/push/send", {
        to: "ExponentPushToken[RpxWFoA9xT52XY7Z24EeLL]",
        title: Title,
        body: Body,
        data: obj,
      })
      .then((res) => {
        console.log("here inside axios", res);
      })
      .catch((err) => {
        console.log("error here", err);
      });
    i = i + 1;
  }

  return (
    <View style={styles.container}>
      {/* <Text>azda</Text>
      <ContainerNotif></ContainerNotif> */}
      <TestScroll></TestScroll>
    </View>
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <NotifierWrapper>
        <Container></Container>
        <View style={styles.NotificationFrom}>
          <View style={styles.InputContainer}>
            <Text>Title</Text>
            <TextInput
              onChangeText={(e) => {
                OnChangeTitle(e);
              }}
              value={Title}
              style={styles.input}
            />
          </View>
          <View style={styles.InputContainer}>
            <Text>Body</Text>
            <TextInput
              onChangeText={(e) => {
                OnChangeBody(e);
              }}
              value={Body}
              style={styles.input}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              SendNotification();
            }}
            style={styles.button}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              Send Notification
            </Text>
          </TouchableOpacity>
        </View>
      </NotifierWrapper>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: "red",
    backgroundColor: "lightgray",
    paddingTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  NotificationFrom: {
    borderWidth: 1,
    borderColor: "Red",
    width: "100%",
    height: 310,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  InputContainer: {
    width: "90%",
    borderWidth: 1,
    borderColor: "red",
    height: 80,
    justifyContent: "center",
    alignContent: "center",
  },
  input: {
    backgroundColor: "gray",
    height: 40,
    borderRadius: 15,
  },
  button: {
    height: 50,
    width: "60%",
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 20,
    backgroundColor: "lightgreen",
  },
});

//  <StatusBar style="auto" />
//       <NotificationContainer></NotificationContainer>
// <View style={styles.NotificationFrom}>
//   <View style={styles.InputContainer}>
//     <Text>Title</Text>
//     <TextInput
//       onChangeText={(e) => {
//         OnChangeTitle(e);
//       }}
//       value={Title}
//       style={styles.input}
//     />
//   </View>
//   <View style={styles.InputContainer}>
//     <Text>Body</Text>
//     <TextInput
//       onChangeText={(e) => {
//         OnChangeBody(e);
//       }}
//       value={Body}
//       style={styles.input}
//     />
//   </View>
//   <TouchableOpacity
//     onPress={() => {
//       SendNotification();
//     }}
//     style={styles.button}
//   >
//     <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
//       Send Notification
//     </Text>
//   </TouchableOpacity>
// </View>
