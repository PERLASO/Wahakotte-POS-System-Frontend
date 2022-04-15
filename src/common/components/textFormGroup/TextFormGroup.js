import React, {Component} from "react";
import PropTypes from "prop-types";
import TextField from "../textField";


class TextFormGroup extends Component{
    static propType = {
        inputType: PropTypes.string,
        id: PropTypes.string,
        inputclassname : PropTypes.string,
        placeholder: PropTypes.string,
        value: PropTypes.string,
        onChange: PropTypes.func,
        label: PropTypes.string,
        labelClassName: PropTypes.string
    }

    static defaultProps = {
        inputType: "text",
        id: "",
        inputclassname: "form-control",
        placeholder: "",
        value: "",
        onChange: () => {},
        label: "",
        labelClassName: ""
    }

    render(){
        const {inputType, id, inputclassname, placeholder, value, onChange, label, labelClassName}  = this.props;

        return (
            <div className="form-group">
                {label && <label className={labelClassName}>{label}</label>}
                <TextField inputType={inputType} id={id} className={inputclassname} onChange={onChange} placeholder={placeholder} value={value}/>
            </div>
        )
    }
}

export default TextFormGroup;