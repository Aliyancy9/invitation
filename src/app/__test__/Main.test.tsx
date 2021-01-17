import * as React from 'react'
import { render } from '@testing-library/react'

import Main from '../Main'

const renderTest = (comp: any) => render(comp)

describe('EmailDialog', () => {
    it('should show correct title', () => {   
    const { container } = renderTest(<Main  />)
    expect(container).toMatchSnapshot()
    })
})