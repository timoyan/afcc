import { Observable, of } from 'rxjs';
import { AjaxResponse } from 'rxjs/ajax';
import { IUsersAPI } from '../users';

export class UsersAPI implements IUsersAPI {
    register = (name: string, email: string): Observable<AjaxResponse> => {
        return of({ status: 200 } as AjaxResponse);
    };
}
