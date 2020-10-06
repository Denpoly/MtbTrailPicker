import React, { Component } from 'react';
import 'fontsource-roboto';
import {Card, CardContent,TextField, Slider, FormGroup, FormControlLabel, Checkbox, Typography, Button} from '@material-ui/core'
import{FormErrors} from "./FormErrors"
import trail_diff_green from '../trail_diff_green.svg';
import trail_diff_blue from '../trail_diff_blue.svg';
import trail_diff_blackdiamond from '../trail_diff_blackdiamond.svg';
import trail_diff_doubleblack from '../trail_diff_doubleblack.svg';
class Form extends Component{
    
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleRangeChange = this.handleRangeChange.bind(this);
        this.handleEasyChange = this.handleEasyChange.bind(this);
        this.handleMedChange = this.handleMedChange.bind(this);
        this.handleDifChange = this.handleDifChange.bind(this);
        this.handleExChange = this.handleExChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            errors : {
                value: ""
            },
        valueValid: false,
        formValid: false

        }
    }
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.errors;
        let valueValid = this.state.valueValid;
        switch(fieldName) {
            case 'zip code':
              valueValid = value.match(/(^\d{5}$)|(^\d{5}-\d{4}$)/);
              fieldValidationErrors.value = valueValid ? '' : ' is invalid';
              break;
            default:
              break;
          }
          this.setState({errors: fieldValidationErrors,
                          valueValid: valueValid,
                        }, this.validateForm);
    }
    validateForm() {
        this.setState({formValid: this.state.valueValid});
      }
    
    handleChange(event){
        this.validateField("zip code",event.target.value);
        this.props.onValChange(event);

    }

    handleRangeChange(event,newvalue){
        this.props.onRangeChange(event,newvalue);
    }
    handleEasyChange(event){
        this.props.onEasyChange(event);
    }
    handleMedChange(event){
        this.props.onMedChange(event);
    }
    handleDifChange(event){
        this.props.onDifChange(event);
    }
    handleExChange(event){
        this.props.onExChange(event);
    }

    handleSubmit(event){
        /*if (formValid(this.state)) {
            console.log(this.state)
        } else {
            console.log("Form is invalid!");
            this.props.handleSub(event);
        }*/
        this.props.handleSub(event);
        
    }




    render(){
        const regexp = "/^\d{5}(-\d{4})?$/";
        return(
            <Card>
                <CardContent>
                    <form onSubmit = {this.handleSubmit}>
                            <TextField id="outlined-basic" value={this.props.value} 
                            onChange = {this.handleChange} label="Zip Code" variant="outlined"></TextField>
                            <FormErrors formErrors={this.state.errors} />
                        <Typography style = {{marginTop:"10px"}} id="discrete-slider-restrict" gutterBottom >
                        Range (Miles)
                        </Typography>
                        <Slider
                            onChange = {this.handleRangeChange}
                            defaultValue = {this.props.range}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={10}
                            marks
                            min={10}
                            max={100}
                        />
                        
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox name="easy" checked={this.props.easy} onChange={this.handleEasyChange}/>}
                                label={
                                    <>
                                        <img src={trail_diff_green} key="easyid" width="30px" height="30px" style={{ marginRight: "5px" }} />
                                        
                                    </>
                                } 
                            />
                            <FormControlLabel
                                control={<Checkbox name="med" checked={this.props.med} onChange={this.handleMedChange}/>}
                                label={
                                    <>
                                        <img src={trail_diff_blue} key="mediumid" width="30px" height="30px" style={{ marginRight: "5px" }} />
                                        
                                    </>
                                }
                            />
                            <FormControlLabel
                                control={<Checkbox name="dif" checked={this.props.dif} onChange={this.handleDifChange}/>}
                                label={
                                    <>
                                        <img src={trail_diff_blackdiamond} key="difid" width="30px" height="30px" style={{ marginRight: "5px" }} />
                                        
                                    </>
                                }
                        />
                            <FormControlLabel
                                control={<Checkbox name="ex" checked={this.props.ex} onChange={this.handleExChange}/>}
                                label={
                                    <>
                                        <img src={trail_diff_doubleblack} key="expertid" width="30px" height="30px" style={{ marginRight: "5px" }} />
                                        
                                    </>
                                }
                        />
                        </FormGroup>
                        <Button disabled={!this.state.formValid} type = "submit" value ="Submit" > Pick Trail </Button>

                    </form>
                </CardContent>
            </Card>
        );
    }
}
export default Form;