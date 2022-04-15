import React, {Component} from "react";
import InputNumber from "./InputNumber";


class InputNumberGroup extends Component{
    constructor(props){
        super(props);
    }

    renderLabel(){
        if(this.props.label == "" || this.props.label == null){
            return ""
        }
        else{
            return <label className={this.props.labelClassName}>{this.props.label}</label>
        }
        
    }

    renderInputText(){
        if(this.props.isReadOnly == true){
            return <input type="Number" className={this.props.inputclassname} placeholder={this.props.placeholder} defaultValue={this.props.value} readOnly/>
        }
        else{
            return <InputNumber className={this.props.inputclassname} required={this.props.required} onChange={this.props.onChange} placeholder={this.props.placeholder} value={this.props.value} ref={this.props.ref}/>
        }
    }


    render(){
        return (
            <div className="form-group">
                {this.renderLabel()}
                {this.renderInputText()}
                
            </div>
        )
    }
}

InputNumberGroup.defaultProps = {
    inputclassname: "form-control",
    placeholder: "",
    label: "",
    value: "",
    isReadOnly: false
}

export default InputNumberGroup;