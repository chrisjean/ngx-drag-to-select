var _a;
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { merge } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { KeyboardEventsService } from './keyboard-events.service';
import { CONFIG } from './tokens';
/** @type {?} */
var SUPPORTED_META_KEYS = {
    alt: true,
    shift: true,
    meta: true,
    ctrl: true
};
/** @type {?} */
var SUPPORTED_KEYS = /[a-z]/;
/** @type {?} */
var META_KEY = 'meta';
/** @type {?} */
var KEY_ALIASES = (_a = {},
    _a[META_KEY] = ['ctrl', 'meta'],
    _a);
/** @type {?} */
var SUPPORTED_SHORTCUTS = {
    moveRangeStart: true,
    disableSelection: true,
    toggleSingleItem: true,
    addToSelection: true,
    removeFromSelection: true
};
/** @type {?} */
var ERROR_PREFIX = '[ShortcutService]';
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
var ShortcutService = /** @class */ (function () {
    function ShortcutService(platformId, config, keyboardEvents) {
        var _this = this;
        this.platformId = platformId;
        this.keyboardEvents = keyboardEvents;
        this._shortcuts = {};
        this._latestShortcut = new Map();
        this._shortcuts = this._createShortcutsFromConfig(config.shortcuts);
        if (isPlatformBrowser(this.platformId)) {
            /** @type {?} */
            var keydown$ = this.keyboardEvents.keydown$.pipe(map((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return ({ code: event.code, pressed: true }); })));
            /** @type {?} */
            var keyup$ = this.keyboardEvents.keyup$.pipe(map((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return ({ code: event.code, pressed: false }); })));
            merge(keydown$, keyup$)
                .pipe(distinctUntilChanged((/**
             * @param {?} prev
             * @param {?} curr
             * @return {?}
             */
            function (prev, curr) {
                return prev.pressed === curr.pressed && prev.code === curr.code;
            })))
                .subscribe((/**
             * @param {?} keyState
             * @return {?}
             */
            function (keyState) {
                if (keyState.pressed) {
                    _this._latestShortcut.set(keyState.code, true);
                }
                else {
                    _this._latestShortcut.delete(keyState.code);
                }
            }));
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    ShortcutService.prototype.disableSelection = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        return this._isShortcutPressed('disableSelection', event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ShortcutService.prototype.moveRangeStart = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        return this._isShortcutPressed('moveRangeStart', event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ShortcutService.prototype.toggleSingleItem = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        return this._isShortcutPressed('toggleSingleItem', event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ShortcutService.prototype.addToSelection = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        return this._isShortcutPressed('addToSelection', event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ShortcutService.prototype.removeFromSelection = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        return this._isShortcutPressed('removeFromSelection', event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ShortcutService.prototype.extendedSelectionShortcut = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        return this.addToSelection(event) || this.removeFromSelection(event);
    };
    /**
     * @private
     * @param {?} shortcuts
     * @return {?}
     */
    ShortcutService.prototype._createShortcutsFromConfig = /**
     * @private
     * @param {?} shortcuts
     * @return {?}
     */
    function (shortcuts) {
        var e_1, _a;
        var _this = this;
        /** @type {?} */
        var shortcutMap = {};
        var _loop_1 = function (key, shortcutsForCommand) {
            if (!this_1._isSupportedShortcut(key)) {
                throw new Error(this_1._getErrorMessage("Shortcut " + key + " not supported"));
            }
            shortcutsForCommand
                .replace(/ /g, '')
                .split(',')
                .forEach((/**
             * @param {?} shortcut
             * @return {?}
             */
            function (shortcut) {
                if (!shortcutMap[key]) {
                    shortcutMap[key] = [];
                }
                /** @type {?} */
                var combo = shortcut.split('+');
                /** @type {?} */
                var cleanCombos = _this._substituteKey(shortcut, combo, META_KEY);
                cleanCombos.forEach((/**
                 * @param {?} cleanCombo
                 * @return {?}
                 */
                function (cleanCombo) {
                    /** @type {?} */
                    var unsupportedKey = _this._isSupportedCombo(cleanCombo);
                    if (unsupportedKey) {
                        throw new Error(_this._getErrorMessage("Key '" + unsupportedKey + "' in shortcut " + shortcut + " not supported"));
                    }
                    shortcutMap[key].push(cleanCombo.map((/**
                     * @param {?} comboKey
                     * @return {?}
                     */
                    function (comboKey) {
                        return SUPPORTED_META_KEYS[comboKey] ? comboKey + "Key" : "Key" + comboKey.toUpperCase();
                    })));
                }));
            }));
        };
        var this_1 = this;
        try {
            for (var _b = tslib_1.__values(Object.entries(shortcuts)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = tslib_1.__read(_c.value, 2), key = _d[0], shortcutsForCommand = _d[1];
                _loop_1(key, shortcutsForCommand);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return shortcutMap;
    };
    /**
     * @private
     * @param {?} shortcut
     * @param {?} combo
     * @param {?} substituteKey
     * @return {?}
     */
    ShortcutService.prototype._substituteKey = /**
     * @private
     * @param {?} shortcut
     * @param {?} combo
     * @param {?} substituteKey
     * @return {?}
     */
    function (shortcut, combo, substituteKey) {
        /** @type {?} */
        var hasSpecialKey = shortcut.includes(substituteKey);
        /** @type {?} */
        var substitutedShortcut = [];
        if (hasSpecialKey) {
            /** @type {?} */
            var cleanShortcut_1 = combo.filter((/**
             * @param {?} element
             * @return {?}
             */
            function (element) { return element !== META_KEY; }));
            KEY_ALIASES.meta.forEach((/**
             * @param {?} alias
             * @return {?}
             */
            function (alias) {
                substitutedShortcut.push(tslib_1.__spread(cleanShortcut_1, [alias]));
            }));
        }
        else {
            substitutedShortcut.push(combo);
        }
        return substitutedShortcut;
    };
    /**
     * @private
     * @param {?} message
     * @return {?}
     */
    ShortcutService.prototype._getErrorMessage = /**
     * @private
     * @param {?} message
     * @return {?}
     */
    function (message) {
        return ERROR_PREFIX + " " + message;
    };
    /**
     * @private
     * @param {?} shortcutName
     * @param {?} event
     * @return {?}
     */
    ShortcutService.prototype._isShortcutPressed = /**
     * @private
     * @param {?} shortcutName
     * @param {?} event
     * @return {?}
     */
    function (shortcutName, event) {
        var _this = this;
        /** @type {?} */
        var shortcuts = this._shortcuts[shortcutName];
        return shortcuts.some((/**
         * @param {?} shortcut
         * @return {?}
         */
        function (shortcut) {
            return shortcut.every((/**
             * @param {?} key
             * @return {?}
             */
            function (key) { return _this._isKeyPressed(event, key); }));
        }));
    };
    /**
     * @private
     * @param {?} event
     * @param {?} key
     * @return {?}
     */
    ShortcutService.prototype._isKeyPressed = /**
     * @private
     * @param {?} event
     * @param {?} key
     * @return {?}
     */
    function (event, key) {
        return key.startsWith('Key') ? this._latestShortcut.has(key) : event[key];
    };
    /**
     * @private
     * @param {?} combo
     * @return {?}
     */
    ShortcutService.prototype._isSupportedCombo = /**
     * @private
     * @param {?} combo
     * @return {?}
     */
    function (combo) {
        var _this = this;
        /** @type {?} */
        var unsupportedKey = null;
        combo.forEach((/**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            if (!SUPPORTED_META_KEYS[key] && (!SUPPORTED_KEYS.test(key) || _this._isSingleChar(key))) {
                unsupportedKey = key;
                return;
            }
        }));
        return unsupportedKey;
    };
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    ShortcutService.prototype._isSingleChar = /**
     * @private
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return key.length > 1;
    };
    /**
     * @private
     * @param {?} shortcut
     * @return {?}
     */
    ShortcutService.prototype._isSupportedShortcut = /**
     * @private
     * @param {?} shortcut
     * @return {?}
     */
    function (shortcut) {
        return SUPPORTED_SHORTCUTS[shortcut];
    };
    ShortcutService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ShortcutService.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [CONFIG,] }] },
        { type: KeyboardEventsService }
    ]; };
    return ShortcutService;
}());
export { ShortcutService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvcnRjdXQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1kcmFnLXRvLXNlbGVjdC8iLCJzb3VyY2VzIjpbImxpYi9zaG9ydGN1dC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzdCLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVsRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sVUFBVSxDQUFDOztJQUU1QixtQkFBbUIsR0FBRztJQUMxQixHQUFHLEVBQUUsSUFBSTtJQUNULEtBQUssRUFBRSxJQUFJO0lBQ1gsSUFBSSxFQUFFLElBQUk7SUFDVixJQUFJLEVBQUUsSUFBSTtDQUNYOztJQUVLLGNBQWMsR0FBRyxPQUFPOztJQUV4QixRQUFRLEdBQUcsTUFBTTs7SUFFakIsV0FBVztJQUNmLEdBQUMsUUFBUSxJQUFHLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztPQUM3Qjs7SUFFSyxtQkFBbUIsR0FBRztJQUMxQixjQUFjLEVBQUUsSUFBSTtJQUNwQixnQkFBZ0IsRUFBRSxJQUFJO0lBQ3RCLGdCQUFnQixFQUFFLElBQUk7SUFDdEIsY0FBYyxFQUFFLElBQUk7SUFDcEIsbUJBQW1CLEVBQUUsSUFBSTtDQUMxQjs7SUFFSyxZQUFZLEdBQUcsbUJBQW1COzs7O0FBRXhDLHVCQUdDOzs7SUFGQyx3QkFBYTs7SUFDYiwyQkFBaUI7O0FBR25CO0lBTUUseUJBQytCLFVBQWtCLEVBQy9CLE1BQTBCLEVBQ2xDLGNBQXFDO1FBSC9DLGlCQThCQztRQTdCOEIsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUV2QyxtQkFBYyxHQUFkLGNBQWMsQ0FBdUI7UUFQdkMsZUFBVSxHQUFrQyxFQUFFLENBQUM7UUFFL0Msb0JBQWUsR0FBeUIsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQU94RCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFcEUsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7O2dCQUNoQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUNoRCxHQUFHOzs7O1lBQTBCLFVBQUEsS0FBSyxJQUFJLE9BQUEsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFyQyxDQUFxQyxFQUFDLENBQzdFOztnQkFFSyxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUM1QyxHQUFHOzs7O1lBQTBCLFVBQUEsS0FBSyxJQUFJLE9BQUEsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUF0QyxDQUFzQyxFQUFDLENBQzlFO1lBRUQsS0FBSyxDQUFXLFFBQVEsRUFBRSxNQUFNLENBQUM7aUJBQzlCLElBQUksQ0FDSCxvQkFBb0I7Ozs7O1lBQUMsVUFBQyxJQUFJLEVBQUUsSUFBSTtnQkFDOUIsT0FBTyxJQUFJLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ2xFLENBQUMsRUFBQyxDQUNIO2lCQUNBLFNBQVM7Ozs7WUFBQyxVQUFBLFFBQVE7Z0JBQ2pCLElBQUksUUFBUSxDQUFDLE9BQU8sRUFBRTtvQkFDcEIsS0FBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFDL0M7cUJBQU07b0JBQ0wsS0FBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUM1QztZQUNILENBQUMsRUFBQyxDQUFDO1NBQ047SUFDSCxDQUFDOzs7OztJQUVELDBDQUFnQjs7OztJQUFoQixVQUFpQixLQUFZO1FBQzNCLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLGtCQUFrQixFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzVELENBQUM7Ozs7O0lBRUQsd0NBQWM7Ozs7SUFBZCxVQUFlLEtBQVk7UUFDekIsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDMUQsQ0FBQzs7Ozs7SUFFRCwwQ0FBZ0I7Ozs7SUFBaEIsVUFBaUIsS0FBWTtRQUMzQixPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxrQkFBa0IsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM1RCxDQUFDOzs7OztJQUVELHdDQUFjOzs7O0lBQWQsVUFBZSxLQUFZO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLGdCQUFnQixFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzFELENBQUM7Ozs7O0lBRUQsNkNBQW1COzs7O0lBQW5CLFVBQW9CLEtBQVk7UUFDOUIsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMscUJBQXFCLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDL0QsQ0FBQzs7Ozs7SUFFRCxtREFBeUI7Ozs7SUFBekIsVUFBMEIsS0FBWTtRQUNwQyxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7Ozs7OztJQUVPLG9EQUEwQjs7Ozs7SUFBbEMsVUFBbUMsU0FBb0M7O1FBQXZFLGlCQW9DQzs7WUFuQ08sV0FBVyxHQUFHLEVBQUU7Z0NBRVYsR0FBRyxFQUFFLG1CQUFtQjtZQUNsQyxJQUFJLENBQUMsT0FBSyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDbkMsTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFLLGdCQUFnQixDQUFDLGNBQVksR0FBRyxtQkFBZ0IsQ0FBQyxDQUFDLENBQUM7YUFDekU7WUFFRCxtQkFBbUI7aUJBQ2hCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDO2lCQUNqQixLQUFLLENBQUMsR0FBRyxDQUFDO2lCQUNWLE9BQU87Ozs7WUFBQyxVQUFBLFFBQVE7Z0JBQ2YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDckIsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztpQkFDdkI7O29CQUVLLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQzs7b0JBQzNCLFdBQVcsR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDO2dCQUVsRSxXQUFXLENBQUMsT0FBTzs7OztnQkFBQyxVQUFBLFVBQVU7O3dCQUN0QixjQUFjLEdBQUcsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQztvQkFFekQsSUFBSSxjQUFjLEVBQUU7d0JBQ2xCLE1BQU0sSUFBSSxLQUFLLENBQUMsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVEsY0FBYyxzQkFBaUIsUUFBUSxtQkFBZ0IsQ0FBQyxDQUFDLENBQUM7cUJBQ3pHO29CQUVELFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQ25CLFVBQVUsQ0FBQyxHQUFHOzs7O29CQUFDLFVBQUEsUUFBUTt3QkFDckIsT0FBTyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUksUUFBUSxRQUFLLENBQUMsQ0FBQyxDQUFDLFFBQU0sUUFBUSxDQUFDLFdBQVcsRUFBSSxDQUFDO29CQUMzRixDQUFDLEVBQUMsQ0FDSCxDQUFDO2dCQUNKLENBQUMsRUFBQyxDQUFDO1lBQ0wsQ0FBQyxFQUFDLENBQUM7Ozs7WUE3QlAsS0FBeUMsSUFBQSxLQUFBLGlCQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUEsZ0JBQUE7Z0JBQXZELElBQUEsZ0NBQTBCLEVBQXpCLFdBQUcsRUFBRSwyQkFBbUI7d0JBQXhCLEdBQUcsRUFBRSxtQkFBbUI7YUE4Qm5DOzs7Ozs7Ozs7UUFFRCxPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDOzs7Ozs7OztJQUVPLHdDQUFjOzs7Ozs7O0lBQXRCLFVBQXVCLFFBQWdCLEVBQUUsS0FBb0IsRUFBRSxhQUFxQjs7WUFDNUUsYUFBYSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDOztZQUNoRCxtQkFBbUIsR0FBZSxFQUFFO1FBRTFDLElBQUksYUFBYSxFQUFFOztnQkFDWCxlQUFhLEdBQUcsS0FBSyxDQUFDLE1BQU07Ozs7WUFBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sS0FBSyxRQUFRLEVBQXBCLENBQW9CLEVBQUM7WUFFbkUsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPOzs7O1lBQUMsVUFBQSxLQUFLO2dCQUM1QixtQkFBbUIsQ0FBQyxJQUFJLGtCQUFLLGVBQWEsR0FBRSxLQUFLLEdBQUUsQ0FBQztZQUN0RCxDQUFDLEVBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDakM7UUFFRCxPQUFPLG1CQUFtQixDQUFDO0lBQzdCLENBQUM7Ozs7OztJQUVPLDBDQUFnQjs7Ozs7SUFBeEIsVUFBeUIsT0FBZTtRQUN0QyxPQUFVLFlBQVksU0FBSSxPQUFTLENBQUM7SUFDdEMsQ0FBQzs7Ozs7OztJQUVPLDRDQUFrQjs7Ozs7O0lBQTFCLFVBQTJCLFlBQW9CLEVBQUUsS0FBWTtRQUE3RCxpQkFNQzs7WUFMTyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUM7UUFFL0MsT0FBTyxTQUFTLENBQUMsSUFBSTs7OztRQUFDLFVBQUEsUUFBUTtZQUM1QixPQUFPLFFBQVEsQ0FBQyxLQUFLOzs7O1lBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxLQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsRUFBOUIsQ0FBOEIsRUFBQyxDQUFDO1FBQy9ELENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7OztJQUVPLHVDQUFhOzs7Ozs7SUFBckIsVUFBc0IsS0FBWSxFQUFFLEdBQVc7UUFDN0MsT0FBTyxHQUFHLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzVFLENBQUM7Ozs7OztJQUVPLDJDQUFpQjs7Ozs7SUFBekIsVUFBMEIsS0FBb0I7UUFBOUMsaUJBV0M7O1lBVkssY0FBYyxHQUFHLElBQUk7UUFFekIsS0FBSyxDQUFDLE9BQU87Ozs7UUFBQyxVQUFBLEdBQUc7WUFDZixJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO2dCQUN2RixjQUFjLEdBQUcsR0FBRyxDQUFDO2dCQUNyQixPQUFPO2FBQ1I7UUFDSCxDQUFDLEVBQUMsQ0FBQztRQUVILE9BQU8sY0FBYyxDQUFDO0lBQ3hCLENBQUM7Ozs7OztJQUVPLHVDQUFhOzs7OztJQUFyQixVQUFzQixHQUFXO1FBQy9CLE9BQU8sR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDeEIsQ0FBQzs7Ozs7O0lBRU8sOENBQW9COzs7OztJQUE1QixVQUE2QixRQUFnQjtRQUMzQyxPQUFPLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7O2dCQXhKRixVQUFVOzs7O2dCQU9rQyxNQUFNLHVCQUE5QyxNQUFNLFNBQUMsV0FBVztnREFDbEIsTUFBTSxTQUFDLE1BQU07Z0JBMUNULHFCQUFxQjs7SUEyTDlCLHNCQUFDO0NBQUEsQUF6SkQsSUF5SkM7U0F4SlksZUFBZTs7Ozs7O0lBQzFCLHFDQUF1RDs7Ozs7SUFFdkQsMENBQTBEOzs7OztJQUd4RCxxQ0FBK0M7Ozs7O0lBRS9DLHlDQUE2QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgUExBVEZPUk1fSUQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG1lcmdlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgS2V5Ym9hcmRFdmVudHNTZXJ2aWNlIH0gZnJvbSAnLi9rZXlib2FyZC1ldmVudHMuc2VydmljZSc7XG5pbXBvcnQgeyBEcmFnVG9TZWxlY3RDb25maWcgfSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQgeyBDT05GSUcgfSBmcm9tICcuL3Rva2Vucyc7XG5cbmNvbnN0IFNVUFBPUlRFRF9NRVRBX0tFWVMgPSB7XG4gIGFsdDogdHJ1ZSxcbiAgc2hpZnQ6IHRydWUsXG4gIG1ldGE6IHRydWUsXG4gIGN0cmw6IHRydWVcbn07XG5cbmNvbnN0IFNVUFBPUlRFRF9LRVlTID0gL1thLXpdLztcblxuY29uc3QgTUVUQV9LRVkgPSAnbWV0YSc7XG5cbmNvbnN0IEtFWV9BTElBU0VTID0ge1xuICBbTUVUQV9LRVldOiBbJ2N0cmwnLCAnbWV0YSddXG59O1xuXG5jb25zdCBTVVBQT1JURURfU0hPUlRDVVRTID0ge1xuICBtb3ZlUmFuZ2VTdGFydDogdHJ1ZSxcbiAgZGlzYWJsZVNlbGVjdGlvbjogdHJ1ZSxcbiAgdG9nZ2xlU2luZ2xlSXRlbTogdHJ1ZSxcbiAgYWRkVG9TZWxlY3Rpb246IHRydWUsXG4gIHJlbW92ZUZyb21TZWxlY3Rpb246IHRydWVcbn07XG5cbmNvbnN0IEVSUk9SX1BSRUZJWCA9ICdbU2hvcnRjdXRTZXJ2aWNlXSc7XG5cbmludGVyZmFjZSBLZXlTdGF0ZSB7XG4gIGNvZGU6IHN0cmluZztcbiAgcHJlc3NlZDogYm9vbGVhbjtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNob3J0Y3V0U2VydmljZSB7XG4gIHByaXZhdGUgX3Nob3J0Y3V0czogeyBba2V5OiBzdHJpbmddOiBzdHJpbmdbXVtdIH0gPSB7fTtcblxuICBwcml2YXRlIF9sYXRlc3RTaG9ydGN1dDogTWFwPHN0cmluZywgYm9vbGVhbj4gPSBuZXcgTWFwKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgQEluamVjdChDT05GSUcpIGNvbmZpZzogRHJhZ1RvU2VsZWN0Q29uZmlnLFxuICAgIHByaXZhdGUga2V5Ym9hcmRFdmVudHM6IEtleWJvYXJkRXZlbnRzU2VydmljZVxuICApIHtcbiAgICB0aGlzLl9zaG9ydGN1dHMgPSB0aGlzLl9jcmVhdGVTaG9ydGN1dHNGcm9tQ29uZmlnKGNvbmZpZy5zaG9ydGN1dHMpO1xuXG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIGNvbnN0IGtleWRvd24kID0gdGhpcy5rZXlib2FyZEV2ZW50cy5rZXlkb3duJC5waXBlKFxuICAgICAgICBtYXA8S2V5Ym9hcmRFdmVudCwgS2V5U3RhdGU+KGV2ZW50ID0+ICh7IGNvZGU6IGV2ZW50LmNvZGUsIHByZXNzZWQ6IHRydWUgfSkpXG4gICAgICApO1xuXG4gICAgICBjb25zdCBrZXl1cCQgPSB0aGlzLmtleWJvYXJkRXZlbnRzLmtleXVwJC5waXBlKFxuICAgICAgICBtYXA8S2V5Ym9hcmRFdmVudCwgS2V5U3RhdGU+KGV2ZW50ID0+ICh7IGNvZGU6IGV2ZW50LmNvZGUsIHByZXNzZWQ6IGZhbHNlIH0pKVxuICAgICAgKTtcblxuICAgICAgbWVyZ2U8S2V5U3RhdGU+KGtleWRvd24kLCBrZXl1cCQpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKChwcmV2LCBjdXJyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcHJldi5wcmVzc2VkID09PSBjdXJyLnByZXNzZWQgJiYgcHJldi5jb2RlID09PSBjdXJyLmNvZGU7XG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKGtleVN0YXRlID0+IHtcbiAgICAgICAgICBpZiAoa2V5U3RhdGUucHJlc3NlZCkge1xuICAgICAgICAgICAgdGhpcy5fbGF0ZXN0U2hvcnRjdXQuc2V0KGtleVN0YXRlLmNvZGUsIHRydWUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9sYXRlc3RTaG9ydGN1dC5kZWxldGUoa2V5U3RhdGUuY29kZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBkaXNhYmxlU2VsZWN0aW9uKGV2ZW50OiBFdmVudCkge1xuICAgIHJldHVybiB0aGlzLl9pc1Nob3J0Y3V0UHJlc3NlZCgnZGlzYWJsZVNlbGVjdGlvbicsIGV2ZW50KTtcbiAgfVxuXG4gIG1vdmVSYW5nZVN0YXJ0KGV2ZW50OiBFdmVudCkge1xuICAgIHJldHVybiB0aGlzLl9pc1Nob3J0Y3V0UHJlc3NlZCgnbW92ZVJhbmdlU3RhcnQnLCBldmVudCk7XG4gIH1cblxuICB0b2dnbGVTaW5nbGVJdGVtKGV2ZW50OiBFdmVudCkge1xuICAgIHJldHVybiB0aGlzLl9pc1Nob3J0Y3V0UHJlc3NlZCgndG9nZ2xlU2luZ2xlSXRlbScsIGV2ZW50KTtcbiAgfVxuXG4gIGFkZFRvU2VsZWN0aW9uKGV2ZW50OiBFdmVudCkge1xuICAgIHJldHVybiB0aGlzLl9pc1Nob3J0Y3V0UHJlc3NlZCgnYWRkVG9TZWxlY3Rpb24nLCBldmVudCk7XG4gIH1cblxuICByZW1vdmVGcm9tU2VsZWN0aW9uKGV2ZW50OiBFdmVudCkge1xuICAgIHJldHVybiB0aGlzLl9pc1Nob3J0Y3V0UHJlc3NlZCgncmVtb3ZlRnJvbVNlbGVjdGlvbicsIGV2ZW50KTtcbiAgfVxuXG4gIGV4dGVuZGVkU2VsZWN0aW9uU2hvcnRjdXQoZXZlbnQ6IEV2ZW50KSB7XG4gICAgcmV0dXJuIHRoaXMuYWRkVG9TZWxlY3Rpb24oZXZlbnQpIHx8IHRoaXMucmVtb3ZlRnJvbVNlbGVjdGlvbihldmVudCk7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVTaG9ydGN1dHNGcm9tQ29uZmlnKHNob3J0Y3V0czogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSkge1xuICAgIGNvbnN0IHNob3J0Y3V0TWFwID0ge307XG5cbiAgICBmb3IgKGNvbnN0IFtrZXksIHNob3J0Y3V0c0ZvckNvbW1hbmRdIG9mIE9iamVjdC5lbnRyaWVzKHNob3J0Y3V0cykpIHtcbiAgICAgIGlmICghdGhpcy5faXNTdXBwb3J0ZWRTaG9ydGN1dChrZXkpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLl9nZXRFcnJvck1lc3NhZ2UoYFNob3J0Y3V0ICR7a2V5fSBub3Qgc3VwcG9ydGVkYCkpO1xuICAgICAgfVxuXG4gICAgICBzaG9ydGN1dHNGb3JDb21tYW5kXG4gICAgICAgIC5yZXBsYWNlKC8gL2csICcnKVxuICAgICAgICAuc3BsaXQoJywnKVxuICAgICAgICAuZm9yRWFjaChzaG9ydGN1dCA9PiB7XG4gICAgICAgICAgaWYgKCFzaG9ydGN1dE1hcFtrZXldKSB7XG4gICAgICAgICAgICBzaG9ydGN1dE1hcFtrZXldID0gW107XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgY29tYm8gPSBzaG9ydGN1dC5zcGxpdCgnKycpO1xuICAgICAgICAgIGNvbnN0IGNsZWFuQ29tYm9zID0gdGhpcy5fc3Vic3RpdHV0ZUtleShzaG9ydGN1dCwgY29tYm8sIE1FVEFfS0VZKTtcblxuICAgICAgICAgIGNsZWFuQ29tYm9zLmZvckVhY2goY2xlYW5Db21ibyA9PiB7XG4gICAgICAgICAgICBjb25zdCB1bnN1cHBvcnRlZEtleSA9IHRoaXMuX2lzU3VwcG9ydGVkQ29tYm8oY2xlYW5Db21ibyk7XG5cbiAgICAgICAgICAgIGlmICh1bnN1cHBvcnRlZEtleSkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5fZ2V0RXJyb3JNZXNzYWdlKGBLZXkgJyR7dW5zdXBwb3J0ZWRLZXl9JyBpbiBzaG9ydGN1dCAke3Nob3J0Y3V0fSBub3Qgc3VwcG9ydGVkYCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzaG9ydGN1dE1hcFtrZXldLnB1c2goXG4gICAgICAgICAgICAgIGNsZWFuQ29tYm8ubWFwKGNvbWJvS2V5ID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gU1VQUE9SVEVEX01FVEFfS0VZU1tjb21ib0tleV0gPyBgJHtjb21ib0tleX1LZXlgIDogYEtleSR7Y29tYm9LZXkudG9VcHBlckNhc2UoKX1gO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNob3J0Y3V0TWFwO1xuICB9XG5cbiAgcHJpdmF0ZSBfc3Vic3RpdHV0ZUtleShzaG9ydGN1dDogc3RyaW5nLCBjb21ibzogQXJyYXk8c3RyaW5nPiwgc3Vic3RpdHV0ZUtleTogc3RyaW5nKSB7XG4gICAgY29uc3QgaGFzU3BlY2lhbEtleSA9IHNob3J0Y3V0LmluY2x1ZGVzKHN1YnN0aXR1dGVLZXkpO1xuICAgIGNvbnN0IHN1YnN0aXR1dGVkU2hvcnRjdXQ6IHN0cmluZ1tdW10gPSBbXTtcblxuICAgIGlmIChoYXNTcGVjaWFsS2V5KSB7XG4gICAgICBjb25zdCBjbGVhblNob3J0Y3V0ID0gY29tYm8uZmlsdGVyKGVsZW1lbnQgPT4gZWxlbWVudCAhPT0gTUVUQV9LRVkpO1xuXG4gICAgICBLRVlfQUxJQVNFUy5tZXRhLmZvckVhY2goYWxpYXMgPT4ge1xuICAgICAgICBzdWJzdGl0dXRlZFNob3J0Y3V0LnB1c2goWy4uLmNsZWFuU2hvcnRjdXQsIGFsaWFzXSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3Vic3RpdHV0ZWRTaG9ydGN1dC5wdXNoKGNvbWJvKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3Vic3RpdHV0ZWRTaG9ydGN1dDtcbiAgfVxuXG4gIHByaXZhdGUgX2dldEVycm9yTWVzc2FnZShtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gYCR7RVJST1JfUFJFRklYfSAke21lc3NhZ2V9YDtcbiAgfVxuXG4gIHByaXZhdGUgX2lzU2hvcnRjdXRQcmVzc2VkKHNob3J0Y3V0TmFtZTogc3RyaW5nLCBldmVudDogRXZlbnQpIHtcbiAgICBjb25zdCBzaG9ydGN1dHMgPSB0aGlzLl9zaG9ydGN1dHNbc2hvcnRjdXROYW1lXTtcblxuICAgIHJldHVybiBzaG9ydGN1dHMuc29tZShzaG9ydGN1dCA9PiB7XG4gICAgICByZXR1cm4gc2hvcnRjdXQuZXZlcnkoa2V5ID0+IHRoaXMuX2lzS2V5UHJlc3NlZChldmVudCwga2V5KSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pc0tleVByZXNzZWQoZXZlbnQ6IEV2ZW50LCBrZXk6IHN0cmluZykge1xuICAgIHJldHVybiBrZXkuc3RhcnRzV2l0aCgnS2V5JykgPyB0aGlzLl9sYXRlc3RTaG9ydGN1dC5oYXMoa2V5KSA6IGV2ZW50W2tleV07XG4gIH1cblxuICBwcml2YXRlIF9pc1N1cHBvcnRlZENvbWJvKGNvbWJvOiBBcnJheTxzdHJpbmc+KSB7XG4gICAgbGV0IHVuc3VwcG9ydGVkS2V5ID0gbnVsbDtcblxuICAgIGNvbWJvLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGlmICghU1VQUE9SVEVEX01FVEFfS0VZU1trZXldICYmICghU1VQUE9SVEVEX0tFWVMudGVzdChrZXkpIHx8IHRoaXMuX2lzU2luZ2xlQ2hhcihrZXkpKSkge1xuICAgICAgICB1bnN1cHBvcnRlZEtleSA9IGtleTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHVuc3VwcG9ydGVkS2V5O1xuICB9XG5cbiAgcHJpdmF0ZSBfaXNTaW5nbGVDaGFyKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGtleS5sZW5ndGggPiAxO1xuICB9XG5cbiAgcHJpdmF0ZSBfaXNTdXBwb3J0ZWRTaG9ydGN1dChzaG9ydGN1dDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIFNVUFBPUlRFRF9TSE9SVENVVFNbc2hvcnRjdXRdO1xuICB9XG59XG4iXX0=