import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useImperativeHandle, useState, forwardRef } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import HTMLView from "react-native-htmlview";
import { ArrowUpFromDot } from "lucide-react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import CompassArrow from "./Compass";

const Notification = forwardRef(function ({ item }, ref) {
  const height = useSharedValue(120);
  const translateY = useSharedValue(-height.value);
  const [visible, setvisible] = useState(false);
  const [fullcontent, setfullcontent] = useState(false);
  const pan = Gesture.Pan().onUpdate((e) => {
    console.log(e.translationX);
    // height.value = e.translationX;
  });
  const handlePress = () => {
    if (visible == false) {
      height.value += 150;
      setvisible(true);
      console.log("test 1");
    } else {
      if (fullcontent == false) {
        height.value += 400;
        setfullcontent(true);
        console.log("test 2");
      } else {
        console.log("test 3");
      }
    }
  };

  function save() {}

  const CloseNotification = () => {
    translateY.value -= height.value;
  };

  const ShowNotification = () => {
    translateY.value += height.value;
  };
  const animatedStyles = useAnimatedStyle(() => ({
    height: withSpring(height.value),
    transform: [
      {
        translateY: withSpring(translateY.value),
      },
    ],
  }));

  useImperativeHandle(
    ref,
    () => {
      return {
        focus() {
          ShowNotification();
        },
      };
    },
    []
  );
  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.container, animatedStyles]}>
        <View style={styles.NotififcationContent}>
          <View style={styles.ShortNotification}>
            <View style={styles.direction}>
              {/* <Text>{item.direction}</Text> */}
              <CompassArrow
                destinationCoordinates={item.direction}
              ></CompassArrow>
              {/* <ArrowUpFromDot color={"green"} size={40} /> */}
            </View>
            <View style={styles.content}>
              <View style={styles.indicator}>
                {/* <Text>
                  {index} / {length - 1}
                </Text> */}
              </View>
              <View style={styles.contenttext}>
                <Text>{item.title}</Text>
                <Text>{item.hint}</Text>
              </View>
            </View>
          </View>
          {visible ? (
            <View style={styles.MoreContent}>
              <View style={styles.MoreContentImage}>
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "cover",
                    borderRadius: 20,
                  }}
                  source={{ uri: item.imageurl }}
                ></Image>
              </View>
              <View style={styles.MoreContenttext}>
                <Text>{item.ShortDescription}</Text>
              </View>
            </View>
          ) : null}
          {fullcontent ? (
            <View style={styles.fullcontentview}>
              <HTMLView value={item.Content} stylesheet={style} />
            </View>
          ) : null}
        </View>

        <View style={styles.NotificationButton}>
          <View style={styles.buttonsection1}>
            <TouchableOpacity onPress={CloseNotification} style={styles.Button}>
              <Text style={[styles.ButtonText, { color: "#ef233c" }]}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonsection2}>
            <TouchableOpacity style={styles.Button} onPress={save}>
              <Text style={[styles.ButtonText, { color: "#95d5b2" }]}>
                Save
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePress} style={styles.Button}>
              <Text style={styles.ButtonText}>More</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </GestureDetector>
  );
});

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    // borderColor: "green",
    // borderWidth: 1,
    borderBottomEndRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: "white",
    zIndex: 3,
  },
  NotificationButton: {
    height: 40,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  NotififcationContent: {
    // borderColor: "black",
    // borderWidth: 1,
  },
  NotificationButton: {
    height: 40,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  ShortNotification: {
    height: 80,
    flexDirection: "row",
  },
  Button: {
    // backgroundColor: "lightgray",
    borderRadius: 10,
    width: 80,
    height: 30,
    alignItems: "center",
    marginRight: 10,
    justifyContent: "center",
  },
  buttonsection1: {
    // borderWidth: 1,
    // borderColor: "red",
    height: "100%",
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsection2: {
    // borderWidth: 1,
    // borderColor: "red",
    height: "100%",
    width: "70%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  ButtonText: {
    fontWeight: "bold",
    fontSize: 15,
  },
  direction: {
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
    // borderColor: "green",
  },
  content: {
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
  indicator: {
    width: "100%",
    height: "20%",
    alignItems: "center",
  },
  contenttext: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    height: "80%",
  },
  MoreContent: {
    width: "100%",
    height: 150,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  MoreContenttext: {
    // borderWidth: 1,
    // borderColor: "red",
    width: "60%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  MoreContentImage: {
    width: "35%",
    backgroundColor: "white",
    // borderWidth: 1,
    // borderColor: "red",
    borderRadius: 20,
  },
  fullcontentview: {
    // borderWidth: 1,
    // borderColor: "green",
    width: "100%",
    height: 400,
  },
});
const style = StyleSheet.create({
  div: {
    fontWeight: "bold",
    color: "black",
    borderWidth: 1,
    borderColor: "red",
    height: "100%",
    flexDirection: "row",
  },
  p: {
    width: "50%",
    height: "50%",
    borderWidth: 10,
    borderColor: "black",
  },
  img: {
    width: 100,
    height: 100,
    borderWidth: 10,
    borderColor: "green",
  },
});

export default Notification;
