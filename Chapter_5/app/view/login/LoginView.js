import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Button, Platform, Image, Text, TouchableOpacity } from 'react-native';
import CommonStyle from '../../common/CommonStyle';
import BaseComponent from '../../component/BaseComponent';
import { isEmpity } from '../../util/StringUtil';
import { toastShort } from '../../util/ToastUtil';
import AsyncStorageUtil from '../../util/AsyncStorageUtil';
class LoginView extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            psw: ""
        }
    }

    componentDidMount() {
        AsyncStorageUtil.getValue("userName", (error, result) => {
            if (result) {
                this.setState({
                    userName: result
                })
            }
        });
    }


    /**
     * 按钮跳转
     */
    onPress = () => {
        if (isEmpity(this.state.userName)) {
            toastShort("账号不能为空");
            return;
        }
        if (isEmpity(this.state.psw)) {
            toastShort("密码不能为空");
            return;
        }
        let multiParis = [
            ["userName", this.state.userName],
            ["psw", this.state.psw]
        ]
        AsyncStorageUtil.setValues(multiParis, (errors) => {
            this.props.navigation.navigate('Tab')
        }).then(() => this.props.navigation.navigate('Tab'))

    }
    /**
     * 注册按钮
     */
    onRegisterPress = () => {
        this.props.navigation.navigate('Register');
    }
    /**
     * 账号输入
     */
    onChangeTextUserName = (text) => {
        this.setState({
            userName: text
        })
    }
    /**
    * 密码输入
    */
    onChangeTextPsw = (text) => {
        this.setState({
            psw: text
        })
    }

    render() {
        return (
            <View style={[CommonStyle.root, { backgroundColor: '#FFFFFF' }]}>
                <Text style={styles.text_header}>您好</Text>
                <Text style={styles.text}>欢迎来到登陆界面</Text>
                <TextInput
                    style={styles.input}
                    numberOfLines={1}
                    placeholder={'请输入账号'}
                    placeholderTextColor={'#828181'}
                    underlineColorAndroid="transparent"
                    onChangeText={this.onChangeTextUserName}
                    value={this.state.userName}
                />
                <TextInput
                    style={styles.input}
                    numberOfLines={1}
                    placeholder={'请输入密码'}
                    placeholderTextColor={'#828181'}
                    underlineColorAndroid="transparent"
                    onChangeText={this.onChangeTextPsw}
                    keyboardType="numeric"
                    secureTextEntry={true}                 
                    value={this.state.psw}
                />
                <Text style={styles.text_register_desc}
                    onPress={() => this.onRegisterPress()}
                >
                    没有账号？注册一个吧
                </Text>
                <TouchableOpacity
                    onPress={() => this.onPress()}
                    style={{ marginTop: 26, alignItems: 'center' }}>
                    <Image source={require('../../img/login_btn.png')} />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {

        backgroundColor: '#E5E5E5',
        color: '#828181',
        fontSize: 16,
        paddingLeft: 8,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10,
        marginTop: 30,
        marginLeft: 17,
        marginRight: 17

    },
    text: {
        color: '#636362',
        fontSize: 16,
        marginTop: 10,
        marginBottom: 42,
        textAlign: 'center'
    },
    text_header: {
        color: '#636362',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 100
    },
    text_register_desc: {
        marginLeft: 17,
        color: '#59C1E3',
        fontSize: 14,
        marginTop: 12
    }
})

export default LoginView;