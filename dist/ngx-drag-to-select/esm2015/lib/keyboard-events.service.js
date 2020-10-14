/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { fromEvent } from 'rxjs';
import { share } from 'rxjs/operators';
import { distinctKeyEvents } from './operators';
export class KeyboardEventsService {
    /**
     * @param {?} platformId
     */
    constructor(platformId) {
        this.platformId = platformId;
        if (isPlatformBrowser(this.platformId)) {
            this._initializeKeyboardStreams();
        }
    }
    /**
     * @private
     * @return {?}
     */
    _initializeKeyboardStreams() {
        this.keydown$ = fromEvent(window, 'keydown').pipe(share());
        this.keyup$ = fromEvent(window, 'keyup').pipe(share());
        // distinctKeyEvents is used to prevent multiple key events to be fired repeatedly
        // on Windows when a key is being pressed
        this.distinctKeydown$ = this.keydown$.pipe(distinctKeyEvents(), share());
        this.distinctKeyup$ = this.keyup$.pipe(distinctKeyEvents(), share());
        this.mouseup$ = fromEvent(window, 'mouseup').pipe(share());
        this.mousemove$ = fromEvent(window, 'mousemove').pipe(share());
    }
}
KeyboardEventsService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
KeyboardEventsService.ctorParameters = () => [
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5Ym9hcmQtZXZlbnRzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZHJhZy10by1zZWxlY3QvIiwic291cmNlcyI6WyJsaWIva2V5Ym9hcmQtZXZlbnRzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRSxPQUFPLEVBQUUsU0FBUyxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFHaEQsTUFBTSxPQUFPLHFCQUFxQjs7OztJQVFoQyxZQUF5QyxVQUFrQjtRQUFsQixlQUFVLEdBQVYsVUFBVSxDQUFRO1FBQ3pELElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3RDLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO1NBQ25DO0lBQ0gsQ0FBQzs7Ozs7SUFFTywwQkFBMEI7UUFDaEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQWdCLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUMxRSxJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBZ0IsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBRXRFLGtGQUFrRjtRQUNsRix5Q0FBeUM7UUFFekMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUN4QyxpQkFBaUIsRUFBRSxFQUNuQixLQUFLLEVBQUUsQ0FDUixDQUFDO1FBRUYsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDcEMsaUJBQWlCLEVBQUUsRUFDbkIsS0FBSyxFQUFFLENBQ1IsQ0FBQztRQUVGLElBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFhLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBYSxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDN0UsQ0FBQzs7O1lBbENGLFVBQVU7Ozs7WUFTNEMsTUFBTSx1QkFBOUMsTUFBTSxTQUFDLFdBQVc7Ozs7SUFQL0IseUNBQW9DOztJQUNwQyx1Q0FBa0M7O0lBQ2xDLGlEQUE0Qzs7SUFDNUMsK0NBQTBDOztJQUMxQyx5Q0FBaUM7O0lBQ2pDLDJDQUFtQzs7Ozs7SUFFdkIsMkNBQStDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzaGFyZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IGRpc3RpbmN0S2V5RXZlbnRzIH0gZnJvbSAnLi9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgS2V5Ym9hcmRFdmVudHNTZXJ2aWNlIHtcbiAga2V5ZG93biQ6IE9ic2VydmFibGU8S2V5Ym9hcmRFdmVudD47XG4gIGtleXVwJDogT2JzZXJ2YWJsZTxLZXlib2FyZEV2ZW50PjtcbiAgZGlzdGluY3RLZXlkb3duJDogT2JzZXJ2YWJsZTxLZXlib2FyZEV2ZW50PjtcbiAgZGlzdGluY3RLZXl1cCQ6IE9ic2VydmFibGU8S2V5Ym9hcmRFdmVudD47XG4gIG1vdXNldXAkOiBPYnNlcnZhYmxlPE1vdXNlRXZlbnQ+O1xuICBtb3VzZW1vdmUkOiBPYnNlcnZhYmxlPE1vdXNlRXZlbnQ+O1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0KSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHRoaXMuX2luaXRpYWxpemVLZXlib2FyZFN0cmVhbXMoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9pbml0aWFsaXplS2V5Ym9hcmRTdHJlYW1zKCkge1xuICAgIHRoaXMua2V5ZG93biQgPSBmcm9tRXZlbnQ8S2V5Ym9hcmRFdmVudD4od2luZG93LCAna2V5ZG93bicpLnBpcGUoc2hhcmUoKSk7XG4gICAgdGhpcy5rZXl1cCQgPSBmcm9tRXZlbnQ8S2V5Ym9hcmRFdmVudD4od2luZG93LCAna2V5dXAnKS5waXBlKHNoYXJlKCkpO1xuXG4gICAgLy8gZGlzdGluY3RLZXlFdmVudHMgaXMgdXNlZCB0byBwcmV2ZW50IG11bHRpcGxlIGtleSBldmVudHMgdG8gYmUgZmlyZWQgcmVwZWF0ZWRseVxuICAgIC8vIG9uIFdpbmRvd3Mgd2hlbiBhIGtleSBpcyBiZWluZyBwcmVzc2VkXG5cbiAgICB0aGlzLmRpc3RpbmN0S2V5ZG93biQgPSB0aGlzLmtleWRvd24kLnBpcGUoXG4gICAgICBkaXN0aW5jdEtleUV2ZW50cygpLFxuICAgICAgc2hhcmUoKVxuICAgICk7XG5cbiAgICB0aGlzLmRpc3RpbmN0S2V5dXAkID0gdGhpcy5rZXl1cCQucGlwZShcbiAgICAgIGRpc3RpbmN0S2V5RXZlbnRzKCksXG4gICAgICBzaGFyZSgpXG4gICAgKTtcblxuICAgIHRoaXMubW91c2V1cCQgPSBmcm9tRXZlbnQ8TW91c2VFdmVudD4od2luZG93LCAnbW91c2V1cCcpLnBpcGUoc2hhcmUoKSk7XG4gICAgdGhpcy5tb3VzZW1vdmUkID0gZnJvbUV2ZW50PE1vdXNlRXZlbnQ+KHdpbmRvdywgJ21vdXNlbW92ZScpLnBpcGUoc2hhcmUoKSk7XG4gIH1cbn1cbiJdfQ==