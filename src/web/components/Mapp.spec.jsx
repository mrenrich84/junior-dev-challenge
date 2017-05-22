import React from 'react'
import renderer from 'react-test-renderer';
import Mapp from './Mapp'

describe('<Mapp />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Mapp />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  })
})
