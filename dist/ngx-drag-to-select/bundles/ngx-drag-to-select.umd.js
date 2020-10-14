(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('ngx-drag-to-select', ['exports', '@angular/common', '@angular/core', 'rxjs', 'rxjs/operators'], factory) :
    (global = global || self, factory(global['ngx-drag-to-select'] = {}, global.ng.common, global.ng.core, global.rxjs, global.rxjs.operators));
}(this, (function (exports, common, core, rxjs, operators) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __createBinding(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    }

    function __exportStar(m, exports) {
        for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var DEFAULT_CONFIG = {
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
    var AUDIT_TIME = 16;
    /** @type {?} */
    var MIN_WIDTH = 5;
    /** @type {?} */
    var MIN_HEIGHT = 5;
    /** @type {?} */
    var NO_SELECT_CLASS = 'dts-no-select';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var isObject = (/**
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
    function mergeDeep(target, source) {
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
    var hasMinimumSize = (/**
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
    var clearSelection = (/**
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
    var inBoundingBox = (/**
     * @param {?} point
     * @param {?} box
     * @return {?}
     */
    function (point, box) {
        return (box.left <= point.x && point.x <= box.left + box.width && box.top <= point.y && point.y <= box.top + box.height);
    });
    /** @type {?} */
    var boxIntersects = (/**
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
    var calculateBoundingClientRect = (/**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        return element.getBoundingClientRect();
    });
    /** @type {?} */
    var getMousePosition = (/**
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
    var getScroll = (/**
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
    var getRelativeMousePosition = (/**
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
    var cursorWithinElement = (/**
     * @param {?} event
     * @param {?} element
     * @return {?}
     */
    function (event, element) {
        /** @type {?} */
        var mousePoint = getMousePosition(event);
        return inBoundingBox(mousePoint, calculateBoundingClientRect(element));
    });

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var createSelectBox = (/**
     * @param {?} container
     * @return {?}
     */
    function (container) { return (/**
     * @param {?} source
     * @return {?}
     */
    function (source) {
        return source.pipe(operators.map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = __read(_a, 3), event = _b[0], opacity = _b[1], _c = _b[2], x = _c.x, y = _c.y;
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
    var whenSelectBoxVisible = (/**
     * @param {?} selectBox$
     * @return {?}
     */
    function (selectBox$) { return (/**
     * @param {?} source
     * @return {?}
     */
    function (source) {
        return source.pipe(operators.withLatestFrom(selectBox$), operators.filter((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = __read(_a, 2), selectBox = _b[1];
            return hasMinimumSize(selectBox, 0, 0);
        })), operators.map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = __read(_a, 2), event = _b[0], _ = _b[1];
            return event;
        })));
    }); });
    /** @type {?} */
    var distinctKeyEvents = (/**
     * @return {?}
     */
    function () { return (/**
     * @param {?} source
     * @return {?}
     */
    function (source) {
        return source.pipe(operators.distinctUntilChanged((/**
         * @param {?} prev
         * @param {?} curr
         * @return {?}
         */
        function (prev, curr) {
            return prev && curr && prev.code === curr.code;
        })));
    }); });

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var KeyboardEventsService = /** @class */ (function () {
        function KeyboardEventsService(platformId) {
            this.platformId = platformId;
            if (common.isPlatformBrowser(this.platformId)) {
                this._initializeKeyboardStreams();
            }
        }
        /**
         * @private
         * @return {?}
         */
        KeyboardEventsService.prototype._initializeKeyboardStreams = /**
         * @private
         * @return {?}
         */
        function () {
            this.keydown$ = rxjs.fromEvent(window, 'keydown').pipe(operators.share());
            this.keyup$ = rxjs.fromEvent(window, 'keyup').pipe(operators.share());
            // distinctKeyEvents is used to prevent multiple key events to be fired repeatedly
            // on Windows when a key is being pressed
            this.distinctKeydown$ = this.keydown$.pipe(distinctKeyEvents(), operators.share());
            this.distinctKeyup$ = this.keyup$.pipe(distinctKeyEvents(), operators.share());
            this.mouseup$ = rxjs.fromEvent(window, 'mouseup').pipe(operators.share());
            this.mousemove$ = rxjs.fromEvent(window, 'mousemove').pipe(operators.share());
        };
        KeyboardEventsService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        KeyboardEventsService.ctorParameters = function () { return [
            { type: Object, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] }
        ]; };
        return KeyboardEventsService;
    }());
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
    var CONFIG = new core.InjectionToken('DRAG_TO_SELECT_CONFIG');
    /** @type {?} */
    var USER_CONFIG = new core.InjectionToken('USER_CONFIG');

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var SELECT_ITEM_INSTANCE = Symbol();
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
            if (common.isPlatformBrowser(this.platformId) && !this._boundingClientRect) {
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
            { type: core.Directive, args: [{
                        selector: '[dtsSelectItem]',
                        exportAs: 'dtsSelectItem',
                        host: {
                            class: 'dts-select-item'
                        }
                    },] }
        ];
        /** @nocollapse */
        SelectItemDirective.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [CONFIG,] }] },
            { type: Object, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] },
            { type: core.ElementRef },
            { type: core.Renderer2 }
        ]; };
        SelectItemDirective.propDecorators = {
            rangeStart: [{ type: core.HostBinding, args: ['class.dts-range-start',] }],
            dtsSelectItem: [{ type: core.Input }]
        };
        return SelectItemDirective;
    }());
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

    var _a;
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
            if (common.isPlatformBrowser(this.platformId)) {
                /** @type {?} */
                var keydown$ = this.keyboardEvents.keydown$.pipe(operators.map((/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) { return ({ code: event.code, pressed: true }); })));
                /** @type {?} */
                var keyup$ = this.keyboardEvents.keyup$.pipe(operators.map((/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) { return ({ code: event.code, pressed: false }); })));
                rxjs.merge(keydown$, keyup$)
                    .pipe(operators.distinctUntilChanged((/**
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
                for (var _b = __values(Object.entries(shortcuts)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 2), key = _d[0], shortcutsForCommand = _d[1];
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
                    substitutedShortcut.push(__spread(cleanShortcut_1, [alias]));
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
            { type: core.Injectable }
        ];
        /** @nocollapse */
        ShortcutService.ctorParameters = function () { return [
            { type: Object, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] },
            { type: undefined, decorators: [{ type: core.Inject, args: [CONFIG,] }] },
            { type: KeyboardEventsService }
        ]; };
        return ShortcutService;
    }());
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
    var UpdateActions = {
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
    var Action = {
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
    var SelectContainerComponent = /** @class */ (function () {
        function SelectContainerComponent(platformId, shortcuts, keyboardEvents, hostElementRef, renderer, ngZone) {
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
            this.selectedItemsChange = new core.EventEmitter();
            this.select = new core.EventEmitter();
            this.itemSelected = new core.EventEmitter();
            this.itemDeselected = new core.EventEmitter();
            this.selectionStarted = new core.EventEmitter();
            this.selectionEnded = new core.EventEmitter();
            this._tmpItems = new Map();
            this._selectedItems$ = new rxjs.BehaviorSubject([]);
            this._selectableItems = [];
            this.updateItems$ = new rxjs.Subject();
            this.destroy$ = new rxjs.Subject();
            this._lastRange = [-1, -1];
            this._lastStartIndex = undefined;
            this._newRangeStart = false;
            this._lastRangeSelection = new Map();
        }
        /**
         * @return {?}
         */
        SelectContainerComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (common.isPlatformBrowser(this.platformId)) {
                this.host = this.hostElementRef.nativeElement;
                this._initSelectedItemsChange();
                this._calculateBoundingClientRect();
                this._observeBoundingRectChanges();
                this._observeSelectableItems();
                /** @type {?} */
                var mouseup$_1 = this.keyboardEvents.mouseup$.pipe(operators.filter((/**
                 * @return {?}
                 */
                function () { return !_this.disabled; })), operators.tap((/**
                 * @return {?}
                 */
                function () { return _this._onMouseUp(); })), operators.share());
                /** @type {?} */
                var mousemove$_1 = this.keyboardEvents.mousemove$.pipe(operators.filter((/**
                 * @return {?}
                 */
                function () { return !_this.disabled; })), operators.share());
                /** @type {?} */
                var mousedown$ = rxjs.fromEvent(this.host, 'mousedown').pipe(operators.filter((/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) { return event.button === 0; })), // only emit left mouse
                operators.filter((/**
                 * @return {?}
                 */
                function () { return !_this.disabled; })), operators.tap((/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) { return _this._onMouseDown(event); })), operators.share());
                /** @type {?} */
                var dragging$ = mousedown$.pipe(operators.filter((/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) { return !_this.shortcuts.disableSelection(event); })), operators.filter((/**
                 * @return {?}
                 */
                function () { return !_this.selectMode; })), operators.filter((/**
                 * @return {?}
                 */
                function () { return !_this.disableDrag; })), operators.switchMap((/**
                 * @return {?}
                 */
                function () { return mousemove$_1.pipe(operators.takeUntil(mouseup$_1)); })), operators.share());
                /** @type {?} */
                var currentMousePosition$ = mousedown$.pipe(operators.map((/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) { return getRelativeMousePosition(event, _this.host); })));
                /** @type {?} */
                var show$ = dragging$.pipe(operators.mapTo(1));
                /** @type {?} */
                var hide$ = mouseup$_1.pipe(operators.mapTo(0));
                /** @type {?} */
                var opacity$ = rxjs.merge(show$, hide$).pipe(operators.distinctUntilChanged());
                /** @type {?} */
                var selectBox$ = rxjs.combineLatest([dragging$, opacity$, currentMousePosition$]).pipe(createSelectBox(this.host), operators.share());
                this.selectBoxClasses$ = rxjs.merge(dragging$, mouseup$_1, this.keyboardEvents.distinctKeydown$, this.keyboardEvents.distinctKeyup$).pipe(operators.auditTime(AUDIT_TIME), operators.withLatestFrom(selectBox$), operators.map((/**
                 * @param {?} __0
                 * @return {?}
                 */
                function (_a) {
                    var _b = __read(_a, 2), event = _b[0], selectBox = _b[1];
                    return {
                        'dts-adding': hasMinimumSize(selectBox, 0, 0) && !_this.shortcuts.removeFromSelection(event),
                        'dts-removing': _this.shortcuts.removeFromSelection(event)
                    };
                })), operators.distinctUntilChanged((/**
                 * @param {?} a
                 * @param {?} b
                 * @return {?}
                 */
                function (a, b) { return JSON.stringify(a) === JSON.stringify(b); })));
                /** @type {?} */
                var selectOnMouseUp$ = dragging$.pipe(operators.filter((/**
                 * @return {?}
                 */
                function () { return !_this.selectOnDrag; })), operators.filter((/**
                 * @return {?}
                 */
                function () { return !_this.selectMode; })), operators.filter((/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) { return _this._cursorWithinHost(event); })), operators.switchMap((/**
                 * @param {?} _
                 * @return {?}
                 */
                function (_) { return mouseup$_1.pipe(operators.first()); })), operators.filter((/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    return (!_this.shortcuts.disableSelection(event) && !_this.shortcuts.toggleSingleItem(event)) ||
                        _this.shortcuts.removeFromSelection(event);
                })));
                /** @type {?} */
                var selectOnDrag$ = selectBox$.pipe(operators.auditTime(AUDIT_TIME), operators.withLatestFrom(mousemove$_1, (/**
                 * @param {?} selectBox
                 * @param {?} event
                 * @return {?}
                 */
                function (selectBox, event) { return ({
                    selectBox: selectBox,
                    event: event
                }); })), operators.filter((/**
                 * @return {?}
                 */
                function () { return _this.selectOnDrag; })), operators.filter((/**
                 * @param {?} __0
                 * @return {?}
                 */
                function (_a) {
                    var selectBox = _a.selectBox;
                    return hasMinimumSize(selectBox);
                })), operators.map((/**
                 * @param {?} __0
                 * @return {?}
                 */
                function (_a) {
                    var event = _a.event;
                    return event;
                })));
                /** @type {?} */
                var selectOnKeyboardEvent$ = rxjs.merge(this.keyboardEvents.distinctKeydown$, this.keyboardEvents.distinctKeyup$).pipe(operators.auditTime(AUDIT_TIME), whenSelectBoxVisible(selectBox$), operators.tap((/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    if (_this._isExtendedSelection(event)) {
                        _this._tmpItems.clear();
                    }
                    else {
                        _this._flushItems();
                    }
                })));
                rxjs.merge(selectOnMouseUp$, selectOnDrag$, selectOnKeyboardEvent$)
                    .pipe(operators.takeUntil(this.destroy$))
                    .subscribe((/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) { return _this._selectItems(event); }));
                this.selectBoxStyles$ = selectBox$.pipe(operators.map((/**
                 * @param {?} selectBox
                 * @return {?}
                 */
                function (selectBox) { return ({
                    top: selectBox.top + "px",
                    left: selectBox.left + "px",
                    width: selectBox.width + "px",
                    height: selectBox.height + "px",
                    opacity: selectBox.opacity
                }); })));
                this._initSelectionOutputs(mousedown$, mouseup$_1);
            }
        };
        /**
         * @return {?}
         */
        SelectContainerComponent.prototype.ngAfterContentInit = /**
         * @return {?}
         */
        function () {
            this._selectableItems = this.$selectableItems.toArray();
        };
        /**
         * @return {?}
         */
        SelectContainerComponent.prototype.selectAll = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.$selectableItems.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                _this._selectItem(item);
            }));
        };
        /**
         * @template T
         * @param {?} predicate
         * @return {?}
         */
        SelectContainerComponent.prototype.toggleItems = /**
         * @template T
         * @param {?} predicate
         * @return {?}
         */
        function (predicate) {
            var _this = this;
            this._filterSelectableItems(predicate).subscribe((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return _this._toggleItem(item); }));
        };
        /**
         * @template T
         * @param {?} predicate
         * @return {?}
         */
        SelectContainerComponent.prototype.selectItems = /**
         * @template T
         * @param {?} predicate
         * @return {?}
         */
        function (predicate) {
            var _this = this;
            this._filterSelectableItems(predicate).subscribe((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return _this._selectItem(item); }));
        };
        /**
         * @template T
         * @param {?} predicate
         * @return {?}
         */
        SelectContainerComponent.prototype.deselectItems = /**
         * @template T
         * @param {?} predicate
         * @return {?}
         */
        function (predicate) {
            var _this = this;
            this._filterSelectableItems(predicate).subscribe((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return _this._deselectItem(item); }));
        };
        /**
         * @return {?}
         */
        SelectContainerComponent.prototype.clearSelection = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.$selectableItems.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                _this._deselectItem(item);
            }));
        };
        /**
         * @return {?}
         */
        SelectContainerComponent.prototype.update = /**
         * @return {?}
         */
        function () {
            this._calculateBoundingClientRect();
            this.$selectableItems.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.calculateBoundingClientRect(); }));
        };
        /**
         * @param {?} startIndex
         * @param {?} endIndex
         * @return {?}
         */
        SelectContainerComponent.prototype.selectRange = /**
         * @param {?} startIndex
         * @param {?} endIndex
         * @return {?}
         */
        function (startIndex, endIndex) {
            var _this = this;
            this.$selectableItems.forEach((/**
             * @param {?} item
             * @param {?} index
             * @return {?}
             */
            function (item, index) {
                if (index >= startIndex && index <= endIndex) {
                    _this._selectItem(item);
                }
                else {
                    _this._deselectItem(item);
                }
            }));
        };
        /**
         * @param {?} indexArray
         * @return {?}
         */
        SelectContainerComponent.prototype.selectArray = /**
         * @param {?} indexArray
         * @return {?}
         */
        function (indexArray) {
            var _this = this;
            this.$selectableItems.forEach((/**
             * @param {?} item
             * @param {?} index
             * @return {?}
             */
            function (item, index) {
                if (indexArray.includes(index)) {
                    _this._selectItem(item);
                }
                else {
                    _this._deselectItem(item);
                }
            }));
        };
        /**
         * @return {?}
         */
        SelectContainerComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.destroy$.next();
            this.destroy$.complete();
        };
        /**
         * @private
         * @template T
         * @param {?} predicate
         * @return {?}
         */
        SelectContainerComponent.prototype._filterSelectableItems = /**
         * @private
         * @template T
         * @param {?} predicate
         * @return {?}
         */
        function (predicate) {
            // Wrap select items in an observable for better efficiency as
            // no intermediate arrays are created and we only need to process
            // every item once.
            return rxjs.from(this._selectableItems).pipe(operators.filter((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return predicate(item.value); })));
        };
        /**
         * @private
         * @return {?}
         */
        SelectContainerComponent.prototype._initSelectedItemsChange = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            this._selectedItems$
                .pipe(operators.auditTime(AUDIT_TIME), operators.takeUntil(this.destroy$))
                .subscribe({
                next: (/**
                 * @param {?} selectedItems
                 * @return {?}
                 */
                function (selectedItems) {
                    _this.selectedItemsChange.emit(selectedItems);
                    _this.select.emit(selectedItems);
                }),
                complete: (/**
                 * @return {?}
                 */
                function () {
                    _this.selectedItemsChange.emit([]);
                })
            });
        };
        /**
         * @private
         * @return {?}
         */
        SelectContainerComponent.prototype._observeSelectableItems = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            // Listen for updates and either select or deselect an item
            this.updateItems$
                .pipe(operators.withLatestFrom(this._selectedItems$), operators.takeUntil(this.destroy$))
                .subscribe((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _b = __read(_a, 2), update = _b[0], selectedItems = _b[1];
                /** @type {?} */
                var item = update.item;
                console.log('Updating item: ' + item + ' Update type: ' + update.type);
                switch (update.type) {
                    case UpdateActions.Add:
                        if (_this._addItem(item, selectedItems)) {
                            item._select();
                        }
                        break;
                    case UpdateActions.Remove:
                        if (_this._removeItem(item, selectedItems)) {
                            item._deselect();
                        }
                        break;
                }
            }));
            // Update the container as well as all selectable items if the list has changed
            this.$selectableItems.changes
                .pipe(operators.withLatestFrom(this._selectedItems$), operators.observeOn(rxjs.asyncScheduler), operators.takeUntil(this.destroy$))
                .subscribe((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _b = __read(_a, 2), items = _b[0], selectedItems = _b[1];
                /** @type {?} */
                var newList = items.toArray();
                _this._selectableItems = newList;
                /** @type {?} */
                var removedItems = selectedItems.filter((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return !newList.includes(item.value); }));
                if (removedItems.length) {
                    removedItems.forEach((/**
                     * @param {?} item
                     * @return {?}
                     */
                    function (item) { return _this._removeItem(item, selectedItems); }));
                }
                _this.update();
            }));
        };
        /**
         * @private
         * @return {?}
         */
        SelectContainerComponent.prototype._observeBoundingRectChanges = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            this.ngZone.runOutsideAngular((/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var resize$ = rxjs.fromEvent(window, 'resize');
                /** @type {?} */
                var windowScroll$ = rxjs.fromEvent(window, 'scroll');
                /** @type {?} */
                var containerScroll$ = rxjs.fromEvent(_this.host, 'scroll');
                rxjs.merge(resize$, windowScroll$, containerScroll$)
                    .pipe(operators.startWith('INITIAL_UPDATE'), operators.auditTime(AUDIT_TIME), operators.takeUntil(_this.destroy$))
                    .subscribe((/**
                 * @return {?}
                 */
                function () {
                    _this.update();
                }));
            }));
        };
        /**
         * @private
         * @param {?} mousedown$
         * @param {?} mouseup$
         * @return {?}
         */
        SelectContainerComponent.prototype._initSelectionOutputs = /**
         * @private
         * @param {?} mousedown$
         * @param {?} mouseup$
         * @return {?}
         */
        function (mousedown$, mouseup$) {
            var _this = this;
            mousedown$
                .pipe(operators.filter((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return _this._cursorWithinHost(event); })), operators.tap((/**
             * @return {?}
             */
            function () { return _this.selectionStarted.emit(); })), operators.concatMapTo(mouseup$.pipe(operators.first())), operators.withLatestFrom(this._selectedItems$), operators.map((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _b = __read(_a, 2), items = _b[1];
                return items;
            })), operators.takeUntil(this.destroy$))
                .subscribe((/**
             * @param {?} items
             * @return {?}
             */
            function (items) {
                _this.selectionEnded.emit(items);
            }));
        };
        /**
         * @private
         * @return {?}
         */
        SelectContainerComponent.prototype._calculateBoundingClientRect = /**
         * @private
         * @return {?}
         */
        function () {
            this.host.boundingClientRect = calculateBoundingClientRect(this.host);
        };
        /**
         * @private
         * @param {?} event
         * @return {?}
         */
        SelectContainerComponent.prototype._cursorWithinHost = /**
         * @private
         * @param {?} event
         * @return {?}
         */
        function (event) {
            return cursorWithinElement(event, this.host);
        };
        /**
         * @private
         * @return {?}
         */
        SelectContainerComponent.prototype._onMouseUp = /**
         * @private
         * @return {?}
         */
        function () {
            this._flushItems();
            this.renderer.removeClass(document.body, NO_SELECT_CLASS);
        };
        /**
         * @private
         * @param {?} event
         * @return {?}
         */
        SelectContainerComponent.prototype._onMouseDown = /**
         * @private
         * @param {?} event
         * @return {?}
         */
        function (event) {
            var _this = this;
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
            var mousePoint = getMousePosition(event);
            var _a = __read(this._getClosestSelectItem(event), 2), currentIndex = _a[0], clickedItem = _a[1];
            var _b = __read(this._lastRange, 2), startIndex = _b[0], endIndex = _b[1];
            /** @type {?} */
            var isMoveRangeStart = this.shortcuts.moveRangeStart(event);
            /** @type {?} */
            var shouldResetRangeSelection = !this.shortcuts.extendedSelectionShortcut(event) || isMoveRangeStart || this.disableRangeSelection;
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
            function (item, index) {
                /** @type {?} */
                var itemRect = item.getBoundingClientRect();
                /** @type {?} */
                var withinBoundingBox = inBoundingBox(mousePoint, itemRect);
                if (_this.shortcuts.extendedSelectionShortcut(event) && _this.disableRangeSelection) {
                    return;
                }
                /** @type {?} */
                var withinRange = _this.shortcuts.extendedSelectionShortcut(event) &&
                    startIndex > -1 &&
                    endIndex > -1 &&
                    index >= startIndex &&
                    index <= endIndex &&
                    startIndex !== endIndex;
                /** @type {?} */
                var shouldAdd = (withinBoundingBox &&
                    !_this.shortcuts.toggleSingleItem(event) &&
                    !_this.selectMode &&
                    !_this.selectWithShortcut) ||
                    (_this.shortcuts.extendedSelectionShortcut(event) && item.selected && !_this._lastRangeSelection.get(item)) ||
                    withinRange ||
                    (withinBoundingBox && _this.shortcuts.toggleSingleItem(event) && !item.selected) ||
                    (!withinBoundingBox && _this.shortcuts.toggleSingleItem(event) && item.selected) ||
                    (withinBoundingBox && !item.selected && _this.selectMode) ||
                    (!withinBoundingBox && item.selected && _this.selectMode);
                /** @type {?} */
                var shouldRemove = (!withinBoundingBox &&
                    !_this.shortcuts.toggleSingleItem(event) &&
                    !_this.selectMode &&
                    !_this.shortcuts.extendedSelectionShortcut(event) &&
                    !_this.selectWithShortcut) ||
                    (_this.shortcuts.extendedSelectionShortcut(event) && currentIndex > -1) ||
                    (!withinBoundingBox && _this.shortcuts.toggleSingleItem(event) && !item.selected) ||
                    (withinBoundingBox && _this.shortcuts.toggleSingleItem(event) && item.selected) ||
                    (!withinBoundingBox && !item.selected && _this.selectMode) ||
                    (withinBoundingBox && item.selected && _this.selectMode);
                if (shouldAdd) {
                    _this._selectItem(item);
                }
                else if (shouldRemove) {
                    _this._deselectItem(item);
                }
                if (withinRange && !_this._lastRangeSelection.get(item)) {
                    _this._lastRangeSelection.set(item, true);
                }
                else if (!withinRange && !_this._newRangeStart && !item.selected) {
                    _this._lastRangeSelection.delete(item);
                }
            }));
            // if we don't toggle a single item, we set `newRangeStart` to `false`
            // meaning that we are building up a range
            if (!this.shortcuts.toggleSingleItem(event)) {
                this._newRangeStart = false;
            }
        };
        /**
         * @private
         * @param {?} event
         * @return {?}
         */
        SelectContainerComponent.prototype._selectItems = /**
         * @private
         * @param {?} event
         * @return {?}
         */
        function (event) {
            var _this = this;
            /** @type {?} */
            var selectionBox = calculateBoundingClientRect(this.$selectBox.nativeElement);
            this.$selectableItems.forEach((/**
             * @param {?} item
             * @param {?} index
             * @return {?}
             */
            function (item, index) {
                if (_this._isExtendedSelection(event)) {
                    _this._extendedSelectionMode(selectionBox, item, event);
                }
                else {
                    _this._normalSelectionMode(selectionBox, item, event);
                    if (_this._lastStartIndex < 0 && item.selected) {
                        item.toggleRangeStart();
                        _this._lastStartIndex = index;
                    }
                }
            }));
        };
        /**
         * @private
         * @param {?} event
         * @return {?}
         */
        SelectContainerComponent.prototype._isExtendedSelection = /**
         * @private
         * @param {?} event
         * @return {?}
         */
        function (event) {
            return this.shortcuts.extendedSelectionShortcut(event) && this.selectOnDrag;
        };
        /**
         * @private
         * @param {?} selectBox
         * @param {?} item
         * @param {?} event
         * @return {?}
         */
        SelectContainerComponent.prototype._normalSelectionMode = /**
         * @private
         * @param {?} selectBox
         * @param {?} item
         * @param {?} event
         * @return {?}
         */
        function (selectBox, item, event) {
            /** @type {?} */
            var inSelection = boxIntersects(selectBox, item.getBoundingClientRect());
            /** @type {?} */
            var shouldAdd = inSelection && !item.selected && !this.shortcuts.removeFromSelection(event);
            /** @type {?} */
            var shouldRemove = (!inSelection && item.selected && !this.shortcuts.addToSelection(event)) ||
                (inSelection && item.selected && this.shortcuts.removeFromSelection(event));
            if (shouldAdd) {
                this._selectItem(item);
            }
            else if (shouldRemove) {
                this._deselectItem(item);
            }
        };
        /**
         * @private
         * @param {?} selectBox
         * @param {?} item
         * @param {?} event
         * @return {?}
         */
        SelectContainerComponent.prototype._extendedSelectionMode = /**
         * @private
         * @param {?} selectBox
         * @param {?} item
         * @param {?} event
         * @return {?}
         */
        function (selectBox, item, event) {
            /** @type {?} */
            var inSelection = boxIntersects(selectBox, item.getBoundingClientRect());
            /** @type {?} */
            var shoudlAdd = (inSelection && !item.selected && !this.shortcuts.removeFromSelection(event) && !this._tmpItems.has(item)) ||
                (inSelection && item.selected && this.shortcuts.removeFromSelection(event) && !this._tmpItems.has(item));
            /** @type {?} */
            var shouldRemove = (!inSelection && item.selected && this.shortcuts.addToSelection(event) && this._tmpItems.has(item)) ||
                (!inSelection && !item.selected && this.shortcuts.removeFromSelection(event) && this._tmpItems.has(item));
            if (shoudlAdd) {
                item.selected ? item._deselect() : item._select();
                /** @type {?} */
                var action = this.shortcuts.removeFromSelection(event)
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
        };
        /**
         * @private
         * @return {?}
         */
        SelectContainerComponent.prototype._flushItems = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            this._tmpItems.forEach((/**
             * @param {?} action
             * @param {?} item
             * @return {?}
             */
            function (action, item) {
                if (action === Action.Add) {
                    _this._selectItem(item);
                }
                if (action === Action.Delete) {
                    _this._deselectItem(item);
                }
            }));
            this._tmpItems.clear();
        };
        /**
         * @private
         * @param {?} item
         * @param {?} selectedItems
         * @return {?}
         */
        SelectContainerComponent.prototype._addItem = /**
         * @private
         * @param {?} item
         * @param {?} selectedItems
         * @return {?}
         */
        function (item, selectedItems) {
            /** @type {?} */
            var success = false;
            if (!this._hasItem(item, selectedItems)) {
                success = true;
                selectedItems.push(item.value);
                this._selectedItems$.next(selectedItems);
                this.itemSelected.emit(item.value);
            }
            return success;
        };
        /**
         * @private
         * @param {?} item
         * @param {?} selectedItems
         * @return {?}
         */
        SelectContainerComponent.prototype._removeItem = /**
         * @private
         * @param {?} item
         * @param {?} selectedItems
         * @return {?}
         */
        function (item, selectedItems) {
            /** @type {?} */
            var success = false;
            /** @type {?} */
            var value = item instanceof SelectItemDirective ? item.value : item;
            /** @type {?} */
            var index = selectedItems.indexOf(value);
            if (index > -1) {
                success = true;
                selectedItems.splice(index, 1);
                this._selectedItems$.next(selectedItems);
                this.itemDeselected.emit(item.value);
            }
            return success;
        };
        /**
         * @private
         * @param {?} item
         * @return {?}
         */
        SelectContainerComponent.prototype._toggleItem = /**
         * @private
         * @param {?} item
         * @return {?}
         */
        function (item) {
            if (item.selected) {
                this._deselectItem(item);
            }
            else {
                this._selectItem(item);
            }
        };
        /**
         * @private
         * @param {?} item
         * @return {?}
         */
        SelectContainerComponent.prototype._selectItem = /**
         * @private
         * @param {?} item
         * @return {?}
         */
        function (item) {
            this.updateItems$.next({ type: UpdateActions.Add, item: item });
        };
        /**
         * @private
         * @param {?} item
         * @return {?}
         */
        SelectContainerComponent.prototype._deselectItem = /**
         * @private
         * @param {?} item
         * @return {?}
         */
        function (item) {
            this.updateItems$.next({ type: UpdateActions.Remove, item: item });
        };
        /**
         * @private
         * @param {?} item
         * @param {?} selectedItems
         * @return {?}
         */
        SelectContainerComponent.prototype._hasItem = /**
         * @private
         * @param {?} item
         * @param {?} selectedItems
         * @return {?}
         */
        function (item, selectedItems) {
            return selectedItems.includes(item.value);
        };
        /**
         * @private
         * @param {?} event
         * @return {?}
         */
        SelectContainerComponent.prototype._getClosestSelectItem = /**
         * @private
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var target = ((/** @type {?} */ (event.target))).closest('.dts-select-item');
            /** @type {?} */
            var index = -1;
            /** @type {?} */
            var targetItem = null;
            if (target) {
                targetItem = target[SELECT_ITEM_INSTANCE];
                index = this._selectableItems.indexOf(targetItem);
            }
            return [index, targetItem];
        };
        /**
         * @private
         * @return {?}
         */
        SelectContainerComponent.prototype._resetRangeStart = /**
         * @private
         * @return {?}
         */
        function () {
            this._lastRange = [-1, -1];
            /** @type {?} */
            var lastRangeStart = this._getLastRangeSelection();
            if (lastRangeStart && lastRangeStart.rangeStart) {
                lastRangeStart.toggleRangeStart();
            }
        };
        /**
         * @private
         * @return {?}
         */
        SelectContainerComponent.prototype._getLastRangeSelection = /**
         * @private
         * @return {?}
         */
        function () {
            if (this._lastStartIndex >= 0) {
                return this._selectableItems[this._lastStartIndex];
            }
            return null;
        };
        SelectContainerComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'dts-select-container',
                        exportAs: 'dts-select-container',
                        host: {
                            class: 'dts-select-container'
                        },
                        template: "\n    <ng-content></ng-content>\n    <div\n      class=\"dts-select-box\"\n      #selectBox\n      [ngClass]=\"selectBoxClasses$ | async\"\n      [ngStyle]=\"selectBoxStyles$ | async\"\n    ></div>\n  ",
                        styles: [":host{display:block;position:relative}"]
                    }] }
        ];
        /** @nocollapse */
        SelectContainerComponent.ctorParameters = function () { return [
            { type: Object, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] },
            { type: ShortcutService },
            { type: KeyboardEventsService },
            { type: core.ElementRef },
            { type: core.Renderer2 },
            { type: core.NgZone }
        ]; };
        SelectContainerComponent.propDecorators = {
            $selectBox: [{ type: core.ViewChild, args: ['selectBox', { static: true },] }],
            $selectableItems: [{ type: core.ContentChildren, args: [SelectItemDirective, { descendants: true },] }],
            selectedItems: [{ type: core.Input }],
            selectOnDrag: [{ type: core.Input }],
            disabled: [{ type: core.Input }],
            disableDrag: [{ type: core.Input }],
            disableRangeSelection: [{ type: core.Input }],
            selectMode: [{ type: core.Input }],
            selectWithShortcut: [{ type: core.Input }],
            custom: [{ type: core.Input }, { type: core.HostBinding, args: ['class.dts-custom',] }],
            selectedItemsChange: [{ type: core.Output }],
            select: [{ type: core.Output }],
            itemSelected: [{ type: core.Output }],
            itemDeselected: [{ type: core.Output }],
            selectionStarted: [{ type: core.Output }],
            selectionEnded: [{ type: core.Output }]
        };
        return SelectContainerComponent;
    }());
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
    var COMPONENTS = [SelectContainerComponent, SelectItemDirective];
    /**
     * @param {?} config
     * @return {?}
     */
    function CONFIG_FACTORY(config) {
        return mergeDeep(DEFAULT_CONFIG, config);
    }
    var DragToSelectModule = /** @class */ (function () {
        function DragToSelectModule() {
        }
        /**
         * @param {?=} config
         * @return {?}
         */
        DragToSelectModule.forRoot = /**
         * @param {?=} config
         * @return {?}
         */
        function (config) {
            if (config === void 0) { config = {}; }
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
        };
        DragToSelectModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule],
                        declarations: __spread(COMPONENTS),
                        exports: __spread(COMPONENTS)
                    },] }
        ];
        return DragToSelectModule;
    }());

    exports.CONFIG_FACTORY = CONFIG_FACTORY;
    exports.DragToSelectModule = DragToSelectModule;
    exports.SELECT_ITEM_INSTANCE = SELECT_ITEM_INSTANCE;
    exports.SelectContainerComponent = SelectContainerComponent;
    exports.SelectItemDirective = SelectItemDirective;
    exports.ɵa = mergeDeep;
    exports.ɵb = DEFAULT_CONFIG;
    exports.ɵc = CONFIG;
    exports.ɵd = USER_CONFIG;
    exports.ɵf = ShortcutService;
    exports.ɵg = KeyboardEventsService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-drag-to-select.umd.js.map
