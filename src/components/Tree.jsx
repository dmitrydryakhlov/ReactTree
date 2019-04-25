import React from 'react';
import { connect } from 'react-redux';
import Node from './Node';
import { addNode, removeNode, changeNode } from '../actions/treeActions';

class Tree extends React.Component {

    render() {
        return <Node
            root={true}
            name={this.props.tree.name}
            children={this.props.tree.children}
            id={this.props.tree.id}
            addNode={this.props.addNode}
            removeNode={this.props.removeNode}
            changeNode={this.props.changeNode}
            level={0} />
    }
}

const mapStateToProps = (store) => {
    console.log(store);
    return {
        tree: store.tree
    }
}

const mapDispatchToProps = (dispatch) => ({
    addNode: (parentId, newNode) => dispatch(addNode(parentId, newNode)),
    removeNode: (id) => dispatch(removeNode(id)),
    changeNode: (id, newName) => dispatch(changeNode(id, newName))
})

export default connect(mapStateToProps, mapDispatchToProps)(Tree);

