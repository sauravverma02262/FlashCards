import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'
import { resetDecks, initialLoadDecks } from '../store/actions'
import { white, black, red, gray  } from '../utils/colors'
import Deck from './Deck'

class Decks extends Component {
	componentDidMount(){
		this.props.initialDataLoad()
	}

	reset = () =>{
		this.props.resetDecks()
	}

	handleNewDeck = () => {
		this.props.navigation.navigate( 'NewDeckView')
	}

	render(){
		const {decks, ready} = this.props
		return (
			<ScrollView>
				<View>
					{decks && decks.length > 0 && decks.map( (deck, index) => {
						return (
							<View style={styles.item} key={'deck-'+index}>
								<TouchableOpacity key={deck.title}
									onPress={() => this.props.navigation.navigate(
									'DeckView',
									{ entryDeck: deck.title }
									)}
								>
								<Deck deck={deck} key={deck.title}/>
								</TouchableOpacity>
							</View>
						)
					})}
					{ decks.length===0 ? <View style={styles.noDeck}><Text style= {{color: gray,fontSize: 20,}}>No Quiz Deck! </Text><Text style= {{color: gray, fontSize: 20,}}>Add a Deck and start learning!</Text></View> : null  }
					</View>
				<View style={styles.row}>
				    <TouchableOpacity
				      style={[styles.submitBtn, {backgroundColor: red}]}
				      onPress={this.reset}>
				        <Text style= {{color: white}}>Clear All Decks</Text>
				    </TouchableOpacity>
				    <TouchableOpacity
				      style={[styles.submitBtn, {backgroundColor: 'green'}]}
				      onPress={this.handleNewDeck}>
				        <Text style={{color: white}}>Add New Deck</Text>
				    </TouchableOpacity>
				</View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	noDeck: {
		padding: 10,
		margin: 10,
		marginTop:50,
		backgroundColor: white,
		justifyContent: 'center'
	},
	item: {
		backgroundColor: white,
		borderRadius: 2,
		padding: 2,
		marginTop: 2,
		marginLeft: 10,
		marginRight: 10,
		justifyContent: 'center',
		shadowRadius: 3,
		shadowOpacity: 0.8,
		shadowColor: 'rgba(0, 0, 0, 0.24)',
		shadowOffset: {
			width: 0,
			height: 3
		}
	},
	submitBtn: {
		padding: 10,
		paddingLeft: 30,
		paddingRight: 30,
		marginRight: 10,
		marginTop: 10,
		height: 45,
		borderRadius: 2,
		alignSelf: 'flex-end',
		justifyContent: 'center',
		alignItems: 'center',
	},
	row: {
		flexDirection: 'row',
		marginTop: 5,
		marginRight: 10,
		alignSelf: 'flex-end',
	},
})

function mapStateToProps (state, { navigation }) {
	if (state.decks == null) state.decks = {}
    return {
			decks:  state.decks ? Object.values(state.decks)  : {},
			ready: state.ready ? state.ready : false,
    }
}

function mapDispatchToProps (dispatch, { navigation }) {
	return {
		initialDataLoad: () => dispatch(initialLoadDecks()),
		resetDecks: () => dispatch(resetDecks())
	}
}

export default connect( mapStateToProps,mapDispatchToProps )(Decks)
