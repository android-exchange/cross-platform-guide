import React, { Component } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import CommonStyle from '../../common/CommonStyle';
import BaseComponent from '../../component/BaseComponent';
import { isEmpity } from '../../util/StringUtil';
import { toastShort } from '../../util/ToastUtil';
class RegisterView extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            psw: ""
        }
    }

    /**
     * 注册
     */
    onRegisterPress = () => {
        if (isEmpity(this.state.userName)) {
            toastShort("账号不能为空");
            return;
        }
        if (isEmpity(this.state.psw)) {
            toastShort("密码不能为空");
            return;
        }
        toastShort("注册成功");
        this.props.navigation.goBack();
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
                <View
                    style={{ alignItems: 'center', marginBottom: 45 }}>
                    <Image
                        source={require('../../img/register_header.png')}
                        style={{ marginTop: 45, marginBottom: 45 }} />
                    <Text
                        style={{ color: '#636362', fontSize: 18 }}>
                        您好
                    </Text>
                    <Text
                        style={{ color: '#636362', fontSize: 14, marginTop: 10 }}>
                        欢迎来到注册页面
                    </Text>
                </View>

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
                    value={this.state.psw}
                />

                <TouchableOpacity
                    onPress={() => this.onRegisterPress()}
                    style={{ marginTop: 26, alignItems: 'center' }}>

                    <Image
                        source={require('../../img/register_btn.png')} />

                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    input: {
        height: 44,
        color: '#828181',
        fontSize: 14,
        marginBottom: 44,
        borderBottomWidth: 0.5,
        marginLeft: 17,
        marginRight: 17,
        borderBottomColor: '#828181'

    },
    button: {
        margin: 30,
        borderRadius: 30,
        padding: 8,
        height: 44
    }
})
export default RegisterView;