import React, { Component } from "react";
import { getAllCustomers, getCustomer } from "../../context/Customer";
import { getProductList } from "../../context/Product";

class DataList extends React.Component {
  render(props) {
    const suggestions = this.props.suggestions;
    return (
      <datalist id="suggestions-list-customer-code">
        {suggestions.map(function (sugession, i) {
          return <option key={i} value={sugession.shortCode} />;
        })}
      </datalist>
    );
  }
}

class InputWithSuggestionCustomerCodeInvoiceCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedData: [],
      text: "",
      sugessions: [],
    };
  }

  componentDidMount() {
    getAllCustomers().then((c) => {
      if (c != undefined) {
        this.setState({ loadedData: c.data });
      }
    });
  }
  onChangeHandler(text) {
    let matches = [];
    if (text.length > 0) {
      matches = this.state.loadedData.filter((data) => {
        const regex = new RegExp(`^p`, "gi");
        return data.shortCode.match("p");
      });
    }
    this.setState({ sugessions: matches });
    this.setState({ text: text });
    this.props.action(text);
  }

  onPressEnter() {
    if (this.props.onPressEnter !== undefined) {
      this.props.onPressEnter();
    }
  }

  render() {
    return (
      <div>
        <input
          list="suggestions-list-customer-code"
          onChange={(e) => this.onChangeHandler(e.target.value)}
          type="text"
          id={this.props.inputId}
          placeholder={this.props.placeholder}
          className={this.props.inputclassname}
          onKeyUp={(ev) => {
            if (ev.key === "Enter") {
              this.onPressEnter();
              ev.preventDefault();
              return false;
            }
          }}
        />
        <DataList suggestions={this.state.loadedData} /> 
      </div>
    );
  }
}

export default InputWithSuggestionCustomerCodeInvoiceCreate;
