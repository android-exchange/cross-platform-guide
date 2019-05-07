import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import ShanDanListView from './ShanDanListView';
import BaseComponent from '../../component/BaseComponent';
import { httpFetch } from '../../util/HttpUtil';
import Constant from '../../common/Constant';
import CommonStyle from '../../common/CommonStyle';
class ShuDanView extends BaseComponent {


    constructor(props) {
        super(props);
        this.state = {
            shuDanTabsArray: []
        }
    }

    componentDidMount = () => {
        this.getTabs();
    }

    getTabs = () => {
        let url = Constant.baseUrl + 'action=category';
        let _this = this;
        let callBack = {
            onSuccess(resultObject) {
                _this.setState({
                    shuDanTabsArray: _this.state.shuDanTabsArray.concat(resultObject.data)
                });
              
            },
            onError(code, errorMsg) {
               
            }
        };
        httpFetch(url, 'GET', null, callBack);
    }
    /**
     * 点击列表Item的回调并调用路由的跳转方法，第二个参数是传递到下一个页面的参数
     */
    onPress = (id) => {
        this.props.navigation.navigate('ShuDanDetail', { id: id });
    }

    /**
     * 返回列表组件
     */
    renderList = () => {
        return (
            this.state.shuDanTabsArray.map((value, index) => {
                return <ShanDanListView
                    tabLabel={value.name}
                    onPress={(id) => this.onPress(id)}
                />
            })
        )
    }


    render() {
        return (
            <View style={CommonStyle.root}>
                <View style={styles.header_layout}>
                    <Image source={require("../../img/icon1.png")} />
                    <Text style={styles.header_text}>首页</Text>
                    <View />
                </View>

                <ScrollableTabView
                    initialPage={0}
                    renderTabBar={() => <ScrollableTabBar />}
                    style={{ flex: 1, backgroundColor: '#EAE9E7' }}
                    tabBarBackgroundColor="#FFFFFF"
                    tabBarActiveTextColor="#636362"
                    tabBarUnderlineStyle={styles.line_view}
                >
                    {
                        this.renderList()
                    }
                </ScrollableTabView>
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
    header_text: { color: '#FFFFFF', 
    fontSize: 18, alignSelf: 'center' },
    line_view: { backgroundColor: '#636362', height: 2 }
})
export default ShuDanView;