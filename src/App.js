import React, { Component } from 'react';
import logo from './logo.svg';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';
import QuoteBox from './components/QuoteBox';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: "",
      author: ""
    }
    // This binding is necessary to make `this` work in the callback
    this.newQuote = this.newQuote.bind(this);
    this.tweetQuote = this.tweetQuote.bind(this);
  }
  getQuote(){
    fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
      .then( (response) => {
        return response.json()
      })
      .then( (json) => {
        var temp = Math.floor(Math.random() * json.quotes.length);
        this.setState({
          quote: json.quotes[temp].quote,
          author: json.quotes[temp].author,
        });
      });
  }

  tweetQuote(e) {
    e.preventDefault();
    let url = 'https://twitter.com/intent/tweet?hashtags=deepquotes&text=' + encodeURIComponent('"' + this.state.quote + '" ~' + this.state.author);
    window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
  }

  newQuote(e) {
    e.preventDefault();
    this.getQuote();
  }

  //on first load, random quote/author
  componentDidMount() {
     this.getQuote();
  }

  render() {
    return (
      <div className="App">
        <QuoteBox author={this.state.author} quote={this.state.quote} tweetQuote={this.tweetQuote} newQuote={this.newQuote} />
      </div>
    );
  }
}

export default App;
