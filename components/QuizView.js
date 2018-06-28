import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { gray, white, red, purple, black } from '../utils/colors'
import QuizQA from './QuizQA'
import { setLocalNotification, clearLocalNotification } from '../utils/helpers'

class QuizView extends Component {

	state = {
		questionNo: 1,
		correct: 0
	}

	static navigationOptions = ({ navigation }) => {
		const { entryDeck } = navigation.state.params
		return {
			title: 'Quiz - ' + entryDeck
		}
	}

	onRestart = () => {
		this.setState({
			questionNo: 1,
			correct: 0
		})
	}

	onDone = () => {
		this.props.navigation.navigate('DeckView', { entryDeck: this.props.deckTitle } )
	}

	answeredCorrectly = () => {
		this.setState( { correct: this.state.correct + 1,
						questionNo: this.state.questionNo + 1},
					() => {
						if(this.state.questionNo > this.props.deck.questions.length){
							this.resetNotificationToTomorrow()
						}						
					})
			}

	answeredIncorrectly = () => {
		this.setState( {questionNo: this.state.questionNo + 1}, 
			() => {
				if(this.state.questionNo > this.props.deck.questions.length){
					this.resetNotificationToTomorrow()
				}					
			})
		}

	//finished a quiz - so reset the alert notification to tomorrow
	resetNotificationToTomorrow(){
		clearLocalNotification();
		setLocalNotification();
	}

	render(){
		const {questionNo, correct} = this.state
		const {deck} = this.props
		return (
	      <View>
					{ questionNo <= deck.questions.length
						? <QuizQA
								question={questionNo <= deck.questions.length &&
								deck.questions[questionNo - 1].question}
								answer={questionNo <= deck.questions.length &&
								deck.questions[questionNo - 1].answer}
								answeredCorrectly={this.answeredCorrectly}
								answeredIncorrectly={this.answeredIncorrectly}
								questionNumber={questionNo}
								questions={deck.questions.length}/>
						: <View style={styles.column}>
								<View style={styles.item}>
									<Text style={{fontSize: 16, color: red}}>Your score!</Text>
									{deck && <Text style={{fontSize: 32, marginTop: 20}}>Quiz Deck: {deck.title}</Text>}
									<Text style={{ color: gray, marginTop: 20, fontSize: 38}}>{correct}/{deck.questions.length}</Text>
								</View>
								<View style={styles.item}>
									<TouchableOpacity
										style={[styles.submitBtn, {backgroundColor: red}]}
										onPress={this.onDone} >
										<Text style={{color: white}}>Back to Deck</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={[styles.submitBtn, {backgroundColor: red}]}
										onPress={this.onRestart} >
										<Text style={{color: white}}>Restart Quiz</Text>
									</TouchableOpacity>
								</View>
						</View>
					}
	    </View>
		)
	}
}

const styles = StyleSheet.create({
  item: {
		flexGrow: 1,
    borderRadius: 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
		},
		height: 200,
  },
  column: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
  }, 
  submitBtn: {
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    marginTop: 20,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
  },
});


function mapStateToProps (state, { navigation }) {
  const { entryDeck } = navigation.state.params
  return {
    deck: state.decks[entryDeck],
    deckTitle: entryDeck
  }
}

export default connect(mapStateToProps, null)(QuizView)
