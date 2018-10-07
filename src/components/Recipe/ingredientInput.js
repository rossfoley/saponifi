import React, { Component } from 'react';
import AutoComplete from 'react-autocomplete';

import oilProperties from '../../util/oilProperties';
import './ingredientInput.css';

class IngredientInput extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      amount: '',
      superfat: false
    };
  }

  componentDidMount() {
    const { name, amount, superfat } = this.props.ingredient;
    this.setState({ name, amount }); 
  }

  componentDidUpdate(prevProps) {
    const { name, amount, superfat } = this.props.ingredient;
    if (name !== prevProps.ingredient.name || amount !== prevProps.ingredient.amount || superfat !== prevProps.ingredient.superfat) {
      this.setState({ name, amount, superfat }); 
    }
  }

  onNameChange = (e) => {
    this.setState({name: e.target.value})
  }

  onAmountChange = (e) => {
    this.setState({amount: e.target.value})
  }

  onChange = (e) => {
    const { index } = this.props;
    const { name, amount, superfat } = this.state;
    this.props.onChange(index, name, amount, superfat);
  }

  removeIngredient = (e) => {
    this.props.onRemove(this.props.index);
  };

  toggleSuperfat = (e) => {
    const { index } = this.props;
    const { name, amount, superfat } = this.state;
    this.props.onChange(index, name, amount, !superfat);
  }

  render() {
    const { index } = this.props;
    const { displayUnits } = this.props.setup;
    const { name, amount, superfat } = this.state;

    const nameInputId = `ingredientName${index}`
    const amountInputId = `ingredientAmount${index}`

    return (
      <div className="form-inline ingredient-input-group">
        <label htmlFor={nameInputId} className="col control-label">Ingredient</label>
        <AutoComplete
          items={oilProperties}
          inputProps={{
            id: nameInputId,
            className: 'form-control',
            placeholder: 'Ingredient Name',
            onBlur: this.onChange 
          }}
          wrapperProps={{
            className: 'autocomplete-menu-wrapper col-4'
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
        <label htmlFor={amountInputId} className="col control-label">Amount</label>
        <div className="col-3 input-group">
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
            <span className="input-group-text">{displayUnits.input}</span>
          </div>
        </div>
        <div className="col d-flex justify-content-around align-items-center">
          <button
            type="button"
            className={`superfat btn ${superfat ? 'btn-primary' : 'btn-secondary'}`}
            onClick={this.toggleSuperfat}>
            SF
          </button>
          <button type="button" className="close" aria-label="Close" onClick={this.removeIngredient}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
    );
  }
}

export default IngredientInput;
