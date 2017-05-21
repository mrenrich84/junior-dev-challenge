import React from 'react'
import { shallow, mount } from 'enzyme'
import Navbar from './Navbar'

describe('<Navbar />', () => {
  it('should render with title', () => {
    const wrapper = shallow(<Navbar />)
    expect(wrapper.text()).toContain('Nearest Candidates')
  })
})
