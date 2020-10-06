import React, { Component } from 'react';
import Form from "./FormComponent"
import {Card} from "@material-ui/core"
import '../App.css'
import Result from "./ResultComponent";
class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            url: "https://www.mtbproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=200636246-a35f7e0e6ecd2adcdac78ff6aaf53774",
            url2: "https://www.zipcodeapi.com/rest/js-rfPtVvdvBHgXG6H16tKTiHmiSv5YtmYggzYd8aCdvuPvGalhoh6E8xCXfYICVEoL/info.json/",
            value: '',
            range: 30,
            easy: false,
            med: false,
            dif: false,
            ex: false,
            lat:0,
            lon:0,
            trailsJson:null};
    }

    buildMtbRequest(){
        var urlGo = "https://www.mtbproject.com/data/get-trails?lat="+this.state.lat+"&lon="+this.state.lon+"&maxDistance="+this.state.range+"&key=200636246-a35f7e0e6ecd2adcdac78ff6aaf53774";
        return urlGo;
    }
        
    handleChange(event){
        this.setState({value: event.target.value});
    }

    handleRangeChange(event,newvalue){
        this.setState({range: newvalue});
        
    }
    handleEasyChange(event){
        this.setState({easy: event.target.checked});
    }
    handleMedChange(event){
        this.setState({med: event.target.checked});
    }
    handleDifChange(event){
        this.setState({dif: event.target.checked});
    }
    handleExChange(event){
        this.setState({ex: event.target.checked});
    }

    handleSubmit(event){
        //alert("just submitted new data");
        console.log("yup");
        this.getLatnLong();
        //this.getTrailsData();

        event.preventDefault();
    }

    getLatnLong = () =>{
        var urlGo = this.state.url2 + this.state.value + "/degrees";
        var lGet = new XMLHttpRequest();
        //lGet.setRequestHeader("Access-Control-Allow-Origin","*");
        lGet.open("GET", urlGo);
        lGet.send();
        lGet.onreadystatechange = () => {
            if(lGet.readyState === 4){
                var Data = JSON.parse(lGet.responseText);
                console.log(Data.lat);
                console.log(Data.lng);
                this.setState({lat: Data.lat});
                this.setState({lon: Data.lng});
                this.getTrailsData();
            }
        }

    }
    getTrailsData = () =>{
        var urlGo = this.buildMtbRequest();
        //console.log(urlGo);
        //var urlGo = "https://www.mtbproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=200636246-a35f7e0e6ecd2adcdac78ff6aaf53774";
        var lGet = new XMLHttpRequest();
        lGet.open("Get", urlGo);
        lGet.send();
        lGet.onreadystatechange = () => {
            var Data = JSON.parse(lGet.responseText);
            this.setState({trailsJson: Data});
            this.setState({trailsJson:this.returnTrailfilterForDiff()});
        }
    }
    returnTrailfilterForDiff= ()=>{

        //var item = Data.trails[Math.floor(Math.random() * Data.trails.length)];
        var trails = this.state.trailsJson.trails;
        console.log(trails);
        var filtered = [];//= //arr.filter(a=>a.type=="ar");
        //console.log(trails);
        if(this.state.easy){
            console.log("green");
            filtered = filtered.concat(trails.filter(t=>t.difficulty == "green"));
        }
        
        if(this.state.med){
            console.log("blue");
            filtered = filtered.concat(trails.filter(t=>t.difficulty == "blue"));
            filtered = filtered.concat(trails.filter(t=>t.difficulty == "blueBlack"));
        }
        if(this.state.dif){
            console.log("black");
            filtered = filtered.concat(trails.filter(t=>t.difficulty == "black"));
        }
        if(this.state.ex){
            console.log("double black");
            filtered = filtered.concat(trails.filter(t=>t.difficulty == "dblack"));
        }
        console.log(filtered);
        var item = filtered[Math.floor(Math.random() * filtered.length)];
        //console.log(item);
        return item;
    }

    render(){
        return( 
            
        <div style={{display: 'flex', flexDirection: 'row'}} width = "100%">
            <div>
                <Form
                value = {this.state.value}
                range = {this.state.range}
                easy = {this.state.easy}
                med = {this.state.med}
                dif = {this.state.dif}
                ex = {this.state.ex}
                onValChange = {this.handleChange.bind(this)}
                onRangeChange = {this.handleRangeChange.bind(this)}
                onEasyChange = {this.handleEasyChange.bind(this)}
                onMedChange = {this.handleMedChange.bind(this)}
                onDifChange = {this.handleDifChange.bind(this)}
                onExChange = {this.handleExChange.bind(this)}
                handleSub = {this.handleSubmit.bind(this)}
                width = "100%">
                </Form>
            </div>
            <div width = "100%">
                <Result lat = {this.state.lat} lon = {this.state.lon} trailsJson = {this.state.trailsJson}
                        e = {this.state.easy} m = {this.state.med} d = {this.state.dif} ex = {this.state.ex}></Result>
            </div>
        </div>
        )
    }
}
export default Main