import React, { Component } from 'react'

class Question extends Component {
  onChange(choice, event) {
    event.preventDefault();
    const { setCurrent, setScore, question } = this.props;

    switch (choice) {
      case question.correct:
        setScore(this.props.score + 1);
        setCurrent(this.props.current + 1);
        break;
      case !question.correct:
        setCurrent(this.props.current + 1);
        break;
      default:
        setCurrent(this.props.current + 1)
    }
  }

  shuffleChoices(choices) {
    return choices
      .map(a => [Math.random(),a])
      .sort((a,b) => a[0]-b[0])
      .map(a => a[1])
  }

  render() {
    const { question } = this.props;
    return (
      <div>
        <div>
          <h4><strong>question no. {question.id + 1}</strong></h4>
          <h3>{question.text}</h3>
          <hr />
          <ul>
            {
              this.shuffleChoices(question.choices).map((choice, index) => {
                const alphabet = 'ABCD'.split('');
                return (
                  <li key={`choice_${index}`} onClick={this.onChange.bind(this, choice.text)}>
                    <button
                      name={question.id}
                      key={`choice_button_${index}`}
                    >
                      {alphabet[index]}
                    </button>
                    <span className="choice">{choice.text}</span>
                  </li>
                )
              })
            }
          </ul>
          <div>
            <div>
              <strong>Category: </strong>{question.category}
            </div>
            <div>
              <strong>Difficulty: </strong> {question.difficulty}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const style = {
  correct: {
    color: '#008000'
  },
  wrong: {
    color: '#FF0000'
  }
};

export default Question
