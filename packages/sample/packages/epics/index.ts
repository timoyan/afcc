import { IRootState } from '@sample/types/common';
import { combineEpics } from 'redux-observable';
import userEpic from './users';

export default combineEpics<any, any, IRootState>(...userEpic);
