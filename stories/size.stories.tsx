import * as React from 'react';
import { Resizable } from '../src';
import { storiesOf } from '@storybook/react';
import { style } from './style';

storiesOf('size', module).add('percentage', () => <Size />);

export default class Size extends React.Component {
  state = {
    width: '30%',
    height: '20%',
  };
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <Resizable
        style={style}
        size={this.state}
        onResizeStop={(e, direction, ref, d) => {
          this.setState({
            width: ref.style.width,
            height: ref.style.height,
          });
        }}
      >
        001
      </Resizable>
    );
  }
}
