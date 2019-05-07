import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import Constant from '../../common/Constant';
import { httpFetch } from '../../util/HttpUtil';
class ShanDanListView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            shuDanItemArray: [],
        }
    }
    /**
     * item的点击事件，在该方法中调用书单组件的onPress()方法
     */
    onPress = (id) => {
        this.props.onPress(id);
    }

    componentDidMount = () => {
        this.getList();
    }

    getList = () => {
        let url = Constant.baseUrl + 'action=list&q=' + this.props.tabLabel;
        let _this = this;
        let callBack = {
            onSuccess(resultObject) {
                _this.setState({
                    shuDanItemArray: _this.state.shuDanItemArray.concat(resultObject.data)
                });
            },
            onError(code, errorMsg) {

            }
        };
        httpFetch(url, 'GET', null, callBack);
    }
    /**
     * 返回每个Item的布局
     */
    renderItem = ({ item }) => {
        let imageSource = require('../../img/default.png');
        if (item.image) {
            imageSource = { uri: item.image };
        }
        return (<TouchableOpacity style={[styles.item_root]} onPress={() => this.onPress(item.id)}>

            <Image style={styles.img} source={imageSource} resizeMode='contain' />
            <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>)
    }

    render() {
        return (
            <FlatList
                data={this.state.shuDanItemArray}
                renderItem={this.renderItem}
                numColumns={3}
                columnWrapperStyle={{ justifyContent: 'space-around' }}
            />
        );
    }
}
const styles = StyleSheet.create({
    item_root: {
        alignItems: 'center',
        marginTop: 42
    },
    img: {
        width: 100,
        height: 140,
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        borderColor: '#B9B9BB'
    },
    text: {
        color: '#343434',
        fontSize: 12,
        marginTop: 12
    }

})

export default ShanDanListView;