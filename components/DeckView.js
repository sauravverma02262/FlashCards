import React, { Component } from 'react'
import { Animated, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { gray, white, red, black } from '../utils/colors'
import { NavigationActions } from 'react-navigation'


class DeckView extends Component {

  state = {
    fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
  }

  componentDidMount() {
    Animated.timing( this.state.fadeAnim, { toValue: 1,  duration: 2000, }).start();     
  }

	static navigationOptions = ({ navigation }) => {
		const { entryDeck } = navigation.state.params
		return {
			title: entryDeck
		}
	}

  onDone = () => {
    this.props.navigation.dispatch(NavigationActions.reset
      ({index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Home' })]
      })
    )
  }
  onAddCard = () => {
    this.setState({fadeAnim: new Animated.Value(0)})
		this.props.navigation.navigate('AddCardView',{ entryDeck: this.props.deck.title })
	}

	onStartQuiz = () =>{
    this.props.navigation.navigate('QuizView',{ entryDeck: this.props.deck.title })
	}

	render(){
    const { fadeAnim } = this.state
    const { deck } = this.props
		return(
    <Animated.View style={[styles.column, {opacity: fadeAnim}]}>      
      <View style={styles.column}>
				<View style={styles.item}>
					<Text style={{fontSize: 36}}>{deck && deck.title}</Text>
          <Text style={{fontSize: 16, color: gray}}>
          {deck 
                ? deck.questions.length + " card" +  (deck.questions.length !== 1 ? "s" : "")
                : "0 cards" }</Text>
				</View>
        <View>
				    <TouchableOpacity
				      	style={[styles.submitBtn, {backgroundColor: white}]}
		            	onPress={this.onAddCard} >
				        <Text>Add Card</Text>
				    </TouchableOpacity> 
            { deck.questions.length > 0 &&       	
  				    <TouchableOpacity
  				        style={[styles.submitBtn, {backgroundColor: 'green'}]}
  				        onPress={this.onStartQuiz} >
  				          <Text style={{color: white}}>Start Quiz</Text>
  				    </TouchableOpacity> 
            }
            <TouchableOpacity
                style={[styles.submitBtn, {backgroundColor: red}]}
                  onPress={this.onDone} >
                <Text style={{color: white}}>Done</Text>
            </TouchableOpacity> 
	      </View>
	    </View>
    </Animated.View>
		)
	}
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'transparent',
    borderRadius: 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
    flexGrow: 1,
    width: 280,
  },
  column: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  }, 
  submitBtn: {
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    width: 280,
    borderRadius: 2,
    marginTop: 10, 
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  })

function mapStateToProps (state, { navigation }) {

  const { entryDeck } = navigation.state.params
  return {
    deck: state.decks[entryDeck],
  }
}

export default connect( mapStateToProps, null )(DeckView)
