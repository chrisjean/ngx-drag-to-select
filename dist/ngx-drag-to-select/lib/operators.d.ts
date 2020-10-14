import { Observable } from 'rxjs';
import { MousePosition, SelectBox, SelectContainerHost } from './models';
export declare const createSelectBox: (container: SelectContainerHost) => (source: Observable<[MouseEvent, number, MousePosition]>) => Observable<SelectBox<number>>;
export declare const whenSelectBoxVisible: (selectBox$: Observable<SelectBox<number>>) => (source: Observable<Event>) => Observable<Event>;
export declare const distinctKeyEvents: () => (source: Observable<KeyboardEvent>) => Observable<KeyboardEvent>;
