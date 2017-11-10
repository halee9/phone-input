import React, { Component } from 'react';
import { parse, format, asYouType, isValidNumber } from 'libphonenumber-js'
import { ReactInput, templateFormatter, templateParser, parseDigit } from 'input-format'

const DEFAULT_TEMPLATE = 'xxx-xxx-xxxx';

export default class InputPhoneNumber extends Component {
  state = {
    value: '',
    ccode: 'US',
    formatter: {},
    template: DEFAULT_TEMPLATE
  }

  handleChangePhoneNumber = (value) => {
    // console.log(value)
    //this.setState({ value });
    // const  parsedPhone = parse(e.target.value);
    // console.log(parsedPhone);
    // const formattedPhone = format(parsedPhone, 'International');
    // this.setState({ phone: formattedPhone });
    // const phone = value;
    const formatter = new asYouType(this.state.ccode);
    formatter.input(value);
    // console.log(formatter);
    //const p = formatter.partially_populated_template.replace(/x/g, " ");
    //const p = formatter.partially_populated_template && formatter.partially_populated_template.replace(/x/g, "");
    this.setState({ value, formatter, template: formatter.template || DEFAULT_TEMPLATE });
    //this.setState({ phone: new asYouType().input(phone) });
  }

  handleChangeCode = (e) => {
    this.setState({ ccode: e.target.value });
  }

  render(){
    const valid = isValidNumber(this.state.phone);
    return (
      <div>
        <select
          onChange={this.handleChangeCode}
        >
          <option value='US'>US</option>
          <option value='KR'>KR</option>
          <option value='JP'>JP</option>
        </select>
        <ReactInput
          value={ this.state.value }
          onChange={this.handleChangePhoneNumber}
          format={ templateFormatter(this.state.template) }
          parse={ templateParser(this.state.template, parseDigit) }
        />
        
        <div>
          Value: {this.state.value} 
        </div>
        <div>
          Default country: {this.state.ccode} 
        </div>
        <div>
          Actual country: {this.state.formatter.country} 
        </div>
        <div>
          National: {this.state.formatter.national_number} 
        </div>
        <div>
          National-format: {this.state.formatter.partially_populated_template} 
        </div>
        <div>
          template: {this.state.formatter.template} 
        </div>
      <div>
          Valid: {valid}
        </div>
      </div>

    )
  }
}