import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";

const sections = [
  {
    title: "Total Hardness",
    levels: [
      { value: "0", color: "#4B6A9B" },
      { value: "110", color: "#59618D" },
      { value: "250", color: "#6C4F80" },
      { value: "500", color: "#874174" },
      { value: "1000", color: "#A23B67" },
    ],
  },
  {
    title: "Total Chlorine",
    levels: [
      { value: "0", color: "#FFE55B" },
      { value: "1", color: "#F6D255" },
      { value: "3", color: "#E4C049" },
      { value: "5", color: "#C3A740" },
      { value: "10", color: "#A38F36" },
    ],
  },
  {
    title: "Free Chlorine",
    levels: [
      { value: "0", color: "#F2E4DC" },
      { value: "1", color: "#E4D0CA" },
      { value: "3", color: "#C8A29D" },
      { value: "5", color: "#A27487" },
      { value: "10", color: "#82445E" },
    ],
  },
  {
    title: "pH",
    levels: [
      { value: "6.2", color: "#D9674F" },
      { value: "6.8", color: "#E68955" },
      { value: "7.2", color: "#F5AB5C" },
      { value: "7.8", color: "#FFA069" },
      { value: "8.4", color: "#E0765C" },
    ],
  },
  {
    title: "Total Alkalinity",
    levels: [
      { value: "0", color: "#D4B67C" },
      { value: "40", color: "#CBAE74" },
      { value: "120", color: "#B39B64" },
      { value: "180", color: "#8F7F4F" },
      { value: "240", color: "#73643E" },
    ],
  },
  {
    title: "Cyanuric Acid",
    levels: [
      { value: "0", color: "#C05B3A" },
      { value: "50", color: "#AB5142" },
      { value: "100", color: "#96484A" },
      { value: "150", color: "#7F3D40" },
      { value: "300", color: "#683333" },
    ],
  },
];

export function DesignStrip() {
  const { navigate } = useNavigation();
  const [layoutBounds, setLayoutBounds] = useState<{ y: number }[]>(
    sections.map((_) => {
      return { y: 0 };
    })
  );

  const [colorValues, setColorValues] = useState(
    sections.map((item) => ({
      color: item.levels[0].color,
      value: item.levels[0].value,
    }))
  );

  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 16 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "black" }}>
          Test Strip
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "lightgray",
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 16,
          }}
          onPress={() => navigate("Home")}
        >
          <Text style={{ fontSize: 16, color: "gray" }}>Next</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, flexDirection: "row" }}>
        <View
          style={{
            flex: 0.1,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: "gray",
          }}
        >
          {layoutBounds.map((i, layIndex) => {
            return (
              <View
                style={{
                  position: "absolute",
                  top: i.y,
                  width: "80%",
                  alignSelf: "center",
                  height: 20,
                  borderRadius: 4,
                  backgroundColor: colorValues[layIndex].color,
                }}
              ></View>
            );
          })}
        </View>
        <View style={{ flex: 0.9, marginLeft: 12 }}>
          {sections.map((section, index) => (
            <View
              key={index}
              style={{ marginBottom: 24 }}
              onLayout={({
                nativeEvent: {
                  layout: { y },
                },
              }) => {
                console.log("-->", y);
                setLayoutBounds((oldBounds) => {
                  return oldBounds.map((item, i) => {
                    if (i === index) {
                      return { y: y + 40 };
                    }
                    return { y: item.y };
                  });
                });
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginRight: 2,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#7F7F7F",
                    marginBottom: 8,
                  }}
                >
                  {section.title}{" "}
                  <Text style={{ fontSize: 12, fontWeight: "400" }}>(ppm)</Text>
                </Text>
                <TextInput
                  value={colorValues[index].value.toString()}
                  onChangeText={(e) => {
                    const level = section.levels.find(
                      (value) => String(value.value) === e
                    );
                    setColorValues((oldColors) =>
                      oldColors.map((color, i) => {
                        if (i === index) {
                          return {
                            color: level?.color ?? color.color,
                            value: e,
                          };
                        }
                        return color;
                      })
                    );
                  }}
                  style={{
                    borderWidth: 1,
                    borderRadius: 4,
                    borderColor: "lightgray",
                    width: 80,
                    fontSize: 12,
                    color: "black",
                    textAlign: "center",
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 4,
                }}
              >
                {section.levels.map((level, levelIndex) => (
                  <View>
                    <TouchableOpacity
                      onPress={() =>
                        setColorValues((oldColors) =>
                          oldColors.map((color, i) => {
                            if (i === index) {
                              return {
                                color: level.color,
                                value: level.value,
                              };
                            }
                            return color;
                          })
                        )
                      }
                    >
                      <View
                        key={levelIndex}
                        style={{
                          height: 20,
                          width: 40,
                          marginRight: 4,
                          backgroundColor: level.color, // Adjust the colors
                          borderRadius: 4,
                        }}
                      />
                    </TouchableOpacity>
                    <Text>{level.value}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
