import * as React from 'react'
import { render, waitForElement, fireEvent,act } from '@testing-library/react'

import registerEmailMock from '../__mocks__/registerEmailMock'

import EmailDialog from '../EmailDialog'

const baseProps = {
    isOpen: true,
    onClose: jest.fn()
}

const renderTest = (comp: any) => render(comp)

describe('EmailDialog', () => {
    it('should render correctly', () => {
         const { container } = renderTest(<EmailDialog {...baseProps} />)
         expect(container).toMatchSnapshot()

    })
    it('should show correct title', async () => {
    const { getByText } = renderTest(<EmailDialog {...baseProps} />)

        const titleElement = await waitForElement(() => getByText('Request an invite'))

        expect(titleElement.innerHTML).toContain('Request an invite')
    })

   
    it('should show correct input labels', async () => {
    const { getAllByText } = renderTest(<EmailDialog {...baseProps} />)
    const nameLabel = 'Full name'
    const emailLabel = 'Email'
    const confirmedEmailLabel = 'Confirm email'
   
    const nameElement = await waitForElement(() => getAllByText(nameLabel))
    const emailElement = await waitForElement(() => getAllByText(emailLabel))
    const confirmedEmailElement = await waitForElement(() => getAllByText(confirmedEmailLabel))

    expect(nameElement).toBeTruthy()
    expect(emailElement).toBeTruthy()
    expect(confirmedEmailElement).toBeTruthy()

})

    it('should only Submit the form if the values are correct', async () => {
    const { getByText, getByTestId } = renderTest(<EmailDialog {...baseProps} />)
    
    const nameInput = getByTestId('name-input').querySelector('input')
    const emailInput = getByTestId('email-input').querySelector('input')
    const confirmedEmailInput =getByTestId('confirmedEmail-input').querySelector('input')
    
    act(() => {fireEvent.change(nameInput, { target: { value: 'doris' }})})
    act(() => {fireEvent.change(emailInput, { target: { value: 'email@example.com' }})})
    act(() => {fireEvent.change(confirmedEmailInput, { target: { value: 'email@example.com' } })})
    
    const addButton = getByText('Send')
    fireEvent.click(addButton)

    expect(registerEmailMock.mockReturnValue('Registered'))
    })
})