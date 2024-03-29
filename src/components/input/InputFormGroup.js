import React, {Component} from "react";
import InputText from "./InputText";


class InputFormGroup extends Component{
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
            return <input type="text" id={this.props.inputid} className={this.props.inputclassname} placeholder={this.props.placeholder} defaultValue={this.props.value} readOnly/>
        }
        else{
            return <InputText id={this.props.inputid} required={this.props.required} className={this.props.inputclassname} onChange={this.props.onChange} placeholder={this.props.placeholder} value={this.props.value} ref={this.props.ref}/>
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

InputFormGroup.defaultProps = {
    inputclassname: "form-control",
    placeholder: "",
    label: "",
    value: "",
    isReadOnly: false
}

export default InputFormGroup;