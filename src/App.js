import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { Component } from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import Collapse from './components/Collapse';
import { Colours } from './res/Colours';
import Icon from 'react-native-vector-icons/Ionicons';

console.disableYellowBox = true;

const KEYS_TO_FILTERS = ['item_name', 'item_desc'];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ModalVisibleStatus: false,
      fetchedData: [],
      foodData: [],
    }
  }

  fetchdata = async () => {
    if (await AsyncStorage.getItem("isFetched") == "1") {
      console.log('offline');
      let food = await AsyncStorage.getItem("foodData");
      let parsed = JSON.parse(food);
      this.setState({ foodData: parsed });
    }
    else {
      console.log('online');
      fetch('https://api.jsonbin.io/b/5fce7e1e2946d2126fff85f0', {
        method: 'get',
        headers: {
          'Accept': 'text/html',
          'Content-type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(responseJson => {
          this.setState({ fetchedData: responseJson });
          this.setState({ foodData: this.state.fetchedData.categories });

          const data = JSON.stringify(this.state.foodData);

          AsyncStorage.setItem("foodData", data);
          AsyncStorage.setItem('isFetched', '1');
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  ShowModalFunction(visible) {
    this.setState({ ModalVisibleStatus: visible });
  }

  componentDidMount = async () => {
    this.fetchdata();
  }

  renderCollapse = () => {
    const items = [];
    for (item of this.state.foodData) {
      items.push(
        <Collapse
          title={item.category.categoryName}
          data={item.category.subcategories}
          allData={item.category}
        />
      );
    }
    return items;
  }

  render() {
    return (
      <View style={styles.viewContainer}>

        <Modal animationType="slide" onNavigate={this.onNavigate} transparent={true} visible={this.state.ModalVisibleStatus} onRequestClose={() => { this.ShowModalFunction(!this.state.ModalVisibleStatus); }}>
          <View style={styles.modalContainer}>
            <View style={styles.ModalInsideView}>
              <ScrollView style={styles.container}>
                <Icon style={styles.cancelIcon} name={'close'} size={40} color={'white'} onPress={() => { this.ShowModalFunction(!this.state.ModalVisibleStatus); }} />
                <Text style={styles.headingText}> Approved Foods List</Text>
                <View style={styles.SearchBarContainer}>
                  <Icon style={styles.SearchIcon} name={'ios-search'} size={20} color={'white'} />
                  <TextInput
                    // onChangeText={(term) => { this.searchUpdated(term) }}
                    caseSensitive
                    placeholder="Try searching fat, sauces names..."
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholderTextColor={Colours.TextPrimarySemiMoreDark}
                    style={styles.SearchInput}
                  />
                </View>

                {this.renderCollapse()}
              </ScrollView>
            </View>
          </View>
        </Modal>

        <View style={styles.boxContainer} >

          <View style={[styles.boxItemContainer, { marginEnd: 7.5, marginBottom: 7.5, }]}>
            <View style={[styles.boxItemImageBack, { backgroundColor: Colours.seaText + '40' }]}>
              <Icon name={'barbell'} size={40} color={Colours.seaText} />
            </View>
            <Text style={styles.boxItemTitle}>Weight</Text>
            <Text style={styles.boxItemDesc}>No data added</Text>
          </View>

          <View style={[styles.boxItemContainer, { marginStart: 7.5, marginBottom: 7.5 }]}>
            <View style={[styles.boxItemImageBack, { backgroundColor: Colours.LeanText + '40' }]}>
              <Icon name={'heart'} size={40} color={Colours.LeanText} />
            </View>
            <Text style={styles.boxItemTitle}>Inches Lost</Text>
            <Text style={styles.boxItemDesc}>No data added</Text>
          </View>
        </View>

        <View style={styles.boxContainer}>

          <View style={[styles.boxItemContainer, { margin: 15, marginEnd: 7.5, marginTop: 7.5, marginBottom: 7.5 }]}>
            <View style={[styles.boxItemImageBack, { backgroundColor: Colours.vegText + '40' }]}>
              <Icon name={'barcode'} size={40} color={Colours.vegText} />
            </View>
            <Text style={styles.boxItemTitle}>Body Measurements</Text>
            <Text style={styles.boxItemDesc}>No data added</Text>
          </View>

          <View style={[styles.boxItemContainer, { margin: 15, marginStart: 7.5, marginTop: 7.5, marginBottom: 7.5 }]}>
            <View style={[styles.boxItemImageBack, { backgroundColor: Colours.seaBack + '40' }]}>
              <Icon name={'water'} size={40} color={Colours.seaBack} />
            </View>
            <Text style={styles.boxItemTitle}>Water Intake</Text>
            <Text style={styles.boxItemDesc}>No data added</Text>
          </View>

        </View>

        <View style={styles.boxContainer}>

          <TouchableOpacity activeOpacity={1} style={[styles.boxItemContainer, { margin: 15, marginEnd: 7.5, marginTop: 7.5 }]} onPress={() => { this.ShowModalFunction(true); }}>
            <View style={[styles.boxItemImageBack, { backgroundColor: Colours.sauceText + '40' }]}>
              <Icon name={'list-circle'} size={40} color={Colours.sauceText} />
            </View>
            <Text style={[styles.boxItemTitle, { color: Colours.sauceText }]}>View approved food list</Text>
            {/* <Text style={styles.boxItemDesc}>No data added</Text> */}
          </TouchableOpacity>

          <View style={[styles.boxItemContainer, { margin: 15, marginStart: 7.5, marginTop: 7.5 }]}>
            <View style={[styles.boxItemImageBack, { backgroundColor: Colours.alterText + '40' }]}>
              <Icon name={'star'} size={40} color={Colours.alterText} />
            </View>
            <Text style={styles.boxItemTitle}>Day Performance</Text>
            <Text style={styles.boxItemDesc}>No data added</Text>
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: Colours.appBack,
  },

  boxContainer: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#fff'
  },

  boxItemContainer: {
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    flex: 1,
    margin: 15,
    padding: 10
  },

  boxItemImageBack: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    width: 70,
    borderRadius: 20,
    backgroundColor: Colours.seaBack
  },
  boxItemTitle: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  boxItemDesc: {
    color: Colours.TextPrimarySemiMoreDark
  },


  container: {
    backgroundColor: Colours.appBack,
    padding: 15
  },

  cancelIcon: {
    color: Colours.textColour, marginTop: 10, marginBottom: 20
  },

  headingText: {
    fontSize: 30, fontWeight: 'bold', marginBottom: 30
  },

  SearchBarContainer: {
    backgroundColor: Colours.TextPrimarySemiDark,
    flexDirection: 'row',
    borderRadius: 5,
    height: 50,
    marginBottom: 15,
  },

  SearchIcon: {
    alignContent: 'center',
    alignSelf: 'center',
    marginLeft: 10,
    color: Colours.TextPrimarySemiMoreDark
  },

  SearchInput: {
    height: 40,
    width: '100%',
    flex: 1,
    fontSize: 14,
    color: Colours.TextPrimarySemiMoreDark,
    alignSelf: 'center',
    marginStart: 5,
    marginEnd: 5,
  },
});
