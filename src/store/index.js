import {configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import auth from '../reducers/auth';
import document from '../reducers/document';

export default configureStore({
  reducer: {
    auth,
    document,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});
