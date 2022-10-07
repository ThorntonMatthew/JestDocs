/* eslint-disable max-lines */
import React from 'react';
import { MemoryRouter, Route } from 'react-router';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import COPY from '../../../../COPY';
import { YourContextProvider } from '../YourContextProvider';
import {
  yourReducer,
  getAppealId,
  getTaskId,
  enterTextFieldOptions,
  enterModalRadioOptions,
  selectFromDropdown,
  clickSubmissionButton,
  createSpyRequestPatch
} from './modalUtils';
import { awesomeData } from '../data/awesomeReduxDataFile';
import YourComponent from '../YourComponent';

let requestPatchSpy;

const renderYourComponent  = (modalType, valuesYouMaybeGotFromReduxDevTools, taskType) => {
  const appealId = getAppealId(valuesYouMaybeGotFromReduxDevTools);
  const taskId = getTaskId(valuesYouMaybeGotFromReduxDevTools, taskType);

  const yourReducer = createReducer(valuesYouMaybeGotFromReduxDevTools);
  const store = createStore(
    yourReducer,
    compose(applyMiddleware(thunk))
  );
  

  const path = `/queue/appeals/${appealId}/tasks/${taskId}/modal/${modalType}`;

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[path]}>
        <Route component={(props) => {
          return <YourComponent {...props.match.params} modalType={modalType} />;
        }} path={`/queue/appeals/:appealId/tasks/:taskId/modal/${modalType}`} />
      </MemoryRouter>
    </Provider>
  );
};

const getReceivedInstructions = () => requestPatchSpy.mock.calls[0][1].data.task.instructions;

beforeEach(() => {
  requestPatchSpy = createSpyRequestPatch(postData);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('YourComponent', () => {
  describe('EXAMPLE', () => {
    const taskType = 'ExampleTask';
    const buttonText = COPY.MODAL_SEND_BUTTON;
    const modalType = 'ExampleModal';

    test('Example Text on Screen Test', () => {
      renderYourComponent(modalType, awesomeData, taskType);

      expect(screen.getByText('Text on Screen')).toBeTruthy();
    });

    test('Test CSS Example', () => {
      renderYourComponent(modalType, awesomeData, taskType);

      const submissionButton = screen.getByText(buttonText).closest('button');

      expect(submissionButton).toHaveClass('usa-button');
      expect(submissionButton).not.toHaveClass('usa-button-secondary');
    });

    test('Disabled Button Example', () => {
      renderYourComponent(modalType, awesomeData, taskType);
      expect(screen.getByText(buttonText).closest('button')).toBeDisabled();
    });
  });  
 });
/* eslint-enable max-lines */
