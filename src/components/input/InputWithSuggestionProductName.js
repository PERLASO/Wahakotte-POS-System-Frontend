import React, { Component } from "react";
import {getProductList} from "../../context/Product";


class DataNameList extends React.Component {
  render(props) {
      const suggestionsNames = this.props.suggestions;
      return (
        <datalist id="suggestions-list-name">
          {suggestionsNames.map(function(sugession,i) { 
            return <option key={i} value={sugession.description}/>
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
      textName: "",
      sugessionsNames: []
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
        return data.name.match(regex)
      })
    }
  
    this.setState({sugessionsNames: matches})
    this.setState({textName: text})
    this.props.action(text);
  }

  onPressEnter(){
    if(this.props.onPressEnter  !== undefined){
      this.props.onPressEnter();
    }
  }
  
render() {
  return (
      <div>
          <input 
          list="suggestions-list-name"
           onChange={e=> this.onChangeHandler(e.target.value)} 
           type="text" id={this.props.inputId} 
           placeholder={this.props.placeholder} 
           className={this.props.inputclassname}
           onKeyUp={(ev) => {
            if (ev.key === "Enter") {
              this.onPressEnter();
              ev.preventDefault();
              return false;
            }
          }}/>
          <DataNameList suggestions={this.state.loadedDataNames} />
          
      </div>
  );
}
 }

export default InputWithSuggestionProductName;
