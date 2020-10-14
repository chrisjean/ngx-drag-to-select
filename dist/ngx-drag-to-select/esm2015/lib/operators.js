/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { distinctUntilChanged, filter, map, withLatestFrom } from 'rxjs/operators';
import { getRelativeMousePosition, hasMinimumSize } from './utils';
/** @type {?} */
export const createSelectBox = (/**
 * @param {?} container
 * @return {?}
 */
(container) => (/**
 * @param {?} source
 * @return {?}
 */
(source) => source.pipe(map((/**
 * @param {?} __0
 * @return {?}
 */
([event, opacity, { x, y }]) => {
    // Type annotation is required here, because `getRelativeMousePosition` returns a `MousePosition`,
    // the TS compiler cannot figure out the shape of this type.
    /** @type {?} */
    const mousePosition = getRelativeMousePosition(event, container);
    /** @type {?} */
    const width = opacity > 0 ? mousePosition.x - x : 0;
    /** @type {?} */
    const height = opacity > 0 ? mousePosition.y - y : 0;
    return {
        top: height < 0 ? mousePosition.y : y,
        left: width < 0 ? mousePosition.x : x,
        width: Math.abs(width),
        height: Math.abs(height),
        opacity
    };
})))));
/** @type {?} */
export const whenSelectBoxVisible = (/**
 * @param {?} selectBox$
 * @return {?}
 */
(selectBox$) => (/**
 * @param {?} source
 * @return {?}
 */
(source) => source.pipe(withLatestFrom(selectBox$), filter((/**
 * @param {?} __0
 * @return {?}
 */
([, selectBox]) => hasMinimumSize(selectBox, 0, 0))), map((/**
 * @param {?} __0
 * @return {?}
 */
([event, _]) => event)))));
/** @type {?} */
export const distinctKeyEvents = (/**
 * @return {?}
 */
() => (/**
 * @param {?} source
 * @return {?}
 */
(source) => source.pipe(distinctUntilChanged((/**
 * @param {?} prev
 * @param {?} curr
 * @return {?}
 */
(prev, curr) => {
    return prev && curr && prev.code === curr.code;
})))));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BlcmF0b3JzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRyYWctdG8tc2VsZWN0LyIsInNvdXJjZXMiOlsibGliL29wZXJhdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFbkYsT0FBTyxFQUFFLHdCQUF3QixFQUFFLGNBQWMsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7QUFFbkUsTUFBTSxPQUFPLGVBQWU7Ozs7QUFBRyxDQUFDLFNBQThCLEVBQUUsRUFBRTs7OztBQUFDLENBQ2pFLE1BQWtDLEVBQ0gsRUFBRSxDQUNqQyxNQUFNLENBQUMsSUFBSSxDQUNULEdBQUc7Ozs7QUFBQyxDQUFDLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Ozs7VUFHM0IsYUFBYSxHQUFrQix3QkFBd0IsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDOztVQUV6RSxLQUFLLEdBQUcsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O1VBQzdDLE1BQU0sR0FBRyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVwRCxPQUFPO1FBQ0wsR0FBRyxFQUFFLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckMsSUFBSSxFQUFFLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckMsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO1FBQ3RCLE1BQU0sRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUN4QixPQUFPO0tBQ1IsQ0FBQztBQUNKLENBQUMsRUFBQyxDQUNILENBQUEsQ0FBQTs7QUFFSCxNQUFNLE9BQU8sb0JBQW9COzs7O0FBQUcsQ0FBQyxVQUF5QyxFQUFFLEVBQUU7Ozs7QUFBQyxDQUFDLE1BQXlCLEVBQUUsRUFBRSxDQUMvRyxNQUFNLENBQUMsSUFBSSxDQUNULGNBQWMsQ0FBQyxVQUFVLENBQUMsRUFDMUIsTUFBTTs7OztBQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxFQUMxRCxHQUFHOzs7O0FBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFDLENBQzNCLENBQUEsQ0FBQTs7QUFFSCxNQUFNLE9BQU8saUJBQWlCOzs7QUFBRyxHQUFHLEVBQUU7Ozs7QUFBQyxDQUFDLE1BQWlDLEVBQUUsRUFBRSxDQUMzRSxNQUFNLENBQUMsSUFBSSxDQUNULG9CQUFvQjs7Ozs7QUFBQyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUNsQyxPQUFPLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDO0FBQ2pELENBQUMsRUFBQyxDQUNILENBQUEsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBmaWx0ZXIsIG1hcCwgd2l0aExhdGVzdEZyb20gfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBNb3VzZVBvc2l0aW9uLCBTZWxlY3RCb3gsIFNlbGVjdEJveElucHV0LCBTZWxlY3RDb250YWluZXJIb3N0IH0gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHsgZ2V0UmVsYXRpdmVNb3VzZVBvc2l0aW9uLCBoYXNNaW5pbXVtU2l6ZSB9IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlU2VsZWN0Qm94ID0gKGNvbnRhaW5lcjogU2VsZWN0Q29udGFpbmVySG9zdCkgPT4gKFxuICBzb3VyY2U6IE9ic2VydmFibGU8U2VsZWN0Qm94SW5wdXQ+XG4pOiBPYnNlcnZhYmxlPFNlbGVjdEJveDxudW1iZXI+PiA9PlxuICBzb3VyY2UucGlwZShcbiAgICBtYXAoKFtldmVudCwgb3BhY2l0eSwgeyB4LCB5IH1dKSA9PiB7XG4gICAgICAvLyBUeXBlIGFubm90YXRpb24gaXMgcmVxdWlyZWQgaGVyZSwgYmVjYXVzZSBgZ2V0UmVsYXRpdmVNb3VzZVBvc2l0aW9uYCByZXR1cm5zIGEgYE1vdXNlUG9zaXRpb25gLFxuICAgICAgLy8gdGhlIFRTIGNvbXBpbGVyIGNhbm5vdCBmaWd1cmUgb3V0IHRoZSBzaGFwZSBvZiB0aGlzIHR5cGUuXG4gICAgICBjb25zdCBtb3VzZVBvc2l0aW9uOiBNb3VzZVBvc2l0aW9uID0gZ2V0UmVsYXRpdmVNb3VzZVBvc2l0aW9uKGV2ZW50LCBjb250YWluZXIpO1xuXG4gICAgICBjb25zdCB3aWR0aCA9IG9wYWNpdHkgPiAwID8gbW91c2VQb3NpdGlvbi54IC0geCA6IDA7XG4gICAgICBjb25zdCBoZWlnaHQgPSBvcGFjaXR5ID4gMCA/IG1vdXNlUG9zaXRpb24ueSAtIHkgOiAwO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICB0b3A6IGhlaWdodCA8IDAgPyBtb3VzZVBvc2l0aW9uLnkgOiB5LFxuICAgICAgICBsZWZ0OiB3aWR0aCA8IDAgPyBtb3VzZVBvc2l0aW9uLnggOiB4LFxuICAgICAgICB3aWR0aDogTWF0aC5hYnMod2lkdGgpLFxuICAgICAgICBoZWlnaHQ6IE1hdGguYWJzKGhlaWdodCksXG4gICAgICAgIG9wYWNpdHlcbiAgICAgIH07XG4gICAgfSlcbiAgKTtcblxuZXhwb3J0IGNvbnN0IHdoZW5TZWxlY3RCb3hWaXNpYmxlID0gKHNlbGVjdEJveCQ6IE9ic2VydmFibGU8U2VsZWN0Qm94PG51bWJlcj4+KSA9PiAoc291cmNlOiBPYnNlcnZhYmxlPEV2ZW50PikgPT5cbiAgc291cmNlLnBpcGUoXG4gICAgd2l0aExhdGVzdEZyb20oc2VsZWN0Qm94JCksXG4gICAgZmlsdGVyKChbLCBzZWxlY3RCb3hdKSA9PiBoYXNNaW5pbXVtU2l6ZShzZWxlY3RCb3gsIDAsIDApKSxcbiAgICBtYXAoKFtldmVudCwgX10pID0+IGV2ZW50KVxuICApO1xuXG5leHBvcnQgY29uc3QgZGlzdGluY3RLZXlFdmVudHMgPSAoKSA9PiAoc291cmNlOiBPYnNlcnZhYmxlPEtleWJvYXJkRXZlbnQ+KSA9PlxuICBzb3VyY2UucGlwZShcbiAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgocHJldiwgY3VycikgPT4ge1xuICAgICAgcmV0dXJuIHByZXYgJiYgY3VyciAmJiBwcmV2LmNvZGUgPT09IGN1cnIuY29kZTtcbiAgICB9KVxuICApO1xuIl19