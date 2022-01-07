/* eslint-disable no-unused-vars */
import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import CounterControl from '../../components/CounterControl/CounterControl';
import PostsControl from '../../components/PostsControl/PostsControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import { useSelector, useDispatch } from 'react-redux';

class CounterC extends Component {
  state = {
    counter: 0,
  };

  counterChangedHandler = (action, value) => {
    switch (action) {
      case 'inc':
        this.setState((prevState) => {
          return { counter: prevState.counter + 1 };
        });
        break;
      case 'dec':
        this.setState((prevState) => {
          return { counter: prevState.counter - 1 };
        });
        break;
      case 'add':
        this.setState((prevState) => {
          return { counter: prevState.counter + value };
        });
        break;
      case 'sub':
        this.setState((prevState) => {
          return { counter: prevState.counter - value };
        });
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <div>
        <CounterOutput value={this.props.ctr} />
        <CounterControl label='Increment' clicked={() => this.counterChangedHandler('inc')} />
        <CounterControl label='Decrement' clicked={() => this.counterChangedHandler('dec')} />
        <CounterControl label='Add 5' clicked={() => this.counterChangedHandler('add', 5)} />
        <CounterControl label='Subtract 5' clicked={() => this.counterChangedHandler('sub', 5)} />
      </div>
    );
  }
}

function CounterF(props) {
  const { counter } = useSelector((state) => state.counter);
  const { actions, byId, byBulk } = useSelector((state) => state.posts);

  const { buIdData: data } = useSelector((state) => state.posts.byId);

  const dispatch = useDispatch();

  const getPostById = actions.getPostByIdFunc(dispatch);
  const getPostsBulk = actions.getPostsBulkFunc(dispatch);

  console.log('[ByBulk]', byBulk);
  console.log('[ById]', byId);

  return (
    <>
      <div>
        <CounterOutput value={counter} />
        <CounterControl label='Increment' clicked={() => dispatch({ type: 'inc' })} />
        <CounterControl label='Decrement' clicked={() => dispatch({ type: 'dec' })} />
        <CounterControl label='Add 5' clicked={() => dispatch({ type: 'add', value: 5 })} />
        <CounterControl label='Subtract 5' clicked={() => dispatch({ type: 'sub', value: 5 })} />
      </div>

      <div className='App'>
        <PostsControl
          clicked={() => {
            getPostById(counter);
          }}
          label='Fetch Post By Counter as Id'
        />
        <PostsControl
          clicked={() => {
            getPostsBulk();
          }}
          label='Fetch All Posts In bulk'
        />
      </div>
    </>
  );
}

const Counter = CounterF;
export default Counter;
