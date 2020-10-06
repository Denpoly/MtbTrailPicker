import React, {Component} from 'react';
import {Http} from 'ajax'
import {callback} from "ajax"
import {Card, CardContent, Typography, CardActionArea, CardMedia, CardActions, Button} from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles'
import trail_diff_green from '../trail_diff_green.svg';
import trail_diff_blue from '../trail_diff_blue.svg';
import trail_diff_blackdiamond from '../trail_diff_blackdiamond.svg';
import trail_diff_doubleblack from '../trail_diff_doubleblack.svg';
class Result extends Component{


    constructor(props){
        super(props);
        this.state = {
            url: "https://www.mtbproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=200636246-a35f7e0e6ecd2adcdac78ff6aaf53774",
            url2: "https://www.zipcodeapi.com/rest/gih6FYqtKmWyjxFhaWd21y6hdhmSgxAw2lCUkbNAbdyHnk9XTvXiizaLk1WukEs3/info.json/",
            trail: null
    
        }
    }

    /*getTrailData(){
        var h = new XMLHttpRequest();

        h.open("GET", this.state.url);
        h.send();
        h.onreadystatechange = function() {
            if (h.readyState === 4) {
              console.log(h.response);
            }
        }
    }*/
    /*getLatnLong(){
        var urlGo = this.state.url2 + "06851" + "/degrees";
        var lGet = new XMLHttpRequest();
        lGet.open("GET", urlGo);
        lGet.send();
        lGet.onreadystatechange = function(){
            if(lGet.readyState === 4){
                var Data = JSON.parse(lGet.responseText);
                console.log(Data.lat);
                console.log(Data.lng);
            }{
        }

    }*/
    returnAppropriateDiff(){
        const trailDiff = this.props.trailsJson.difficulty
        if (trailDiff == "green"){
            return trail_diff_green;
        }
        else if(trailDiff == "blue"){
            return trail_diff_blue;
        }
        else if (trailDiff == "blueBlack"){
            return trail_diff_blue;
        }
        else if (trailDiff == "black"){
            return trail_diff_blackdiamond;
        }
        else if (trailDiff == "dBlack"){
            return trail_diff_doubleblack;
        }
    }
    returnTrailfilterForDiff(){

        //var item = Data.trails[Math.floor(Math.random() * Data.trails.length)];
        var trails = this.props.trailsJson.trails;
        var filtered = [];//= //arr.filter(a=>a.type=="ar");
        //console.log(trails);
        if(this.props.e){
            filtered = filtered.concat(trails.filter(t=>t.difficulty == "green"));
        }
        if(this.props.m){
            filtered = filtered.concat(trails.filter(t=>t.difficulty == "blue"));
            filtered = filtered.concat(trails.filter(t=>t.difficulty == "blueBlack"));
        }
        if(this.props.d){
            filtered = filtered.concat(trails.filter(t=>t.difficulty == "black"));
        }
        if(this.props.ex){
            filtered = filtered.concat(trails.filter(t=>t.difficulty == "dblack"));
        }
        var item = filtered[Math.floor(Math.random() * filtered.length)];
        //console.log(item);
        return item;
    }
    render(){
        //this.getTrailData();
        //this.getLatnLong();
        if(this.props.trailsJson != null){
            //this.setState({trail:this.returnTrailfilterForDiff()});
            //console.log(this.state.trail);
        
            return (
            <Card  style = {{flex:1, marginLeft: "100px", maxWidth:"420px"}}>
                <CardActionArea>
                <CardMedia style ={{paddingTop:"10px"}}>
                    <img src={this.props.trailsJson.imgSmall}/>
                    </CardMedia>
                
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {this.props.trailsJson.name}
                        
                    </Typography>
                    
                    <Typography variant="body2" color="textSecondary" component="p">
                    {this.props.trailsJson.summary}
                    </Typography>
                    <img src={this.returnAppropriateDiff() }style ={{paddingTop: "10px", paddingBottom: "10px"}}/>
                    <Typography gutterBottom variant="h5" component="h2">
                        Stats:
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    Distance: {this.props.trailsJson.length} Miles
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    Location: {this.props.trailsJson.location}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    Ascent: {this.props.trailsJson.ascent} ft
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    Descent: {this.props.trailsJson.descent} ft
                    </Typography>
                </CardContent>
                </CardActionArea>
                <CardActions>
                    <a href = {this.props.trailsJson.url} target="_blank">
                        <Button size="small" color="primary" >
                            Learn More About This Trail
                        </Button>
                    </a>
                </CardActions>
            </Card>);
        }
        return(<div></div>);
    }
}
export default Result;