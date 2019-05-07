import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import BaseComponent from '../../component/BaseComponent';
import AsyncStorageUtil from '../../util/AsyncStorageUtil';
class SplashView extends BaseComponent {
    static navigationOptions = {
        headerStyle: {
            height: 0
        }

    };
    /**
     * 设置定时器
     */
    componentDidMount() {
        this.timer = setTimeout(() => {
            AsyncStorageUtil.getValue("userName", (error, result) => {
                if (result) {
                   this.props.navigation.navigate('Tab');
                }else{
                    this.props.navigation.navigate('Login');
                }
            });

        }, 1000);
    }
    /**
     * 清除定时器
     */
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }
    render() {
        return (
            <View style={styles.root}>
                <Image source={require('../../img/default.png')} />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    root: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:'#FFFFFF',
        flex:1
    }
})

export default SplashView