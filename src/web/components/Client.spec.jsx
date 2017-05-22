import React from 'react'
import renderer from 'react-test-renderer';
import Client from './Client'

describe('<Client />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Client  name="Ale" postcode="B21 15G" mapIndex="1"/>
    ).toJSON();
    // expect(tree).toMatchSnapshot();
    // console.log(JSON.stringify(tree, null, 4));
  })
})
