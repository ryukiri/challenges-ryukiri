import React, { Component } from 'react';

class List extends Component {
    render() {
        var arrayIsNotEmpty = this.props.list.length > 0;

        var value = arrayIsNotEmpty ? 'condition is true' : 'condition is false';

        return (
            <div>
                {arrayIsNotEmpty ? (
                    <div className="collection with-header">
                        <div className="collection-header"><h4>My Locations</h4></div>
                        <ul>
                            {this.props.list.map((item, index) => {
                                return (
                                    <li key={index} className="mdl-list__item collection-item">
                                        <span className="mdl-list__item-primary-content">
                                            <a 
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    this.handleRecentCity(item);
                                                }}
                                            >
                                                {item}
                                            </a>
                                            
                                            <a id="removeLink"
                                                href=""
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    this.handleItemRemoved(item);
                                                }}
                                            >Remove</a>
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ) : (
                    <div> </div>
                )}
            </div>
        );
    }

    handleItemRemoved(item) {
        this.props.onItemRemoved(item);
    }

    handleRecentCity(item) {
        this.props.onRecentCity(item);
    }
}

export default List;