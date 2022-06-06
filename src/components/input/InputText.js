import React, {Component} from "react";


class InputText extends Component{
    constructor(props){
        super(props);
    }


    render(){
        return <input type="text" id={this.props.id} onChange={this.props.onChange} className={this.props.className} required={this.props.required} placeholder={this.props.placeholder} defaultValue={this.props.value} ref={this.props.ref} autocomplete="new"/>
    }
}

export default InputText;