import React, { Component } from 'react';
import { Text, View, StyleSheet, BackHandler, Image, TouchableOpacity, ImageBackground } from 'react-native';
import CommonStyle from '../../common/CommonStyle';

class DrawerView extends Component {
    render() {
        return (
            <View style={[CommonStyle.root, { backgroundColor: '#FFFFFF' }]}>
                <View style={{ alignItems: 'center' }}>

                    <ImageBackground
                        source={require('../../img/drawer_icon2.png')}
                        style={styles.imgbackground}>
                        <View style={styles.top_view}>
                            <Image source={require('../../img/default_icon.png')} />
                            <Text style={styles.text_name}> Jack</Text>
                        </View>
                        <Text style={styles.text_desc}>送给程序员的爱心书单</Text>
                    </ImageBackground>

                    <Image
                        source={require('../../img/drawer_icon1.png')}
                        style={styles.img} />
                </View>

                <View style={styles.bottom_view}>
                    <Image source={require('../../img/drawer_icon3.png')} />
                    <Image source={require('../../img/drawer_arrow.png')} />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    imgbackground: {
        width: '100%',
        height: 185,
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'center'
    },
    text_name: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 16
    },
    img: {
        position: 'absolute',
        bottom: 0,
        right: 0
    },
    text_desc: {
        color: '#FFFFFF',
        fontSize: 14, marginTop: 16,
        marginLeft: 16
    },
    top_text: {
        color: '#FFFFFF',
        fontSize: 14,
        marginLeft: 10
    },
    bottom_view: {
        borderBottomColor: '#828181',
        borderBottomWidth: 0.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 42,
        paddingBottom: 16,
        marginLeft: 8,
        marginRight: 8
    },
    top_view: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 16

    }
})
export default DrawerView;