import React from 'react';
import { render, fireEvent, waitFor, screen,cleanup} from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import UserComponent from './UserComponent'; // Replace with your actual component
import MyButton from "../HomeComponent";
//import {render,screen,cleanup} from '@testing-library/react'
describe('UserComponent', () => {
  const mock = new MockAdapter(axios);

  afterEach(() => {
    mock.reset();
  });

  it('fetches and displays user details', async () => {
    const userId = 1;
    const userData = {
      id: userId,
      name: 'kiran',
      age: 25,
    };

    mock.onGet(`/api/users/${userId}/`).reply(200, userData);

    render(<UserComponent userId={userId} />);

    await waitFor(() => {
      expect(screen.getByText('name: kiran')).toBeInTheDocument();
      expect(screen.getByText('age: 25')).toBeInTheDocument();
    });
  });

  it('creates a new user', async () => {
    const newUser = {
      username: 'newuser',
      email: 'new@example.com',
    };

    mock.onPost('/api/users/').reply(201, newUser);

    render(<UserComponent />);

    const usernameInput = screen.getByLabelText('name');
    const emailInput = screen.getByLabelText('age');
    const submitButton = screen.getByText('Submit');

    fireEvent.change(usernameInput, { target: { value: newUser.username } });
    fireEvent.change(emailInput, { target: { value: newUser.email } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('User created successfully!')).toBeInTheDocument();
    });
  });
});



test('test',() =>{
  expect(true).toBe(true);
})
test('Should show user list',()=>{
  render(<MyButton/>)
  const home_button_element = screen.getByTestId('home-1');
  expect(home_button_element).toBeInTheDocument();
})