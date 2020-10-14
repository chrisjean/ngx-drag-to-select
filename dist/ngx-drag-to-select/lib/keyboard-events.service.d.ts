import { Observable } from 'rxjs';
export declare class KeyboardEventsService {
    private platformId;
    keydown$: Observable<KeyboardEvent>;
    keyup$: Observable<KeyboardEvent>;
    distinctKeydown$: Observable<KeyboardEvent>;
    distinctKeyup$: Observable<KeyboardEvent>;
    mouseup$: Observable<MouseEvent>;
    mousemove$: Observable<MouseEvent>;
    constructor(platformId: Object);
    private _initializeKeyboardStreams;
}
