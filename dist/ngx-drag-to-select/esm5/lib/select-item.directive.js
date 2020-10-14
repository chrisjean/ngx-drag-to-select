/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, Inject, Input, PLATFORM_ID, Renderer2, HostBinding } from '@angular/core';
import { CONFIG } from './tokens';
import { calculateBoundingClientRect } from './utils';
/** @type {?} */
export var SELECT_ITEM_INSTANCE = Symbol();
var SelectItemDirective = /** @class */ (function () {
    function SelectItemDirective(config, platformId, host, renderer) {
        this.config = config;
        this.platformId = platformId;
        this.host = host;
        this.renderer = renderer;
        this.selected = false;
        this.rangeStart = false;
    }
    Object.defineProperty(SelectItemDirective.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this.dtsSelectItem ? this.dtsSelectItem : this;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SelectItemDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.nativeElememnt[SELECT_ITEM_INSTANCE] = this;
    };
    /**
     * @return {?}
     */
    SelectItemDirective.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        this.applySelectedClass();
    };
    /**
     * @return {?}
     */
    SelectItemDirective.prototype.toggleRangeStart = /**
     * @return {?}
     */
    function () {
        this.rangeStart = !this.rangeStart;
    };
    Object.defineProperty(SelectItemDirective.prototype, "nativeElememnt", {
        get: /**
         * @return {?}
         */
        function () {
            return this.host.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SelectItemDirective.prototype.getBoundingClientRect = /**
     * @return {?}
     */
    function () {
        if (isPlatformBrowser(this.platformId) && !this._boundingClientRect) {
            this.calculateBoundingClientRect();
        }
        return this._boundingClientRect;
    };
    /**
     * @return {?}
     */
    SelectItemDirective.prototype.calculateBoundingClientRect = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var boundingBox = calculateBoundingClientRect(this.host.nativeElement);
        this._boundingClientRect = boundingBox;
        return boundingBox;
    };
    /**
     * @return {?}
     */
    SelectItemDirective.prototype._select = /**
     * @return {?}
     */
    function () {
        this.selected = true;
    };
    /**
     * @return {?}
     */
    SelectItemDirective.prototype._deselect = /**
     * @return {?}
     */
    function () {
        this.selected = false;
    };
    /**
     * @private
     * @return {?}
     */
    SelectItemDirective.prototype.applySelectedClass = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.selected) {
            this.renderer.addClass(this.host.nativeElement, this.config.selectedClass);
        }
        else {
            this.renderer.removeClass(this.host.nativeElement, this.config.selectedClass);
        }
    };
    SelectItemDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[dtsSelectItem]',
                    exportAs: 'dtsSelectItem',
                    host: {
                        class: 'dts-select-item'
                    }
                },] }
    ];
    /** @nocollapse */
    SelectItemDirective.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [CONFIG,] }] },
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    SelectItemDirective.propDecorators = {
        rangeStart: [{ type: HostBinding, args: ['class.dts-range-start',] }],
        dtsSelectItem: [{ type: Input }]
    };
    return SelectItemDirective;
}());
export { SelectItemDirective };
if (false) {
    /**
     * @type {?}
     * @private
     */
    SelectItemDirective.prototype._boundingClientRect;
    /** @type {?} */
    SelectItemDirective.prototype.selected;
    /** @type {?} */
    SelectItemDirective.prototype.rangeStart;
    /** @type {?} */
    SelectItemDirective.prototype.dtsSelectItem;
    /**
     * @type {?}
     * @private
     */
    SelectItemDirective.prototype.config;
    /**
     * @type {?}
     * @private
     */
    SelectItemDirective.prototype.platformId;
    /**
     * @type {?}
     * @private
     */
    SelectItemDirective.prototype.host;
    /**
     * @type {?}
     * @private
     */
    SelectItemDirective.prototype.renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWl0ZW0uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRyYWctdG8tc2VsZWN0LyIsInNvdXJjZXMiOlsibGliL3NlbGVjdC1pdGVtLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFcEQsT0FBTyxFQUNMLFNBQVMsRUFFVCxVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFDTCxXQUFXLEVBQ1gsU0FBUyxFQUVULFdBQVcsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7QUFFdEQsTUFBTSxLQUFPLG9CQUFvQixHQUFHLE1BQU0sRUFBRTtBQUU1QztJQW9CRSw2QkFDMEIsTUFBMEIsRUFDckIsVUFBa0IsRUFDdkMsSUFBZ0IsRUFDaEIsUUFBbUI7UUFISCxXQUFNLEdBQU4sTUFBTSxDQUFvQjtRQUNyQixlQUFVLEdBQVYsVUFBVSxDQUFRO1FBQ3ZDLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQWQ3QixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBRXFCLGVBQVUsR0FBRyxLQUFLLENBQUM7SUFhdEQsQ0FBQztJQVRKLHNCQUFJLHNDQUFLOzs7O1FBQVQ7WUFDRSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUN4RCxDQUFDOzs7T0FBQTs7OztJQVNELHNDQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDbkQsQ0FBQzs7OztJQUVELHVDQUFTOzs7SUFBVDtRQUNFLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzVCLENBQUM7Ozs7SUFFRCw4Q0FBZ0I7OztJQUFoQjtRQUNFLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3JDLENBQUM7SUFFRCxzQkFBSSwrQ0FBYzs7OztRQUFsQjtZQUNFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDakMsQ0FBQzs7O09BQUE7Ozs7SUFFRCxtREFBcUI7OztJQUFyQjtRQUNFLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFO1lBQ25FLElBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDO1NBQ3BDO1FBQ0QsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUM7SUFDbEMsQ0FBQzs7OztJQUVELHlEQUEyQjs7O0lBQTNCOztZQUNRLFdBQVcsR0FBRywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUN4RSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsV0FBVyxDQUFDO1FBQ3ZDLE9BQU8sV0FBVyxDQUFDO0lBQ3JCLENBQUM7Ozs7SUFFRCxxQ0FBTzs7O0lBQVA7UUFDRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztJQUN2QixDQUFDOzs7O0lBRUQsdUNBQVM7OztJQUFUO1FBQ0UsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQzs7Ozs7SUFFTyxnREFBa0I7Ozs7SUFBMUI7UUFDRSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUM1RTthQUFNO1lBQ0wsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUMvRTtJQUNILENBQUM7O2dCQXRFRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLElBQUksRUFBRTt3QkFDSixLQUFLLEVBQUUsaUJBQWlCO3FCQUN6QjtpQkFDRjs7OztnREFlSSxNQUFNLFNBQUMsTUFBTTtnQkFDMkIsTUFBTSx1QkFBOUMsTUFBTSxTQUFDLFdBQVc7Z0JBckNyQixVQUFVO2dCQUlWLFNBQVM7Ozs2QkF1QlIsV0FBVyxTQUFDLHVCQUF1QjtnQ0FFbkMsS0FBSzs7SUF5RFIsMEJBQUM7Q0FBQSxBQXZFRCxJQXVFQztTQWhFWSxtQkFBbUI7Ozs7OztJQUM5QixrREFBcUQ7O0lBRXJELHVDQUFpQjs7SUFFakIseUNBQXlEOztJQUV6RCw0Q0FBd0M7Ozs7O0lBT3RDLHFDQUFrRDs7Ozs7SUFDbEQseUNBQStDOzs7OztJQUMvQyxtQ0FBd0I7Ozs7O0lBQ3hCLHVDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBEb0NoZWNrLFxuICBFbGVtZW50UmVmLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBQTEFURk9STV9JRCxcbiAgUmVuZGVyZXIyLFxuICBPbkluaXQsXG4gIEhvc3RCaW5kaW5nXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEcmFnVG9TZWxlY3RDb25maWcsIEJvdW5kaW5nQm94IH0gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHsgQ09ORklHIH0gZnJvbSAnLi90b2tlbnMnO1xuaW1wb3J0IHsgY2FsY3VsYXRlQm91bmRpbmdDbGllbnRSZWN0IH0gZnJvbSAnLi91dGlscyc7XG5cbmV4cG9ydCBjb25zdCBTRUxFQ1RfSVRFTV9JTlNUQU5DRSA9IFN5bWJvbCgpO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbZHRzU2VsZWN0SXRlbV0nLFxuICBleHBvcnRBczogJ2R0c1NlbGVjdEl0ZW0nLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdkdHMtc2VsZWN0LWl0ZW0nXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0SXRlbURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgRG9DaGVjayB7XG4gIHByaXZhdGUgX2JvdW5kaW5nQ2xpZW50UmVjdDogQm91bmRpbmdCb3ggfCB1bmRlZmluZWQ7XG5cbiAgc2VsZWN0ZWQgPSBmYWxzZTtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmR0cy1yYW5nZS1zdGFydCcpIHJhbmdlU3RhcnQgPSBmYWxzZTtcblxuICBASW5wdXQoKSBkdHNTZWxlY3RJdGVtOiBhbnkgfCB1bmRlZmluZWQ7XG5cbiAgZ2V0IHZhbHVlKCk6IFNlbGVjdEl0ZW1EaXJlY3RpdmUgfCBhbnkge1xuICAgIHJldHVybiB0aGlzLmR0c1NlbGVjdEl0ZW0gPyB0aGlzLmR0c1NlbGVjdEl0ZW0gOiB0aGlzO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChDT05GSUcpIHByaXZhdGUgY29uZmlnOiBEcmFnVG9TZWxlY3RDb25maWcsXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgcHJpdmF0ZSBob3N0OiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMlxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5uYXRpdmVFbGVtZW1udFtTRUxFQ1RfSVRFTV9JTlNUQU5DRV0gPSB0aGlzO1xuICB9XG5cbiAgbmdEb0NoZWNrKCkge1xuICAgIHRoaXMuYXBwbHlTZWxlY3RlZENsYXNzKCk7XG4gIH1cblxuICB0b2dnbGVSYW5nZVN0YXJ0KCkge1xuICAgIHRoaXMucmFuZ2VTdGFydCA9ICF0aGlzLnJhbmdlU3RhcnQ7XG4gIH1cblxuICBnZXQgbmF0aXZlRWxlbWVtbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaG9zdC5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpICYmICF0aGlzLl9ib3VuZGluZ0NsaWVudFJlY3QpIHtcbiAgICAgIHRoaXMuY2FsY3VsYXRlQm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9ib3VuZGluZ0NsaWVudFJlY3Q7XG4gIH1cblxuICBjYWxjdWxhdGVCb3VuZGluZ0NsaWVudFJlY3QoKSB7XG4gICAgY29uc3QgYm91bmRpbmdCb3ggPSBjYWxjdWxhdGVCb3VuZGluZ0NsaWVudFJlY3QodGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQpO1xuICAgIHRoaXMuX2JvdW5kaW5nQ2xpZW50UmVjdCA9IGJvdW5kaW5nQm94O1xuICAgIHJldHVybiBib3VuZGluZ0JveDtcbiAgfVxuXG4gIF9zZWxlY3QoKSB7XG4gICAgdGhpcy5zZWxlY3RlZCA9IHRydWU7XG4gIH1cblxuICBfZGVzZWxlY3QoKSB7XG4gICAgdGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBseVNlbGVjdGVkQ2xhc3MoKSB7XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQsIHRoaXMuY29uZmlnLnNlbGVjdGVkQ2xhc3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuaG9zdC5uYXRpdmVFbGVtZW50LCB0aGlzLmNvbmZpZy5zZWxlY3RlZENsYXNzKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==