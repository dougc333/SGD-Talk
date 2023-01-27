import React from "react"

//from server how to get the data? 
class P extends React.Component{
    constructor(props){
        super(props)
        let protein_data = window.models.protein_data();
        //console.log("protein_data:",protein_data);
        this.domains = protein_data["config"]["domains"]
        this.locus = protein_data["config"]["locus"]
        console.log('domains:',this.domains)
        console.log('locus:',this.locus)
        
    }
    


    render(){
        return(
        <div>"react component here, {this.props}</div>
        )
    }
}

export default P