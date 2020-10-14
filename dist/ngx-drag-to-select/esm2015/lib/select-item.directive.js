/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, Inject, Input, PLATFORM_ID, Renderer2, HostBinding } from '@angular/core';
import { CONFIG } from './tokens';
import { calculateBoundingClientRect } from './utils';
/** @type {?} */
export const SELECT_ITEM_INSTANCE = Symbol();
export class SelectItemDirective {
    /**
     * @param {?} config
     * @param {?} platformId
     * @param {?} host
     * @param {?} renderer
     */
    constructor(config, platformId, host, renderer) {
        this.config = config;
        this.platformId = platformId;
        this.host = host;
        this.renderer = renderer;
        this.selected = false;
        this.rangeStart = false;
    }
    /**
     * @return {?}
     */
    get value() {
        return this.dtsSelectItem ? this.dtsSelectItem : this;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.nativeElememnt[SELECT_ITEM_INSTANCE] = this;
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        this.applySelectedClass();
    }
    /**
     * @return {?}
     */
    toggleRangeStart() {
        this.rangeStart = !this.rangeStart;
    }
    /**
     * @return {?}
     */
    get nativeElememnt() {
        return this.host.nativeElement;
    }
    /**
     * @return {?}
     */
    getBoundingClientRect() {
        if (isPlatformBrowser(this.platformId) && !this._boundingClientRect) {
            this.calculateBoundingClientRect();
        }
        return this._boundingClientRect;
    }
    /**
     * @return {?}
     */
    calculateBoundingClientRect() {
        /** @type {?} */
        const boundingBox = calculateBoundingClientRect(this.host.nativeElement);
        this._boundingClientRect = boundingBox;
        return boundingBox;
    }
    /**
     * @return {?}
     */
    _select() {
        this.selected = true;
    }
    /**
     * @return {?}
     */
    _deselect() {
        this.selected = false;
    }
    /**
     * @private
     * @return {?}
     */
    applySelectedClass() {
        if (this.selected) {
            this.renderer.addClass(this.host.nativeElement, this.config.selectedClass);
        }
        else {
            this.renderer.removeClass(this.host.nativeElement, this.config.selectedClass);
        }
    }
}
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
SelectItemDirective.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [CONFIG,] }] },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: ElementRef },
    { type: Renderer2 }
];
SelectItemDirective.propDecorators = {
    rangeStart: [{ type: HostBinding, args: ['class.dts-range-start',] }],
    dtsSelectItem: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWl0ZW0uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRyYWctdG8tc2VsZWN0LyIsInNvdXJjZXMiOlsibGliL3NlbGVjdC1pdGVtLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFcEQsT0FBTyxFQUNMLFNBQVMsRUFFVCxVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFDTCxXQUFXLEVBQ1gsU0FBUyxFQUVULFdBQVcsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7QUFFdEQsTUFBTSxPQUFPLG9CQUFvQixHQUFHLE1BQU0sRUFBRTtBQVM1QyxNQUFNLE9BQU8sbUJBQW1COzs7Ozs7O0lBYTlCLFlBQzBCLE1BQTBCLEVBQ3JCLFVBQWtCLEVBQ3ZDLElBQWdCLEVBQ2hCLFFBQW1CO1FBSEgsV0FBTSxHQUFOLE1BQU0sQ0FBb0I7UUFDckIsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUN2QyxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFkN0IsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUVxQixlQUFVLEdBQUcsS0FBSyxDQUFDO0lBYXRELENBQUM7Ozs7SUFUSixJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUN4RCxDQUFDOzs7O0lBU0QsUUFBUTtRQUNOLElBQUksQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDbkQsQ0FBQzs7OztJQUVELFNBQVM7UUFDUCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM1QixDQUFDOzs7O0lBRUQsZ0JBQWdCO1FBQ2QsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDckMsQ0FBQzs7OztJQUVELElBQUksY0FBYztRQUNoQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQ2pDLENBQUM7Ozs7SUFFRCxxQkFBcUI7UUFDbkIsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUU7WUFDbkUsSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7U0FDcEM7UUFDRCxPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztJQUNsQyxDQUFDOzs7O0lBRUQsMkJBQTJCOztjQUNuQixXQUFXLEdBQUcsMkJBQTJCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDeEUsSUFBSSxDQUFDLG1CQUFtQixHQUFHLFdBQVcsQ0FBQztRQUN2QyxPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDOzs7O0lBRUQsT0FBTztRQUNMLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ3ZCLENBQUM7Ozs7SUFFRCxTQUFTO1FBQ1AsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQzs7Ozs7SUFFTyxrQkFBa0I7UUFDeEIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDNUU7YUFBTTtZQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDL0U7SUFDSCxDQUFDOzs7WUF0RUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLFFBQVEsRUFBRSxlQUFlO2dCQUN6QixJQUFJLEVBQUU7b0JBQ0osS0FBSyxFQUFFLGlCQUFpQjtpQkFDekI7YUFDRjs7Ozs0Q0FlSSxNQUFNLFNBQUMsTUFBTTtZQUMyQixNQUFNLHVCQUE5QyxNQUFNLFNBQUMsV0FBVztZQXJDckIsVUFBVTtZQUlWLFNBQVM7Ozt5QkF1QlIsV0FBVyxTQUFDLHVCQUF1Qjs0QkFFbkMsS0FBSzs7Ozs7OztJQU5OLGtEQUFxRDs7SUFFckQsdUNBQWlCOztJQUVqQix5Q0FBeUQ7O0lBRXpELDRDQUF3Qzs7Ozs7SUFPdEMscUNBQWtEOzs7OztJQUNsRCx5Q0FBK0M7Ozs7O0lBQy9DLG1DQUF3Qjs7Ozs7SUFDeEIsdUNBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIERvQ2hlY2ssXG4gIEVsZW1lbnRSZWYsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIFBMQVRGT1JNX0lELFxuICBSZW5kZXJlcjIsXG4gIE9uSW5pdCxcbiAgSG9zdEJpbmRpbmdcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERyYWdUb1NlbGVjdENvbmZpZywgQm91bmRpbmdCb3ggfSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQgeyBDT05GSUcgfSBmcm9tICcuL3Rva2Vucyc7XG5pbXBvcnQgeyBjYWxjdWxhdGVCb3VuZGluZ0NsaWVudFJlY3QgfSBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IGNvbnN0IFNFTEVDVF9JVEVNX0lOU1RBTkNFID0gU3ltYm9sKCk7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tkdHNTZWxlY3RJdGVtXScsXG4gIGV4cG9ydEFzOiAnZHRzU2VsZWN0SXRlbScsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ2R0cy1zZWxlY3QtaXRlbSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3RJdGVtRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBEb0NoZWNrIHtcbiAgcHJpdmF0ZSBfYm91bmRpbmdDbGllbnRSZWN0OiBCb3VuZGluZ0JveCB8IHVuZGVmaW5lZDtcblxuICBzZWxlY3RlZCA9IGZhbHNlO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZHRzLXJhbmdlLXN0YXJ0JykgcmFuZ2VTdGFydCA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIGR0c1NlbGVjdEl0ZW06IGFueSB8IHVuZGVmaW5lZDtcblxuICBnZXQgdmFsdWUoKTogU2VsZWN0SXRlbURpcmVjdGl2ZSB8IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuZHRzU2VsZWN0SXRlbSA/IHRoaXMuZHRzU2VsZWN0SXRlbSA6IHRoaXM7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KENPTkZJRykgcHJpdmF0ZSBjb25maWc6IERyYWdUb1NlbGVjdENvbmZpZyxcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCxcbiAgICBwcml2YXRlIGhvc3Q6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyXG4gICkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm5hdGl2ZUVsZW1lbW50W1NFTEVDVF9JVEVNX0lOU1RBTkNFXSA9IHRoaXM7XG4gIH1cblxuICBuZ0RvQ2hlY2soKSB7XG4gICAgdGhpcy5hcHBseVNlbGVjdGVkQ2xhc3MoKTtcbiAgfVxuXG4gIHRvZ2dsZVJhbmdlU3RhcnQoKSB7XG4gICAgdGhpcy5yYW5nZVN0YXJ0ID0gIXRoaXMucmFuZ2VTdGFydDtcbiAgfVxuXG4gIGdldCBuYXRpdmVFbGVtZW1udCgpIHtcbiAgICByZXR1cm4gdGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBnZXRCb3VuZGluZ0NsaWVudFJlY3QoKSB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkgJiYgIXRoaXMuX2JvdW5kaW5nQ2xpZW50UmVjdCkge1xuICAgICAgdGhpcy5jYWxjdWxhdGVCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2JvdW5kaW5nQ2xpZW50UmVjdDtcbiAgfVxuXG4gIGNhbGN1bGF0ZUJvdW5kaW5nQ2xpZW50UmVjdCgpIHtcbiAgICBjb25zdCBib3VuZGluZ0JveCA9IGNhbGN1bGF0ZUJvdW5kaW5nQ2xpZW50UmVjdCh0aGlzLmhvc3QubmF0aXZlRWxlbWVudCk7XG4gICAgdGhpcy5fYm91bmRpbmdDbGllbnRSZWN0ID0gYm91bmRpbmdCb3g7XG4gICAgcmV0dXJuIGJvdW5kaW5nQm94O1xuICB9XG5cbiAgX3NlbGVjdCgpIHtcbiAgICB0aGlzLnNlbGVjdGVkID0gdHJ1ZTtcbiAgfVxuXG4gIF9kZXNlbGVjdCgpIHtcbiAgICB0aGlzLnNlbGVjdGVkID0gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIGFwcGx5U2VsZWN0ZWRDbGFzcygpIHtcbiAgICBpZiAodGhpcy5zZWxlY3RlZCkge1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmhvc3QubmF0aXZlRWxlbWVudCwgdGhpcy5jb25maWcuc2VsZWN0ZWRDbGFzcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQsIHRoaXMuY29uZmlnLnNlbGVjdGVkQ2xhc3MpO1xuICAgIH1cbiAgfVxufVxuIl19