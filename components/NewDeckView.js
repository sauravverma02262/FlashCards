import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { gray, white, red, purple, black, teal, transparent } from '../utils/colors'
import t from 'tcomb-form-native';
import { NavigationActions } from 'react-navigation'
import { addDeck } from '../store/actions'
import _ from 'lodash'

const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

// overriding the text color
stylesheet.textbox.normal.color = teal;
stylesheet.textbox.normal.borderColor = transparent;
stylesheet.textbox.normal.borderRadius = 0;
stylesheet.textbox.normal.borderBottomColor = black;



const options = {
  stylesheet: stylesheet
};

const formData = t.struct({
  "Name Of Deck": t.String
});

const Form = t.form.Form;

class NewDeckView extends Component {

	state = {
		justCreatedDeck: ""
	}

	static navigationOptions = ({ navigation }) => {
		return {
			title: 'New Deck'
		}
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if(prevState.justCreatedDeck !== "" && nextProps.decks[prevState.justCreatedDeck]){
			nextProps.navigation.dispatch(NavigationActions.back({key: null}))
			nextProps.navigation.navigate('DeckView', { entryDeck: prevState.justCreatedDeck } )
		}
		return null; //no change to the state is necessary
	  }


	handleSubmit = () => {
		const value = this._form.getValue(); // use that ref to get the form value
		if(value && value["Name Of Deck"]){
			this.setState({ justCreatedDeck: value["Name Of Deck"]})
			this.props.saveNewDeck(value["Name Of Deck"])
		}
	}

	render(){
		return (
	      <View style={styles.container}>
	        <Form
	        	ref={c => this._form = c} 
						type={formData}
						options={options} /> 
				    <TouchableOpacity
				      style={[styles.submitBtn, {backgroundColor: red}]}
				      onPress={this.handleSubmit}
				      >
				        <Text style={{color: white}}>Submit</Text>
				    </TouchableOpacity>  
	      </View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		marginTop: 50,
		padding: 20,
	},
	submitBtn: {
		padding: 10,
		paddingLeft: 30,
		paddingRight: 30,
		height: 45,
		borderRadius: 2,
		width:300,
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
	},
})

function mapDispatchToProps (dispatch, { navigation }) {
  return {
  	saveNewDeck: (title) => dispatch(addDeck(title ))
  }
}

function mapStateToProps (state, { navigation }) {
    return {
    	decks: state.decks
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeckView)
