import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import API from "~/services/api";
import { AppColors } from "~/config/defines.json";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from "expo-updates";
import Overlay from "react-native-modal-overlay";

export default function LoadingData({ navigation }) {
  const [onUpdates, setOnUpdates] = useState(false);

  useEffect(() => {
    async function getUpdate() {
      const { hasUpdates } = await Updates.checkForUpdateAsync();
      if (hasUpdates) {
        setOnUpdates(true);
        await Updates.fetchUpdateAsync();
        await Updates.realoadAsync();
        setOnUpdates(false);
      }
    }

    async function loadData() {
      try {
        await AsyncStorage.clear();
        //load cupons
        const dateCupons = await API.get("cupom");
        const jsonCupons = JSON.stringify(dateCupons.data);
        await AsyncStorage.setItem("@GL_Cupons", jsonCupons);
        //load companies
        const dateCompanies = await API.get("lista_empresas");
        const jsonCompanies = JSON.stringify(dateCompanies.data);
        await AsyncStorage.setItem("@GL_Companies", jsonCompanies);
        //load companies
        const dateApp = await API.get("aplicativo");
        const jsonApp = JSON.stringify(dateApp.data);
        await AsyncStorage.setItem("@GL_App", jsonApp);
        navigation.navigate("AppViews");
      } catch (e) {
        console.log("erro");
        console.log(e);
      }
    }
    getUpdate();
    loadData();
  }, []);

  const MyModal = () => {
    return (
      <Overlay visible={onUpdates} containerStyle={sModal.overlay}>
        <View style={sModal.modalContent}>
          <View style={sModal.updateView}>
            <ActivityIndicator size='large' color={AppColors.Purple} />
            <Text style={sModal.updateText}>ATUALIZANDO...</Text>
          </View>
        </View>
      </Overlay>
    );
  };

  return (
    <>
      <StatusBar backgroundColor={AppColors.White} style='dark' />
      <View style={styles.container}>
        <View style={{ minHeight: "85%" }}>
          <Image
            style={styles.loadImage}
            source={require("~/assets/images/loading.gif")}
          />
          <Text style={styles.text}>GIROLOCALL</Text>
        </View>
        <View style={{ minHeight: "15%" }}>
          <Image
            style={styles.logoImage}
            source={require("~/assets/images/logocode3.png")}
          />
        </View>
      </View>
      <MyModal />
    </>
  );
}

const sModal = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  modalContent: {
    minHeight: 80,
    paddingVertical: 10,
    borderColor: AppColors.TextSecundary,
  },
  updateView: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: AppColors.White,
    alignContent: "center",
    alignItems: "center",
  },
  updateText: {
    fontSize: 30,
    paddingLeft: 5,
    color: AppColors.Purple,
    alignSelf: "center",
  },
});

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: AppColors.White,
  },
  loadImage: {
    alignSelf: "center",
    resizeMode: "contain",
    height: 300,
    width: 300,
    position: "absolute",
    marginTop: 150,
  },
  text: {
    fontSize: 30,
    color: AppColors.Purple,
    alignSelf: "center",
    marginTop: 300,
  },
  logoImage: {
    alignSelf: "center",
    resizeMode: "contain",
    height: 100,
    width: 100,
  },
});
