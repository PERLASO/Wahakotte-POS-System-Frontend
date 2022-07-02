import React, { Component } from "react";
import {getProductList} from "../../context/Product";


class DataList extends React.Component {
  render(props) {
      const suggestionsNames = this.props.suggestions;
    
      suggestionsNames.map(function(item) {
        console.log(item.name);
      });
    
      return (
        <datalist id="suggestions-list">
          {suggestionsNames.map(function(sugession,i) {
            return <option key={i} value={sugession.name}/>
          })}
        </datalist>
      );
  }
}


class InputWithSuggestionProductName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedDataNames: [],
      text: "",
      sugessions: []
    };
  }

  componentDidMount() {
    getProductList().then((c) => {
      if (c != undefined) {
        this.setState({ loadedDataNames: c.data });
      }
    });
  }
  onChangeHandler(text){
    let matches =[]
    if(text.length > 0){
      matches = this.state.loadedDataNames.filter(data =>{
        const regex = new RegExp(`${text}`,"gi")
        return data.itemCode.match(regex)
      })
    }
    console.log('matchs', matches)
    this.setState({sugessions: matches})
    this.setState({text: text})
    this.props.action(text);
  }

render() {
  return (
      <div>
          <input list="suggestions-list" onChange={e=> this.onChangeHandler(e.target.value)} type="text" id={this.props.inputId} placeholder={this.props.placeholder} className={this.props.inputclassname}/>
          <DataList suggestions={this.state.loadedDataNames} />
      </div>
  );
}
 }

export default InputWithSuggestionProductName;
