import React, {Component} from "react";


class InputText extends Component{
    constructor(props){
        super(props);
    }


    render(){
        return <input type="number" step='0.01' required={this.props.required} onChange={this.props.onChange} className={this.props.className} placeholder={this.props.placeholder} defaultValue={this.props.value} ref={this.props.ref}/>
    }
}

export default InputText;