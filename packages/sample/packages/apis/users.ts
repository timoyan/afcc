import { Observable } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';

export interface IUsersAPI {
    register: (name: string, email: string) => Observable<AjaxResponse>;
}

export class UsersAPI implements IUsersAPI {
    register = (name: string, email: string) => {
        return ajax.post(
            'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth',
            { name, email }
        );
    };
}
