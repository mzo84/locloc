import React from 'react';

class Checkbox extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {

        return (
            <fieldset>
                <input type="checkbox" id={this.props.id} onChange={this.props.onChange} checked={this.props.checked} />
                <label htmlFor={this.props.id}>{this.props.id}</label>
            </fieldset>
        );
    }


}

export default Checkbox;