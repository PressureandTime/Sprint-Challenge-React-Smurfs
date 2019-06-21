import React, { Component } from 'react';

export class SmurfUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: '',
      height: ''
    };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.updateSmurf(this.state.id, {
      name: this.state.name,
      age: this.state.age,
      height: this.state.height
    });
    this.setState({ id: '', name: '', age: '', height: '' });
    this.props.history.push('/');
  };

  componentDidMount() {
    const smurfs = this.props.smurfs;
    const id = this.props.match.params.id;
    const smurf = smurfs.find(smurf => {
      return id === smurf.id;
    });

    this.setState({ ...smurf });
  }

  render() {
    return (
      <div>
        <h3>Form for updating a Smurf</h3>
        <form onSubmit={this.onSubmit}>
          <input
            onChange={this.onChange}
            placeholder="name"
            value={this.state.name}
            name="name"
          />
          <input
            onChange={this.onChange}
            placeholder="age"
            value={this.state.age}
            name="age"
          />
          <input
            onChange={this.onChange}
            placeholder="height"
            value={this.state.height}
            name="height"
          />
          <button type="submit">Update the smurf</button>
        </form>
      </div>
    );
  }
}

export default SmurfUpdate;
