import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
} from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { AppColors } from "~/config/defines.json";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function About() {
  const [appIMG, setAppIMG] = useState();
  const [appNOM, setAppNOM] = useState();
  const [appPRF, setAppPRF] = useState();
  const [appDSC, setAppDSC] = useState();
  const [appFACE, setAppFACE] = useState();
  const [appINSTA, setAppINSTA] = useState();
  const [appWHATS, setAppWHATS] = useState();
  const [appYOUT, setAppYOUT] = useState();

  useEffect(() => {
    async function loadAppData() {
      try {
        const value = await AsyncStorage.getItem("@GL_App");

        if (value != null) {
          let data = JSON.parse(value);

          setAppIMG(data[0].IMG);
          setAppNOM(data[0].NOM);
          setAppPRF(data[0].PRF);
          setAppDSC(data[0].DSC);
          setAppWHATS(data[0].WHATSAPP);
          setAppINSTA(data[0].INSTAGRAM);
          setAppFACE(data[0].FACEBOOK);
          setAppYOUT(data[0].YOUTUBE);
        }
      } catch (e) {
        // error reading value
        console.log("error");
      }
    }

    loadAppData();
  }, []);

  async function _handleWhatsapp() {
    let url = "https://wa.me/55" + appWHATS;
    await Linking.openURL(url);
  }

  async function _handleInstagram() {
    let url = "https://instagram.com/" + appINSTA;
    await Linking.openURL(url);
  }

  async function _handleFacebook() {
    let url = "https://facebook.com/" + appFACE;
    await Linking.openURL(url);
  }

  async function _handleSite() {
    let url = "https://www.youtube.com/channel/" + appYOUT;
    await Linking.openURL(url);
  }

  return (
    <>
      <StatusBar backgroundColor={AppColors.Purple} style='light' />
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <Image
            style={styles.image}
            source={{
              uri: appIMG,
            }}
          />
          <Text style={styles.name}>{appNOM}</Text>
          <Text style={styles.text}>{appPRF}</Text>
          <Text style={styles.text}>{appDSC}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => _handleWhatsapp()}
          >
            <FontAwesome5
              style={styles.icon}
              name='whatsapp'
              size={22}
              color={AppColors.Purple}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => _handleInstagram()}
          >
            <FontAwesome5
              style={styles.icon}
              name='instagram'
              size={22}
              color={AppColors.Purple}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => _handleFacebook()}
          >
            <FontAwesome5
              style={styles.icon}
              name='facebook'
              size={22}
              color={AppColors.Purple}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => _handleSite()}>
            <FontAwesome5
              style={styles.icon}
              name='youtube'
              size={22}
              color={AppColors.Purple}
            />
          </TouchableOpacity>
        </View>
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
  name: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: AppColors.TextPrimary,
    paddingTop: 5,
    paddingHorizontal: 15,
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    color: AppColors.TextSecundary,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },

  button: {
    flex: 1,
    width: 25,
    backgroundColor: AppColors.White,
    alignItems: "center",
    alignContent: "center",
    paddingBottom: 5,
  },
  icon: {
    alignSelf: "center",
    paddingLeft: 25,
  },
});
