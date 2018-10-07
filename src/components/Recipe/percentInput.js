import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PercentInput extends Component {
  constructor() {
    super();

    this.state = {
      value: ''
    };
  }

  componentDidMount() {
    this.setState({value: this.props.value}); 
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({value: this.props.value});
    }
  }

  onInputChange = (e) => {
    this.setState({value: e.target.value})
  }

  render() {
    const { inputId, label, disabled, onChange } = this.props;
    const { value } = this.state;

    return (
      <div className="form-group row">
        <label htmlFor={inputId} className="col-sm-3 col-form-label">{label}</label>
        <div className="col-sm-9 input-group">
          <input
            type="number"
            min={0}
            max={100}
            value={value}
            id={inputId}
            className="form-control"
            disabled={disabled}
            onChange={this.onInputChange}
            onBlur={onChange}
          />
          <div className="input-group-append">
            <span className="input-group-text">%</span>
          </div>
        </div>
      </div>
    );
  }
}

PercentInput.propTypes = {
  inputId: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func
};

export default PercentInput;
