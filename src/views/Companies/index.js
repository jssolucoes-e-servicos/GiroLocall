import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  Linking,
  TextInput,
} from "react-native";
import { AppColors } from "~/config/defines.json";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import Overlay from "react-native-modal-overlay";

export default function Companies({ navigation }) {
  const [listCompanies, setListCompanies] = useState();
  const [listCompaniesBkp, setListCompaniesBkp] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [VarLocal, setVarLocal] = useState();
  const [VarCompany, setVarCompany] = useState();
  const [VarSearch, setVarSearch] = useState();
  //const [VarSearchList, setVarSearchList] = useState();

  useEffect(() => {
    async function loadCompanies() {
      try {
        const value = await AsyncStorage.getItem("@GL_Companies");
        if (value != null) {
          setListCompaniesBkp(JSON.parse(value));
          setListCompanies(JSON.parse(value));
        } else {
          setListCompaniesBkp(null);
          setListCompanies(null);
        }
      } catch (e) {
        // error reading value
        console.log("error");
      }
    }

    loadCompanies();
  }, []);

  function _handleModal(item) {
    setVarLocal(item.LOCALT);
    setVarCompany(item.EMPRESA);
    setModalVisible(true);
  }

  async function _handleIntent(item) {
    let url = "https://wa.me/55" + item.WHATSAPP;
    await Linking.openURL(url);
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.infos}>
        <Text style={styles.title}>{item.EMPRESA}</Text>
        <Text style={styles.category}>{item.RAMO}</Text>
      </View>
      <View style={styles.buttons}>
        {item.WHATSAPP != "" ? (
          <TouchableOpacity
            style={styles.buttonWhats}
            onPress={() => _handleIntent(item)}
          >
            <FontAwesome5
              style={{
                alignSelf: "center",
                paddingTop: 5,
              }}
              name='whatsapp'
              size={22}
              color={AppColors.Green}
            />
          </TouchableOpacity>
        ) : (
          <View></View>
        )}
        {item.LOCALT != "" ? (
          <TouchableOpacity
            style={styles.buttonAddres}
            onPress={() => _handleModal(item)}
          >
            <MaterialIcons
              style={{
                alignSelf: "center",
                paddingTop: 5,
              }}
              name='location-on'
              size={22}
              color={AppColors.Tifany}
            />
          </TouchableOpacity>
        ) : (
          <View></View>
        )}
      </View>
    </View>
  );

  const MyModal = () => {
    return (
      <Overlay visible={modalVisible} containerStyle={sModal.overlay}>
        <View style={sModal.content}>
          <View style={sModal.modalTop}>
            <FontAwesome5
              style={sModal.IconTitle}
              name='map-marked'
              size={22}
              color={AppColors.TextPrimary}
            />
            <Text style={sModal.modalTitle}>{VarCompany}</Text>
          </View>
          <View style={sModal.modalContent}>
            <Text style={sModal.modalText}>{VarLocal}</Text>
          </View>

          <TouchableHighlight
            style={sModal.modalButtom}
            onPress={() => {
              setModalVisible(false);
            }}
          >
            <Text style={sModal.textStyle}>OK</Text>
          </TouchableHighlight>
        </View>
      </Overlay>
    );
  };

  function onChangeText(text) {
    let param = text.toLowerCase();
    let findCompany = listCompaniesBkp.filter((item) => {
      if (item.EMPRESA.toLowerCase().match(param)) {
        return item;
      }
    });
    let findCategory = listCompaniesBkp.filter((item) => {
      if (item.RAMO.toLowerCase().match(param)) {
        return item;
      }
    });
    const unirSpread = [...findCompany, ...findCategory];
    if (text.length >= 3) {
      setListCompanies(unirSpread);
    } else {
      setListCompanies(listCompaniesBkp);
    }
  }

  return (
    <>
      <StatusBar backgroundColor={AppColors.Purple} style='light' />
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            height: 45,
            backgroundColor: "#ddd",
            borderRadius: 5,
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <FontAwesome5
            style={{
              paddingLeft: "5%",
              width: "15%",
              alignSelf: "center",
            }}
            name='search'
            size={22}
            color={AppColors.TextSecundary}
          />
          <TextInput
            style={{
              height: 43,
              alignSelf: "center",
              width: "85%",
              paddingRight: 1,
              backgroundColor: AppColors.White,
              fontSize: 16,
            }}
            placeholder='    Procurar Empresa'
            onChangeText={(text) => onChangeText(text)}
            value={VarSearch}
          />
        </View>
        <MyModal />
        <FlatList
          style={{ paddingTop: 5 }}
          data={listCompanies}
          keyExtractor={(item) => item.COD}
          renderItem={renderItem}
        />
      </SafeAreaView>
    </>
  );
}

const sModal = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  content: {
    height: 200,
  },
  modalTop: {
    flex: 1,
    flexDirection: "row",
    minHeight: 20,
    paddingBottom: 5,
  },
  modalTitle: {
    width: "80%",
    fontWeight: "bold",
    fontSize: 18,
    paddingLeft: 10,
    color: AppColors.TextPrimary,
  },
  IconTitle: {
    width: "10%",
  },
  modalContent: {
    minHeight: 80,
    paddingVertical: 10,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: AppColors.TextSecundary,
  },
  modalText: {
    fontSize: 18,
  },
  textStyle: {
    fontSize: 20,
    color: AppColors.White,
    lineHeight: 45,
    alignSelf: "center",
  },
  modalButtom: {
    height: 45,
    width: 55,
    borderRadius: 5,
    marginTop: 10,
    marginLeft: "85%",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: AppColors.Green,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 5,
    backgroundColor: AppColors.Container,
  },
  card: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
    backgroundColor: AppColors.White,
    borderColor: AppColors.PanelBorder,
  },
  infos: {
    // flex: 1,
    // flexDirection: "column",
    minWidth: "67%",
    backgroundColor: AppColors.White,
    borderColor: AppColors.PanelBorder,
  },
  buttons: {
    flex: 1,
    flexDirection: "row",
    minWidth: "7%",
    padding: 10,
    backgroundColor: AppColors.White,
    borderColor: AppColors.PanelBorder,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: AppColors.TextPrimary,
    paddingTop: 5,
    paddingHorizontal: 15,
  },
  category: {
    fontSize: 14,
    color: AppColors.TextSecundary,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  buttonWhats: {
    height: 40,
    width: 40,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: AppColors.Green,
    alignItems: "center",
    alignContent: "center",
  },
  buttonAddres: {
    height: 40,
    width: 40,
    borderWidth: 2,
    borderRadius: 5,
    marginLeft: 5,
    borderColor: AppColors.Tifany,
    alignItems: "center",
    alignContent: "center",
  },
});
