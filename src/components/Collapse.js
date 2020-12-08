import { FlatList, Image, LayoutAnimation, Platform, StyleSheet, Text, TouchableOpacity, UIManager, View } from "react-native";
import React, { Component } from 'react';

import { Colours } from './../res/Colours';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Collapse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            expanded: false,
            textColor: [
                Colours.LeanText,
                Colours.seaText,
                Colours.vegText,
                Colours.fruitsText,
                Colours.alterText,
                Colours.sauceText,
            ],

            boxColor: [
                Colours.LeanBack,
                Colours.seaBack,
                Colours.vegBack,
                Colours.fruitsBack,
                Colours.alterBack,
                Colours.sauceBack,
            ],

            selectedColor: Colours.LeanText,
            selectedBoxColor: Colours.LeanBack,
        }

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    componentDidMount() {
        this._getRandomColor();
        console.log('Called');
    }

    _getRandomColor() {
        var num = Math.floor(Math.random() * this.state.textColor.length);
        var boxColour = this.state.boxColor[num];
        var colour = this.state.textColor[num];
        this.setState({
            selectedBoxColor: boxColour,
            selectedColor: colour
        })

        console.log(num);
    }

    render() {
        return (
            <View>
                <TouchableOpacity activeOpacity={0.9} style={styles.row} onPress={() => this.toggleExpand()}>
                    <View style={styles.titieImageContainer}>
                        <View style={[styles.titieImageBack, { backgroundColor: this.state.selectedBoxColor }]} >
                            <Icon name={'fast-food'} size={30} color={this.state.selectedColor} />
                        </View>
                        <Text style={[styles.title, { color: this.state.selectedColor }]}>{this.props.title}</Text>
                    </View>
                    <Icon name={this.state.expanded ? 'caret-up' : 'caret-down'} size={15} color={Colours.seaBack} />
                </TouchableOpacity>

                {
                    this.state.expanded &&

                    <View style={styles.child}>
                        <FlatList
                            data={this.state.data}
                            numColumns={1}
                            scrollEnabled={false}
                            renderItem={({ item, index }) =>
                                <View>
                                    <View style={styles.childHr} />
                                    <TouchableOpacity activeOpacity={0.9} style={styles.childRow} >
                                        <Text style={styles.childData} >{item.value}</Text>
                                    </TouchableOpacity>
                                </View>
                            } />
                    </View>
                }

            </View>
        )
    }

    toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expanded: !this.state.expanded })
    }

}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 60,
        paddingLeft: 5,
        paddingRight: 10,
        alignItems: 'center',
        borderBottomColor: Colours.white,
        borderBottomWidth: 1,
        borderRadius: 5,
        backgroundColor: Colours.white,
        marginBottom: 15,
    },

    titieImageContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    titieImageBack: {
        height: 50,
        width: 50,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        fontSize: 16,
        color: Colours.textColour,
        marginStart: 10
    },

    child: {
        backgroundColor: Colours.white,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        marginBottom: 15,
        marginTop: -17,
        color: Colours.textColour
    },

    childData: {
        paddingLeft: 15,
        paddingBottom: 10,
        paddingTop: 10,
        fontSize: 14,
        color: Colours.textColour
    },

    childHr: {
        borderBottomColor: Colours.border,
        borderBottomWidth: 0.5,
    }
});