import React from 'react';
import Tabs from '../Tabs'
import Page from '../Page'
import './Select.css';
import Checkbox from './Checkbox';

class Select extends React.Component {
    constructor(props) {
        super(props);
        this.tabs = new Tabs();
        this.state = {
            selected : 'default',
            local : false,
            server: false,
            stage: false,
            live: false,
            options: props.options,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
    }

    handleChange(e) {
        this.setState({
            selected: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        if(this.state.selected !== "default" && this.state.selected !== "sourcebox") {
            this.tabs.delegate(this.state.selected,
                {
                    "local" : this.state.local,
                    "server" : this.state.server,
                    "stage" : this.state.stage,
                    "live" : this.state.live
            });
        } else if(this.state.selected === "sourcebox") {
            this.tabs.sourcebox()
        }
    }

    handleChecked(e) {
        this.setState({
            [e.target.id]: e.target.checked
        })
    }

    render() {
        const options = this.state.options.map((option, index) =>
            <option className="SelectOption" value={option} key={index}>{option}</option>
        );

        return (
        <form onSubmit={this.handleSubmit}>
            <div className="FormWrapper">
                <div className="SelectWrapper">
                    <select className="SelectContainer" value={this.state.selected} onChange={this.handleChange} name="geoSelector">
                    <option value="default" defaultValue>Open on...</option>
                        {options}
                    </select>
                    <input id="geoSelector" className="SelectContainer-input" value="Go!" type="submit" />
                </div>
                <div className="EnvironmentWrapper">
                    <Checkbox id="local" onChange={this.handleChecked} checked={this.state.local} />
                    <Checkbox id="server" onChange={this.handleChecked} checked={this.state.server} />
                    <Checkbox id="stage" onChange={this.handleChecked} checked={this.state.stage} />
                    <Checkbox id="live" onChange={this.handleChecked} checked={this.state.live} />
                </div>
            </div>
        </form>
        )
    }
}

export default Select;