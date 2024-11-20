import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useCategories } from "../../hooks/useCategories";
import { Category } from "../../interfaces/categories";
import { useSubCategories } from "../../hooks/useSubCategories";
import { SubCategoryView } from "./SubCategory";
import { useNavigation } from "@react-navigation/native";

export function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const { data, tryFetchCategory } = useCategories((initial: Category) => {
    setSelectedCategory(initial);
  });
  const { navigate } = useNavigation();
  const {
    loading: subCategoriesLoading,
    data: subCategoriesData,
    tryFetchSubCategory,
    tryFetchMoreSubCategory,
  } = useSubCategories();

  useEffect(() => {
    if (selectedCategory?.Id) {
      tryFetchSubCategory(56);
    }
  }, [selectedCategory]);

  return (
    <View style={{ flex: 1 }}>
      <View>
        <ScrollView horizontal style={{ backgroundColor: "black" }}>
          {data?.Result?.Category?.map((category) => {
            const isSelected = selectedCategory?.Id === category.Id;
            return (
              <TouchableOpacity
                onPress={() => setSelectedCategory(category)}
                style={{ paddingVertical: 8, paddingHorizontal: 12 }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: isSelected ? "700" : "500",
                    color: isSelected ? "red" : "white",
                  }}
                >
                  {category?.Name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <FlatList
        data={subCategoriesData?.Result?.Category[0]?.SubCategories}
        renderItem={({ item: subCategory }) => {
          return <SubCategoryView subCategory={subCategory} />;
        }}
        ListFooterComponent={() =>
          subCategoriesLoading ? (
            <ActivityIndicator size={"small"} color={"red"} />
          ) : null
        }
        onEndReachedThreshold={0.1}
        onEndReached={() => tryFetchMoreSubCategory(selectedCategory?.Id || 0)}
      />
      <View
        style={{
          position: "absolute",
          bottom: 24,
          right: 24,
          borderRadius: 24,
          backgroundColor: "red",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={{ paddingHorizontal: 16, paddingVertical: 16, alignItems: "center", justifyContent: "center" }}
          onPress={() => navigate("DesignStrip")}
        >
          <Text>D</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
