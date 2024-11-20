import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { SubCategory } from "../../interfaces/subCategories";
import { useProducts } from "../../hooks/useProducts";

const SubCategoryView = ({
  subCategory: { Id, Name },
}: {
  subCategory: SubCategory;
}) => {
  const {
    data: products,
    tryFetchProducts,
    tryFetchMoreProducts,
  } = useProducts();
  console.log("products: ", JSON.stringify(products));

  useEffect(() => {
    if (Id) {
      tryFetchProducts(Id);
    }
  }, [Id]);

  return (
    <View key={Id} style={{ paddingHorizontal: 12, paddingTop: 12 }}>
      <Text>{Name}</Text>
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 12 }}
          data={products?.Result || []}
          renderItem={({ item: product }) => {
            return (
              <View
                key={product.Id}
                style={{
                  width: 140,
                }}
              >
                <Image
                  source={{ uri: product.ImageName }}
                  style={{ height: 110, width: 120, borderRadius: 6 }}
                />
                <Text style={{ fontSize: 10, marginTop: 8 }} numberOfLines={2}>
                  {product.Name}
                </Text>
              </View>
            );
          }}
          onEndReached={() => tryFetchMoreProducts(Id)}
          onEndReachedThreshold={0.1}
        />
      </View>
    </View>
  );
};

export { SubCategoryView };
