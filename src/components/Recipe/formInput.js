import React, { Component } from 'react';

class FormInput extends Component {
  constructor() {
    super();

    this.state = {
      value: ''
    };
  }

  componentDidMount() {
    this.setState({value: this.props.value}); 
  }

  onInputChange = (e) => {
    this.setState({value: e.target.value})
  }

  render() {
    const { inputId, type, label, onChange } = this.props;
    const { value } = this.state;

    return (
      <div className="form-group row">
        <label htmlFor={inputId} className="col-sm-3 col-form-label">{label}</label>
        <div className="col-sm-9">
          <input
            type={type}
            value={value}
            id={inputId}
            className="form-control"
            onChange={this.onInputChange}
            onBlur={onChange}
          />
        </div>
      </div>
    );
  }
}

export default FormInput;
