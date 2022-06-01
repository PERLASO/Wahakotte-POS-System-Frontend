import React, {Component} from "react";
import { Link } from "react-router-dom";


class AnchorTag extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Link id={this.props.id} className={this.props.className} to={this.props.link}>{this.props.itemValue}</Link>
        )
        
    }
}

export default AnchorTag;