import axios from 'axios'

const getQuestionsFromAPI = async () => {
  try {
    const response = await axios.get('https://opentdb.com/api.php?amount=10');
    return response.data.results
  } catch (err) {
    console.log(err)
  }
};

const formatChoices = choices => {
  return choices.map((choice, index) => {
    return { text: choice }
  })
};

const combineAllChoices = question => {
  return question.correct_answer.split(',').concat(question.incorrect_answers)
};

const formatQuestion = (question, index) => {
  return {
    id: index,
    category: question.category,
    type: question.type,
    difficulty: question.difficulty,
    text: question.question,
    choices: formatChoices(combineAllChoices(question)),
    correct: question.correct_answer,
    incorrect: question.incorrect_answers
  }
};

const formatAPIQuizData = questions => {
  return questions.map((question, index) => {
    return formatQuestion(question, index)
  })
};

export const createQuizData = async () => {
  try {
    const questions = await getQuestionsFromAPI();
    return await formatAPIQuizData(questions)
  } catch (err) {
    console.log(err)
  }
};

