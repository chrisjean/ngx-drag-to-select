/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { merge } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { KeyboardEventsService } from './keyboard-events.service';
import { CONFIG } from './tokens';
/** @type {?} */
const SUPPORTED_META_KEYS = {
    alt: true,
    shift: true,
    meta: true,
    ctrl: true
};
/** @type {?} */
const SUPPORTED_KEYS = /[a-z]/;
/** @type {?} */
const META_KEY = 'meta';
/** @type {?} */
const KEY_ALIASES = {
    [META_KEY]: ['ctrl', 'meta']
};
/** @type {?} */
const SUPPORTED_SHORTCUTS = {
    moveRangeStart: true,
    disableSelection: true,
    toggleSingleItem: true,
    addToSelection: true,
    removeFromSelection: true
};
/** @type {?} */
const ERROR_PREFIX = '[ShortcutService]';
/**
 * @record
 */
function KeyState() { }
if (false) {
    /** @type {?} */
    KeyState.prototype.code;
    /** @type {?} */
    KeyState.prototype.pressed;
}
export class ShortcutService {
    /**
     * @param {?} platformId
     * @param {?} config
     * @param {?} keyboardEvents
     */
    constructor(platformId, config, keyboardEvents) {
        this.platformId = platformId;
        this.keyboardEvents = keyboardEvents;
        this._shortcuts = {};
        this._latestShortcut = new Map();
        this._shortcuts = this._createShortcutsFromConfig(config.shortcuts);
        if (isPlatformBrowser(this.platformId)) {
            /** @type {?} */
            const keydown$ = this.keyboardEvents.keydown$.pipe(map((/**
             * @param {?} event
             * @return {?}
             */
            event => ({ code: event.code, pressed: true }))));
            /** @type {?} */
            const keyup$ = this.keyboardEvents.keyup$.pipe(map((/**
             * @param {?} event
             * @return {?}
             */
            event => ({ code: event.code, pressed: false }))));
            merge(keydown$, keyup$)
                .pipe(distinctUntilChanged((/**
             * @param {?} prev
             * @param {?} curr
             * @return {?}
             */
            (prev, curr) => {
                return prev.pressed === curr.pressed && prev.code === curr.code;
            })))
                .subscribe((/**
             * @param {?} keyState
             * @return {?}
             */
            keyState => {
                if (keyState.pressed) {
                    this._latestShortcut.set(keyState.code, true);
                }
                else {
                    this._latestShortcut.delete(keyState.code);
                }
            }));
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    disableSelection(event) {
        return this._isShortcutPressed('disableSelection', event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    moveRangeStart(event) {
        return this._isShortcutPressed('moveRangeStart', event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    toggleSingleItem(event) {
        return this._isShortcutPressed('toggleSingleItem', event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    addToSelection(event) {
        return this._isShortcutPressed('addToSelection', event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    removeFromSelection(event) {
        return this._isShortcutPressed('removeFromSelection', event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    extendedSelectionShortcut(event) {
        return this.addToSelection(event) || this.removeFromSelection(event);
    }
    /**
     * @private
     * @param {?} shortcuts
     * @return {?}
     */
    _createShortcutsFromConfig(shortcuts) {
        /** @type {?} */
        const shortcutMap = {};
        for (const [key, shortcutsForCommand] of Object.entries(shortcuts)) {
            if (!this._isSupportedShortcut(key)) {
                throw new Error(this._getErrorMessage(`Shortcut ${key} not supported`));
            }
            shortcutsForCommand
                .replace(/ /g, '')
                .split(',')
                .forEach((/**
             * @param {?} shortcut
             * @return {?}
             */
            shortcut => {
                if (!shortcutMap[key]) {
                    shortcutMap[key] = [];
                }
                /** @type {?} */
                const combo = shortcut.split('+');
                /** @type {?} */
                const cleanCombos = this._substituteKey(shortcut, combo, META_KEY);
                cleanCombos.forEach((/**
                 * @param {?} cleanCombo
                 * @return {?}
                 */
                cleanCombo => {
                    /** @type {?} */
                    const unsupportedKey = this._isSupportedCombo(cleanCombo);
                    if (unsupportedKey) {
                        throw new Error(this._getErrorMessage(`Key '${unsupportedKey}' in shortcut ${shortcut} not supported`));
                    }
                    shortcutMap[key].push(cleanCombo.map((/**
                     * @param {?} comboKey
                     * @return {?}
                     */
                    comboKey => {
                        return SUPPORTED_META_KEYS[comboKey] ? `${comboKey}Key` : `Key${comboKey.toUpperCase()}`;
                    })));
                }));
            }));
        }
        return shortcutMap;
    }
    /**
     * @private
     * @param {?} shortcut
     * @param {?} combo
     * @param {?} substituteKey
     * @return {?}
     */
    _substituteKey(shortcut, combo, substituteKey) {
        /** @type {?} */
        const hasSpecialKey = shortcut.includes(substituteKey);
        /** @type {?} */
        const substitutedShortcut = [];
        if (hasSpecialKey) {
            /** @type {?} */
            const cleanShortcut = combo.filter((/**
             * @param {?} element
             * @return {?}
             */
            element => element !== META_KEY));
            KEY_ALIASES.meta.forEach((/**
             * @param {?} alias
             * @return {?}
             */
            alias => {
                substitutedShortcut.push([...cleanShortcut, alias]);
            }));
        }
        else {
            substitutedShortcut.push(combo);
        }
        return substitutedShortcut;
    }
    /**
     * @private
     * @param {?} message
     * @return {?}
     */
    _getErrorMessage(message) {
        return `${ERROR_PREFIX} ${message}`;
    }
    /**
     * @private
     * @param {?} shortcutName
     * @param {?} event
     * @return {?}
     */
    _isShortcutPressed(shortcutName, event) {
        /** @type {?} */
        const shortcuts = this._shortcuts[shortcutName];
        return shortcuts.some((/**
         * @param {?} shortcut
         * @return {?}
         */
        shortcut => {
            return shortcut.every((/**
             * @param {?} key
             * @return {?}
             */
            key => this._isKeyPressed(event, key)));
        }));
    }
    /**
     * @private
     * @param {?} event
     * @param {?} key
     * @return {?}
     */
    _isKeyPressed(event, key) {
        return key.startsWith('Key') ? this._latestShortcut.has(key) : event[key];
    }
    /**
     * @private
     * @param {?} combo
     * @return {?}
     */
    _isSupportedCombo(combo) {
        /** @type {?} */
        let unsupportedKey = null;
        combo.forEach((/**
         * @param {?} key
         * @return {?}
         */
        key => {
            if (!SUPPORTED_META_KEYS[key] && (!SUPPORTED_KEYS.test(key) || this._isSingleChar(key))) {
                unsupportedKey = key;
                return;
            }
        }));
        return unsupportedKey;
    }
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    _isSingleChar(key) {
        return key.length > 1;
    }
    /**
     * @private
     * @param {?} shortcut
     * @return {?}
     */
    _isSupportedShortcut(shortcut) {
        return SUPPORTED_SHORTCUTS[shortcut];
    }
}
ShortcutService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ShortcutService.ctorParameters = () => [
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [CONFIG,] }] },
    { type: KeyboardEventsService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    ShortcutService.prototype._shortcuts;
    /**
     * @type {?}
     * @private
     */
    ShortcutService.prototype._latestShortcut;
    /**
     * @type {?}
     * @private
     */
    ShortcutService.prototype.platformId;
    /**
     * @type {?}
     * @private
     */
    ShortcutService.prototype.keyboardEvents;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvcnRjdXQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kcmFnLXRvLXNlbGVjdC8iLCJzb3VyY2VzIjpbImxpYi9zaG9ydGN1dC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM3QixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFbEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFVBQVUsQ0FBQzs7TUFFNUIsbUJBQW1CLEdBQUc7SUFDMUIsR0FBRyxFQUFFLElBQUk7SUFDVCxLQUFLLEVBQUUsSUFBSTtJQUNYLElBQUksRUFBRSxJQUFJO0lBQ1YsSUFBSSxFQUFFLElBQUk7Q0FDWDs7TUFFSyxjQUFjLEdBQUcsT0FBTzs7TUFFeEIsUUFBUSxHQUFHLE1BQU07O01BRWpCLFdBQVcsR0FBRztJQUNsQixDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztDQUM3Qjs7TUFFSyxtQkFBbUIsR0FBRztJQUMxQixjQUFjLEVBQUUsSUFBSTtJQUNwQixnQkFBZ0IsRUFBRSxJQUFJO0lBQ3RCLGdCQUFnQixFQUFFLElBQUk7SUFDdEIsY0FBYyxFQUFFLElBQUk7SUFDcEIsbUJBQW1CLEVBQUUsSUFBSTtDQUMxQjs7TUFFSyxZQUFZLEdBQUcsbUJBQW1COzs7O0FBRXhDLHVCQUdDOzs7SUFGQyx3QkFBYTs7SUFDYiwyQkFBaUI7O0FBSW5CLE1BQU0sT0FBTyxlQUFlOzs7Ozs7SUFLMUIsWUFDK0IsVUFBa0Is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S0FBWSxFQUFFLEdBQVc7UUFDN0MsT0FBTyxHQUFHLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzVFLENBQUM7Ozs7OztJQUVPLGlCQUFpQixDQUFDLEtBQW9COztZQUN4QyxjQUFjLEdBQUcsSUFBSTtRQUV6QixLQUFLLENBQUMsT0FBTzs7OztRQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3ZGLGNBQWMsR0FBRyxHQUFHLENBQUM7Z0JBQ3JCLE9BQU87YUFDUjtRQUNILENBQUMsRUFBQyxDQUFDO1FBRUgsT0FBTyxjQUFjLENBQUM7SUFDeEIsQ0FBQzs7Ozs7O0lBRU8sYUFBYSxDQUFDLEdBQVc7UUFDL0IsT0FBTyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUN4QixDQUFDOzs7Ozs7SUFFTyxvQkFBb0IsQ0FBQyxRQUFnQjtRQUMzQyxPQUFPLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7OztZQXhKRixVQUFVOzs7O1lBT2tDLE1BQU0sdUJBQTlDLE1BQU0sU0FBQyxXQUFXOzRDQUNsQixNQUFNLFNBQUMsTUFBTTtZQTFDVCxxQkFBcUI7Ozs7Ozs7SUFvQzVCLHFDQUF1RDs7Ozs7SUFFdkQsMENBQTBEOzs7OztJQUd4RCxxQ0FBK0M7Ozs7O0lBRS9DLHlDQUE2QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgUExBVEZPUk1fSUQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG1lcmdlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgS2V5Ym9hcmRFdmVudHNTZXJ2aWNlIH0gZnJvbSAnLi9rZXlib2FyZC1ldmVudHMuc2VydmljZSc7XG5pbXBvcnQgeyBEcmFnVG9TZWxlY3RDb25maWcgfSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQgeyBDT05GSUcgfSBmcm9tICcuL3Rva2Vucyc7XG5cbmNvbnN0IFNVUFBPUlRFRF9NRVRBX0tFWVMgPSB7XG4gIGFsdDogdHJ1ZSxcbiAgc2hpZnQ6IHRydWUsXG4gIG1ldGE6IHRydWUsXG4gIGN0cmw6IHRydWVcbn07XG5cbmNvbnN0IFNVUFBPUlRFRF9LRVlTID0gL1thLXpdLztcblxuY29uc3QgTUVUQV9LRVkgPSAnbWV0YSc7XG5cbmNvbnN0IEtFWV9BTElBU0VTID0ge1xuICBbTUVUQV9LRVldOiBbJ2N0cmwnLCAnbWV0YSddXG59O1xuXG5jb25zdCBTVVBQT1JURURfU0hPUlRDVVRTID0ge1xuICBtb3ZlUmFuZ2VTdGFydDogdHJ1ZSxcbiAgZGlzYWJsZVNlbGVjdGlvbjogdHJ1ZSxcbiAgdG9nZ2xlU2luZ2xlSXRlbTogdHJ1ZSxcbiAgYWRkVG9TZWxlY3Rpb246IHRydWUsXG4gIHJlbW92ZUZyb21TZWxlY3Rpb246IHRydWVcbn07XG5cbmNvbnN0IEVSUk9SX1BSRUZJWCA9ICdbU2hvcnRjdXRTZXJ2aWNlXSc7XG5cbmludGVyZmFjZSBLZXlTdGF0ZSB7XG4gIGNvZGU6IHN0cmluZztcbiAgcHJlc3NlZDogYm9vbGVhbjtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNob3J0Y3V0U2VydmljZSB7XG4gIHByaXZhdGUgX3Nob3J0Y3V0czogeyBba2V5OiBzdHJpbmddOiBzdHJpbmdbXVtdIH0gPSB7fTtcblxuICBwcml2YXRlIF9sYXRlc3RTaG9ydGN1dDogTWFwPHN0cmluZywgYm9vbGVhbj4gPSBuZXcgTWFwKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgQEluamVjdChDT05GSUcpIGNvbmZpZzogRHJhZ1RvU2VsZWN0Q29uZmlnLFxuICAgIHByaXZhdGUga2V5Ym9hcmRFdmVudHM6IEtleWJvYXJkRXZlbnRzU2VydmljZVxuICApIHtcbiAgICB0aGlzLl9zaG9ydGN1dHMgPSB0aGlzLl9jcmVhdGVTaG9ydGN1dHNGcm9tQ29uZmlnKGNvbmZpZy5zaG9ydGN1dHMpO1xuXG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIGNvbnN0IGtleWRvd24kID0gdGhpcy5rZXlib2FyZEV2ZW50cy5rZXlkb3duJC5waXBlKFxuICAgICAgICBtYXA8S2V5Ym9hcmRFdmVudCwgS2V5U3RhdGU+KGV2ZW50ID0+ICh7IGNvZGU6IGV2ZW50LmNvZGUsIHByZXNzZWQ6IHRydWUgfSkpXG4gICAgICApO1xuXG4gICAgICBjb25zdCBrZXl1cCQgPSB0aGlzLmtleWJvYXJkRXZlbnRzLmtleXVwJC5waXBlKFxuICAgICAgICBtYXA8S2V5Ym9hcmRFdmVudCwgS2V5U3RhdGU+KGV2ZW50ID0+ICh7IGNvZGU6IGV2ZW50LmNvZGUsIHByZXNzZWQ6IGZhbHNlIH0pKVxuICAgICAgKTtcblxuICAgICAgbWVyZ2U8S2V5U3RhdGU+KGtleWRvd24kLCBrZXl1cCQpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKChwcmV2LCBjdXJyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcHJldi5wcmVzc2VkID09PSBjdXJyLnByZXNzZWQgJiYgcHJldi5jb2RlID09PSBjdXJyLmNvZGU7XG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKGtleVN0YXRlID0+IHtcbiAgICAgICAgICBpZiAoa2V5U3RhdGUucHJlc3NlZCkge1xuICAgICAgICAgICAgdGhpcy5fbGF0ZXN0U2hvcnRjdXQuc2V0KGtleVN0YXRlLmNvZGUsIHRydWUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9sYXRlc3RTaG9ydGN1dC5kZWxldGUoa2V5U3RhdGUuY29kZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBkaXNhYmxlU2VsZWN0aW9uKGV2ZW50OiBFdmVudCkge1xuICAgIHJldHVybiB0aGlzLl9pc1Nob3J0Y3V0UHJlc3NlZCgnZGlzYWJsZVNlbGVjdGlvbicsIGV2ZW50KTtcbiAgfVxuXG4gIG1vdmVSYW5nZVN0YXJ0KGV2ZW50OiBFdmVudCkge1xuICAgIHJldHVybiB0aGlzLl9pc1Nob3J0Y3V0UHJlc3NlZCgnbW92ZVJhbmdlU3RhcnQnLCBldmVudCk7XG4gIH1cblxuICB0b2dnbGVTaW5nbGVJdGVtKGV2ZW50OiBFdmVudCkge1xuICAgIHJldHVybiB0aGlzLl9pc1Nob3J0Y3V0UHJlc3NlZCgndG9nZ2xlU2luZ2xlSXRlbScsIGV2ZW50KTtcbiAgfVxuXG4gIGFkZFRvU2VsZWN0aW9uKGV2ZW50OiBFdmVudCkge1xuICAgIHJldHVybiB0aGlzLl9pc1Nob3J0Y3V0UHJlc3NlZCgnYWRkVG9TZWxlY3Rpb24nLCBldmVudCk7XG4gIH1cblxuICByZW1vdmVGcm9tU2VsZWN0aW9uKGV2ZW50OiBFdmVudCkge1xuICAgIHJldHVybiB0aGlzLl9pc1Nob3J0Y3V0UHJlc3NlZCgncmVtb3ZlRnJvbVNlbGVjdGlvbicsIGV2ZW50KTtcbiAgfVxuXG4gIGV4dGVuZGVkU2VsZWN0aW9uU2hvcnRjdXQoZXZlbnQ6IEV2ZW50KSB7XG4gICAgcmV0dXJuIHRoaXMuYWRkVG9TZWxlY3Rpb24oZXZlbnQpIHx8IHRoaXMucmVtb3ZlRnJvbVNlbGVjdGlvbihldmVudCk7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVTaG9ydGN1dHNGcm9tQ29uZmlnKHNob3J0Y3V0czogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSkge1xuICAgIGNvbnN0IHNob3J0Y3V0TWFwID0ge307XG5cbiAgICBmb3IgKGNvbnN0IFtrZXksIHNob3J0Y3V0c0ZvckNvbW1hbmRdIG9mIE9iamVjdC5lbnRyaWVzKHNob3J0Y3V0cykpIHtcbiAgICAgIGlmICghdGhpcy5faXNTdXBwb3J0ZWRTaG9ydGN1dChrZXkpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLl9nZXRFcnJvck1lc3NhZ2UoYFNob3J0Y3V0ICR7a2V5fSBub3Qgc3VwcG9ydGVkYCkpO1xuICAgICAgfVxuXG4gICAgICBzaG9ydGN1dHNGb3JDb21tYW5kXG4gICAgICAgIC5yZXBsYWNlKC8gL2csICcnKVxuICAgICAgICAuc3BsaXQoJywnKVxuICAgICAgICAuZm9yRWFjaChzaG9ydGN1dCA9PiB7XG4gICAgICAgICAgaWYgKCFzaG9ydGN1dE1hcFtrZXldKSB7XG4gICAgICAgICAgICBzaG9ydGN1dE1hcFtrZXldID0gW107XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgY29tYm8gPSBzaG9ydGN1dC5zcGxpdCgnKycpO1xuICAgICAgICAgIGNvbnN0IGNsZWFuQ29tYm9zID0gdGhpcy5fc3Vic3RpdHV0ZUtleShzaG9ydGN1dCwgY29tYm8sIE1FVEFfS0VZKTtcblxuICAgICAgICAgIGNsZWFuQ29tYm9zLmZvckVhY2goY2xlYW5Db21ibyA9PiB7XG4gICAgICAgICAgICBjb25zdCB1bnN1cHBvcnRlZEtleSA9IHRoaXMuX2lzU3VwcG9ydGVkQ29tYm8oY2xlYW5Db21ibyk7XG5cbiAgICAgICAgICAgIGlmICh1bnN1cHBvcnRlZEtleSkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5fZ2V0RXJyb3JNZXNzYWdlKGBLZXkgJyR7dW5zdXBwb3J0ZWRLZXl9JyBpbiBzaG9ydGN1dCAke3Nob3J0Y3V0fSBub3Qgc3VwcG9ydGVkYCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzaG9ydGN1dE1hcFtrZXldLnB1c2goXG4gICAgICAgICAgICAgIGNsZWFuQ29tYm8ubWFwKGNvbWJvS2V5ID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gU1VQUE9SVEVEX01FVEFfS0VZU1tjb21ib0tleV0gPyBgJHtjb21ib0tleX1LZXlgIDogYEtleSR7Y29tYm9LZXkudG9VcHBlckNhc2UoKX1gO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNob3J0Y3V0TWFwO1xuICB9XG5cbiAgcHJpdmF0ZSBfc3Vic3RpdHV0ZUtleShzaG9ydGN1dDogc3RyaW5nLCBjb21ibzogQXJyYXk8c3RyaW5nPiwgc3Vic3RpdHV0ZUtleTogc3RyaW5nKSB7XG4gICAgY29uc3QgaGFzU3BlY2lhbEtleSA9IHNob3J0Y3V0LmluY2x1ZGVzKHN1YnN0aXR1dGVLZXkpO1xuICAgIGNvbnN0IHN1YnN0aXR1dGVkU2hvcnRjdXQ6IHN0cmluZ1tdW10gPSBbXTtcblxuICAgIGlmIChoYXNTcGVjaWFsS2V5KSB7XG4gICAgICBjb25zdCBjbGVhblNob3J0Y3V0ID0gY29tYm8uZmlsdGVyKGVsZW1lbnQgPT4gZWxlbWVudCAhPT0gTUVUQV9LRVkpO1xuXG4gICAgICBLRVlfQUxJQVNFUy5tZXRhLmZvckVhY2goYWxpYXMgPT4ge1xuICAgICAgICBzdWJzdGl0dXRlZFNob3J0Y3V0LnB1c2goWy4uLmNsZWFuU2hvcnRjdXQsIGFsaWFzXSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3Vic3RpdHV0ZWRTaG9ydGN1dC5wdXNoKGNvbWJvKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3Vic3RpdHV0ZWRTaG9ydGN1dDtcbiAgfVxuXG4gIHByaXZhdGUgX2dldEVycm9yTWVzc2FnZShtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gYCR7RVJST1JfUFJFRklYfSAke21lc3NhZ2V9YDtcbiAgfVxuXG4gIHByaXZhdGUgX2lzU2hvcnRjdXRQcmVzc2VkKHNob3J0Y3V0TmFtZTogc3RyaW5nLCBldmVudDogRXZlbnQpIHtcbiAgICBjb25zdCBzaG9ydGN1dHMgPSB0aGlzLl9zaG9ydGN1dHNbc2hvcnRjdXROYW1lXTtcblxuICAgIHJldHVybiBzaG9ydGN1dHMuc29tZShzaG9ydGN1dCA9PiB7XG4gICAgICByZXR1cm4gc2hvcnRjdXQuZXZlcnkoa2V5ID0+IHRoaXMuX2lzS2V5UHJlc3NlZChldmVudCwga2V5KSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pc0tleVByZXNzZWQoZXZlbnQ6IEV2ZW50LCBrZXk6IHN0cmluZykge1xuICAgIHJldHVybiBrZXkuc3RhcnRzV2l0aCgnS2V5JykgPyB0aGlzLl9sYXRlc3RTaG9ydGN1dC5oYXMoa2V5KSA6IGV2ZW50W2tleV07XG4gIH1cblxuICBwcml2YXRlIF9pc1N1cHBvcnRlZENvbWJvKGNvbWJvOiBBcnJheTxzdHJpbmc+KSB7XG4gICAgbGV0IHVuc3VwcG9ydGVkS2V5ID0gbnVsbDtcblxuICAgIGNvbWJvLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGlmICghU1VQUE9SVEVEX01FVEFfS0VZU1trZXldICYmICghU1VQUE9SVEVEX0tFWVMudGVzdChrZXkpIHx8IHRoaXMuX2lzU2luZ2xlQ2hhcihrZXkpKSkge1xuICAgICAgICB1bnN1cHBvcnRlZEtleSA9IGtleTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHVuc3VwcG9ydGVkS2V5O1xuICB9XG5cbiAgcHJpdmF0ZSBfaXNTaW5nbGVDaGFyKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGtleS5sZW5ndGggPiAxO1xuICB9XG5cbiAgcHJpdmF0ZSBfaXNTdXBwb3J0ZWRTaG9ydGN1dChzaG9ydGN1dDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIFNVUFBPUlRFRF9TSE9SVENVVFNbc2hvcnRjdXRdO1xuICB9XG59XG4iXX0=