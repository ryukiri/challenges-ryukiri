import React, { Component } from 'react';

class TestComponent extends Component {
    render() {

        return (
            <div className="test-component">
                {this.props.text}
            </div>
        );
    }
}

export default TestComponent;
