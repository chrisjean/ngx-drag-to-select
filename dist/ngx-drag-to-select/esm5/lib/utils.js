/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { MIN_HEIGHT, MIN_WIDTH } from './constants';
/** @type {?} */
export var isObject = (/**
 * @param {?} item
 * @return {?}
 */
function (item) {
    return item && typeof item === 'object' && !Array.isArray(item) && item !== null;
});
/**
 * @param {?} target
 * @param {?} source
 * @return {?}
 */
export function mergeDeep(target, source) {
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach((/**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            var _a, _b;
            if (isObject(source[key])) {
                if (!target[key]) {
                    Object.assign(target, (_a = {}, _a[key] = {}, _a));
                }
                mergeDeep(target[key], source[key]);
            }
            else {
                Object.assign(target, (_b = {}, _b[key] = source[key], _b));
            }
        }));
    }
    return target;
}
/** @type {?} */
export var hasMinimumSize = (/**
 * @param {?} selectBox
 * @param {?=} minWidth
 * @param {?=} minHeight
 * @return {?}
 */
function (selectBox, minWidth, minHeight) {
    if (minWidth === void 0) { minWidth = MIN_WIDTH; }
    if (minHeight === void 0) { minHeight = MIN_HEIGHT; }
    return selectBox.width > minWidth || selectBox.height > minHeight;
});
/** @type {?} */
export var clearSelection = (/**
 * @param {?} window
 * @return {?}
 */
function (window) {
    /** @type {?} */
    var selection = window.getSelection();
    if (!selection) {
        return;
    }
    if (selection.removeAllRanges) {
        selection.removeAllRanges();
    }
    else if (selection.empty) {
        selection.empty();
    }
});
/** @type {?} */
export var inBoundingBox = (/**
 * @param {?} point
 * @param {?} box
 * @return {?}
 */
function (point, box) {
    return (box.left <= point.x && point.x <= box.left + box.width && box.top <= point.y && point.y <= box.top + box.height);
});
/** @type {?} */
export var boxIntersects = (/**
 * @param {?} boxA
 * @param {?} boxB
 * @return {?}
 */
function (boxA, boxB) {
    return (boxA.left <= boxB.left + boxB.width &&
        boxA.left + boxA.width >= boxB.left &&
        boxA.top <= boxB.top + boxB.height &&
        boxA.top + boxA.height >= boxB.top);
});
/** @type {?} */
export var calculateBoundingClientRect = (/**
 * @param {?} element
 * @return {?}
 */
function (element) {
    return element.getBoundingClientRect();
});
/** @type {?} */
export var getMousePosition = (/**
 * @param {?} event
 * @return {?}
 */
function (event) {
    return {
        x: event.clientX,
        y: event.clientY
    };
});
/** @type {?} */
export var getScroll = (/**
 * @return {?}
 */
function () {
    if (!document || !document.documentElement) {
        return {
            x: 0,
            y: 0
        };
    }
    return {
        x: document.documentElement.scrollLeft || document.body.scrollLeft,
        y: document.documentElement.scrollTop || document.body.scrollTop
    };
});
/** @type {?} */
export var getRelativeMousePosition = (/**
 * @param {?} event
 * @param {?} container
 * @return {?}
 */
function (event, container) {
    var _a = getMousePosition(event), clientX = _a.x, clientY = _a.y;
    /** @type {?} */
    var scroll = getScroll();
    /** @type {?} */
    var borderSize = (container.boundingClientRect.width - container.clientWidth) / 2;
    /** @type {?} */
    var offsetLeft = container.boundingClientRect.left + scroll.x;
    /** @type {?} */
    var offsetTop = container.boundingClientRect.top + scroll.y;
    return {
        x: clientX - borderSize - (offsetLeft - window.pageXOffset) + container.scrollLeft,
        y: clientY - borderSize - (offsetTop - window.pageYOffset) + container.scrollTop
    };
});
/** @type {?} */
export var cursorWithinElement = (/**
 * @param {?} event
 * @param {?} element
 * @return {?}
 */
function (event, element) {
    /** @type {?} */
    var mousePoint = getMousePosition(event);
    return inBoundingBox(mousePoint, calculateBoundingClientRect(element));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZHJhZy10by1zZWxlY3QvIiwic291cmNlcyI6WyJsaWIvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sYUFBYSxDQUFDOztBQUdwRCxNQUFNLEtBQU8sUUFBUTs7OztBQUFHLFVBQUMsSUFBUztJQUNoQyxPQUFPLElBQUksSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksS0FBSyxJQUFJLENBQUM7QUFDbkYsQ0FBQyxDQUFBOzs7Ozs7QUFFRCxNQUFNLFVBQVUsU0FBUyxDQUFDLE1BQWMsRUFBRSxNQUFjO0lBQ3RELElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUN4QyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU87Ozs7UUFBQyxVQUFBLEdBQUc7O1lBQzdCLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO2dCQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUNoQixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sWUFBSSxHQUFDLEdBQUcsSUFBRyxFQUFFLE1BQUcsQ0FBQztpQkFDdEM7Z0JBQ0QsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUNyQztpQkFBTTtnQkFDTCxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sWUFBSSxHQUFDLEdBQUcsSUFBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQUcsQ0FBQzthQUMvQztRQUNILENBQUMsRUFBQyxDQUFDO0tBQ0o7SUFFRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFD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QWtCLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDOztRQUM3RSxVQUFVLEdBQUcsU0FBUyxDQUFDLGtCQUFrQixDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsQ0FBQzs7UUFDekQsU0FBUyxHQUFHLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUM7SUFFN0QsT0FBTztRQUNMLENBQUMsRUFBRSxPQUFPLEdBQUcsVUFBVSxHQUFHLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxTQUFTLENBQUMsVUFBVTtRQUNsRixDQUFDLEVBQUUsT0FBTyxHQUFHLFVBQVUsR0FBRyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsU0FBUyxDQUFDLFNBQVM7S0FDakYsQ0FBQztBQUNKLENBQUMsQ0FBQTs7QUFFRCxNQUFNLEtBQU8sbUJBQW1COzs7OztBQUFHLFVBQUMsS0FBaUIsRUFBRSxPQUFvQjs7UUFDbkUsVUFBVSxHQUFHLGdCQUFnQixDQUFDLEtBQUssQ0FBQztJQUMxQyxPQUFPLGFBQWEsQ0FBQyxVQUFVLEVBQUUsMkJBQTJCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUN6RSxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNSU5fSEVJR0hULCBNSU5fV0lEVEggfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBCb3VuZGluZ0JveCwgTW91c2VQb3NpdGlvbiwgU2VsZWN0Qm94LCBTZWxlY3RDb250YWluZXJIb3N0IH0gZnJvbSAnLi9tb2RlbHMnO1xuXG5leHBvcnQgY29uc3QgaXNPYmplY3QgPSAoaXRlbTogYW55KSA9PiB7XG4gIHJldHVybiBpdGVtICYmIHR5cGVvZiBpdGVtID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheShpdGVtKSAmJiBpdGVtICE9PSBudWxsO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlRGVlcCh0YXJnZXQ6IE9iamVjdCwgc291cmNlOiBPYmplY3QpIHtcbiAgaWYgKGlzT2JqZWN0KHRhcmdldCkgJiYgaXNPYmplY3Qoc291cmNlKSkge1xuICAgIE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgaWYgKGlzT2JqZWN0KHNvdXJjZVtrZXldKSkge1xuICAgICAgICBpZiAoIXRhcmdldFtrZXldKSB7XG4gICAgICAgICAgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHsgW2tleV06IHt9IH0pO1xuICAgICAgICB9XG4gICAgICAgIG1lcmdlRGVlcCh0YXJnZXRba2V5XSwgc291cmNlW2tleV0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHsgW2tleV06IHNvdXJjZVtrZXldIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuZXhwb3J0IGNvbnN0IGhhc01pbmltdW1TaXplID0gKHNlbGVjdEJveDogU2VsZWN0Qm94PG51bWJlcj4sIG1pbldpZHRoID0gTUlOX1dJRFRILCBtaW5IZWlnaHQgPSBNSU5fSEVJR0hUKSA9PiB7XG4gIHJldHVybiBzZWxlY3RCb3gud2lkdGggPiBtaW5XaWR0aCB8fCBzZWxlY3RCb3guaGVpZ2h0ID4gbWluSGVpZ2h0O1xufTtcblxuZXhwb3J0IGNvbnN0IGNsZWFyU2VsZWN0aW9uID0gKHdpbmRvdzogV2luZG93KSA9PiB7XG4gIGNvbnN0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcblxuICBpZiAoIXNlbGVjdGlvbikge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChzZWxlY3Rpb24ucmVtb3ZlQWxsUmFuZ2VzKSB7XG4gICAgc2VsZWN0aW9uLnJlbW92ZUFsbFJhbmdlcygpO1xuICB9IGVsc2UgaWYgKHNlbGVjdGlvbi5lbXB0eSkge1xuICAgIHNlbGVjdGlvbi5lbXB0eSgpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgaW5Cb3VuZGluZ0JveCA9IChwb2ludDogTW91c2VQb3NpdGlvbiwgYm94OiBCb3VuZGluZ0JveCkgPT4ge1xuICByZXR1cm4gKFxuICAgIGJveC5sZWZ0IDw9IHBvaW50LnggJiYgcG9pbnQueCA8PSBib3gubGVmdCArIGJveC53aWR0aCAmJiBib3gudG9wIDw9IHBvaW50LnkgJiYgcG9pbnQueSA8PSBib3gudG9wICsgYm94LmhlaWdodFxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IGJveEludGVyc2VjdHMgPSAoYm94QTogQm91bmRpbmdCb3gsIGJveEI6IEJvdW5kaW5nQm94KSA9PiB7XG4gIHJldHVybiAoXG4gICAgYm94QS5sZWZ0IDw9IGJveEIubGVmdCArIGJveEIud2lkdGggJiZcbiAgICBib3hBLmxlZnQgKyBib3hBLndpZHRoID49IGJveEIubGVmdCAmJlxuICAgIGJveEEudG9wIDw9IGJveEIudG9wICsgYm94Qi5oZWlnaHQgJiZcbiAgICBib3hBLnRvcCArIGJveEEuaGVpZ2h0ID49IGJveEIudG9wXG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgY2FsY3VsYXRlQm91bmRpbmdDbGllbnRSZWN0ID0gKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogQm91bmRpbmdCb3ggPT4ge1xuICByZXR1cm4gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRNb3VzZVBvc2l0aW9uID0gKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gIHJldHVybiB7XG4gICAgeDogZXZlbnQuY2xpZW50WCxcbiAgICB5OiBldmVudC5jbGllbnRZXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0U2Nyb2xsID0gKCkgPT4ge1xuICBpZiAoIWRvY3VtZW50IHx8ICFkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogMCxcbiAgICAgIHk6IDBcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB4OiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQsXG4gICAgeTogZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcFxuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IGdldFJlbGF0aXZlTW91c2VQb3NpdGlvbiA9IChldmVudDogTW91c2VFdmVudCwgY29udGFpbmVyOiBTZWxlY3RDb250YWluZXJIb3N0KTogTW91c2VQb3NpdGlvbiA9PiB7XG4gIGNvbnN0IHsgeDogY2xpZW50WCwgeTogY2xpZW50WSB9ID0gZ2V0TW91c2VQb3NpdGlvbihldmVudCk7XG4gIGNvbnN0IHNjcm9sbCA9IGdldFNjcm9sbCgpO1xuXG4gIGNvbnN0IGJvcmRlclNpemUgPSAoY29udGFpbmVyLmJvdW5kaW5nQ2xpZW50UmVjdC53aWR0aCAtIGNvbnRhaW5lci5jbGllbnRXaWR0aCkgLyAyO1xuICBjb25zdCBvZmZzZXRMZWZ0ID0gY29udGFpbmVyLmJvdW5kaW5nQ2xpZW50UmVjdC5sZWZ0ICsgc2Nyb2xsLng7XG4gIGNvbnN0IG9mZnNldFRvcCA9IGNvbnRhaW5lci5ib3VuZGluZ0NsaWVudFJlY3QudG9wICsgc2Nyb2xsLnk7XG5cbiAgcmV0dXJuIHtcbiAgICB4OiBjbGllbnRYIC0gYm9yZGVyU2l6ZSAtIChvZmZzZXRMZWZ0IC0gd2luZG93LnBhZ2VYT2Zmc2V0KSArIGNvbnRhaW5lci5zY3JvbGxMZWZ0LFxuICAgIHk6IGNsaWVudFkgLSBib3JkZXJTaXplIC0gKG9mZnNldFRvcCAtIHdpbmRvdy5wYWdlWU9mZnNldCkgKyBjb250YWluZXIuc2Nyb2xsVG9wXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgY3Vyc29yV2l0aGluRWxlbWVudCA9IChldmVudDogTW91c2VFdmVudCwgZWxlbWVudDogSFRNTEVsZW1lbnQpID0+IHtcbiAgY29uc3QgbW91c2VQb2ludCA9IGdldE1vdXNlUG9zaXRpb24oZXZlbnQpO1xuICByZXR1cm4gaW5Cb3VuZGluZ0JveChtb3VzZVBvaW50LCBjYWxjdWxhdGVCb3VuZGluZ0NsaWVudFJlY3QoZWxlbWVudCkpO1xufTtcbiJdfQ==