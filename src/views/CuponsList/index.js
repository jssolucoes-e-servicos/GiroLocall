import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { AppColors } from "~/config/defines.json";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CuponsList({ navigation }) {
  const [listCupons, setListCupons] = useState();

  useEffect(() => {
    async function loadCupons() {
      try {
        const value = await AsyncStorage.getItem("@GL_Cupons");
        if (value != null) {
          setListCupons(JSON.parse(value));
        } else {
          setListCupons(null);
        }
      } catch (e) {
        // error reading value
        console.log("error");
      }
    }

    loadCupons();
  }, []);

  function transferData(item) {
    let transfItem = item;
    navigation.navigate("CuponsDetails", {
      cupomData: transfItem,
    });
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        style={styles.image}
        source={{
          uri: item.IMG,
        }}
      />
      <Text style={styles.title}>{item.EMP}</Text>
      <Text style={styles.description}>{item.DSC}</Text>
      <TouchableOpacity
        style={styles.buttonMore}
        onPress={() => transferData(item)}
      >
        <Text style={styles.buttonText}>Saiba Mais</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <StatusBar backgroundColor={AppColors.Purple} style='light' />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={listCupons}
          keyExtractor={(item) => item.COD}
          renderItem={renderItem}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: AppColors.Container,
  },
  card: {
    flex: 1,
    padding: 10,
    backgroundColor: AppColors.White,
    borderColor: AppColors.PanelBorder,
  },
  image: {
    height: 300,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: AppColors.TextPrimary,
    paddingTop: 5,
    paddingHorizontal: 15,
  },
  description: {
    fontSize: 18,
    color: AppColors.TextSecundary,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  buttonMore: {
    height: 50,
    backgroundColor: AppColors.Purple,
    alignItems: "center",
    alignContent: "center",
  },
  buttonText: {
    color: AppColors.White,
    fontSize: 16,
    marginTop: 15,
  },
});
