import React, { Component } from 'react'
import Question from './Question'

class Questions extends Component {
  render() {
    const { questions } = this.props;
    return (
      <div>
        {
          questions.map(question => {
            if (question.id === this.props.current) {
              return (
                <div>
                  <Question
                    question={question}
                    key={question.id}
                    {...this.props}
                  />

                </div>
              )
            }
            else {
              return (null)
            }
          })
        }
      </div>
    )
  }
}

export default Questions