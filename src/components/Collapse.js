import { FlatList, LayoutAnimation, Platform, SectionList, StyleSheet, Text, TouchableOpacity, UIManager, View } from "react-native";
import React, { Component } from 'react';

import { Colours } from './../res/Colours';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Collapse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            allData: props.allData,
            expanded: false,
        }

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    componentDidMount() {

        const foodData = this.state.data.reduce((r, s) => {
            r.push({ title: s.subCategoryname, data: s.items });
            return r;
        }, []);

        this.setState({ data: foodData })
    }

    render() {
        return (
            <View>
                <TouchableOpacity activeOpacity={0.9} style={styles.row} onPress={() => this.toggleExpand()}>
                    <View style={styles.titieImageContainer}>
                        <View style={[styles.titieImageBack, { backgroundColor: this.state.allData.colorCode + '50' }]} >
                            <Icon name={'fast-food'} size={30} color={this.state.allData.colorCode} />
                        </View>
                        <Text style={[styles.title, { color: this.state.allData.colorCode }]}>{this.props.title} <Text style={{ color: Colours.textColour }}>{this.state.allData.servingSize ? '(' + this.state.allData.servingSize + ')' : ''} </Text></Text>
                    </View>
                    <Icon name={this.state.expanded ? 'caret-up' : 'caret-down'} size={15} color={Colours.dropDown} />
                </TouchableOpacity>
                {
                    this.state.expanded &&
                    <View style={styles.child}>
                        <SectionList
                            sections={this.state.data}
                            renderItem={({ item }) =>
                                <View>
                                    <View style={styles.childHr} />
                                    <Text style={[styles.childData, styles.childRow]} >{item}</Text>
                                </View>
                            }
                            renderSectionHeader={({ section: { title } }) => (
                                <>
                                    {title
                                        ?
                                        <Text style={[styles.childHeading, { color: this.state.allData.colorCode }]} >{title} <Text style={{ color: Colours.textColour }}></Text></Text>
                                        :
                                        <></>
                                    }
                                </>
                            )}
                            keyExtractor={(item, index) => item.enName + index}
                        />
                        {(this.state.allData.quote != "")
                            ?
                            <View>
                                <Text style={{padding : 10, paddingBottom:20, textAlign:'center', color:Colours.TextPrimarySemiMoreDark}} >{this.state.allData.quote}</Text>
                            </View>
                            :
                            <></>
                        }

                        {(this.state.allData.protip != "")
                            ?
                            <View style={{backgroundColor:Colours.seaBack, marginTop:0, padding:15, borderRadius:10, margin:15}}>
                                <Text style={{backgroundColor:Colours.tipBack, borderRadius:10, width:50, textAlign:'center', color:'#fff'}}>TIP</Text>
                                <Text style={{color:'#fff',  marginTop:10}}>{this.state.allData.protip}</Text>
                            </View>
                            :
                            <></>
                        }
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

    childHeading: {
        fontWeight: 'bold',
        paddingLeft: 15,
        paddingBottom: 10,
        paddingTop: 20,
        fontSize: 16,
    },

    childHr: {
        borderBottomColor: Colours.border,
        borderBottomWidth: 0.5,
    }
});