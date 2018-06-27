import React, { Component } from 'react'
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native'
import { gray, white, red, black, green  } from '../utils/colors'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'

const propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  answeredCorrectly: PropTypes.func.isRequired,
  answeredIncorrectly: PropTypes.func.isRequired,
  questionNumber: PropTypes.number.isRequired,
  questions: PropTypes.number.isRequired,
};


class QuizQA extends Component {

  state={
    display: "question"
  }

  componentWillReceiveProps(nextProps){
    if(this.props.question!==nextProps.question){
      this.setState({display: "question"})
    }
  }

  render(){
    return (
      <View style={styles.qView}>
        <View style={{flexGrow: 1}}>
          <Text> Question {this.props.questionNumber} of {this.props.questions} </Text>
        </View>
        <View style={{flexGrow: 1}}>
          <Text style={{backgroundColor: 'skyblue',padding: 10,margin: 10, fontSize: 20}}>Ques : { this.props.question}</Text>
        </View>
        { this.state.display==="answer" && <View style={{flexGrow: 1}}><Text style={{backgroundColor: 'skyblue',padding: 10,margin: 10, fontSize: 20}}>Ans :  {this.props.answer}</Text></View> }

        { this.state.display==="question" ? 
          <View>
            <TouchableOpacity
              style={[styles.submitBtn, {backgroundColor: green, width: 300}]}
              onPress={() => this.setState({display: "answer"})}>
              <Text style={{color:white}}>Answer...</Text>
            </TouchableOpacity>  
          </View>
          :
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.submitBtn, {backgroundColor: green, width: 160}]}
              onPress={this.props.answeredCorrectly} >
                <Text style={{color:white, fontSize: 20}}>Correct</Text>
            </TouchableOpacity>  
            <TouchableOpacity
              style={[styles.submitBtn, {backgroundColor: red, width: 160}]}
              onPress={this.props.answeredIncorrectly } >
                <Text style={{color:white, fontSize: 20}}>Incorrect</Text>
            </TouchableOpacity>  
          </View>
        }
      </View>
    )
  }
}
const styles = StyleSheet.create({
  qView: {
    display: 'flex',
    flexDirection: 'column',
    margin:10,
    padding: 10,
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
      margin:10,
		  alignSelf: 'center',
  	},
})


export default connect()(QuizQA)
