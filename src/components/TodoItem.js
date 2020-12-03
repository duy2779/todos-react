import React, { Component } from 'react';
import './TodoItem.css';
import checkImg from './img/check.svg';
import checkedImg from './img/checked.svg';

class TodoItem extends Component {
    render() {
        const { item, onClick } = this.props;
        let className = 'TodoItem';
        let url = checkImg;
        if (item.isCompleted) {
            url = checkedImg;
        }
        if (item.isCompleted) {
            className += ' TodoItem-complete'
        }
        return (
            <div className={className} onClick={onClick}>
                {/* props */}
                <img src={url} alt='#' width='32'/>
                <p>{this.props.item.title}</p>
            </div>
        );
    }
}

export default TodoItem;