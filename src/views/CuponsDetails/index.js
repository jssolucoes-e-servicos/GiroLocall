import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { AppColors } from "~/config/defines.json";

export default function CuponsDatails({ navigation }) {
  const [detailsIMG, setDetailsIMG] = useState();
  const [detailsEMP, setDetailsEMP] = useState();
  const [detailsDSC, setDetailsDSC] = useState();
  const [detailsWHATS, setDetailsWHATS] = useState();
  const [detailsINSTA, setDetailsINSTA] = useState();
  const [detailsFACE, setDetailsFACE] = useState();
  const [detailsSITE, setDetailsSITE] = useState();

  useEffect(() => {
    async function loadCompanies() {
      try {
        let returnParams = navigation.getParam("cupomData");
        setDetailsIMG(returnParams.IMG);
        setDetailsEMP(returnParams.EMP);
        setDetailsDSC(returnParams.DSC);
        let nameEMP = returnParams.EMP;
        const value = await AsyncStorage.getItem("@GL_Companies");
        if (value != null) {
          let param = nameEMP.toLowerCase();
          let find = JSON.parse(value);
          let findCompany = find.filter((item) => {
            if (item.EMPRESA.toLowerCase().match(param)) {
              setDetailsWHATS(item.WHATSAPP);
              setDetailsINSTA(item.INSTAGRAM);
              setDetailsFACE(item.FACEBOOK);
              setDetailsSITE(item.SITE);
            }
          });
          // "ANDROID": "",
          // "COD": "4",
          // "EMAIL": "3",
          // "EMPRESA": "CODE3 Tecnologia",
          // "FACEBOOK": "code3tecnologia",
          // "INSTAGRAM": "code3tecnologia",
          // "IOS": "",
          // "LOCAL": "",
          // "LOCALT": "",
          // "RAMO": "TECNOLOGIA",
          // "SITE": "www.code3.com.br",
          // "WHATSAPP": "6740420363",
          // "YOUTUBE": "",
        }
      } catch (e) {
        // error reading value
        console.log("Erro: " + Date());
        console.error(e);
      }
    }

    loadCompanies();
  }, []);

  async function _handleWhatsapp() {
    let url = "https://wa.me/55" + detailsWHATS;
    await Linking.openURL(url);
  }

  async function _handleInstagram() {
    let url = "https://instagram.com/" + detailsINSTA;
    await Linking.openURL(url);
  }

  async function _handleFacebook() {
    let url = "https://facebook.com/" + detailsFACE;
    await Linking.openURL(url);
  }

  async function _handleSite() {
    let url = "https://" + detailsSITE;
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
              uri: detailsIMG,
            }}
          />
          <Text style={styles.title}>{detailsEMP}</Text>
          <Text style={styles.description}>{detailsDSC}</Text>

          {detailsWHATS != "" ? (
            <TouchableOpacity
              style={styles.buttonWhatsapp}
              onPress={() => _handleWhatsapp()}
            >
              <FontAwesome5
                style={{
                  alignSelf: "center",
                  paddingLeft: 25,
                }}
                name='whatsapp'
                size={22}
                color={AppColors.White}
              />
              <Text style={styles.buttonText}>Contato pelo Whatsapp</Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}

          {detailsINSTA != "" ? (
            <TouchableOpacity
              style={styles.buttonSocial}
              onPress={() => _handleInstagram()}
            >
              <FontAwesome5
                style={{
                  alignSelf: "center",
                  paddingLeft: 25,
                }}
                name='instagram'
                size={22}
                color='black'
              />
              <Text style={styles.buttonSocialText}>Siga no Instagram</Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}

          {detailsFACE != "" ? (
            <TouchableOpacity
              style={styles.buttonSocial}
              onPress={() => _handleFacebook()}
            >
              <FontAwesome5
                style={{
                  alignSelf: "center",
                  paddingLeft: 25,
                }}
                name='facebook'
                size={22}
                color='black'
              />
              <Text style={styles.buttonSocialText}>Página do Facebook</Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}
          {detailsSITE != "" ? (
            <TouchableOpacity
              style={styles.buttonSocial}
              onPress={() => _handleSite()}
            >
              <MaterialIcons
                style={{
                  alignSelf: "center",
                  paddingLeft: 25,
                }}
                name='computer'
                size={22}
                color='black'
              />
              <Text style={styles.buttonSocialText}>Acesse nosso Site</Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}
        </View>
      </SafeAreaView>
    </>
  );
  // }
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
  buttonWhatsapp: {
    flexDirection: "row",
    height: 50,
    backgroundColor: AppColors.Green,
    alignItems: "center",
    alignContent: "center",
  },
  buttonSocial: {
    flexDirection: "row",
    height: 50,
    backgroundColor: AppColors.White,
    alignItems: "center",
    alignContent: "center",
  },
  buttonText: {
    color: AppColors.White,
    height: "80%",
    paddingHorizontal: 15,
    fontSize: 16,
    marginTop: 15,
  },
  buttonSocialText: {
    color: "#000",
    height: "80%",
    paddingHorizontal: 15,
    fontSize: 16,
    marginTop: 15,
  },
});
