import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import renderer from 'react-test-renderer';
import Tree from './components/Tree';
import store from './store/configureStore';
import { act } from 'react-dom/test-utils';
import ReactTestUtils from 'react-dom/test-utils';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
})

afterEach(() => {
  document.body.removeChild(container);
  container = null;
})

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('render correctly Tree component', () => {
  const rootElement = renderer.create(<Tree store={store} />).toJSON();
  expect(rootElement).toMatchSnapshot();
});

it('add Child', () => {
  act(() => {
    ReactDOM.render(<Tree store={store} />, container)
  })
  const addButton = container.querySelector('.addButton');

  act(() => {
    addButton.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  });
  const label = container.querySelectorAll('span');

  act(() => {
    expect(label[0].textContent).toBe('root');
    expect(label[1].textContent).toBe('untitled');
  });

})

it('remove Node', () => {
  act(() => {
    ReactDOM.render(<Tree store={store} />, container);
  });
  let label = container.querySelectorAll('span');

  expect(label[0].textContent).toBe('root');
  expect(label[1].textContent).toBe('untitled');

  const removeButton = container.querySelectorAll('.removeButton');
  act(() => {
    removeButton[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
  })
  label = container.querySelectorAll('span');

  expect(label[0].textContent).toBe('root');
  expect(label[2]).toBe(undefined);
  expect(label[1]).toBe(undefined);
})

it('change Node ', () => {
  act(() => {
    ReactDOM.render(<Tree store={store} />, container);
  });
  let label = container.querySelectorAll('span');
  expect(label[0].textContent).toBe('root');
  expect(label[1]).toBe(undefined);

  const inputValue = container.querySelectorAll('input');
  inputValue[0].value = 'super';
  ReactTestUtils.Simulate.change(inputValue[0]);

  const changeButton = container.querySelectorAll('.changeButton');
  act(() => {
    changeButton[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
  })
  label = container.querySelectorAll('span');
  expect(label[0].textContent).toBe('super');
  expect(label[1]).toBe(undefined);
})
