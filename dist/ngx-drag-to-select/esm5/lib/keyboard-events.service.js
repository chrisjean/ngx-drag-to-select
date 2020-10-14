/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { fromEvent } from 'rxjs';
import { share } from 'rxjs/operators';
import { distinctKeyEvents } from './operators';
var KeyboardEventsService = /** @class */ (function () {
    function KeyboardEventsService(platformId) {
        this.platformId = platformId;
        if (isPlatformBrowser(this.platformId)) {
            this._initializeKeyboardStreams();
        }
    }
    /**
     * @private
     * @return {?}
     */
    KeyboardEventsService.prototype._initializeKeyboardStreams = /**
     * @private
     * @return {?}
     */
    function () {
        this.keydown$ = fromEvent(window, 'keydown').pipe(share());
        this.keyup$ = fromEvent(window, 'keyup').pipe(share());
        // distinctKeyEvents is used to prevent multiple key events to be fired repeatedly
        // on Windows when a key is being pressed
        this.distinctKeydown$ = this.keydown$.pipe(distinctKeyEvents(), share());
        this.distinctKeyup$ = this.keyup$.pipe(distinctKeyEvents(), share());
        this.mouseup$ = fromEvent(window, 'mouseup').pipe(share());
        this.mousemove$ = fromEvent(window, 'mousemove').pipe(share());
    };
    KeyboardEventsService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    KeyboardEventsService.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    return KeyboardEventsService;
}());
export { KeyboardEventsService };
if (false) {
    /** @type {?} */
    KeyboardEventsService.prototype.keydown$;
    /** @type {?} */
    KeyboardEventsService.prototype.keyup$;
    /** @type {?} */
    KeyboardEventsService.prototype.distinctKeydown$;
    /** @type {?} */
    KeyboardEventsService.prototype.distinctKeyup$;
    /** @type {?} */
    KeyboardEventsService.prototype.mouseup$;
    /** @type {?} */
    KeyboardEventsService.prototype.mousemove$;
    /**
     * @type {?}
     * @private
     */
    KeyboardEventsService.prototype.platformId;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5Ym9hcmQtZXZlbnRzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZHJhZy10by1zZWxlY3QvIiwic291cmNlcyI6WyJsaWIva2V5Ym9hcmQtZXZlbnRzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRSxPQUFPLEVBQUUsU0FBUyxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFaEQ7SUFTRSwrQkFBeUMsVUFBa0I7UUFBbEIsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUN6RCxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN0QyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztTQUNuQztJQUNILENBQUM7Ozs7O0lBRU8sMERBQTBCOzs7O0lBQWxDO1FBQ0UsSUFBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQWdCLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUMxRSxJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBZ0IsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBRXRFLGtGQUFrRjtRQUNsRix5Q0FBeUM7UUFFekMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUN4QyxpQkFBaUIsRUFBRSxFQUNuQixLQUFLLEVBQUUsQ0FDUixDQUFDO1FBRUYsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDcEMsaUJBQWlCLEVBQUUsRUFDbkIsS0FBSyxFQUFFLENBQ1IsQ0FBQztRQUVGLElBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFhLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBYSxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDN0UsQ0FBQzs7Z0JBbENGLFVBQVU7Ozs7Z0JBUzRDLE1BQU0sdUJBQTlDLE1BQU0sU0FBQyxXQUFXOztJQTBCakMsNEJBQUM7Q0FBQSxBQW5DRCxJQW1DQztTQWxDWSxxQkFBcUI7OztJQUNoQyx5Q0FBb0M7O0lBQ3BDLHVDQUFrQzs7SUFDbEMsaURBQTRDOztJQUM1QywrQ0FBMEM7O0lBQzFDLHlDQUFpQzs7SUFDakMsMkNBQW1DOzs7OztJQUV2QiwyQ0FBK0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIFBMQVRGT1JNX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHNoYXJlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgZGlzdGluY3RLZXlFdmVudHMgfSBmcm9tICcuL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBLZXlib2FyZEV2ZW50c1NlcnZpY2Uge1xuICBrZXlkb3duJDogT2JzZXJ2YWJsZTxLZXlib2FyZEV2ZW50PjtcbiAga2V5dXAkOiBPYnNlcnZhYmxlPEtleWJvYXJkRXZlbnQ+O1xuICBkaXN0aW5jdEtleWRvd24kOiBPYnNlcnZhYmxlPEtleWJvYXJkRXZlbnQ+O1xuICBkaXN0aW5jdEtleXVwJDogT2JzZXJ2YWJsZTxLZXlib2FyZEV2ZW50PjtcbiAgbW91c2V1cCQ6IE9ic2VydmFibGU8TW91c2VFdmVudD47XG4gIG1vdXNlbW92ZSQ6IE9ic2VydmFibGU8TW91c2VFdmVudD47XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy5faW5pdGlhbGl6ZUtleWJvYXJkU3RyZWFtcygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2luaXRpYWxpemVLZXlib2FyZFN0cmVhbXMoKSB7XG4gICAgdGhpcy5rZXlkb3duJCA9IGZyb21FdmVudDxLZXlib2FyZEV2ZW50Pih3aW5kb3csICdrZXlkb3duJykucGlwZShzaGFyZSgpKTtcbiAgICB0aGlzLmtleXVwJCA9IGZyb21FdmVudDxLZXlib2FyZEV2ZW50Pih3aW5kb3csICdrZXl1cCcpLnBpcGUoc2hhcmUoKSk7XG5cbiAgICAvLyBkaXN0aW5jdEtleUV2ZW50cyBpcyB1c2VkIHRvIHByZXZlbnQgbXVsdGlwbGUga2V5IGV2ZW50cyB0byBiZSBmaXJlZCByZXBlYXRlZGx5XG4gICAgLy8gb24gV2luZG93cyB3aGVuIGEga2V5IGlzIGJlaW5nIHByZXNzZWRcblxuICAgIHRoaXMuZGlzdGluY3RLZXlkb3duJCA9IHRoaXMua2V5ZG93biQucGlwZShcbiAgICAgIGRpc3RpbmN0S2V5RXZlbnRzKCksXG4gICAgICBzaGFyZSgpXG4gICAgKTtcblxuICAgIHRoaXMuZGlzdGluY3RLZXl1cCQgPSB0aGlzLmtleXVwJC5waXBlKFxuICAgICAgZGlzdGluY3RLZXlFdmVudHMoKSxcbiAgICAgIHNoYXJlKClcbiAgICApO1xuXG4gICAgdGhpcy5tb3VzZXVwJCA9IGZyb21FdmVudDxNb3VzZUV2ZW50Pih3aW5kb3csICdtb3VzZXVwJykucGlwZShzaGFyZSgpKTtcbiAgICB0aGlzLm1vdXNlbW92ZSQgPSBmcm9tRXZlbnQ8TW91c2VFdmVudD4od2luZG93LCAnbW91c2Vtb3ZlJykucGlwZShzaGFyZSgpKTtcbiAgfVxufVxuIl19