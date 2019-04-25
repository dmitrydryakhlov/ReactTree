import React from 'react';
import { uniqId } from '../utils';

export default class Node extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
    }

    static defaultProps = {
        name: 'untitled',
        children: [],
        level: 0
    }

    indentGenerate = level => {
        let indent = '';
        for (let i = 0; i < level; i++) {
            indent += '|---'
        }
        return indent;
    }

    onNameChange = event => {
        this.setState({ ...this.state, name: event.currentTarget.value });
    }

    addNode = () => {
        this.props.addNode(this.props.id,
            {
                name: this.state.name || 'untitled',
                id: uniqId(),
                children: []
            });
        this.setState({ ...this.state, name: '' });
    }


    removeNode = () => this.props.removeNode(this.props.id)

    changeNode = () => {
        this.props.changeNode(this.props.id, this.state.name);
        this.setState({ ...this.state, name: '' });
    }

    render() {
        return (
            <div>
                {this.indentGenerate(this.props.level)}<span>{this.props.name}</span>
                {this.props.root || <button onClick={this.removeNode} className='removeButton'>-</button>}
                <input type="text" onChange={this.onNameChange} value={this.state.name} />
                <button onClick={this.addNode} className='addButton'>+</button>
                <button onClick={this.changeNode} className='changeButton'>save</button>
                {
                    this.props.children && this.props.children.map((child, index) => {
                        return <Node
                            name={child.name}
                            children={child.children}
                            id={child.id}
                            key={index}
                            addNode={this.props.addNode}
                            removeNode={this.props.removeNode}
                            changeNode={this.props.changeNode}
                            level={this.props.level + 1}
                        />
                    })
                }
            </div >
        )
    }
}
