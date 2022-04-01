import React, {Component} from "react";


class TextArea extends Component{
    constructor(props){
        super(props);
    }


    render(){
        return <textarea className="form-control" onChange={this.props.onChange} rows={this.props.rows} cols={this.props.cols}></textarea>
    }
}

TextArea.defaultProps = {
    rows: 3,
    cols: 10
}

export default TextArea;