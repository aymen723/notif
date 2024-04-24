import React, { useState, useEffect } from "react";

import { View, StyleSheet, Text } from "react-native";

import { Svg, Circle, Line } from "react-native-svg";

import * as Location from "expo-location";

const CompassArrow = ({ destinationCoordinates }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [rotation, setRotation] = useState(0);
  // console.log(destinationCoordinates);

  const calculateRotation = () => {
    if (userLocation && destinationCoordinates) {
      const destLat = destinationCoordinates.altitude;

      const destLon = destinationCoordinates.longitude;

      const currLat = userLocation.altitude;

      const currLon = userLocation.longitude;

      const bearing = Math.atan2(
        Math.sin(destLon - currLon) * Math.cos(destLat),

        Math.cos(currLat) * Math.sin(destLat) -
          Math.sin(currLat) * Math.cos(destLat) * Math.cos(destLon - currLon)
      );

      const degrees = (bearing * 180) / Math.PI;

      // console.log(degrees);
      setRotation(degrees);
    }
  };

  useEffect(() => {
    let subscription = null;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        subscription = await Location.watchPositionAsync(
          { accuracy: Location.Accuracy.BestForNavigation },
          ({ coords }) =>
            setUserLocation({
              altitude: coords.altitude,

              longitude: coords.longitude,
            })
        );
      } else {
        console.log("Location permissions not granted");
      }
    })();
    return () => {
      subscription?.remove();
    };
  }, []);

  useEffect(() => {
    calculateRotation();
  }, [userLocation, destinationCoordinates]);

  return (
    <View style={styles.container}>
      <Svg height="100%" width="100%" viewBox="-100 -150 300 300">
        {/* Circle representing the compass */}

        <Circle
          cx="0"
          cy="0"
          r="100"
          fill="transparent"
          stroke="black"
          strokeWidth="2"
        />

        <Line
          x1="0"
          y1="0"
          x2="0"
          y2="-80"
          stroke="red"
          strokeWidth="10"
          strokeLinecap="round"
          transform={`rotate(${rotation})`}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
    width: "100%",
    justifyContent: "center",
  },
});

export default CompassArrow;
