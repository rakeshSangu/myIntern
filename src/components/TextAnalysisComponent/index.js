import {Component} from 'react'

import './index.css'

class TextAnalysisComponent extends Component {
  state = {
    userTextAreaInput: '',
    wordToBeReplaced: '',
    replacementWord: '',
    wordCount: 0,
    charCount: 0,
    errorMsg: '',
  }

  getCount = text => {
    const cleanedStr = text.replace(/[^\w\s]/g, ' ')
    const strList = cleanedStr
      .toLowerCase()
      .split(' ')
      .filter(each => each !== '')
    const strSet = new Set(strList)
    const wordCount = strSet.size
    let charCount = 0
    strList.forEach(each => {
      charCount += each.length
      return 0
    })

    this.setState({
      userTextAreaInput: text,
      errorMsg: '',
      wordCount: wordCount,
      charCount: charCount,
      wordToBeReplaced: '',
      replacementWord: '',
    })
  }

  onChangeTextAreaInput = event => {
    const inputText = event.target.value
    this.getCount(inputText)
  }

  onChangeInputWord = event => {
    this.setState({
      wordToBeReplaced: event.target.value,
    })
  }

  onChangeReplacementWord = event => {
    this.setState({
      replacementWord: event.target.value,
    })
  }

  replaceWords = () => {
    const {wordToBeReplaced, replacementWord} = this.state
    if (wordToBeReplaced === '' || replacementWord === '') {
      this.setState({errorMsg: 'Enter the input words'})
    } else {
      const {userTextAreaInput} = this.state
      const updatedString = userTextAreaInput.replaceAll(
        wordToBeReplaced,
        replacementWord,
      )
      this.getCount(updatedString)
    }
  }

  render() {
    const {
      userTextAreaInput,
      replacementWord,
      wordToBeReplaced,
      wordCount,
      charCount,
      errorMsg,
    } = this.state

    return (
      <div className="background-container">
        <h1 className="top-heading">
          Real-Time Text Analysis and String Replacement
        </h1>
        <textarea
          placeholder="Enter the text"
          className="textarea-element"
          rows="6"
          onChange={this.onChangeTextAreaInput}
          value={userTextAreaInput}
        ></textarea>
        <div className="user-inputs-container">
          <input
            placeholder="Enter the Word to be replaced"
            className="input-element string1"
            type="text"
            value={wordToBeReplaced}
            onChange={this.onChangeInputWord}
          />
          <input
            placeholder="Enter the replacement word"
            className="input-element string2"
            type="text"
            value={replacementWord}
            onChange={this.onChangeReplacementWord}
          />
        </div>
        <button
          type="button"
          onClick={this.replaceWords}
          className="replace-btn"
        >
          Replace All
        </button>
        <p className="error-para">{errorMsg}</p>
        <p className="count-para">
          Number of Unique Words: <span className="count">{wordCount}</span>
        </p>
        <p className="count-para">
          Number of Characters: <span className="count">{charCount}</span>
        </p>
      </div>
    )
  }
}
export default TextAnalysisComponent
