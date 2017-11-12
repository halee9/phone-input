import React, { Component } from 'react';
import './InputPhoneNumber.css';

import { asYouType } from 'libphonenumber-js'
import { ReactInput, templateFormatter, templateParser, parseDigit } from 'input-format'

const DEFAULT_TEMPLATE = 'xxx-xxx-xxxx';
const DEFAULT_COUNTRY_CODE = 'US';

const countryCodes = [
  { code: 'US', name: 'United States' },
  { code: 'KR', name: 'South Korea' },
  { code: 'JP', name: 'Japan' }
];

const flagsPath = 'https://lipis.github.io/flag-icon-css/flags/4x3/';

export default class InputPhoneNumber extends Component {
  state = {
    value: '',
    ccode: DEFAULT_COUNTRY_CODE,
    formatter: {},
    template: DEFAULT_TEMPLATE
  }

  handleChangePhoneNumber = (value) => {
    const formatter = new asYouType(this.state.ccode);
    formatter.input(value);
    this.setState({ value, formatter, template: formatter.template || DEFAULT_TEMPLATE });
  }

  handleChangeCode = (e) => {
    this.setState({ ccode: e.target.value },() => {
        this.handleChangePhoneNumber(this.state.value);
    });
    this.phoneInput.focus();
  }

  render(){
    return (
      <div className='container'>
        <div className='select-container'>
          <select
            className='select'
            value={this.state.ccode}
            onChange={this.handleChangeCode}
          >
            { countryCodes.map(country => (
              <option value={country.code}>{country.name}</option>
            ))}
          </select>
          <div className='flag-container'>
            <img
              className='flag-image'
              src={`${flagsPath}${this.state.ccode.toLowerCase()}.svg`}
            />
            <div className='select-arrow'></div>
          </div>
        </div>
        <ReactInput
          value={ this.state.value }
          onChange={this.handleChangePhoneNumber}
          format={ templateFormatter(this.state.template) }
          parse={ templateParser(this.state.template, parseDigit) }
          ref={input => this.phoneInput = input}
        />
      </div>
    )
  }
}
