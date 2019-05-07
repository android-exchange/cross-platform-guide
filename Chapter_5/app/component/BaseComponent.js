import React, { Component } from 'react';
import {  BackHandler } from 'react-native';
class BaseComponent extends Component {
    constructor(props) {
        super(props);
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid);
    }
    componentWillMount() {

    }
    componentWillUnmount() {
        this.backHandler && this.backHandler.remove();
    }

    _onBackAndroid = () => {
        if (!this.props.navigation) {
            return false;
        }
        let { routeName } = this.props.navigation.state;
        if (routeName == "Login" || routeName == 'ShuDan'||routeName=='Me') {
            BackHandler.exitApp()
            return true;
        }else{
            this.props.navigation.goBack();
            return true;
        }
    }

}

export default BaseComponent;