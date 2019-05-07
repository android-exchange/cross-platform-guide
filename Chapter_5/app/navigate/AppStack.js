import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import { createBottomTabNavigator, createDrawerNavigator, createStackNavigator, } from 'react-navigation';
import ShuDanView from '../view/shudan/ShuDanView';
import MeView from '../view/account/MeView';
import SplashView from '../view/login/SplashView';
import LoginView from '../view/login/LoginView';
import RegisterView from '../view/login/RegisterView';
import ShuDanDetailView from '../view/shudan/ShuDanDetailView';
import DrawerView from '../view/drawer/DrawerView';
import Constant from '../common/Constant';

export const TabBottomBar = createBottomTabNavigator({
  ShuDan: {
    screen: ShuDanView,
    navigationOptions: {
      tabBarPosition: 'bottom',
      tabBarLabel: '首页',

      tabBarIcon: ({ focused, tintColor }) => {
        let imgSource = focused ? require('../img/icon2.png') : require('../img/home_unselect.png');
        return <Image
          style={{ width: 25, height: 25 }} source={imgSource} />;
      }
    }
  },
  Me: {
    screen: MeView,
    navigationOptions: {
      tabBarPosition: 'bottom',
      tabBarLabel: '我的',

      tabBarIcon: ({ focused, tintColor }) => {
        let imgSource = focused ? require('../img/me_selected.png') : require('../img/icon3.png');
        return <Image style={{ width: 25, height: 25 }} source={imgSource} />;
      },
    }
  }
},
  {
    tabBarOptions: {
      activeTintColor: ' #636362',
    }
  }
);





export const StackNavigator = createStackNavigator(
  {
    Splash: {
      screen: SplashView,
      navigationOptions: {
        header: null
      }
    },
    Login: {
      screen: LoginView,
      navigationOptions: {
        header: null
      }
    },
    Register: {
      screen: RegisterView,
      navigationOptions: {
        title: '注册'
      }
    },
    ShuDanDetail: {
      screen: ShuDanDetailView,
      navigationOptions: {
        title: '书单详情'
      }
    },
    Tab: {
      screen: TabBottomBar,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: 'Splash',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#353535',
        height: 44
      },
      headerTintColor: '#FFFFFF',
      headerTitleStyle: {
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
        fontSize: 18
      },
      headerRight: <View />
    }
  }
);

export const RootStack = createDrawerNavigator({
  Tab: {
    screen: StackNavigator,
    navigationOptions: {
      drawerLabel: <DrawerView />
    }
  }
})
