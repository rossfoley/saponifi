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

  render() {
    const { index } = this.props;
    const nameInputId = `ingredientName${index}`
    const amountInputId = `ingredientAmount${index}`
    const { name, amount } = this.state;

    return (
      <div className="form-inline">
        <div className="form-group">
          <label htmlFor={nameInputId} className="col-sm-3 control-label">Ingredient</label>
          <div className="col-sm-3">
            <AutoComplete
              items={oilProperties}
              inputProps={{
                id: nameInputId,
                className: 'form-control',
                placeholder: 'Ingredient Name',
                onBlur: this.onChange 
              }}
              wrapperProps={{
                className: 'autocomplete-menu-wrapper'
              }}
              shouldItemRender={(item, value) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1}
              getItemValue={item => item.name}
              renderItem={(item, highlighted) =>(
                <div
                  key={item.id}
                  className={`autocomplete-item ${highlighted ? 'highlighted' : ''}`}
                  style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
                >
                  {item.name}
                </div>
              )}
              value={name}
              onChange={this.onNameChange}
              onSelect={name => this.setState({ name })}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor={amountInputId} className="col-sm-3 control-label">Amount</label>
          <div className="col-sm-3">
            <input
              type="number"
              value={amount}
              id={amountInputId}
              className="form-control"
              placeholder="Amount"
              onChange={this.onAmountChange}
              onBlur={this.onChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default IngredientInput;
