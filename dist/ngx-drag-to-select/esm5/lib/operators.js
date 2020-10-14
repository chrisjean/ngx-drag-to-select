/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { distinctUntilChanged, filter, map, withLatestFrom } from 'rxjs/operators';
import { getRelativeMousePosition, hasMinimumSize } from './utils';
/** @type {?} */
export var createSelectBox = (/**
 * @param {?} container
 * @return {?}
 */
function (container) { return (/**
 * @param {?} source
 * @return {?}
 */
function (source) {
    return source.pipe(map((/**
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var _b = tslib_1.__read(_a, 3), event = _b[0], opacity = _b[1], _c = _b[2], x = _c.x, y = _c.y;
        // Type annotation is required here, because `getRelativeMousePosition` returns a `MousePosition`,
        // the TS compiler cannot figure out the shape of this type.
        /** @type {?} */
        var mousePosition = getRelativeMousePosition(event, container);
        /** @type {?} */
        var width = opacity > 0 ? mousePosition.x - x : 0;
        /** @type {?} */
        var height = opacity > 0 ? mousePosition.y - y : 0;
        return {
            top: height < 0 ? mousePosition.y : y,
            left: width < 0 ? mousePosition.x : x,
            width: Math.abs(width),
            height: Math.abs(height),
            opacity: opacity
        };
    })));
}); });
/** @type {?} */
export var whenSelectBoxVisible = (/**
 * @param {?} selectBox$
 * @return {?}
 */
function (selectBox$) { return (/**
 * @param {?} source
 * @return {?}
 */
function (source) {
    return source.pipe(withLatestFrom(selectBox$), filter((/**
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var _b = tslib_1.__read(_a, 2), selectBox = _b[1];
        return hasMinimumSize(selectBox, 0, 0);
    })), map((/**
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var _b = tslib_1.__read(_a, 2), event = _b[0], _ = _b[1];
        return event;
    })));
}); });
/** @type {?} */
export var distinctKeyEvents = (/**
 * @return {?}
 */
function () { return (/**
 * @param {?} source
 * @return {?}
 */
function (source) {
    return source.pipe(distinctUntilChanged((/**
     * @param {?} prev
     * @param {?} curr
     * @return {?}
     */
    function (prev, curr) {
        return prev && curr && prev.code === curr.code;
    })));
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BlcmF0b3JzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRyYWctdG8tc2VsZWN0LyIsInNvdXJjZXMiOlsibGliL29wZXJhdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRW5GLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxjQUFjLEVBQUUsTUFBTSxTQUFTLENBQUM7O0FBRW5FLE1BQU0sS0FBTyxlQUFlOzs7O0FBQUcsVUFBQyxTQUE4Qjs7OztBQUFLLFVBQ2pFLE1BQWtDO0lBRWxDLE9BQUEsTUFBTSxDQUFDLElBQUksQ0FDVCxHQUFHOzs7O0lBQUMsVUFBQyxFQUEwQjtZQUExQiwwQkFBMEIsRUFBekIsYUFBSyxFQUFFLGVBQU8sRUFBRSxVQUFRLEVBQU4sUUFBQyxFQUFFLFFBQUM7Ozs7WUFHcEIsYUFBYSxHQUFrQix3QkFBd0IsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDOztZQUV6RSxLQUFLLEdBQUcsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O1lBQzdDLE1BQU0sR0FBRyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVwRCxPQUFPO1lBQ0wsR0FBRyxFQUFFLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckMsSUFBSSxFQUFFLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckMsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO1lBQ3RCLE1BQU0sRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztZQUN4QixPQUFPLFNBQUE7U0FDUixDQUFDO0lBQ0osQ0FBQyxFQUFDLENBQ0g7QUFqQkQsQ0FpQkMsSUFBQSxDQUFBOztBQUVILE1BQU0sS0FBTyxvQkFBb0I7Ozs7QUFBRyxVQUFDLFVBQXlDOzs7O0FBQUssVUFBQyxNQUF5QjtJQUMzRyxPQUFBLE1BQU0sQ0FBQyxJQUFJLENBQ1QsY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUMxQixNQUFNOzs7O0lBQUMsVUFBQyxFQUFhO1lBQWIsMEJBQWEsRUFBVixpQkFBUztRQUFNLE9BQUEsY0FBYyxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQS9CLENBQStCLEVBQUMsRUFDMUQsR0FBRzs7OztJQUFDLFVBQUMsRUFBVTtZQUFWLDBCQUFVLEVBQVQsYUFBSyxFQUFFLFNBQUM7UUFBTSxPQUFBLEtBQUs7SUFBTCxDQUFLLEVBQUMsQ0FDM0I7QUFKRCxDQUlDLElBQUEsQ0FBQTs7QUFFSCxNQUFNLEtBQU8saUJBQWlCOzs7QUFBRzs7OztBQUFNLFVBQUMsTUFBaUM7SUFDdkUsT0FBQSxNQUFNLENBQUMsSUFBSSxDQUNULG9CQUFvQjs7Ozs7SUFBQyxVQUFDLElBQUksRUFBRSxJQUFJO1FBQzlCLE9BQU8sSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDakQsQ0FBQyxFQUFDLENBQ0g7QUFKRCxDQUlDLElBQUEsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBmaWx0ZXIsIG1hcCwgd2l0aExhdGVzdEZyb20gfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBNb3VzZVBvc2l0aW9uLCBTZWxlY3RCb3gsIFNlbGVjdEJveElucHV0LCBTZWxlY3RDb250YWluZXJIb3N0IH0gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHsgZ2V0UmVsYXRpdmVNb3VzZVBvc2l0aW9uLCBoYXNNaW5pbXVtU2l6ZSB9IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlU2VsZWN0Qm94ID0gKGNvbnRhaW5lcjogU2VsZWN0Q29udGFpbmVySG9zdCkgPT4gKFxuICBzb3VyY2U6IE9ic2VydmFibGU8U2VsZWN0Qm94SW5wdXQ+XG4pOiBPYnNlcnZhYmxlPFNlbGVjdEJveDxudW1iZXI+PiA9PlxuICBzb3VyY2UucGlwZShcbiAgICBtYXAoKFtldmVudCwgb3BhY2l0eSwgeyB4LCB5IH1dKSA9PiB7XG4gICAgICAvLyBUeXBlIGFubm90YXRpb24gaXMgcmVxdWlyZWQgaGVyZSwgYmVjYXVzZSBgZ2V0UmVsYXRpdmVNb3VzZVBvc2l0aW9uYCByZXR1cm5zIGEgYE1vdXNlUG9zaXRpb25gLFxuICAgICAgLy8gdGhlIFRTIGNvbXBpbGVyIGNhbm5vdCBmaWd1cmUgb3V0IHRoZSBzaGFwZSBvZiB0aGlzIHR5cGUuXG4gICAgICBjb25zdCBtb3VzZVBvc2l0aW9uOiBNb3VzZVBvc2l0aW9uID0gZ2V0UmVsYXRpdmVNb3VzZVBvc2l0aW9uKGV2ZW50LCBjb250YWluZXIpO1xuXG4gICAgICBjb25zdCB3aWR0aCA9IG9wYWNpdHkgPiAwID8gbW91c2VQb3NpdGlvbi54IC0geCA6IDA7XG4gICAgICBjb25zdCBoZWlnaHQgPSBvcGFjaXR5ID4gMCA/IG1vdXNlUG9zaXRpb24ueSAtIHkgOiAwO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICB0b3A6IGhlaWdodCA8IDAgPyBtb3VzZVBvc2l0aW9uLnkgOiB5LFxuICAgICAgICBsZWZ0OiB3aWR0aCA8IDAgPyBtb3VzZVBvc2l0aW9uLnggOiB4LFxuICAgICAgICB3aWR0aDogTWF0aC5hYnMod2lkdGgpLFxuICAgICAgICBoZWlnaHQ6IE1hdGguYWJzKGhlaWdodCksXG4gICAgICAgIG9wYWNpdHlcbiAgICAgIH07XG4gICAgfSlcbiAgKTtcblxuZXhwb3J0IGNvbnN0IHdoZW5TZWxlY3RCb3hWaXNpYmxlID0gKHNlbGVjdEJveCQ6IE9ic2VydmFibGU8U2VsZWN0Qm94PG51bWJlcj4+KSA9PiAoc291cmNlOiBPYnNlcnZhYmxlPEV2ZW50PikgPT5cbiAgc291cmNlLnBpcGUoXG4gICAgd2l0aExhdGVzdEZyb20oc2VsZWN0Qm94JCksXG4gICAgZmlsdGVyKChbLCBzZWxlY3RCb3hdKSA9PiBoYXNNaW5pbXVtU2l6ZShzZWxlY3RCb3gsIDAsIDApKSxcbiAgICBtYXAoKFtldmVudCwgX10pID0+IGV2ZW50KVxuICApO1xuXG5leHBvcnQgY29uc3QgZGlzdGluY3RLZXlFdmVudHMgPSAoKSA9PiAoc291cmNlOiBPYnNlcnZhYmxlPEtleWJvYXJkRXZlbnQ+KSA9PlxuICBzb3VyY2UucGlwZShcbiAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgocHJldiwgY3VycikgPT4ge1xuICAgICAgcmV0dXJuIHByZXYgJiYgY3VyciAmJiBwcmV2LmNvZGUgPT09IGN1cnIuY29kZTtcbiAgICB9KVxuICApO1xuIl19