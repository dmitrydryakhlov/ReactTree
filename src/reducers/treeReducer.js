import {
    ADD_NODE,
    REMOVE_NODE,
    CHANGE_NODE
} from "../actions/treeActions";
import { uniqId } from "../utils";

const initialState = {
    name: 'root',
    id: uniqId(),
    children: []
}

function DFS(root, callBack, id, newNode) {
    (function recurse(currentNode) {
        for (let i = 0; i < currentNode.children.length; i++) {
            recurse(currentNode.children[i]);
        }
        callBack(id, currentNode, newNode);
    })(root)
}

function addNode(id, currentNode, newNode) {
    if (currentNode.id === id) {
        currentNode.children.push(newNode);
    }
}

function removeNode(id, currentNode) {
    currentNode.children = currentNode.children.filter(child => child.id !== id)
}

function changeNode(id, currentNode, newName) {
    if (currentNode.id === id) {
        currentNode.name = newName;
    }
}



export function treeReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_NODE: {
            let newState = JSON.parse(JSON.stringify(state));
            DFS(newState, addNode, action.payload.id, action.payload.child);
            return newState;
        }
        case REMOVE_NODE: {
            let newState = JSON.parse(JSON.stringify(state));
            DFS(newState, removeNode, action.payload);
            return newState;
        }

        case CHANGE_NODE: {
            let newState = JSON.parse(JSON.stringify(state));
            DFS(newState, changeNode, action.payload.id, action.payload.newName);
            return newState;
        }

        default: {
            return state;
        }

    }
}
