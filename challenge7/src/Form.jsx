import React, { Component } from 'react';

class Form extends Component {
    render() {
        return (
            <form
                onSubmit={(e) => {
                    this.handleFormSubmit(e);
                }}
            >
                <ul>
                    <li>
                        <input
                            type="text"
                            id="input-box"
                            ref="inputBox"
                        />
                    </li>
                    <li>
                        <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" type="submit">Search</button>
                    </li>
                </ul>
            </form>
        );
    }

    handleFormSubmit(e) {
        e.preventDefault();

        var item = this.refs.inputBox.value;

        this.props.onFormSubmit(item);
    }
}

export default Form;
