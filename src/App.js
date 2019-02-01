import React, { Component } from 'react';
import Questions from './components/Questions';
import {createQuizData} from './api'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      score: 0,
      current: 0,
      loading: true
    }
  }
  setCurrent(current) {
    this.setState({ current })
  }

  setScore(score) {
    this.setState({ score })
  }
  async componentDidMount() {
    try {
      this.setState({ questions: await createQuizData(), loading: false })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        {this.state.loading ?
        null :
          <div>
            <Questions
              {...this.state}
              setCurrent={this.setCurrent.bind(this)}
              setScore={this.setScore.bind(this)}
            />
            <h3>{this.state.score} / {this.state.questions.length} </h3>
            { this.state.current >= this.state.questions.length ?
              <div>
                <h4>You Got {this.state.score} out of {this.state.questions.length} Correct</h4>
                <button><a href="/">Take Again</a></button>
              </div> :
              null
            }
          </div>}
      </div>
    );
  }
}

export default App;
