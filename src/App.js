import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';

import Collapse from './components/Collapse';
import { Colours } from './res/Colours';
import Icon from 'react-native-vector-icons/Ionicons';

console.disableYellowBox = true;

const KEYS_TO_FILTERS = ['item_name', 'item_desc'];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodList: [
        {
          title: "Lean Protein",
          data: [
            { value: "Lorem" },
            { value: "Lorem" },
            { value: "Lorem" },
          ]
        },
        {
          title: "Seafood",
          data: [
            { value: "Alaskan King Crab" },
            { value: "Cod" },
            { value: "Flounder" },
            { value: "Grouper" },
            { value: "Halibut" }
          ]
        },
        {
          title: "Vegitables",
          data: [
            { value: "Banana Peppers" },
            { value: "Bell Peppers" },
            { value: "Bok Choy" },
            { value: "Cabbage" },
            { value: "Snow Peas" }
          ]
        },
        {
          title: "Fruits",
          data: [
            { value: "Apple" },
            { value: "Appricot" },
            { value: "Bilberry" },
            { value: "Backberry" }
          ]
        },
        {
          title: "Alternate Ingredients to fats",
          data: [
            { value: "Lorem" },
            { value: "Lorem" },
            { value: "Lorem" },
            { value: "Lorem" },
            { value: "Lorem" }
          ]
        },
        {
          title: "Sauces and Seasonings",
          data: [
            { value: "Lorem" },
            { value: "Lorem" },
            { value: "Lorem" },
            { value: "Lorem" },
            { value: "Lorem" }
          ]
        }
      ]
    }
  }

  componentDidMount() {
    console.log(this.state.fetchedData);
  }

  renderCollapse = () => {
    const items = [];
    for (item of this.state.foodList) {
      items.push(
        <Collapse
          title={item.title}
          data={item.data}
        />
      );
    }
    return items;
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Icon style={styles.cancelIcon} name={'close'} size={40} color={'white'} />
        <Text style={styles.headingText}> Approved Foods List</Text>
        <View style={styles.SearchBarContainer}>
          <Icon
            style={styles.SearchIcon}
            name={'ios-search'} size={20} color={'white'} />

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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
