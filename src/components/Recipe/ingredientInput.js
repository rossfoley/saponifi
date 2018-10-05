import React, { Component } from 'react';
import AutoComplete from 'react-autocomplete';

import oilProperties from '../../util/oilProperties';
import './ingredientInput.css';

class IngredientInput extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      amount: ''
    };
  }

  componentDidMount() {
    const { name, amount } = this.props.ingredient;
    this.setState({ name, amount }); 
  }

  onNameChange = (e) => {
    this.setState({name: e.target.value})
  }

  onAmountChange = (e) => {
    this.setState({amount: e.target.value})
  }

  onChange = (e) => {
    const { index } = this.props;
    const { name, amount } = this.state;
    this.props.onChange(index, name, amount);
  }

  displayUnit = () => {
    const { setup } = this.props;
    if (setup.inputMode === 'percent') {
      return '%';
    } else {
      if (setup.outputUnits === 'ounces') {
        return 'oz';
      } else {
        return 'g';
      }
    }
  }

  render() {
    const { index } = this.props;
    const nameInputId = `ingredientName${index}`
    const amountInputId = `ingredientAmount${index}`
    const { name, amount } = this.state;

    return (
      <div className="form-inline ingredient-input-group">
          <label htmlFor={nameInputId} className="col-sm-2 control-label">Ingredient</label>
            <AutoComplete
              items={oilProperties}
              inputProps={{
                id: nameInputId,
                className: 'form-control',
                placeholder: 'Ingredient Name',
                onBlur: this.onChange 
              }}
              wrapperProps={{
                className: 'autocomplete-menu-wrapper col-sm-4'
              }}
              shouldItemRender={(item, value) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1}
              getItemValue={item => item.name}
              renderItem={(item, highlighted) =>(
                <div
                  key={item.id}
                  className={`list-group-item ${highlighted ? 'active' : ''}`}
                >
                  {item.name}
                </div>
              )}
              value={name}
              onChange={this.onNameChange}
              onSelect={name => this.setState({ name })}
            />
          <label htmlFor={amountInputId} className="col-sm-2 control-label">Amount</label>
          <div className="col-sm-4 input-group">
            <input
              type="number"
              value={amount}
              id={amountInputId}
              className="form-control"
              placeholder="Amount"
              onChange={this.onAmountChange}
              onBlur={this.onChange}
            />
            <div className="input-group-append">
              <span className="input-group-text">{this.displayUnit()}</span>
            </div>
          </div>
      </div>
    );
  }
}

export default IngredientInput;
