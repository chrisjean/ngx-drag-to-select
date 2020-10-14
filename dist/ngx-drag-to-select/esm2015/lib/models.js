/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
const UpdateActions = {
    Add: 0,
    Remove: 1,
};
export { UpdateActions };
UpdateActions[UpdateActions.Add] = 'Add';
UpdateActions[UpdateActions.Remove] = 'Remove';
/**
 * @record
 */
export function UpdateAction() { }
if (false) {
    /** @type {?} */
    UpdateAction.prototype.type;
    /** @type {?} */
    UpdateAction.prototype.item;
}
/**
 * @record
 * @template T
 */
export function ObservableProxy() { }
if (false) {
    /** @type {?} */
    ObservableProxy.prototype.proxy$;
    /** @type {?} */
    ObservableProxy.prototype.proxy;
}
/**
 * @record
 */
export function SelectContainerHost() { }
if (false) {
    /** @type {?} */
    SelectContainerHost.prototype.boundingClientRect;
}
/**
 * @record
 */
export function Shortcuts() { }
if (false) {
    /** @type {?} */
    Shortcuts.prototype.moveRangeStart;
    /** @type {?} */
    Shortcuts.prototype.disableSelection;
    /** @type {?} */
    Shortcuts.prototype.toggleSingleItem;
    /** @type {?} */
    Shortcuts.prototype.addToSelection;
    /** @type {?} */
    Shortcuts.prototype.removeFromSelection;
}
/**
 * @record
 */
export function DragToSelectConfig() { }
if (false) {
    /** @type {?} */
    DragToSelectConfig.prototype.selectedClass;
    /** @type {?} */
    DragToSelectConfig.prototype.shortcuts;
}
/**
 * @record
 */
export function MousePosition() { }
if (false) {
    /** @type {?} */
    MousePosition.prototype.x;
    /** @type {?} */
    MousePosition.prototype.y;
}
/**
 * @record
 */
export function BoundingBox() { }
if (false) {
    /** @type {?} */
    BoundingBox.prototype.top;
    /** @type {?} */
    BoundingBox.prototype.left;
    /** @type {?} */
    BoundingBox.prototype.width;
    /** @type {?} */
    BoundingBox.prototype.height;
}
/**
 * @record
 * @template T
 */
export function SelectBox() { }
if (false) {
    /** @type {?} */
    SelectBox.prototype.top;
    /** @type {?} */
    SelectBox.prototype.left;
    /** @type {?} */
    SelectBox.prototype.width;
    /** @type {?} */
    SelectBox.prototype.height;
    /** @type {?} */
    SelectBox.prototype.opacity;
}
/** @enum {number} */
const Action = {
    Add: 0,
    Delete: 1,
    None: 2,
};
export { Action };
Action[Action.Add] = 'Add';
Action[Action.Delete] = 'Delete';
Action[Action.None] = 'None';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRyYWctdG8tc2VsZWN0LyIsInNvdXJjZXMiOlsibGliL21vZGVscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7SUFNRSxNQUFHO0lBQ0gsU0FBTTs7Ozs7Ozs7QUFHUixrQ0FHQzs7O0lBRkMsNEJBQW9COztJQUNwQiw0QkFBMEI7Ozs7OztBQUc1QixxQ0FHQzs7O0lBRkMsaUNBQXdCOztJQUN4QixnQ0FBUzs7Ozs7QUFHWCx5Q0FFQzs7O0lBREMsaURBQWdDOzs7OztBQUdsQywrQkFNQzs7O0lBTEMsbUNBQXVCOztJQUN2QixxQ0FBeUI7O0lBQ3pCLHFDQUF5Qjs7SUFDekIsbUNBQXVCOztJQUN2Qix3Q0FBNEI7Ozs7O0FBRzlCLHdDQUdDOzs7SUFGQywyQ0FBc0I7O0lBQ3RCLHVDQUE4Qjs7Ozs7QUFHaEMsbUNBR0M7OztJQUZDLDBCQUFVOztJQUNWLDBCQUFVOzs7OztBQUdaLGlDQUtDOzs7SUFKQywwQkFBWTs7SUFDWiwyQkFBYTs7SUFDYiw0QkFBYzs7SUFDZCw2QkFBZTs7Ozs7O0FBS2pCLCtCQU1DOzs7SUFMQyx3QkFBTzs7SUFDUCx5QkFBUTs7SUFDUiwwQkFBUzs7SUFDVCwyQkFBVTs7SUFDViw0QkFBZ0I7Ozs7SUFJaEIsTUFBRztJQUNILFNBQU07SUFDTixPQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU2VsZWN0SXRlbURpcmVjdGl2ZSB9IGZyb20gJy4vc2VsZWN0LWl0ZW0uZGlyZWN0aXZlJztcblxuZXhwb3J0IHR5cGUgUHJlZGljYXRlRm48VD4gPSAoaXRlbTogVCkgPT4gYm9vbGVhbjtcblxuZXhwb3J0IGVudW0gVXBkYXRlQWN0aW9ucyB7XG4gIEFkZCxcbiAgUmVtb3ZlXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXBkYXRlQWN0aW9uIHtcbiAgdHlwZTogVXBkYXRlQWN0aW9ucztcbiAgaXRlbTogU2VsZWN0SXRlbURpcmVjdGl2ZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBPYnNlcnZhYmxlUHJveHk8VD4ge1xuICBwcm94eSQ6IE9ic2VydmFibGU8YW55PjtcbiAgcHJveHk6IFQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2VsZWN0Q29udGFpbmVySG9zdCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgYm91bmRpbmdDbGllbnRSZWN0OiBCb3VuZGluZ0JveDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTaG9ydGN1dHMge1xuICBtb3ZlUmFuZ2VTdGFydDogc3RyaW5nO1xuICBkaXNhYmxlU2VsZWN0aW9uOiBzdHJpbmc7XG4gIHRvZ2dsZVNpbmdsZUl0ZW06IHN0cmluZztcbiAgYWRkVG9TZWxlY3Rpb246IHN0cmluZztcbiAgcmVtb3ZlRnJvbVNlbGVjdGlvbjogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERyYWdUb1NlbGVjdENvbmZpZyB7XG4gIHNlbGVjdGVkQ2xhc3M6IHN0cmluZztcbiAgc2hvcnRjdXRzOiBQYXJ0aWFsPFNob3J0Y3V0cz47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTW91c2VQb3NpdGlvbiB7XG4gIHg6IG51bWJlcjtcbiAgeTogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEJvdW5kaW5nQm94IHtcbiAgdG9wOiBudW1iZXI7XG4gIGxlZnQ6IG51bWJlcjtcbiAgd2lkdGg6IG51bWJlcjtcbiAgaGVpZ2h0OiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIFNlbGVjdEJveElucHV0ID0gW01vdXNlRXZlbnQsIG51bWJlciwgTW91c2VQb3NpdGlvbl07XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2VsZWN0Qm94PFQ+IHtcbiAgdG9wOiBUO1xuICBsZWZ0OiBUO1xuICB3aWR0aDogVDtcbiAgaGVpZ2h0OiBUO1xuICBvcGFjaXR5OiBudW1iZXI7XG59XG5cbmV4cG9ydCBlbnVtIEFjdGlvbiB7XG4gIEFkZCxcbiAgRGVsZXRlLFxuICBOb25lXG59XG4iXX0=