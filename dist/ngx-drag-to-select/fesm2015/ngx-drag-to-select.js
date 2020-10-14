import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Injectable, Inject, PLATFORM_ID, InjectionToken, Directive, ElementRef, Renderer2, HostBinding, Input, EventEmitter, Component, NgZone, ViewChild, ContentChildren, Output, NgModule } from '@angular/core';
import { fromEvent, merge, BehaviorSubject, Subject, combineLatest, from, asyncScheduler } from 'rxjs';
import { map, withLatestFrom, filter, distinctUntilChanged, share, tap, switchMap, takeUntil, mapTo, auditTime, first, observeOn, startWith, concatMapTo } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const DEFAULT_CONFIG = {
    selectedClass: 'selected',
    shortcuts: {
        moveRangeStart: 'shift+r',
        disableSelection: 'alt',
        toggleSingleItem: 'meta',
        addToSelection: 'shift',
        removeFromSelection: 'shift+meta'
    }
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const AUDIT_TIME = 16;
/** @type {?} */
const MIN_WIDTH = 5;
/** @type {?} */
const MIN_HEIGHT = 5;
/** @type {?} */
const NO_SELECT_CLASS = 'dts-no-select';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const isObject = (/**
 * @param {?} item
 * @return {?}
 */
(item) => {
    return item && typeof item === 'object' && !Array.isArray(item) && item !== null;
});
/**
 * @param {?} target
 * @param {?} source
 * @return {?}
 */
function mergeDeep(target, source) {
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach((/**
         * @param {?} key
         * @return {?}
         */
        key => {
            if (isObject(source[key])) {
                if (!target[key]) {
                    Object.assign(target, { [key]: {} });
                }
                mergeDeep(target[key], source[key]);
            }
            else {
                Object.assign(target, { [key]: source[key] });
            }
        }));
    }
    return target;
}
/** @type {?} */
const hasMinimumSize = (/**
 * @param {?} selectBox
 * @param {?=} minWidth
 * @param {?=} minHeight
 * @return {?}
 */
(selectBox, minWidth = MIN_WIDTH, minHeight = MIN_HEIGHT) => {
    return selectBox.width > minWidth || selectBox.height > minHeight;
});
/** @type {?} */
const clearSelection = (/**
 * @param {?} window
 * @return {?}
 */
(window) => {
    /** @type {?} */
    const selection = window.getSelection();
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
const inBoundingBox = (/**
 * @param {?} point
 * @param {?} box
 * @return {?}
 */
(point, box) => {
    return (box.left <= point.x && point.x <= box.left + box.width && box.top <= point.y && point.y <= box.top + box.height);
});
/** @type {?} */
const boxIntersects = (/**
 * @param {?} boxA
 * @param {?} boxB
 * @return {?}
 */
(boxA, boxB) => {
    return (boxA.left <= boxB.left + boxB.width &&
        boxA.left + boxA.width >= boxB.left &&
        boxA.top <= boxB.top + boxB.height &&
        boxA.top + boxA.height >= boxB.top);
});
/** @type {?} */
const calculateBoundingClientRect = (/**
 * @param {?} element
 * @return {?}
 */
(element) => {
    return element.getBoundingClientRect();
});
/** @type {?} */
const getMousePosition = (/**
 * @param {?} event
 * @return {?}
 */
(event) => {
    return {
        x: event.clientX,
        y: event.clientY
    };
});
/** @type {?} */
const getScroll = (/**
 * @return {?}
 */
() => {
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
const getRelativeMousePosition = (/**
 * @param {?} event
 * @param {?} container
 * @return {?}
 */
(event, container) => {
    const { x: clientX, y: clientY } = getMousePosition(event);
    /** @type {?} */
    const scroll = getScroll();
    /** @type {?} */
    const borderSize = (container.boundingClientRect.width - container.clientWidth) / 2;
    /** @type {?} */
    const offsetLeft = container.boundingClientRect.left + scroll.x;
    /** @type {?} */
    const offsetTop = container.boundingClientRect.top + scroll.y;
    return {
        x: clientX - borderSize - (offsetLeft - window.pageXOffset) + container.scrollLeft,
        y: clientY - borderSize - (offsetTop - window.pageYOffset) + container.scrollTop
    };
});
/** @type {?} */
const cursorWithinElement = (/**
 * @param {?} event
 * @param {?} element
 * @return {?}
 */
(event, element) => {
    /** @type {?} */
    const mousePoint = getMousePosition(event);
    return inBoundingBox(mousePoint, calculateBoundingClientRect(element));
});

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const createSelectBox = (/**
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
const whenSelectBoxVisible = (/**
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
const distinctKeyEvents = (/**
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class KeyboardEventsService {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const CONFIG = new InjectionToken('DRAG_TO_SELECT_CONFIG');
/** @type {?} */
const USER_CONFIG = new InjectionToken('USER_CONFIG');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const SELECT_ITEM_INSTANCE = Symbol();
class SelectItemDirective {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
class ShortcutService {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
const UpdateActions = {
    Add: 0,
    Remove: 1,
};
UpdateActions[UpdateActions.Add] = 'Add';
UpdateActions[UpdateActions.Remove] = 'Remove';
/**
 * @record
 */
function UpdateAction() { }
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
function ObservableProxy() { }
if (false) {
    /** @type {?} */
    ObservableProxy.prototype.proxy$;
    /** @type {?} */
    ObservableProxy.prototype.proxy;
}
/**
 * @record
 */
function SelectContainerHost() { }
if (false) {
    /** @type {?} */
    SelectContainerHost.prototype.boundingClientRect;
}
/**
 * @record
 */
function Shortcuts() { }
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
function DragToSelectConfig() { }
if (false) {
    /** @type {?} */
    DragToSelectConfig.prototype.selectedClass;
    /** @type {?} */
    DragToSelectConfig.prototype.shortcuts;
}
/**
 * @record
 */
function MousePosition() { }
if (false) {
    /** @type {?} */
    MousePosition.prototype.x;
    /** @type {?} */
    MousePosition.prototype.y;
}
/**
 * @record
 */
function BoundingBox() { }
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
function SelectBox() { }
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
Action[Action.Add] = 'Add';
Action[Action.Delete] = 'Delete';
Action[Action.None] = 'None';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SelectContainerComponent {
    /**
     * @param {?} platformId
     * @param {?} shortcuts
     * @param {?} keyboardEvents
     * @param {?} hostElementRef
     * @param {?} renderer
     * @param {?} ngZone
     */
    constructor(platformId, shortcuts, keyboardEvents, hostElementRef, renderer, ngZone) {
        this.platformId = platformId;
        this.shortcuts = shortcuts;
        this.keyboardEvents = keyboardEvents;
        this.hostElementRef = hostElementRef;
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.selectOnDrag = true;
        this.disabled = false;
        this.disableDrag = false;
        this.disableRangeSelection = false;
        this.selectMode = false;
        this.selectWithShortcut = false;
        this.custom = false;
        this.selectedItemsChange = new EventEmitter();
        this.select = new EventEmitter();
        this.itemSelected = new EventEmitter();
        this.itemDeselected = new EventEmitter();
        this.selectionStarted = new EventEmitter();
        this.selectionEnded = new EventEmitter();
        this._tmpItems = new Map();
        this._selectedItems$ = new BehaviorSubject([]);
        this._selectableItems = [];
        this.updateItems$ = new Subject();
        this.destroy$ = new Subject();
        this._lastRange = [-1, -1];
        this._lastStartIndex = undefined;
        this._newRangeStart = false;
        this._lastRangeSelection = new Map();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.host = this.hostElementRef.nativeElement;
            this._initSelectedItemsChange();
            this._calculateBoundingClientRect();
            this._observeBoundingRectChanges();
            this._observeSelectableItems();
            /** @type {?} */
            const mouseup$ = this.keyboardEvents.mouseup$.pipe(filter((/**
             * @return {?}
             */
            () => !this.disabled)), tap((/**
             * @return {?}
             */
            () => this._onMouseUp())), share());
            /** @type {?} */
            const mousemove$ = this.keyboardEvents.mousemove$.pipe(filter((/**
             * @return {?}
             */
            () => !this.disabled)), share());
            /** @type {?} */
            const mousedown$ = fromEvent(this.host, 'mousedown').pipe(filter((/**
             * @param {?} event
             * @return {?}
             */
            event => event.button === 0)), // only emit left mouse
            filter((/**
             * @return {?}
             */
            () => !this.disabled)), tap((/**
             * @param {?} event
             * @return {?}
             */
            event => this._onMouseDown(event))), share());
            /** @type {?} */
            const dragging$ = mousedown$.pipe(filter((/**
             * @param {?} event
             * @return {?}
             */
            event => !this.shortcuts.disableSelection(event))), filter((/**
             * @return {?}
             */
            () => !this.selectMode)), filter((/**
             * @return {?}
             */
            () => !this.disableDrag)), switchMap((/**
             * @return {?}
             */
            () => mousemove$.pipe(takeUntil(mouseup$)))), share());
            /** @type {?} */
            const currentMousePosition$ = mousedown$.pipe(map((/**
             * @param {?} event
             * @return {?}
             */
            (event) => getRelativeMousePosition(event, this.host))));
            /** @type {?} */
            const show$ = dragging$.pipe(mapTo(1));
            /** @type {?} */
            const hide$ = mouseup$.pipe(mapTo(0));
            /** @type {?} */
            const opacity$ = merge(show$, hide$).pipe(distinctUntilChanged());
            /** @type {?} */
            const selectBox$ = combineLatest([dragging$, opacity$, currentMousePosition$]).pipe(createSelectBox(this.host), share());
            this.selectBoxClasses$ = merge(dragging$, mouseup$, this.keyboardEvents.distinctKeydown$, this.keyboardEvents.distinctKeyup$).pipe(auditTime(AUDIT_TIME), withLatestFrom(selectBox$), map((/**
             * @param {?} __0
             * @return {?}
             */
            ([event, selectBox]) => {
                return {
                    'dts-adding': hasMinimumSize(selectBox, 0, 0) && !this.shortcuts.removeFromSelection(event),
                    'dts-removing': this.shortcuts.removeFromSelection(event)
                };
            })), distinctUntilChanged((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            (a, b) => JSON.stringify(a) === JSON.stringify(b))));
            /** @type {?} */
            const selectOnMouseUp$ = dragging$.pipe(filter((/**
             * @return {?}
             */
            () => !this.selectOnDrag)), filter((/**
             * @return {?}
             */
            () => !this.selectMode)), filter((/**
             * @param {?} event
             * @return {?}
             */
            event => this._cursorWithinHost(event))), switchMap((/**
             * @param {?} _
             * @return {?}
             */
            _ => mouseup$.pipe(first()))), filter((/**
             * @param {?} event
             * @return {?}
             */
            event => (!this.shortcuts.disableSelection(event) && !this.shortcuts.toggleSingleItem(event)) ||
                this.shortcuts.removeFromSelection(event))));
            /** @type {?} */
            const selectOnDrag$ = selectBox$.pipe(auditTime(AUDIT_TIME), withLatestFrom(mousemove$, (/**
             * @param {?} selectBox
             * @param {?} event
             * @return {?}
             */
            (selectBox, event) => ({
                selectBox,
                event
            }))), filter((/**
             * @return {?}
             */
            () => this.selectOnDrag)), filter((/**
             * @param {?} __0
             * @return {?}
             */
            ({ selectBox }) => hasMinimumSize(selectBox))), map((/**
             * @param {?} __0
             * @return {?}
             */
            ({ event }) => event)));
            /** @type {?} */
            const selectOnKeyboardEvent$ = merge(this.keyboardEvents.distinctKeydown$, this.keyboardEvents.distinctKeyup$).pipe(auditTime(AUDIT_TIME), whenSelectBoxVisible(selectBox$), tap((/**
             * @param {?} event
             * @return {?}
             */
            event => {
                if (this._isExtendedSelection(event)) {
                    this._tmpItems.clear();
                }
                else {
                    this._flushItems();
                }
            })));
            merge(selectOnMouseUp$, selectOnDrag$, selectOnKeyboardEvent$)
                .pipe(takeUntil(this.destroy$))
                .subscribe((/**
             * @param {?} event
             * @return {?}
             */
            event => this._selectItems(event)));
            this.selectBoxStyles$ = selectBox$.pipe(map((/**
             * @param {?} selectBox
             * @return {?}
             */
            selectBox => ({
                top: `${selectBox.top}px`,
                left: `${selectBox.left}px`,
                width: `${selectBox.width}px`,
                height: `${selectBox.height}px`,
                opacity: selectBox.opacity
            }))));
            this._initSelectionOutputs(mousedown$, mouseup$);
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._selectableItems = this.$selectableItems.toArray();
    }
    /**
     * @return {?}
     */
    selectAll() {
        this.$selectableItems.forEach((/**
         * @param {?} item
         * @return {?}
         */
        item => {
            this._selectItem(item);
        }));
    }
    /**
     * @template T
     * @param {?} predicate
     * @return {?}
     */
    toggleItems(predicate) {
        this._filterSelectableItems(predicate).subscribe((/**
         * @param {?} item
         * @return {?}
         */
        (item) => this._toggleItem(item)));
    }
    /**
     * @template T
     * @param {?} predicate
     * @return {?}
     */
    selectItems(predicate) {
        this._filterSelectableItems(predicate).subscribe((/**
         * @param {?} item
         * @return {?}
         */
        (item) => this._selectItem(item)));
    }
    /**
     * @template T
     * @param {?} predicate
     * @return {?}
     */
    deselectItems(predicate) {
        this._filterSelectableItems(predicate).subscribe((/**
         * @param {?} item
         * @return {?}
         */
        (item) => this._deselectItem(item)));
    }
    /**
     * @return {?}
     */
    clearSelection() {
        this.$selectableItems.forEach((/**
         * @param {?} item
         * @return {?}
         */
        item => {
            this._deselectItem(item);
        }));
    }
    /**
     * @return {?}
     */
    update() {
        this._calculateBoundingClientRect();
        this.$selectableItems.forEach((/**
         * @param {?} item
         * @return {?}
         */
        item => item.calculateBoundingClientRect()));
    }
    /**
     * @param {?} startIndex
     * @param {?} endIndex
     * @return {?}
     */
    selectRange(startIndex, endIndex) {
        this.$selectableItems.forEach((/**
         * @param {?} item
         * @param {?} index
         * @return {?}
         */
        (item, index) => {
            if (index >= startIndex && index <= endIndex) {
                this._selectItem(item);
            }
            else {
                this._deselectItem(item);
            }
        }));
    }
    /**
     * @param {?} indexArray
     * @return {?}
     */
    selectArray(indexArray) {
        this.$selectableItems.forEach((/**
         * @param {?} item
         * @param {?} index
         * @return {?}
         */
        (item, index) => {
            if (indexArray.includes(index)) {
                this._selectItem(item);
            }
            else {
                this._deselectItem(item);
            }
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    /**
     * @private
     * @template T
     * @param {?} predicate
     * @return {?}
     */
    _filterSelectableItems(predicate) {
        // Wrap select items in an observable for better efficiency as
        // no intermediate arrays are created and we only need to process
        // every item once.
        return from(this._selectableItems).pipe(filter((/**
         * @param {?} item
         * @return {?}
         */
        item => predicate(item.value))));
    }
    /**
     * @private
     * @return {?}
     */
    _initSelectedItemsChange() {
        this._selectedItems$
            .pipe(auditTime(AUDIT_TIME), takeUntil(this.destroy$))
            .subscribe({
            next: (/**
             * @param {?} selectedItems
             * @return {?}
             */
            selectedItems => {
                this.selectedItemsChange.emit(selectedItems);
                this.select.emit(selectedItems);
            }),
            complete: (/**
             * @return {?}
             */
            () => {
                this.selectedItemsChange.emit([]);
            })
        });
    }
    /**
     * @private
     * @return {?}
     */
    _observeSelectableItems() {
        // Listen for updates and either select or deselect an item
        this.updateItems$
            .pipe(withLatestFrom(this._selectedItems$), takeUntil(this.destroy$))
            .subscribe((/**
         * @param {?} __0
         * @return {?}
         */
        ([update, selectedItems]) => {
            /** @type {?} */
            const item = update.item;
            console.log('Updating item: ' + item + ' Update type: ' + update.type);
            switch (update.type) {
                case UpdateActions.Add:
                    if (this._addItem(item, selectedItems)) {
                        item._select();
                    }
                    break;
                case UpdateActions.Remove:
                    if (this._removeItem(item, selectedItems)) {
                        item._deselect();
                    }
                    break;
            }
        }));
        // Update the container as well as all selectable items if the list has changed
        this.$selectableItems.changes
            .pipe(withLatestFrom(this._selectedItems$), observeOn(asyncScheduler), takeUntil(this.destroy$))
            .subscribe((/**
         * @param {?} __0
         * @return {?}
         */
        ([items, selectedItems]) => {
            /** @type {?} */
            const newList = items.toArray();
            this._selectableItems = newList;
            /** @type {?} */
            const removedItems = selectedItems.filter((/**
             * @param {?} item
             * @return {?}
             */
            item => !newList.includes(item.value)));
            if (removedItems.length) {
                removedItems.forEach((/**
                 * @param {?} item
                 * @return {?}
                 */
                item => this._removeItem(item, selectedItems)));
            }
            this.update();
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _observeBoundingRectChanges() {
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const resize$ = fromEvent(window, 'resize');
            /** @type {?} */
            const windowScroll$ = fromEvent(window, 'scroll');
            /** @type {?} */
            const containerScroll$ = fromEvent(this.host, 'scroll');
            merge(resize$, windowScroll$, containerScroll$)
                .pipe(startWith('INITIAL_UPDATE'), auditTime(AUDIT_TIME), takeUntil(this.destroy$))
                .subscribe((/**
             * @return {?}
             */
            () => {
                this.update();
            }));
        }));
    }
    /**
     * @private
     * @param {?} mousedown$
     * @param {?} mouseup$
     * @return {?}
     */
    _initSelectionOutputs(mousedown$, mouseup$) {
        mousedown$
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        event => this._cursorWithinHost(event))), tap((/**
         * @return {?}
         */
        () => this.selectionStarted.emit())), concatMapTo(mouseup$.pipe(first())), withLatestFrom(this._selectedItems$), map((/**
         * @param {?} __0
         * @return {?}
         */
        ([, items]) => items)), takeUntil(this.destroy$))
            .subscribe((/**
         * @param {?} items
         * @return {?}
         */
        items => {
            this.selectionEnded.emit(items);
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _calculateBoundingClientRect() {
        this.host.boundingClientRect = calculateBoundingClientRect(this.host);
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    _cursorWithinHost(event) {
        return cursorWithinElement(event, this.host);
    }
    /**
     * @private
     * @return {?}
     */
    _onMouseUp() {
        this._flushItems();
        this.renderer.removeClass(document.body, NO_SELECT_CLASS);
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    _onMouseDown(event) {
        if (this.shortcuts.disableSelection(event) || this.disabled) {
            return;
        }
        clearSelection(window);
        if (!this.disableDrag) {
            this.renderer.addClass(document.body, NO_SELECT_CLASS);
        }
        if (this.shortcuts.removeFromSelection(event)) {
            return;
        }
        /** @type {?} */
        const mousePoint = getMousePosition(event);
        const [currentIndex, clickedItem] = this._getClosestSelectItem(event);
        let [startIndex, endIndex] = this._lastRange;
        /** @type {?} */
        const isMoveRangeStart = this.shortcuts.moveRangeStart(event);
        /** @type {?} */
        const shouldResetRangeSelection = !this.shortcuts.extendedSelectionShortcut(event) || isMoveRangeStart || this.disableRangeSelection;
        if (shouldResetRangeSelection) {
            this._resetRangeStart();
        }
        // move range start
        if (shouldResetRangeSelection && !this.disableRangeSelection) {
            if (currentIndex > -1) {
                this._newRangeStart = true;
                this._lastStartIndex = currentIndex;
                clickedItem.toggleRangeStart();
                this._lastRangeSelection.clear();
            }
            else {
                this._lastStartIndex = -1;
            }
        }
        if (currentIndex > -1) {
            startIndex = Math.min(this._lastStartIndex, currentIndex);
            endIndex = Math.max(this._lastStartIndex, currentIndex);
            this._lastRange = [startIndex, endIndex];
        }
        if (isMoveRangeStart) {
            return;
        }
        this.$selectableItems.forEach((/**
         * @param {?} item
         * @param {?} index
         * @return {?}
         */
        (item, index) => {
            /** @type {?} */
            const itemRect = item.getBoundingClientRect();
            /** @type {?} */
            const withinBoundingBox = inBoundingBox(mousePoint, itemRect);
            if (this.shortcuts.extendedSelectionShortcut(event) && this.disableRangeSelection) {
                return;
            }
            /** @type {?} */
            const withinRange = this.shortcuts.extendedSelectionShortcut(event) &&
                startIndex > -1 &&
                endIndex > -1 &&
                index >= startIndex &&
                index <= endIndex &&
                startIndex !== endIndex;
            /** @type {?} */
            const shouldAdd = (withinBoundingBox &&
                !this.shortcuts.toggleSingleItem(event) &&
                !this.selectMode &&
                !this.selectWithShortcut) ||
                (this.shortcuts.extendedSelectionShortcut(event) && item.selected && !this._lastRangeSelection.get(item)) ||
                withinRange ||
                (withinBoundingBox && this.shortcuts.toggleSingleItem(event) && !item.selected) ||
                (!withinBoundingBox && this.shortcuts.toggleSingleItem(event) && item.selected) ||
                (withinBoundingBox && !item.selected && this.selectMode) ||
                (!withinBoundingBox && item.selected && this.selectMode);
            /** @type {?} */
            const shouldRemove = (!withinBoundingBox &&
                !this.shortcuts.toggleSingleItem(event) &&
                !this.selectMode &&
                !this.shortcuts.extendedSelectionShortcut(event) &&
                !this.selectWithShortcut) ||
                (this.shortcuts.extendedSelectionShortcut(event) && currentIndex > -1) ||
                (!withinBoundingBox && this.shortcuts.toggleSingleItem(event) && !item.selected) ||
                (withinBoundingBox && this.shortcuts.toggleSingleItem(event) && item.selected) ||
                (!withinBoundingBox && !item.selected && this.selectMode) ||
                (withinBoundingBox && item.selected && this.selectMode);
            if (shouldAdd) {
                this._selectItem(item);
            }
            else if (shouldRemove) {
                this._deselectItem(item);
            }
            if (withinRange && !this._lastRangeSelection.get(item)) {
                this._lastRangeSelection.set(item, true);
            }
            else if (!withinRange && !this._newRangeStart && !item.selected) {
                this._lastRangeSelection.delete(item);
            }
        }));
        // if we don't toggle a single item, we set `newRangeStart` to `false`
        // meaning that we are building up a range
        if (!this.shortcuts.toggleSingleItem(event)) {
            this._newRangeStart = false;
        }
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    _selectItems(event) {
        /** @type {?} */
        const selectionBox = calculateBoundingClientRect(this.$selectBox.nativeElement);
        this.$selectableItems.forEach((/**
         * @param {?} item
         * @param {?} index
         * @return {?}
         */
        (item, index) => {
            if (this._isExtendedSelection(event)) {
                this._extendedSelectionMode(selectionBox, item, event);
            }
            else {
                this._normalSelectionMode(selectionBox, item, event);
                if (this._lastStartIndex < 0 && item.selected) {
                    item.toggleRangeStart();
                    this._lastStartIndex = index;
                }
            }
        }));
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    _isExtendedSelection(event) {
        return this.shortcuts.extendedSelectionShortcut(event) && this.selectOnDrag;
    }
    /**
     * @private
     * @param {?} selectBox
     * @param {?} item
     * @param {?} event
     * @return {?}
     */
    _normalSelectionMode(selectBox, item, event) {
        /** @type {?} */
        const inSelection = boxIntersects(selectBox, item.getBoundingClientRect());
        /** @type {?} */
        const shouldAdd = inSelection && !item.selected && !this.shortcuts.removeFromSelection(event);
        /** @type {?} */
        const shouldRemove = (!inSelection && item.selected && !this.shortcuts.addToSelection(event)) ||
            (inSelection && item.selected && this.shortcuts.removeFromSelection(event));
        if (shouldAdd) {
            this._selectItem(item);
        }
        else if (shouldRemove) {
            this._deselectItem(item);
        }
    }
    /**
     * @private
     * @param {?} selectBox
     * @param {?} item
     * @param {?} event
     * @return {?}
     */
    _extendedSelectionMode(selectBox, item, event) {
        /** @type {?} */
        const inSelection = boxIntersects(selectBox, item.getBoundingClientRect());
        /** @type {?} */
        const shoudlAdd = (inSelection && !item.selected && !this.shortcuts.removeFromSelection(event) && !this._tmpItems.has(item)) ||
            (inSelection && item.selected && this.shortcuts.removeFromSelection(event) && !this._tmpItems.has(item));
        /** @type {?} */
        const shouldRemove = (!inSelection && item.selected && this.shortcuts.addToSelection(event) && this._tmpItems.has(item)) ||
            (!inSelection && !item.selected && this.shortcuts.removeFromSelection(event) && this._tmpItems.has(item));
        if (shoudlAdd) {
            item.selected ? item._deselect() : item._select();
            /** @type {?} */
            const action = this.shortcuts.removeFromSelection(event)
                ? Action.Delete
                : this.shortcuts.addToSelection(event)
                    ? Action.Add
                    : Action.None;
            this._tmpItems.set(item, action);
        }
        else if (shouldRemove) {
            this.shortcuts.removeFromSelection(event) ? item._select() : item._deselect();
            this._tmpItems.delete(item);
        }
    }
    /**
     * @private
     * @return {?}
     */
    _flushItems() {
        this._tmpItems.forEach((/**
         * @param {?} action
         * @param {?} item
         * @return {?}
         */
        (action, item) => {
            if (action === Action.Add) {
                this._selectItem(item);
            }
            if (action === Action.Delete) {
                this._deselectItem(item);
            }
        }));
        this._tmpItems.clear();
    }
    /**
     * @private
     * @param {?} item
     * @param {?} selectedItems
     * @return {?}
     */
    _addItem(item, selectedItems) {
        /** @type {?} */
        let success = false;
        if (!this._hasItem(item, selectedItems)) {
            success = true;
            selectedItems.push(item.value);
            this._selectedItems$.next(selectedItems);
            this.itemSelected.emit(item.value);
        }
        return success;
    }
    /**
     * @private
     * @param {?} item
     * @param {?} selectedItems
     * @return {?}
     */
    _removeItem(item, selectedItems) {
        /** @type {?} */
        let success = false;
        /** @type {?} */
        const value = item instanceof SelectItemDirective ? item.value : item;
        /** @type {?} */
        const index = selectedItems.indexOf(value);
        if (index > -1) {
            success = true;
            selectedItems.splice(index, 1);
            this._selectedItems$.next(selectedItems);
            this.itemDeselected.emit(item.value);
        }
        return success;
    }
    /**
     * @private
     * @param {?} item
     * @return {?}
     */
    _toggleItem(item) {
        if (item.selected) {
            this._deselectItem(item);
        }
        else {
            this._selectItem(item);
        }
    }
    /**
     * @private
     * @param {?} item
     * @return {?}
     */
    _selectItem(item) {
        this.updateItems$.next({ type: UpdateActions.Add, item });
    }
    /**
     * @private
     * @param {?} item
     * @return {?}
     */
    _deselectItem(item) {
        this.updateItems$.next({ type: UpdateActions.Remove, item });
    }
    /**
     * @private
     * @param {?} item
     * @param {?} selectedItems
     * @return {?}
     */
    _hasItem(item, selectedItems) {
        return selectedItems.includes(item.value);
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    _getClosestSelectItem(event) {
        /** @type {?} */
        const target = ((/** @type {?} */ (event.target))).closest('.dts-select-item');
        /** @type {?} */
        let index = -1;
        /** @type {?} */
        let targetItem = null;
        if (target) {
            targetItem = target[SELECT_ITEM_INSTANCE];
            index = this._selectableItems.indexOf(targetItem);
        }
        return [index, targetItem];
    }
    /**
     * @private
     * @return {?}
     */
    _resetRangeStart() {
        this._lastRange = [-1, -1];
        /** @type {?} */
        const lastRangeStart = this._getLastRangeSelection();
        if (lastRangeStart && lastRangeStart.rangeStart) {
            lastRangeStart.toggleRangeStart();
        }
    }
    /**
     * @private
     * @return {?}
     */
    _getLastRangeSelection() {
        if (this._lastStartIndex >= 0) {
            return this._selectableItems[this._lastStartIndex];
        }
        return null;
    }
}
SelectContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'dts-select-container',
                exportAs: 'dts-select-container',
                host: {
                    class: 'dts-select-container'
                },
                template: `
    <ng-content></ng-content>
    <div
      class="dts-select-box"
      #selectBox
      [ngClass]="selectBoxClasses$ | async"
      [ngStyle]="selectBoxStyles$ | async"
    ></div>
  `,
                styles: [":host{display:block;position:relative}"]
            }] }
];
/** @nocollapse */
SelectContainerComponent.ctorParameters = () => [
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: ShortcutService },
    { type: KeyboardEventsService },
    { type: ElementRef },
    { type: Renderer2 },
    { type: NgZone }
];
SelectContainerComponent.propDecorators = {
    $selectBox: [{ type: ViewChild, args: ['selectBox', { static: true },] }],
    $selectableItems: [{ type: ContentChildren, args: [SelectItemDirective, { descendants: true },] }],
    selectedItems: [{ type: Input }],
    selectOnDrag: [{ type: Input }],
    disabled: [{ type: Input }],
    disableDrag: [{ type: Input }],
    disableRangeSelection: [{ type: Input }],
    selectMode: [{ type: Input }],
    selectWithShortcut: [{ type: Input }],
    custom: [{ type: Input }, { type: HostBinding, args: ['class.dts-custom',] }],
    selectedItemsChange: [{ type: Output }],
    select: [{ type: Output }],
    itemSelected: [{ type: Output }],
    itemDeselected: [{ type: Output }],
    selectionStarted: [{ type: Output }],
    selectionEnded: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    SelectContainerComponent.prototype.host;
    /** @type {?} */
    SelectContainerComponent.prototype.selectBoxStyles$;
    /** @type {?} */
    SelectContainerComponent.prototype.selectBoxClasses$;
    /**
     * @type {?}
     * @private
     */
    SelectContainerComponent.prototype.$selectBox;
    /**
     * @type {?}
     * @private
     */
    SelectContainerComponent.prototype.$selectableItems;
    /** @type {?} */
    SelectContainerComponent.prototype.selectedItems;
    /** @type {?} */
    SelectContainerComponent.prototype.selectOnDrag;
    /** @type {?} */
    SelectContainerComponent.prototype.disabled;
    /** @type {?} */
    SelectContainerComponent.prototype.disableDrag;
    /** @type {?} */
    SelectContainerComponent.prototype.disableRangeSelection;
    /** @type {?} */
    SelectContainerComponent.prototype.selectMode;
    /** @type {?} */
    SelectContainerComponent.prototype.selectWithShortcut;
    /** @type {?} */
    SelectContainerComponent.prototype.custom;
    /** @type {?} */
    SelectContainerComponent.prototype.selectedItemsChange;
    /** @type {?} */
    SelectContainerComponent.prototype.select;
    /** @type {?} */
    SelectContainerComponent.prototype.itemSelected;
    /** @type {?} */
    SelectContainerComponent.prototype.itemDeselected;
    /** @type {?} */
    SelectContainerComponent.prototype.selectionStarted;
    /** @type {?} */
    SelectContainerComponent.prototype.selectionEnded;
    /**
     * @type {?}
     * @private
     */
    SelectContainerComponent.prototype._tmpItems;
    /**
     * @type {?}
     * @private
     */
    SelectContainerComponent.prototype._selectedItems$;
    /**
     * @type {?}
     * @private
     */
    SelectContainerComponent.prototype._selectableItems;
    /**
     * @type {?}
     * @private
     */
    SelectContainerComponent.prototype.updateItems$;
    /**
     * @type {?}
     * @private
     */
    SelectContainerComponent.prototype.destroy$;
    /**
     * @type {?}
     * @private
     */
    SelectContainerComponent.prototype._lastRange;
    /**
     * @type {?}
     * @private
     */
    SelectContainerComponent.prototype._lastStartIndex;
    /**
     * @type {?}
     * @private
     */
    SelectContainerComponent.prototype._newRangeStart;
    /**
     * @type {?}
     * @private
     */
    SelectContainerComponent.prototype._lastRangeSelection;
    /**
     * @type {?}
     * @private
     */
    SelectContainerComponent.prototype.platformId;
    /**
     * @type {?}
     * @private
     */
    SelectContainerComponent.prototype.shortcuts;
    /**
     * @type {?}
     * @private
     */
    SelectContainerComponent.prototype.keyboardEvents;
    /**
     * @type {?}
     * @private
     */
    SelectContainerComponent.prototype.hostElementRef;
    /**
     * @type {?}
     * @private
     */
    SelectContainerComponent.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    SelectContainerComponent.prototype.ngZone;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const COMPONENTS = [SelectContainerComponent, SelectItemDirective];
/**
 * @param {?} config
 * @return {?}
 */
function CONFIG_FACTORY(config) {
    return mergeDeep(DEFAULT_CONFIG, config);
}
class DragToSelectModule {
    /**
     * @param {?=} config
     * @return {?}
     */
    static forRoot(config = {}) {
        return {
            ngModule: DragToSelectModule,
            providers: [
                ShortcutService,
                KeyboardEventsService,
                { provide: USER_CONFIG, useValue: config },
                {
                    provide: CONFIG,
                    useFactory: CONFIG_FACTORY,
                    deps: [USER_CONFIG]
                }
            ]
        };
    }
}
DragToSelectModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [...COMPONENTS],
                exports: [...COMPONENTS]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { CONFIG_FACTORY, DragToSelectModule, SELECT_ITEM_INSTANCE, SelectContainerComponent, SelectItemDirective, mergeDeep as ɵa, DEFAULT_CONFIG as ɵb, CONFIG as ɵc, USER_CONFIG as ɵd, ShortcutService as ɵf, KeyboardEventsService as ɵg };
//# sourceMappingURL=ngx-drag-to-select.js.map
