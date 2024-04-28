import React, { useRef, useState, useEffect } from "react";
import { ScrollView, View, Text, Dimensions } from "react-native";

const TestScroll = () => {
  const scrollViewRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [componentPosition, setComponentPosition] = useState(null);

  const onScroll = () => {
    // console.log(!componentPosition, scrollViewRef.current);
    if (!componentPosition && !scrollViewRef.current) return;

    const windowHeight = Dimensions.get("window").height;
    const scrollPosition = event.nativeEvent.contentOffset.y; // Updated this line
    const componentTop = componentPosition.y;
    const componentBottom = componentPosition.y + componentPosition.height;

    // Check if component is within the visible window
    const visible =
      componentTop < windowHeight + scrollPosition &&
      componentBottom > scrollPosition;
    setIsVisible(visible);
  };

  const onLayoutComponent = (event) => {
    setComponentPosition(event.nativeEvent.layout);
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      onScroll={onScroll}
      horizontal={true}
      style={{ flex: 1, borderWidth: 2, borderColor: "green" }}
    >
      <View style={{ width: 400, height: 300 }} onLayout={onLayoutComponent}>
        {/* Your component content */}
        <Text>{isVisible ? "Visible" : "Not Visible"}</Text>
      </View>
      <View style={{ width: 380, height: 300 }}>
        <Text>azdazd</Text>
      </View>
    </ScrollView>
  );
};

export default TestScroll;
