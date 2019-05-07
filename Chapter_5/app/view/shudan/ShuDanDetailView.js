import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput, FlatList, Button } from 'react-native';
import Constant from '../../common/Constant';
import CommonStyle from '../../common/CommonStyle';
import { isEmpity } from '../../util/StringUtil';
import { toastShort } from '../../util/ToastUtil';
import BaseComponent from '../../component/BaseComponent';
import { httpFetch } from '../../util/HttpUtil';

class ShuDanDetailView extends BaseComponent {

    constructor(props) {
        super(props);
        let commentArray = [];
        for (let i = 0; i < 10; i++) {
            commentArray.push({ name: 'tom', content: '好书好书' })
        }
        this.state = {
            commentArray: commentArray,
            text: "",
            image: "",
            introduce: ""
        }
    }

    componentDidMount() {
        this.getDetail();
    }

    /**
     * 获取详情
     */
    getDetail = () => {
        const { navigation } = this.props;
        let id = navigation.getParam('id', null);
        if (!id) {
            return;
        }
        let url = Constant.baseUrl + 'action=detail&q=' + id;
        let _this = this;
        let callBack = {
            onSuccess(resultObject) {
                _this.setState({
                    image: resultObject.data.image,
                    introduce: resultObject.data.introduce
                });
            },
            onError(code, errorMsg) {

            }
        };
        httpFetch(url, 'GET', null, callBack);
    }

    /**
     * 评论条目
     */
    renderItem = ({ item }) => {
        return (
            <View style={styles.item_root}>
                <Image style={{ width: 45, height: 45 }} source={require('../../img/default_icon.png')} />
                <View style={styles.item_view}>
                    <View >
                        <Text style={{ color: '#828181', fontSize: 14 }}>{item.name}</Text>
                        <Text style={{ color: '##636362', fontSize: 17, marginTop: 10 }}>{item.content}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: '#828181', fontSize: 14, marginRight: 12 }}>10</Text>
                        <Image source={require('../../img/shudan_dianzan.png')} />
                    </View>

                </View>
            </View>


        )
    }
    /**
     * 点击发送
     */
    onPress = () => {
        if (isEmpity(this.state.text)) {
            toastShort("不能为空", false);
            return;
        }
        this.setState({
            commentArray: this.state.commentArray.concat({ name: 'tom', content: this.state.text }),
            text: ""
        })
    }
    /**
     * 输入框内容变化
     */
    onChangeText = (str) => {
        this.setState({
            text: str
        })

    }
    /**
     * 设置图片
     */
    getImage = () => {

        if (this.state.image) {
            return { uri: this.state.image }
        } else {
            return require('../../img/default.png');
        }
    }

    render() {
        return (
            <View style={[CommonStyle.root]}>
                <ScrollView >

                    <View style={styles.header_view}>
                        <Image style={styles.img} source={this.getImage()} resizeMode='contain' />
                        <Text style={styles.header_text}>
                            {'       ' + this.state.introduce}
                        </Text>
                        <Image resizeMode={'stretch'}
                            source={require('../../img/shudan_underline.png')}
                            style={styles.img_underline} />
                        <View style={{ flexDirection: 'row-reverse', paddingBottom: 23 }}>
                            <Image source={require('../../img/shudan_shoucang.png')}
                                style={{ marginRight: 11 }} />
                            <Text style={styles.text_shoucang}>收藏</Text>
                        </View>
                    </View>

                    <View style={styles.view_liuyan}>
                        <Text style={styles.text_liuyan}>
                            全部留言
                        <Text style={{ fontSize: 12 }}>
                                (共{this.state.commentArray.length}条)
                        </Text>
                        </Text>
                        <Image resizeMode={'stretch'}
                            source={require('../../img/shudan_underline.png')}
                            style={{ height: 1, width: Constant.screenWidth - 34 }} />
                    </View>
                    <FlatList
                        data={this.state.commentArray}
                        renderItem={this.renderItem}
                    />
                </ScrollView>
                <View style={styles.view_input}>
                    <TextInput
                        style={styles.input}
                        placeholder={'请输入评论'}
                        placeholderTextColor={'#828181'}
                        underlineColorAndroid="transparent"
                        maxLength={50}
                        onChangeText={this.onChangeText}
                        value={this.state.text}
                    />
                    <View style={styles.view_btn}>
                        <Button title={'发送'}
                            onPress={this.onPress}
                            color="#4698CA" />
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    header_view: {
        backgroundColor: '#FFFFFF',
        paddingTop: 33,
        marginBottom: 11,
        paddingLeft: 17,
        paddingRight: 17
    },
    header_text: {
        marginTop: 23,
        color: '#636362',
        fontSize: 14,
        lineHeight: 32
    },
    img: {
        width: Constant.screenWidth,
        height: Constant.screenHeight / 3
    },
    text: {
        fontSize: 18,
        color: '#000000'
    },
    input: {
        flex: 1,
        backgroundColor: '#DFDDDD',
        color: '#828181',
        margin: 10,
        fontSize: 16,
        paddingBottom: 6,
        paddingTop: 6,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 10,

    },
    item_root: {
        flexDirection: 'row', paddingTop: 12,
        paddingBottom: 12, paddingLeft: 21,
        paddingRight: 29, alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    item_view: {
        flexDirection: 'row', marginLeft: 6,
        justifyContent: 'space-between',
        flex: 1, alignItems: 'center'
    },
    img_underline: {
        marginTop: 18,
        marginBottom: 21,
        height: 1,
        width: Constant.screenWidth - 34
    },
    view_liuyan: {
        backgroundColor: '#FFFFFF',
        paddingLeft: 17,
        paddingRight: 17
    },
    text_liuyan: {
        color: '#636362',
        fontSize: 17,
        paddingBottom: 14,
        paddingTop: 14
    },
    text_shoucang: {
        color: '#636362',
        fontSize: 17,
        marginRight: 11
    },
    view_input: {
        width: Constant.screenWidth,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EAE9E7',
    },
    view_btn: {
        marginRight: 10,
        width: 72,
        borderRadius: 10
    }
})

export default ShuDanDetailView;