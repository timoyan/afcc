import { IUsersAPI } from '@sample/apis';
import { RouterState } from 'connected-react-router';

export interface IRootState {
    errorMessage: string;
    router: RouterState;
}
export interface IEpicDependency {
    usersAPI: IUsersAPI;
}
