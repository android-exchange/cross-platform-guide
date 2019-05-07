import React, { Component } from 'react';
import { Text, View, StyleSheet, BackHandler, Image, TouchableOpacity, ImageBackground } from 'react-native';
import BaseComponent from '../../component/BaseComponent';
import CommonStyle from '../../common/CommonStyle';
import { toastShort } from '../../util/ToastUtil';
import Constant from '../../common/Constant';
class MeView extends BaseComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[CommonStyle.root]}>
                <View style={styles.header_layout}>
                    <Image source={require("../../img/me_header.png")} />
                    <Text style={styles.header_text}>我的</Text>
                    <Image source={require("../../img/me_setting.png")} />
                </View>
                <View style={styles.header_view}>
                    <Text style={{ marginTop: 24, fontSize: 18, color: '#353535' }}>
                        Jack
                    </Text>
                    <Image source={require('../../img/default_icon.png')}
                        style={styles.header_image} />

                    <ImageBackground
                        resizeMode='contain'
                        source={require('../../img/me_rect.png')}
                        style={styles.imageBackground}>
                        <View>
                            <Text style={{ fontSize: 17, color: '#FFFFFF' }}>强力推荐卡</Text>
                            <Text style={{ fontSize: 14, color: '#FFFFFF', marginTop: 12 }}>
                                最给力的书单就在这里
                            </Text>
                        </View>
                        <Image source={require('../../img/me_lingqu.png')} />
                    </ImageBackground>
                </View>

                <View style={styles.like_book_view}>
                    <Image source={require('../../img/me_like.png')} />
                    <Text style={{ flex: 1, marginLeft: 8, color: '#636362', fontSize: 14 }}>
                        我想要的书籍
                    </Text>
                    <Text style={{ color: '#636362', fontSize: 21 }}>
                        0<Text style={{ fontSize: 14 }}>本</Text>
                    </Text>
                </View>
                <View style={styles.shoucang_book}>
                    <Image source={require('../../img/me_shoucang.png')} />
                    <Text style={{ flex: 1, marginLeft: 8, color: '#636362', fontSize: 14 }}>
                        我收藏的书籍
                    </Text>
                    <Text style={{ color: '#636362', fontSize: 21 }}>
                        0<Text style={{ fontSize: 14 }}>本</Text>
                    </Text>
                </View>
                <View style={styles.dianzan_book}>
                    <Image source={require('../../img/me_dianzan.png')} />
                    <Text style={{ flex: 1, marginLeft: 8, color: '#636362', fontSize: 14 }}>
                        我点赞的书籍
                    </Text>
                    <Text style={{ color: '#636362', fontSize: 21 }}>
                        0<Text style={{ fontSize: 14 }}>本</Text>
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({


    header_layout: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 44,
        backgroundColor: '#353535',
        paddingLeft: 20,
        paddingRight: 20
    },
    header_text: {
        color: '#FFFFFF',
        fontSize: 18,
        alignSelf: 'center'
    },
    header_view: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingLeft: 16,
        paddingRight: 16
    },
    header_image: {
        width: 85,
        height: 85,
        borderRadius: 42.5,
        marginTop: 8,
        marginBottom: 4
    },
    like_book_view: {
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginTop: 40,
        paddingLeft: 16,
        paddingRight: 25
    },
    shoucang_book: {
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginTop: 8,
        paddingLeft: 16,
        paddingRight: 25
    },
    dianzan_book: {
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginTop: 8,
        paddingLeft: 16,
        paddingRight: 25
    },
    imageBackground: {
        height: Constant.screenWidth / 3,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
})
export default MeView;