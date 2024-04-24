import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  ScrollView,
  Button,
  Modal,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import Notification from "./Notification";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
export default function NotificationContainer() {
  const [list, setlist] = useState([]);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [modalVisible, setModalVisible] = useState(true);

  const pan = Gesture.Pan().onUpdate((e) => {
    console.log(e.translationX);
  });
  const childRef = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      console.log(token);
      setExpoPushToken(token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(notification.request.content.title);
        console.log(notification.request.content.body);
        console.log(notification.request.content.data);
        setNotification(notification);
        setlist((oldArray) => [...oldArray, notification.request.content.data]);
        console.log(childRef.current);
        childRef.current.focus();
        // setModalVisible(!modalVisible);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const rendItem = ({ item }) => {
    const itemRef = childRef;

    return <Notification ref={itemRef} item={item}></Notification>;
  };

  return (
    <ScrollView
      horizontal={true}
      decelerationRate={0}
      snapToInterval={Dimensions.get("window").width}
      snapToAlignment={"center"}
      style={styles.container}
    >
      {list.map((item, index) => {
        console.log(index);
        return (
          <GestureDetector gesture={pan}>
            <Notification
              ref={childRef}
              length={list.length}
              index={index}
              item={item}
              key={index}
            ></Notification>
          </GestureDetector>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "auto",
    borderWidth: 1,
    borderColor: "black",
    zIndex: 5,
  },
  ModalContainer: {
    flex: 0.2,
    backgroundColor: "red",
  },
  ModalContent: {
    borderWidth: 10,
    borderColor: "white",
    flex: 0.5,
  },
});

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: "Here is the notification body",
      data: { data: "goes here" },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: "bad5129b-1df9-4c5d-a0b3-0057acec7f46",
      })
    ).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

//  <ScrollView
//    horizontal={true}
//    decelerationRate={0}
//    snapToInterval={Dimensions.get("window").width}
//    snapToAlignment={"center"}
//    style={styles.container}
//  >
//    {list.map((item, index) => {
//      console.log(index);
//      return (
//        <GestureDetector gesture={pan}>
//          <Notification
//            ref={childRef}
//            length={list.length}
//            index={index}
//            item={item}
//            key={index}
//          ></Notification>
//        </GestureDetector>
//      );
//    })}
//  </ScrollView>;
