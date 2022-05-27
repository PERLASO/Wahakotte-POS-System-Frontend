import React, {Component} from "react";
import TableHead from "./TableHead";
import TdTag from "./TdTag"


class Table extends Component{
    constructor(props){
        super(props);
    }

    renderAction(data){
        if(this.props.allowAction){
            return <TdTag value={data["id"]} isLinked="true" linkPrefix={this.props.actionLinkPrefix}></TdTag>
        }
    }

    render(){
        return (
            <table className={this.props.className}>
                <TableHead columnList={this.props.columnList}></TableHead>
                <tbody>
                    {
                        this.props.tableData.map((data, index) => {
                          
                            return (
                            <tr key={index}>
                                {
                                    Object.keys(data).map((key, index) => {
                                        if(this.props.tableType == "product" && index == 2 ){
                                            return <TdTag key={index} value={data[key]} isLinked="false" className="aradana-font" ></TdTag>
                                        }
                                        else{
                                            return <TdTag key={index} value={data[key]} isLinked="false" ></TdTag>
                                        }
                                        
                                    })
                                }

                                {this.renderAction(data)}
                                
                                
                            </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        ) 
    }
}

Table.defaultProps = {
    allowAction: true
}

export default Table;