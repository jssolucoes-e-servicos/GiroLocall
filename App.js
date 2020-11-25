import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { AppColors } from "~/config/defines.json";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import CuponsDetails from "~/views/CuponsDetails";
import CuponsList from "~/views/CuponsList";
import Companies from "~/views/Companies";
import About from "~/views/About";
import LoadingData from "~/views/components/LoadingData";

const CuponsStack = createStackNavigator({
  CuponsList: {
    screen: CuponsList,
    navigationOptions: {
      headerTitle: "Giro Locall",
      headerStyle: {
        backgroundColor: AppColors.Purple,
      },
      headerTintColor: AppColors.White,
    },
  },
  CuponsDetails: {
    screen: CuponsDetails,
    navigationOptions: {
      headerTitle: "Detalhes do Cupom",
      headerStyle: {
        backgroundColor: AppColors.Purple,
      },
      headerTintColor: AppColors.White,
    },
  },
});

const CompaniesStack = createStackNavigator({
  CompaniesList: {
    screen: Companies,
    navigationOptions: {
      headerTitle: "Empresas Parceiras",
      headerStyle: {
        backgroundColor: AppColors.Purple,
      },
      headerTintColor: AppColors.White,
    },
  },
});

const AboutStack = createStackNavigator({
  About: {
    screen: About,
    navigationOptions: {
      headerTitle: "Cilleid Heredia",

      headerStyle: {
        backgroundColor: AppColors.Purple,
      },
      headerTintColor: AppColors.White,
    },
  },
});

const MainTabs = createBottomTabNavigator(
  {
    Cupons: {
      screen: CuponsStack,
      navigationOptions: {
        title: "",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome5 name='tags' size={16} color={tintColor} />
        ),
      },
    },
    Company: {
      screen: CompaniesStack,
      navigationOptions: {
        title: "",
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcons name='store' size={24} color={tintColor} />
        ),
      },
    },
    About: {
      screen: AboutStack,
      navigationOptions: {
        title: "",
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcons name='star' size={24} color={tintColor} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      showIcon: true,
      activeTintColor: AppColors.White,
      inactiveTintColor: AppColors.Purple,
      activeBackgroundColor: AppColors.Purple,
      style: {
        backgroundColor: AppColors.White,
      },
    },
  }
);

const App = createSwitchNavigator({
  Loading: {
    screen: LoadingData,
  },
  AppViews: {
    screen: MainTabs,
  },
});

export default createAppContainer(App);
