/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ElementRef, Output, EventEmitter, Input, Renderer2, ViewChild, NgZone, ContentChildren, QueryList, HostBinding, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subject, combineLatest, merge, from, fromEvent, BehaviorSubject, asyncScheduler } from 'rxjs';
import { switchMap, takeUntil, map, tap, filter, auditTime, mapTo, share, withLatestFrom, distinctUntilChanged, observeOn, startWith, concatMapTo, first } from 'rxjs/operators';
import { SelectItemDirective, SELECT_ITEM_INSTANCE } from './select-item.directive';
import { ShortcutService } from './shortcut.service';
import { createSelectBox, whenSelectBoxVisible } from './operators';
import { Action, UpdateActions } from './models';
import { AUDIT_TIME, NO_SELECT_CLASS } from './constants';
import { inBoundingBox, cursorWithinElement, clearSelection, boxIntersects, calculateBoundingClientRect, getRelativeMousePosition, getMousePosition, hasMinimumSize } from './utils';
import { KeyboardEventsService } from './keyboard-events.service';
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
    SelectContainerComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (isPlatformBrowser(this.platformId)) {
            this.host = this.hostElementRef.nativeElement;
            this._initSelectedItemsChange();
            this._calculateBoundingClientRect();
            this._observeBoundingRectChanges();
            this._observeSelectableItems();
            /** @type {?} */
            var mouseup$_1 = this.keyboardEvents.mouseup$.pipe(filter((/**
             * @return {?}
             */
            function () { return !_this.disabled; })), tap((/**
             * @return {?}
             */
            function () { return _this._onMouseUp(); })), share());
            /** @type {?} */
            var mousemove$_1 = this.keyboardEvents.mousemove$.pipe(filter((/**
             * @return {?}
             */
            function () { return !_this.disabled; })), share());
            /** @type {?} */
            var mousedown$ = fromEvent(this.host, 'mousedown').pipe(filter((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return event.button === 0; })), // only emit left mouse
            filter((/**
             * @return {?}
             */
            function () { return !_this.disabled; })), tap((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return _this._onMouseDown(event); })), share());
            /** @type {?} */
            var dragging$ = mousedown$.pipe(filter((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return !_this.shortcuts.disableSelection(event); })), filter((/**
             * @return {?}
             */
            function () { return !_this.selectMode; })), filter((/**
             * @return {?}
             */
            function () { return !_this.disableDrag; })), switchMap((/**
             * @return {?}
             */
            function () { return mousemove$_1.pipe(takeUntil(mouseup$_1)); })), share());
            /** @type {?} */
            var currentMousePosition$ = mousedown$.pipe(map((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return getRelativeMousePosition(event, _this.host); })));
            /** @type {?} */
            var show$ = dragging$.pipe(mapTo(1));
            /** @type {?} */
            var hide$ = mouseup$_1.pipe(mapTo(0));
            /** @type {?} */
            var opacity$ = merge(show$, hide$).pipe(distinctUntilChanged());
            /** @type {?} */
            var selectBox$ = combineLatest([dragging$, opacity$, currentMousePosition$]).pipe(createSelectBox(this.host), share());
            this.selectBoxClasses$ = merge(dragging$, mouseup$_1, this.keyboardEvents.distinctKeydown$, this.keyboardEvents.distinctKeyup$).pipe(auditTime(AUDIT_TIME), withLatestFrom(selectBox$), map((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _b = tslib_1.__read(_a, 2), event = _b[0], selectBox = _b[1];
                return {
                    'dts-adding': hasMinimumSize(selectBox, 0, 0) && !_this.shortcuts.removeFromSelection(event),
                    'dts-removing': _this.shortcuts.removeFromSelection(event)
                };
            })), distinctUntilChanged((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            function (a, b) { return JSON.stringify(a) === JSON.stringify(b); })));
            /** @type {?} */
            var selectOnMouseUp$ = dragging$.pipe(filter((/**
             * @return {?}
             */
            function () { return !_this.selectOnDrag; })), filter((/**
             * @return {?}
             */
            function () { return !_this.selectMode; })), filter((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return _this._cursorWithinHost(event); })), switchMap((/**
             * @param {?} _
             * @return {?}
             */
            function (_) { return mouseup$_1.pipe(first()); })), filter((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                return (!_this.shortcuts.disableSelection(event) && !_this.shortcuts.toggleSingleItem(event)) ||
                    _this.shortcuts.removeFromSelection(event);
            })));
            /** @type {?} */
            var selectOnDrag$ = selectBox$.pipe(auditTime(AUDIT_TIME), withLatestFrom(mousemove$_1, (/**
             * @param {?} selectBox
             * @param {?} event
             * @return {?}
             */
            function (selectBox, event) { return ({
                selectBox: selectBox,
                event: event
            }); })), filter((/**
             * @return {?}
             */
            function () { return _this.selectOnDrag; })), filter((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var selectBox = _a.selectBox;
                return hasMinimumSize(selectBox);
            })), map((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var event = _a.event;
                return event;
            })));
            /** @type {?} */
            var selectOnKeyboardEvent$ = merge(this.keyboardEvents.distinctKeydown$, this.keyboardEvents.distinctKeyup$).pipe(auditTime(AUDIT_TIME), whenSelectBoxVisible(selectBox$), tap((/**
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
            merge(selectOnMouseUp$, selectOnDrag$, selectOnKeyboardEvent$)
                .pipe(takeUntil(this.destroy$))
                .subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return _this._selectItems(event); }));
            this.selectBoxStyles$ = selectBox$.pipe(map((/**
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
        return from(this._selectableItems).pipe(filter((/**
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
            .pipe(auditTime(AUDIT_TIME), takeUntil(this.destroy$))
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
            .pipe(withLatestFrom(this._selectedItems$), takeUntil(this.destroy$))
            .subscribe((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = tslib_1.__read(_a, 2), update = _b[0], selectedItems = _b[1];
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
            .pipe(withLatestFrom(this._selectedItems$), observeOn(asyncScheduler), takeUntil(this.destroy$))
            .subscribe((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = tslib_1.__read(_a, 2), items = _b[0], selectedItems = _b[1];
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
            var resize$ = fromEvent(window, 'resize');
            /** @type {?} */
            var windowScroll$ = fromEvent(window, 'scroll');
            /** @type {?} */
            var containerScroll$ = fromEvent(_this.host, 'scroll');
            merge(resize$, windowScroll$, containerScroll$)
                .pipe(startWith('INITIAL_UPDATE'), auditTime(AUDIT_TIME), takeUntil(_this.destroy$))
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
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return _this._cursorWithinHost(event); })), tap((/**
         * @return {?}
         */
        function () { return _this.selectionStarted.emit(); })), concatMapTo(mouseup$.pipe(first())), withLatestFrom(this._selectedItems$), map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = tslib_1.__read(_a, 2), items = _b[1];
            return items;
        })), takeUntil(this.destroy$))
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
        var _a = tslib_1.__read(this._getClosestSelectItem(event), 2), currentIndex = _a[0], clickedItem = _a[1];
        var _b = tslib_1.__read(this._lastRange, 2), startIndex = _b[0], endIndex = _b[1];
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
        { type: Component, args: [{
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
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: ShortcutService },
        { type: KeyboardEventsService },
        { type: ElementRef },
        { type: Renderer2 },
        { type: NgZone }
    ]; };
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
    return SelectContainerComponent;
}());
export { SelectContainerComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZHJhZy10by1zZWxlY3QvIiwic291cmNlcyI6WyJsaWIvc2VsZWN0LWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFDVixNQUFNLEVBQ04sWUFBWSxFQUNaLEtBQUssRUFFTCxTQUFTLEVBQ1QsU0FBUyxFQUNULE1BQU0sRUFDTixlQUFlLEVBQ2YsU0FBUyxFQUNULFdBQVcsRUFFWCxXQUFXLEVBQ1gsTUFBTSxFQUVQLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXBELE9BQU8sRUFBYyxPQUFPLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFbkgsT0FBTyxFQUNMLFNBQVMsRUFDVCxTQUFTLEVBQ1QsR0FBRyxFQUNILEdBQUcsRUFDSCxNQUFNLEVBQ04sU0FBUyxFQUNULEtBQUssRUFDTCxLQUFLLEVBQ0wsY0FBYyxFQUNkLG9CQUFvQixFQUNwQixTQUFTLEVBQ1QsU0FBUyxFQUNULFdBQVcsRUFDWCxLQUFLLEVBQ04sTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNwRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFckQsT0FBTyxFQUFFLGVBQWUsRUFBRSxvQkFBb0IsRUFBcUIsTUFBTSxhQUFhLENBQUM7QUFFdkYsT0FBTyxFQUNMLE1BQU0sRUFLTixhQUFhLEVBR2QsTUFBTSxVQUFVLENBQUM7QUFFbEIsT0FBTyxFQUFFLFVBQVUsRUFBRSxlQUFlLEVBQUUsTUFBTSxhQUFh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QUFnRDs7SUFDaEQscURBQTBEOzs7OztJQUUxRCw4Q0FDK0I7Ozs7O0lBRS9CLG9EQUN5RDs7SUFFekQsaURBQTRCOztJQUM1QixnREFBNkI7O0lBQzdCLDRDQUEwQjs7SUFDMUIsK0NBQTZCOztJQUM3Qix5REFBdUM7O0lBQ3ZDLDhDQUE0Qjs7SUFDNUIsc0RBQW9DOztJQUVwQywwQ0FFZTs7SUFFZix1REFBd0Q7O0lBQ3hELDBDQUEyQzs7SUFDM0MsZ0RBQWlEOztJQUNqRCxrREFBbUQ7O0lBQ25ELG9EQUFzRDs7SUFDdEQsa0RBQTBEOzs7OztJQUUxRCw2Q0FBMkQ7Ozs7O0lBRTNELG1EQUE4RDs7Ozs7SUFDOUQsb0RBQTBEOzs7OztJQUMxRCxnREFBbUQ7Ozs7O0lBQ25ELDRDQUF1Qzs7Ozs7SUFFdkMsOENBQWdEOzs7OztJQUNoRCxtREFBd0Q7Ozs7O0lBQ3hELGtEQUErQjs7Ozs7SUFDL0IsdURBQTJFOzs7OztJQUd6RSw4Q0FBK0M7Ozs7O0lBQy9DLDZDQUFrQzs7Ozs7SUFDbEMsa0RBQTZDOzs7OztJQUM3QyxrREFBa0M7Ozs7O0lBQ2xDLDRDQUEyQjs7Ozs7SUFDM0IsMENBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgUmVuZGVyZXIyLFxuICBWaWV3Q2hpbGQsXG4gIE5nWm9uZSxcbiAgQ29udGVudENoaWxkcmVuLFxuICBRdWVyeUxpc3QsXG4gIEhvc3RCaW5kaW5nLFxuICBBZnRlclZpZXdJbml0LFxuICBQTEFURk9STV9JRCxcbiAgSW5qZWN0LFxuICBBZnRlckNvbnRlbnRJbml0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QsIGNvbWJpbmVMYXRlc3QsIG1lcmdlLCBmcm9tLCBmcm9tRXZlbnQsIEJlaGF2aW9yU3ViamVjdCwgYXN5bmNTY2hlZHVsZXIgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtcbiAgc3dpdGNoTWFwLFxuICB0YWtlVW50aWwsXG4gIG1hcCxcbiAgdGFwLFxuICBmaWx0ZXIsXG4gIGF1ZGl0VGltZSxcbiAgbWFwVG8sXG4gIHNoYXJlLFxuICB3aXRoTGF0ZXN0RnJvbSxcbiAgZGlzdGluY3RVbnRpbENoYW5nZWQsXG4gIG9ic2VydmVPbixcbiAgc3RhcnRXaXRoLFxuICBjb25jYXRNYXBUbyxcbiAgZmlyc3Rcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBTZWxlY3RJdGVtRGlyZWN0aXZlLCBTRUxFQ1RfSVRFTV9JTlNUQU5DRSB9IGZyb20gJy4vc2VsZWN0LWl0ZW0uZGlyZWN0aXZlJztcbmltcG9ydCB7IFNob3J0Y3V0U2VydmljZSB9IGZyb20gJy4vc2hvcnRjdXQuc2VydmljZSc7XG5cbmltcG9ydCB7IGNyZWF0ZVNlbGVjdEJveCwgd2hlblNlbGVjdEJveFZpc2libGUsIGRpc3RpbmN0S2V5RXZlbnRzIH0gZnJvbSAnLi9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge1xuICBBY3Rpb24sXG4gIFNlbGVjdEJveCxcbiAgTW91c2VQb3NpdGlvbixcbiAgU2VsZWN0Q29udGFpbmVySG9zdCxcbiAgVXBkYXRlQWN0aW9uLFxuICBVcGRhdGVBY3Rpb25zLFxuICBQcmVkaWNhdGVGbixcbiAgQm91bmRpbmdCb3hcbn0gZnJvbSAnLi9tb2RlbHMnO1xuXG5pbXBvcnQgeyBBVURJVF9USU1FLCBOT19TRUxFQ1RfQ0xBU1MgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbmltcG9ydCB7XG4gIGluQm91bmRpbmdCb3gsXG4gIGN1cnNvcldpdGhpbkVsZW1lbnQsXG4gIGNsZWFyU2VsZWN0aW9uLFxuICBib3hJbnRlcnNlY3RzLFxuICBjYWxjdWxhdGVCb3VuZGluZ0NsaWVudFJlY3QsXG4gIGdldFJlbGF0aXZlTW91c2VQb3NpdGlvbixcbiAgZ2V0TW91c2VQb3NpdGlvbixcbiAgaGFzTWluaW11bVNpemVcbn0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBLZXlib2FyZEV2ZW50c1NlcnZpY2UgfSBmcm9tICcuL2tleWJvYXJkLWV2ZW50cy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZHRzLXNlbGVjdC1jb250YWluZXInLFxuICBleHBvcnRBczogJ2R0cy1zZWxlY3QtY29udGFpbmVyJyxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnZHRzLXNlbGVjdC1jb250YWluZXInXG4gIH0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDxkaXZcbiAgICAgIGNsYXNzPVwiZHRzLXNlbGVjdC1ib3hcIlxuICAgICAgI3NlbGVjdEJveFxuICAgICAgW25nQ2xhc3NdPVwic2VsZWN0Qm94Q2xhc3NlcyQgfCBhc3luY1wiXG4gICAgICBbbmdTdHlsZV09XCJzZWxlY3RCb3hTdHlsZXMkIHwgYXN5bmNcIlxuICAgID48L2Rpdj5cbiAgYCxcbiAgc3R5bGVVcmxzOiBbJy4vc2VsZWN0LWNvbnRhaW5lci5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdENvbnRhaW5lckNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIGhvc3Q6IFNlbGVjdENvbnRhaW5lckhvc3Q7XG4gIHNlbGVjdEJveFN0eWxlcyQ6IE9ic2VydmFibGU8U2VsZWN0Qm94PHN0cmluZz4+O1xuICBzZWxlY3RCb3hDbGFzc2VzJDogT2JzZXJ2YWJsZTx7IFtrZXk6IHN0cmluZ106IGJvb2xlYW4gfT47XG5cbiAgQFZpZXdDaGlsZCgnc2VsZWN0Qm94JywgeyBzdGF0aWM6IHRydWUgfSlcbiAgcHJpdmF0ZSAkc2VsZWN0Qm94OiBFbGVtZW50UmVmO1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oU2VsZWN0SXRlbURpcmVjdGl2ZSwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KVxuICBwcml2YXRlICRzZWxlY3RhYmxlSXRlbXM6IFF1ZXJ5TGlzdDxTZWxlY3RJdGVtRGlyZWN0aXZlPjtcblxuICBASW5wdXQoKSBzZWxlY3RlZEl0ZW1zOiBhbnk7XG4gIEBJbnB1dCgpIHNlbGVjdE9uRHJhZyA9IHRydWU7XG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XG4gIEBJbnB1dCgpIGRpc2FibGVEcmFnID0gZmFsc2U7XG4gIEBJbnB1dCgpIGRpc2FibGVSYW5nZVNlbGVjdGlvbiA9IGZhbHNlO1xuICBASW5wdXQoKSBzZWxlY3RNb2RlID0gZmFsc2U7XG4gIEBJbnB1dCgpIHNlbGVjdFdpdGhTaG9ydGN1dCA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZHRzLWN1c3RvbScpXG4gIGN1c3RvbSA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKSBzZWxlY3RlZEl0ZW1zQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIGl0ZW1TZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgaXRlbURlc2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIHNlbGVjdGlvblN0YXJ0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSBzZWxlY3Rpb25FbmRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8QXJyYXk8YW55Pj4oKTtcblxuICBwcml2YXRlIF90bXBJdGVtcyA9IG5ldyBNYXA8U2VsZWN0SXRlbURpcmVjdGl2ZSwgQWN0aW9uPigpO1xuXG4gIHByaXZhdGUgX3NlbGVjdGVkSXRlbXMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxBcnJheTxhbnk+PihbXSk7XG4gIHByaXZhdGUgX3NlbGVjdGFibGVJdGVtczogQXJyYXk8U2VsZWN0SXRlbURpcmVjdGl2ZT4gPSBbXTtcbiAgcHJpdmF0ZSB1cGRhdGVJdGVtcyQgPSBuZXcgU3ViamVjdDxVcGRhdGVBY3Rpb24+KCk7XG4gIHByaXZhdGUgZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIHByaXZhdGUgX2xhc3RSYW5nZTogW251bWJlciwgbnVtYmVyXSA9IFstMSwgLTFdO1xuICBwcml2YXRlIF9sYXN0U3RhcnRJbmRleDogbnVtYmVyIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICBwcml2YXRlIF9uZXdSYW5nZVN0YXJ0ID0gZmFsc2U7XG4gIHByaXZhdGUgX2xhc3RSYW5nZVNlbGVjdGlvbjogTWFwPFNlbGVjdEl0ZW1EaXJlY3RpdmUsIGJvb2xlYW4+ID0gbmV3IE1hcCgpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0LFxuICAgIHByaXZhdGUgc2hvcnRjdXRzOiBTaG9ydGN1dFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBrZXlib2FyZEV2ZW50czogS2V5Ym9hcmRFdmVudHNTZXJ2aWNlLFxuICAgIHByaXZhdGUgaG9zdEVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmVcbiAgKSB7fVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy5ob3N0ID0gdGhpcy5ob3N0RWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuXG4gICAgICB0aGlzLl9pbml0U2VsZWN0ZWRJdGVtc0NoYW5nZSgpO1xuXG4gICAgICB0aGlzLl9jYWxjdWxhdGVCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHRoaXMuX29ic2VydmVCb3VuZGluZ1JlY3RDaGFuZ2VzKCk7XG4gICAgICB0aGlzLl9vYnNlcnZlU2VsZWN0YWJsZUl0ZW1zKCk7XG5cbiAgICAgIGNvbnN0IG1vdXNldXAkID0gdGhpcy5rZXlib2FyZEV2ZW50cy5tb3VzZXVwJC5waXBlKFxuICAgICAgICBmaWx0ZXIoKCkgPT4gIXRoaXMuZGlzYWJsZWQpLFxuICAgICAgICB0YXAoKCkgPT4gdGhpcy5fb25Nb3VzZVVwKCkpLFxuICAgICAgICBzaGFyZSgpXG4gICAgICApO1xuXG4gICAgICBjb25zdCBtb3VzZW1vdmUkID0gdGhpcy5rZXlib2FyZEV2ZW50cy5tb3VzZW1vdmUkLnBpcGUoXG4gICAgICAgIGZpbHRlcigoKSA9PiAhdGhpcy5kaXNhYmxlZCksXG4gICAgICAgIHNoYXJlKClcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IG1vdXNlZG93biQgPSBmcm9tRXZlbnQ8TW91c2VFdmVudD4odGhpcy5ob3N0LCAnbW91c2Vkb3duJykucGlwZShcbiAgICAgICAgZmlsdGVyKGV2ZW50ID0+IGV2ZW50LmJ1dHRvbiA9PT0gMCksIC8vIG9ubHkgZW1pdCBsZWZ0IG1vdXNlXG4gICAgICAgIGZpbHRlcigoKSA9PiAhdGhpcy5kaXNhYmxlZCksXG4gICAgICAgIHRhcChldmVudCA9PiB0aGlzLl9vbk1vdXNlRG93bihldmVudCkpLFxuICAgICAgICBzaGFyZSgpXG4gICAgICApO1xuXG4gICAgICBjb25zdCBkcmFnZ2luZyQgPSBtb3VzZWRvd24kLnBpcGUoXG4gICAgICAgIGZpbHRlcihldmVudCA9PiAhdGhpcy5zaG9ydGN1dHMuZGlzYWJsZVNlbGVjdGlvbihldmVudCkpLFxuICAgICAgICBmaWx0ZXIoKCkgPT4gIXRoaXMuc2VsZWN0TW9kZSksXG4gICAgICAgIGZpbHRlcigoKSA9PiAhdGhpcy5kaXNhYmxlRHJhZyksXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PiBtb3VzZW1vdmUkLnBpcGUodGFrZVVudGlsKG1vdXNldXAkKSkpLFxuICAgICAgICBzaGFyZSgpXG4gICAgICApO1xuXG4gICAgICBjb25zdCBjdXJyZW50TW91c2VQb3NpdGlvbiQ6IE9ic2VydmFibGU8TW91c2VQb3NpdGlvbj4gPSBtb3VzZWRvd24kLnBpcGUoXG4gICAgICAgIG1hcCgoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IGdldFJlbGF0aXZlTW91c2VQb3NpdGlvbihldmVudCwgdGhpcy5ob3N0KSlcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IHNob3ckID0gZHJhZ2dpbmckLnBpcGUobWFwVG8oMSkpO1xuICAgICAgY29uc3QgaGlkZSQgPSBtb3VzZXVwJC5waXBlKG1hcFRvKDApKTtcbiAgICAgIGNvbnN0IG9wYWNpdHkkID0gbWVyZ2Uoc2hvdyQsIGhpZGUkKS5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuXG4gICAgICBjb25zdCBzZWxlY3RCb3gkID0gY29tYmluZUxhdGVzdChbZHJhZ2dpbmckLCBvcGFjaXR5JCwgY3VycmVudE1vdXNlUG9zaXRpb24kXSkucGlwZShcbiAgICAgICAgY3JlYXRlU2VsZWN0Qm94KHRoaXMuaG9zdCksXG4gICAgICAgIHNoYXJlKClcbiAgICAgICk7XG5cbiAgICAgIHRoaXMuc2VsZWN0Qm94Q2xhc3NlcyQgPSBtZXJnZShcbiAgICAgICAgZHJhZ2dpbmckLFxuICAgICAgICBtb3VzZXVwJCxcbiAgICAgICAgdGhpcy5rZXlib2FyZEV2ZW50cy5kaXN0aW5jdEtleWRvd24kLFxuICAgICAgICB0aGlzLmtleWJvYXJkRXZlbnRzLmRpc3RpbmN0S2V5dXAkXG4gICAgICApLnBpcGUoXG4gICAgICAgIGF1ZGl0VGltZShBVURJVF9USU1FKSxcbiAgICAgICAgd2l0aExhdGVzdEZyb20oc2VsZWN0Qm94JCksXG4gICAgICAgIG1hcCgoW2V2ZW50LCBzZWxlY3RCb3hdKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdkdHMtYWRkaW5nJzogaGFzTWluaW11bVNpemUoc2VsZWN0Qm94LCAwLCAwKSAmJiAhdGhpcy5zaG9ydGN1dHMucmVtb3ZlRnJvbVNlbGVjdGlvbihldmVudCksXG4gICAgICAgICAgICAnZHRzLXJlbW92aW5nJzogdGhpcy5zaG9ydGN1dHMucmVtb3ZlRnJvbVNlbGVjdGlvbihldmVudClcbiAgICAgICAgICB9O1xuICAgICAgICB9KSxcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKGEsIGIpID0+IEpTT04uc3RyaW5naWZ5KGEpID09PSBKU09OLnN0cmluZ2lmeShiKSlcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IHNlbGVjdE9uTW91c2VVcCQgPSBkcmFnZ2luZyQucGlwZShcbiAgICAgICAgZmlsdGVyKCgpID0+ICF0aGlzLnNlbGVjdE9uRHJhZyksXG4gICAgICAgIGZpbHRlcigoKSA9PiAhdGhpcy5zZWxlY3RNb2RlKSxcbiAgICAgICAgZmlsdGVyKGV2ZW50ID0+IHRoaXMuX2N1cnNvcldpdGhpbkhvc3QoZXZlbnQpKSxcbiAgICAgICAgc3dpdGNoTWFwKF8gPT4gbW91c2V1cCQucGlwZShmaXJzdCgpKSksXG4gICAgICAgIGZpbHRlcihcbiAgICAgICAgICBldmVudCA9PlxuICAgICAgICAgICAgKCF0aGlzLnNob3J0Y3V0cy5kaXNhYmxlU2VsZWN0aW9uKGV2ZW50KSAmJiAhdGhpcy5zaG9ydGN1dHMudG9nZ2xlU2luZ2xlSXRlbShldmVudCkpIHx8XG4gICAgICAgICAgICB0aGlzLnNob3J0Y3V0cy5yZW1vdmVGcm9tU2VsZWN0aW9uKGV2ZW50KVxuICAgICAgICApXG4gICAgICApO1xuXG4gICAgICBjb25zdCBzZWxlY3RPbkRyYWckID0gc2VsZWN0Qm94JC5waXBlKFxuICAgICAgICBhdWRpdFRpbWUoQVVESVRfVElNRSksXG4gICAgICAgIHdpdGhMYXRlc3RGcm9tKG1vdXNlbW92ZSQsIChzZWxlY3RCb3gsIGV2ZW50OiBNb3VzZUV2ZW50KSA9PiAoe1xuICAgICAgICAgIHNlbGVjdEJveCxcbiAgICAgICAgICBldmVudFxuICAgICAgICB9KSksXG4gICAgICAgIGZpbHRlcigoKSA9PiB0aGlzLnNlbGVjdE9uRHJhZyksXG4gICAgICAgIGZpbHRlcigoeyBzZWxlY3RCb3ggfSkgPT4gaGFzTWluaW11bVNpemUoc2VsZWN0Qm94KSksXG4gICAgICAgIG1hcCgoeyBldmVudCB9KSA9PiBldmVudClcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IHNlbGVjdE9uS2V5Ym9hcmRFdmVudCQgPSBtZXJnZShcbiAgICAgICAgdGhpcy5rZXlib2FyZEV2ZW50cy5kaXN0aW5jdEtleWRvd24kLFxuICAgICAgICB0aGlzLmtleWJvYXJkRXZlbnRzLmRpc3RpbmN0S2V5dXAkXG4gICAgICApLnBpcGUoXG4gICAgICAgIGF1ZGl0VGltZShBVURJVF9USU1FKSxcbiAgICAgICAgd2hlblNlbGVjdEJveFZpc2libGUoc2VsZWN0Qm94JCksXG4gICAgICAgIHRhcChldmVudCA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuX2lzRXh0ZW5kZWRTZWxlY3Rpb24oZXZlbnQpKSB7XG4gICAgICAgICAgICB0aGlzLl90bXBJdGVtcy5jbGVhcigpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9mbHVzaEl0ZW1zKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgKTtcblxuICAgICAgbWVyZ2Uoc2VsZWN0T25Nb3VzZVVwJCwgc2VsZWN0T25EcmFnJCwgc2VsZWN0T25LZXlib2FyZEV2ZW50JClcbiAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgICAuc3Vic2NyaWJlKGV2ZW50ID0+IHRoaXMuX3NlbGVjdEl0ZW1zKGV2ZW50KSk7XG5cbiAgICAgIHRoaXMuc2VsZWN0Qm94U3R5bGVzJCA9IHNlbGVjdEJveCQucGlwZShcbiAgICAgICAgbWFwKHNlbGVjdEJveCA9PiAoe1xuICAgICAgICAgIHRvcDogYCR7c2VsZWN0Qm94LnRvcH1weGAsXG4gICAgICAgICAgbGVmdDogYCR7c2VsZWN0Qm94LmxlZnR9cHhgLFxuICAgICAgICAgIHdpZHRoOiBgJHtzZWxlY3RCb3gud2lkdGh9cHhgLFxuICAgICAgICAgIGhlaWdodDogYCR7c2VsZWN0Qm94LmhlaWdodH1weGAsXG4gICAgICAgICAgb3BhY2l0eTogc2VsZWN0Qm94Lm9wYWNpdHlcbiAgICAgICAgfSkpXG4gICAgICApO1xuXG4gICAgICB0aGlzLl9pbml0U2VsZWN0aW9uT3V0cHV0cyhtb3VzZWRvd24kLCBtb3VzZXVwJCk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuX3NlbGVjdGFibGVJdGVtcyA9IHRoaXMuJHNlbGVjdGFibGVJdGVtcy50b0FycmF5KCk7XG4gIH1cblxuICBzZWxlY3RBbGwoKSB7XG4gICAgdGhpcy4kc2VsZWN0YWJsZUl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICB0aGlzLl9zZWxlY3RJdGVtKGl0ZW0pO1xuICAgIH0pO1xuICB9XG5cbiAgdG9nZ2xlSXRlbXM8VD4ocHJlZGljYXRlOiBQcmVkaWNhdGVGbjxUPikge1xuICAgIHRoaXMuX2ZpbHRlclNlbGVjdGFibGVJdGVtcyhwcmVkaWNhdGUpLnN1YnNjcmliZSgoaXRlbTogU2VsZWN0SXRlbURpcmVjdGl2ZSkgPT4gdGhpcy5fdG9nZ2xlSXRlbShpdGVtKSk7XG4gIH1cblxuICBzZWxlY3RJdGVtczxUPihwcmVkaWNhdGU6IFByZWRpY2F0ZUZuPFQ+KSB7XG4gICAgdGhpcy5fZmlsdGVyU2VsZWN0YWJsZUl0ZW1zKHByZWRpY2F0ZSkuc3Vic2NyaWJlKChpdGVtOiBTZWxlY3RJdGVtRGlyZWN0aXZlKSA9PiB0aGlzLl9zZWxlY3RJdGVtKGl0ZW0pKTtcbiAgfVxuXG4gIGRlc2VsZWN0SXRlbXM8VD4ocHJlZGljYXRlOiBQcmVkaWNhdGVGbjxUPikge1xuICAgIHRoaXMuX2ZpbHRlclNlbGVjdGFibGVJdGVtcyhwcmVkaWNhdGUpLnN1YnNjcmliZSgoaXRlbTogU2VsZWN0SXRlbURpcmVjdGl2ZSkgPT4gdGhpcy5fZGVzZWxlY3RJdGVtKGl0ZW0pKTtcbiAgfVxuXG4gIGNsZWFyU2VsZWN0aW9uKCkge1xuICAgIHRoaXMuJHNlbGVjdGFibGVJdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgdGhpcy5fZGVzZWxlY3RJdGVtKGl0ZW0pO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIHRoaXMuX2NhbGN1bGF0ZUJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHRoaXMuJHNlbGVjdGFibGVJdGVtcy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jYWxjdWxhdGVCb3VuZGluZ0NsaWVudFJlY3QoKSk7XG4gIH1cblxuICBzZWxlY3RSYW5nZShzdGFydEluZGV4OiBudW1iZXIsIGVuZEluZGV4OiBudW1iZXIpe1xuICAgIHRoaXMuJHNlbGVjdGFibGVJdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgXG4gICAgICBpZihpbmRleCA+PSBzdGFydEluZGV4ICYmIGluZGV4IDw9IGVuZEluZGV4KSB7XG4gICAgICAgICAgdGhpcy5fc2VsZWN0SXRlbShpdGVtKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fZGVzZWxlY3RJdGVtKGl0ZW0pO1xuICAgICAgfSBcbiAgICB9KTtcbiAgfVxuXG4gIHNlbGVjdEFycmF5KGluZGV4QXJyYXk6IEFycmF5PG51bWJlcj4pIHtcbiAgICB0aGlzLiRzZWxlY3RhYmxlSXRlbXMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgXG4gICAgICBpZihpbmRleEFycmF5LmluY2x1ZGVzKGluZGV4KSl7XG4gICAgICAgICAgdGhpcy5fc2VsZWN0SXRlbShpdGVtKTtcbiAgICAgIH0gXG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5fZGVzZWxlY3RJdGVtKGl0ZW0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZmlsdGVyU2VsZWN0YWJsZUl0ZW1zPFQ+KHByZWRpY2F0ZTogUHJlZGljYXRlRm48VD4pIHtcbiAgICAvLyBXcmFwIHNlbGVjdCBpdGVtcyBpbiBhbiBvYnNlcnZhYmxlIGZvciBiZXR0ZXIgZWZmaWNpZW5jeSBhc1xuICAgIC8vIG5vIGludGVybWVkaWF0ZSBhcnJheXMgYXJlIGNyZWF0ZWQgYW5kIHdlIG9ubHkgbmVlZCB0byBwcm9jZXNzXG4gICAgLy8gZXZlcnkgaXRlbSBvbmNlLlxuICAgIHJldHVybiBmcm9tKHRoaXMuX3NlbGVjdGFibGVJdGVtcykucGlwZShmaWx0ZXIoaXRlbSA9PiBwcmVkaWNhdGUoaXRlbS52YWx1ZSkpKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRTZWxlY3RlZEl0ZW1zQ2hhbmdlKCkge1xuICAgIHRoaXMuX3NlbGVjdGVkSXRlbXMkXG4gICAgICAucGlwZShcbiAgICAgICAgYXVkaXRUaW1lKEFVRElUX1RJTUUpLFxuICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95JClcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoe1xuICAgICAgICBuZXh0OiBzZWxlY3RlZEl0ZW1zID0+IHtcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXNDaGFuZ2UuZW1pdChzZWxlY3RlZEl0ZW1zKTtcbiAgICAgICAgICB0aGlzLnNlbGVjdC5lbWl0KHNlbGVjdGVkSXRlbXMpO1xuICAgICAgICB9LFxuICAgICAgICBjb21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtc0NoYW5nZS5lbWl0KFtdKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9vYnNlcnZlU2VsZWN0YWJsZUl0ZW1zKCkge1xuICAgIC8vIExpc3RlbiBmb3IgdXBkYXRlcyBhbmQgZWl0aGVyIHNlbGVjdCBvciBkZXNlbGVjdCBhbiBpdGVtXG4gICAgdGhpcy51cGRhdGVJdGVtcyRcbiAgICAgIC5waXBlKFxuICAgICAgICB3aXRoTGF0ZXN0RnJvbSh0aGlzLl9zZWxlY3RlZEl0ZW1zJCksXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoW3VwZGF0ZSwgc2VsZWN0ZWRJdGVtc106IFtVcGRhdGVBY3Rpb24sIGFueVtdXSkgPT4ge1xuICAgICAgICBjb25zdCBpdGVtID0gdXBkYXRlLml0ZW07XG4gICAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZygnVXBkYXRpbmcgaXRlbTogJyArIGl0ZW0gKyAnIFVwZGF0ZSB0eXBlOiAnICsgdXBkYXRlLnR5cGUpO1xuXG4gICAgICAgIHN3aXRjaCAodXBkYXRlLnR5cGUpIHtcbiAgICAgICAgICBjYXNlIFVwZGF0ZUFjdGlvbnMuQWRkOlxuICAgICAgICAgICAgaWYgKHRoaXMuX2FkZEl0ZW0oaXRlbSwgc2VsZWN0ZWRJdGVtcykpIHtcbiAgICAgICAgICAgICAgaXRlbS5fc2VsZWN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFVwZGF0ZUFjdGlvbnMuUmVtb3ZlOlxuICAgICAgICAgICAgaWYgKHRoaXMuX3JlbW92ZUl0ZW0oaXRlbSwgc2VsZWN0ZWRJdGVtcykpIHtcbiAgICAgICAgICAgICAgaXRlbS5fZGVzZWxlY3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIC8vIFVwZGF0ZSB0aGUgY29udGFpbmVyIGFzIHdlbGwgYXMgYWxsIHNlbGVjdGFibGUgaXRlbXMgaWYgdGhlIGxpc3QgaGFzIGNoYW5nZWRcbiAgICB0aGlzLiRzZWxlY3RhYmxlSXRlbXMuY2hhbmdlc1xuICAgICAgLnBpcGUoXG4gICAgICAgIHdpdGhMYXRlc3RGcm9tKHRoaXMuX3NlbGVjdGVkSXRlbXMkKSxcbiAgICAgICAgb2JzZXJ2ZU9uKGFzeW5jU2NoZWR1bGVyKSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKChbaXRlbXMsIHNlbGVjdGVkSXRlbXNdOiBbUXVlcnlMaXN0PFNlbGVjdEl0ZW1EaXJlY3RpdmU+LCBhbnlbXV0pID0+IHtcbiAgICAgICAgY29uc3QgbmV3TGlzdCA9IGl0ZW1zLnRvQXJyYXkoKTtcbiAgICAgICAgdGhpcy5fc2VsZWN0YWJsZUl0ZW1zID0gbmV3TGlzdDtcbiAgICAgICAgY29uc3QgcmVtb3ZlZEl0ZW1zID0gc2VsZWN0ZWRJdGVtcy5maWx0ZXIoaXRlbSA9PiAhbmV3TGlzdC5pbmNsdWRlcyhpdGVtLnZhbHVlKSk7XG5cbiAgICAgICAgaWYgKHJlbW92ZWRJdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICByZW1vdmVkSXRlbXMuZm9yRWFjaChpdGVtID0+IHRoaXMuX3JlbW92ZUl0ZW0oaXRlbSwgc2VsZWN0ZWRJdGVtcykpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfb2JzZXJ2ZUJvdW5kaW5nUmVjdENoYW5nZXMoKSB7XG4gICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgY29uc3QgcmVzaXplJCA9IGZyb21FdmVudCh3aW5kb3csICdyZXNpemUnKTtcbiAgICAgIGNvbnN0IHdpbmRvd1Njcm9sbCQgPSBmcm9tRXZlbnQod2luZG93LCAnc2Nyb2xsJyk7XG4gICAgICBjb25zdCBjb250YWluZXJTY3JvbGwkID0gZnJvbUV2ZW50KHRoaXMuaG9zdCwgJ3Njcm9sbCcpO1xuXG4gICAgICBtZXJnZShyZXNpemUkLCB3aW5kb3dTY3JvbGwkLCBjb250YWluZXJTY3JvbGwkKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBzdGFydFdpdGgoJ0lOSVRJQUxfVVBEQVRFJyksXG4gICAgICAgICAgYXVkaXRUaW1lKEFVRElUX1RJTUUpLFxuICAgICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFNlbGVjdGlvbk91dHB1dHMobW91c2Vkb3duJDogT2JzZXJ2YWJsZTxNb3VzZUV2ZW50PiwgbW91c2V1cCQ6IE9ic2VydmFibGU8TW91c2VFdmVudD4pIHtcbiAgICBtb3VzZWRvd24kXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKGV2ZW50ID0+IHRoaXMuX2N1cnNvcldpdGhpbkhvc3QoZXZlbnQpKSxcbiAgICAgICAgdGFwKCgpID0+IHRoaXMuc2VsZWN0aW9uU3RhcnRlZC5lbWl0KCkpLFxuICAgICAgICBjb25jYXRNYXBUbyhtb3VzZXVwJC5waXBlKGZpcnN0KCkpKSxcbiAgICAgICAgd2l0aExhdGVzdEZyb20odGhpcy5fc2VsZWN0ZWRJdGVtcyQpLFxuICAgICAgICBtYXAoKFssIGl0ZW1zXSkgPT4gaXRlbXMpLFxuICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95JClcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoaXRlbXMgPT4ge1xuICAgICAgICB0aGlzLnNlbGVjdGlvbkVuZGVkLmVtaXQoaXRlbXMpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9jYWxjdWxhdGVCb3VuZGluZ0NsaWVudFJlY3QoKSB7XG4gICAgdGhpcy5ob3N0LmJvdW5kaW5nQ2xpZW50UmVjdCA9IGNhbGN1bGF0ZUJvdW5kaW5nQ2xpZW50UmVjdCh0aGlzLmhvc3QpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3Vyc29yV2l0aGluSG9zdChldmVudDogTW91c2VFdmVudCkge1xuICAgIHJldHVybiBjdXJzb3JXaXRoaW5FbGVtZW50KGV2ZW50LCB0aGlzLmhvc3QpO1xuICB9XG5cbiAgcHJpdmF0ZSBfb25Nb3VzZVVwKCkge1xuICAgIHRoaXMuX2ZsdXNoSXRlbXMoKTtcbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKGRvY3VtZW50LmJvZHksIE5PX1NFTEVDVF9DTEFTUyk7XG4gIH1cblxuICBwcml2YXRlIF9vbk1vdXNlRG93bihldmVudDogTW91c2VFdmVudCkge1xuICAgIGlmICh0aGlzLnNob3J0Y3V0cy5kaXNhYmxlU2VsZWN0aW9uKGV2ZW50KSB8fCB0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY2xlYXJTZWxlY3Rpb24od2luZG93KTtcblxuICAgIGlmICghdGhpcy5kaXNhYmxlRHJhZykge1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhkb2N1bWVudC5ib2R5LCBOT19TRUxFQ1RfQ0xBU1MpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNob3J0Y3V0cy5yZW1vdmVGcm9tU2VsZWN0aW9uKGV2ZW50KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG1vdXNlUG9pbnQgPSBnZXRNb3VzZVBvc2l0aW9uKGV2ZW50KTtcbiAgICBjb25zdCBbY3VycmVudEluZGV4LCBjbGlja2VkSXRlbV0gPSB0aGlzLl9nZXRDbG9zZXN0U2VsZWN0SXRlbShldmVudCk7XG5cbiAgICBsZXQgW3N0YXJ0SW5kZXgsIGVuZEluZGV4XSA9IHRoaXMuX2xhc3RSYW5nZTtcblxuICAgIGNvbnN0IGlzTW92ZVJhbmdlU3RhcnQgPSB0aGlzLnNob3J0Y3V0cy5tb3ZlUmFuZ2VTdGFydChldmVudCk7XG5cbiAgICBjb25zdCBzaG91bGRSZXNldFJhbmdlU2VsZWN0aW9uID1cbiAgICAgICF0aGlzLnNob3J0Y3V0cy5leHRlbmRlZFNlbGVjdGlvblNob3J0Y3V0KGV2ZW50KSB8fCBpc01vdmVSYW5nZVN0YXJ0IHx8IHRoaXMuZGlzYWJsZVJhbmdlU2VsZWN0aW9uO1xuXG4gICAgaWYgKHNob3VsZFJlc2V0UmFuZ2VTZWxlY3Rpb24pIHtcbiAgICAgIHRoaXMuX3Jlc2V0UmFuZ2VTdGFydCgpO1xuICAgIH1cblxuICAgIC8vIG1vdmUgcmFuZ2Ugc3RhcnRcbiAgICBpZiAoc2hvdWxkUmVzZXRSYW5nZVNlbGVjdGlvbiAmJiAhdGhpcy5kaXNhYmxlUmFuZ2VTZWxlY3Rpb24pIHtcbiAgICAgIGlmIChjdXJyZW50SW5kZXggPiAtMSkge1xuICAgICAgICB0aGlzLl9uZXdSYW5nZVN0YXJ0ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fbGFzdFN0YXJ0SW5kZXggPSBjdXJyZW50SW5kZXg7XG4gICAgICAgIGNsaWNrZWRJdGVtLnRvZ2dsZVJhbmdlU3RhcnQoKTtcblxuICAgICAgICB0aGlzLl9sYXN0UmFuZ2VTZWxlY3Rpb24uY2xlYXIoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2xhc3RTdGFydEluZGV4ID0gLTE7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGN1cnJlbnRJbmRleCA+IC0xKSB7XG4gICAgICBzdGFydEluZGV4ID0gTWF0aC5taW4odGhpcy5fbGFzdFN0YXJ0SW5kZXgsIGN1cnJlbnRJbmRleCk7XG4gICAgICBlbmRJbmRleCA9IE1hdGgubWF4KHRoaXMuX2xhc3RTdGFydEluZGV4LCBjdXJyZW50SW5kZXgpO1xuICAgICAgdGhpcy5fbGFzdFJhbmdlID0gW3N0YXJ0SW5kZXgsIGVuZEluZGV4XTtcbiAgICB9XG5cbiAgICBpZiAoaXNNb3ZlUmFuZ2VTdGFydCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuJHNlbGVjdGFibGVJdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgaXRlbVJlY3QgPSBpdGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgY29uc3Qgd2l0aGluQm91bmRpbmdCb3ggPSBpbkJvdW5kaW5nQm94KG1vdXNlUG9pbnQsIGl0ZW1SZWN0KTtcblxuICAgICAgaWYgKHRoaXMuc2hvcnRjdXRzLmV4dGVuZGVkU2VsZWN0aW9uU2hvcnRjdXQoZXZlbnQpICYmIHRoaXMuZGlzYWJsZVJhbmdlU2VsZWN0aW9uKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgd2l0aGluUmFuZ2UgPVxuICAgICAgICB0aGlzLnNob3J0Y3V0cy5leHRlbmRlZFNlbGVjdGlvblNob3J0Y3V0KGV2ZW50KSAmJlxuICAgICAgICBzdGFydEluZGV4ID4gLTEgJiZcbiAgICAgICAgZW5kSW5kZXggPiAtMSAmJlxuICAgICAgICBpbmRleCA+PSBzdGFydEluZGV4ICYmXG4gICAgICAgIGluZGV4IDw9IGVuZEluZGV4ICYmXG4gICAgICAgIHN0YXJ0SW5kZXggIT09IGVuZEluZGV4O1xuXG4gICAgICBjb25zdCBzaG91bGRBZGQgPVxuICAgICAgICAod2l0aGluQm91bmRpbmdCb3ggJiZcbiAgICAgICAgICAhdGhpcy5zaG9ydGN1dHMudG9nZ2xlU2luZ2xlSXRlbShldmVudCkgJiZcbiAgICAgICAgICAhdGhpcy5zZWxlY3RNb2RlICYmXG4gICAgICAgICAgIXRoaXMuc2VsZWN0V2l0aFNob3J0Y3V0KSB8fFxuICAgICAgICAodGhpcy5zaG9ydGN1dHMuZXh0ZW5kZWRTZWxlY3Rpb25TaG9ydGN1dChldmVudCkgJiYgaXRlbS5zZWxlY3RlZCAmJiAhdGhpcy5fbGFzdFJhbmdlU2VsZWN0aW9uLmdldChpdGVtKSkgfHxcbiAgICAgICAgd2l0aGluUmFuZ2UgfHxcbiAgICAgICAgKHdpdGhpbkJvdW5kaW5nQm94ICYmIHRoaXMuc2hvcnRjdXRzLnRvZ2dsZVNpbmdsZUl0ZW0oZXZlbnQpICYmICFpdGVtLnNlbGVjdGVkKSB8fFxuICAgICAgICAoIXdpdGhpbkJvdW5kaW5nQm94ICYmIHRoaXMuc2hvcnRjdXRzLnRvZ2dsZVNpbmdsZUl0ZW0oZXZlbnQpICYmIGl0ZW0uc2VsZWN0ZWQpIHx8XG4gICAgICAgICh3aXRoaW5Cb3VuZGluZ0JveCAmJiAhaXRlbS5zZWxlY3RlZCAmJiB0aGlzLnNlbGVjdE1vZGUpIHx8XG4gICAgICAgICghd2l0aGluQm91bmRpbmdCb3ggJiYgaXRlbS5zZWxlY3RlZCAmJiB0aGlzLnNlbGVjdE1vZGUpO1xuXG4gICAgICBjb25zdCBzaG91bGRSZW1vdmUgPVxuICAgICAgICAoIXdpdGhpbkJvdW5kaW5nQm94ICYmXG4gICAgICAgICAgIXRoaXMuc2hvcnRjdXRzLnRvZ2dsZVNpbmdsZUl0ZW0oZXZlbnQpICYmXG4gICAgICAgICAgIXRoaXMuc2VsZWN0TW9kZSAmJlxuICAgICAgICAgICF0aGlzLnNob3J0Y3V0cy5leHRlbmRlZFNlbGVjdGlvblNob3J0Y3V0KGV2ZW50KSAmJlxuICAgICAgICAgICF0aGlzLnNlbGVjdFdpdGhTaG9ydGN1dCkgfHxcbiAgICAgICAgKHRoaXMuc2hvcnRjdXRzLmV4dGVuZGVkU2VsZWN0aW9uU2hvcnRjdXQoZXZlbnQpICYmIGN1cnJlbnRJbmRleCA+IC0xKSB8fFxuICAgICAgICAoIXdpdGhpbkJvdW5kaW5nQm94ICYmIHRoaXMuc2hvcnRjdXRzLnRvZ2dsZVNpbmdsZUl0ZW0oZXZlbnQpICYmICFpdGVtLnNlbGVjdGVkKSB8fFxuICAgICAgICAod2l0aGluQm91bmRpbmdCb3ggJiYgdGhpcy5zaG9ydGN1dHMudG9nZ2xlU2luZ2xlSXRlbShldmVudCkgJiYgaXRlbS5zZWxlY3RlZCkgfHxcbiAgICAgICAgKCF3aXRoaW5Cb3VuZGluZ0JveCAmJiAhaXRlbS5zZWxlY3RlZCAmJiB0aGlzLnNlbGVjdE1vZGUpIHx8XG4gICAgICAgICh3aXRoaW5Cb3VuZGluZ0JveCAmJiBpdGVtLnNlbGVjdGVkICYmIHRoaXMuc2VsZWN0TW9kZSk7XG5cbiAgICAgIGlmIChzaG91bGRBZGQpIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0SXRlbShpdGVtKTtcbiAgICAgIH0gZWxzZSBpZiAoc2hvdWxkUmVtb3ZlKSB7XG4gICAgICAgIHRoaXMuX2Rlc2VsZWN0SXRlbShpdGVtKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHdpdGhpblJhbmdlICYmICF0aGlzLl9sYXN0UmFuZ2VTZWxlY3Rpb24uZ2V0KGl0ZW0pKSB7XG4gICAgICAgIHRoaXMuX2xhc3RSYW5nZVNlbGVjdGlvbi5zZXQoaXRlbSwgdHJ1ZSk7XG4gICAgICB9IGVsc2UgaWYgKCF3aXRoaW5SYW5nZSAmJiAhdGhpcy5fbmV3UmFuZ2VTdGFydCAmJiAhaXRlbS5zZWxlY3RlZCkge1xuICAgICAgICB0aGlzLl9sYXN0UmFuZ2VTZWxlY3Rpb24uZGVsZXRlKGl0ZW0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gaWYgd2UgZG9uJ3QgdG9nZ2xlIGEgc2luZ2xlIGl0ZW0sIHdlIHNldCBgbmV3UmFuZ2VTdGFydGAgdG8gYGZhbHNlYFxuICAgIC8vIG1lYW5pbmcgdGhhdCB3ZSBhcmUgYnVpbGRpbmcgdXAgYSByYW5nZVxuICAgIGlmICghdGhpcy5zaG9ydGN1dHMudG9nZ2xlU2luZ2xlSXRlbShldmVudCkpIHtcbiAgICAgIHRoaXMuX25ld1JhbmdlU3RhcnQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9zZWxlY3RJdGVtcyhldmVudDogRXZlbnQpIHtcbiAgICBjb25zdCBzZWxlY3Rpb25Cb3ggPSBjYWxjdWxhdGVCb3VuZGluZ0NsaWVudFJlY3QodGhpcy4kc2VsZWN0Qm94Lm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgdGhpcy4kc2VsZWN0YWJsZUl0ZW1zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICBpZiAodGhpcy5faXNFeHRlbmRlZFNlbGVjdGlvbihldmVudCkpIHtcbiAgICAgICAgdGhpcy5fZXh0ZW5kZWRTZWxlY3Rpb25Nb2RlKHNlbGVjdGlvbkJveCwgaXRlbSwgZXZlbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fbm9ybWFsU2VsZWN0aW9uTW9kZShzZWxlY3Rpb25Cb3gsIGl0ZW0sIGV2ZW50KTtcblxuICAgICAgICBpZiAodGhpcy5fbGFzdFN0YXJ0SW5kZXggPCAwICYmIGl0ZW0uc2VsZWN0ZWQpIHtcbiAgICAgICAgICBpdGVtLnRvZ2dsZVJhbmdlU3RhcnQoKTtcbiAgICAgICAgICB0aGlzLl9sYXN0U3RhcnRJbmRleCA9IGluZGV4O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pc0V4dGVuZGVkU2VsZWN0aW9uKGV2ZW50OiBFdmVudCkge1xuICAgIHJldHVybiB0aGlzLnNob3J0Y3V0cy5leHRlbmRlZFNlbGVjdGlvblNob3J0Y3V0KGV2ZW50KSAmJiB0aGlzLnNlbGVjdE9uRHJhZztcbiAgfVxuXG4gIHByaXZhdGUgX25vcm1hbFNlbGVjdGlvbk1vZGUoc2VsZWN0Qm94OiBCb3VuZGluZ0JveCwgaXRlbTogU2VsZWN0SXRlbURpcmVjdGl2ZSwgZXZlbnQ6IEV2ZW50KSB7XG4gICAgY29uc3QgaW5TZWxlY3Rpb24gPSBib3hJbnRlcnNlY3RzKHNlbGVjdEJveCwgaXRlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSk7XG5cbiAgICBjb25zdCBzaG91bGRBZGQgPSBpblNlbGVjdGlvbiAmJiAhaXRlbS5zZWxlY3RlZCAmJiAhdGhpcy5zaG9ydGN1dHMucmVtb3ZlRnJvbVNlbGVjdGlvbihldmVudCk7XG5cbiAgICBjb25zdCBzaG91bGRSZW1vdmUgPVxuICAgICAgKCFpblNlbGVjdGlvbiAmJiBpdGVtLnNlbGVjdGVkICYmICF0aGlzLnNob3J0Y3V0cy5hZGRUb1NlbGVjdGlvbihldmVudCkpIHx8XG4gICAgICAoaW5TZWxlY3Rpb24gJiYgaXRlbS5zZWxlY3RlZCAmJiB0aGlzLnNob3J0Y3V0cy5yZW1vdmVGcm9tU2VsZWN0aW9uKGV2ZW50KSk7XG5cbiAgICBpZiAoc2hvdWxkQWRkKSB7XG4gICAgICB0aGlzLl9zZWxlY3RJdGVtKGl0ZW0pO1xuICAgIH0gZWxzZSBpZiAoc2hvdWxkUmVtb3ZlKSB7XG4gICAgICB0aGlzLl9kZXNlbGVjdEl0ZW0oaXRlbSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZXh0ZW5kZWRTZWxlY3Rpb25Nb2RlKHNlbGVjdEJveCwgaXRlbTogU2VsZWN0SXRlbURpcmVjdGl2ZSwgZXZlbnQ6IEV2ZW50KSB7XG4gICAgY29uc3QgaW5TZWxlY3Rpb24gPSBib3hJbnRlcnNlY3RzKHNlbGVjdEJveCwgaXRlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSk7XG5cbiAgICBjb25zdCBzaG91ZGxBZGQgPVxuICAgICAgKGluU2VsZWN0aW9uICYmICFpdGVtLnNlbGVjdGVkICYmICF0aGlzLnNob3J0Y3V0cy5yZW1vdmVGcm9tU2VsZWN0aW9uKGV2ZW50KSAmJiAhdGhpcy5fdG1wSXRlbXMuaGFzKGl0ZW0pKSB8fFxuICAgICAgKGluU2VsZWN0aW9uICYmIGl0ZW0uc2VsZWN0ZWQgJiYgdGhpcy5zaG9ydGN1dHMucmVtb3ZlRnJvbVNlbGVjdGlvbihldmVudCkgJiYgIXRoaXMuX3RtcEl0ZW1zLmhhcyhpdGVtKSk7XG5cbiAgICBjb25zdCBzaG91bGRSZW1vdmUgPVxuICAgICAgKCFpblNlbGVjdGlvbiAmJiBpdGVtLnNlbGVjdGVkICYmIHRoaXMuc2hvcnRjdXRzLmFkZFRvU2VsZWN0aW9uKGV2ZW50KSAmJiB0aGlzLl90bXBJdGVtcy5oYXMoaXRlbSkpIHx8XG4gICAgICAoIWluU2VsZWN0aW9uICYmICFpdGVtLnNlbGVjdGVkICYmIHRoaXMuc2hvcnRjdXRzLnJlbW92ZUZyb21TZWxlY3Rpb24oZXZlbnQpICYmIHRoaXMuX3RtcEl0ZW1zLmhhcyhpdGVtKSk7XG5cbiAgICBpZiAoc2hvdWRsQWRkKSB7XG4gICAgICBpdGVtLnNlbGVjdGVkID8gaXRlbS5fZGVzZWxlY3QoKSA6IGl0ZW0uX3NlbGVjdCgpO1xuXG4gICAgICBjb25zdCBhY3Rpb24gPSB0aGlzLnNob3J0Y3V0cy5yZW1vdmVGcm9tU2VsZWN0aW9uKGV2ZW50KVxuICAgICAgICA/IEFjdGlvbi5EZWxldGVcbiAgICAgICAgOiB0aGlzLnNob3J0Y3V0cy5hZGRUb1NlbGVjdGlvbihldmVudClcbiAgICAgICAgPyBBY3Rpb24uQWRkXG4gICAgICAgIDogQWN0aW9uLk5vbmU7XG5cbiAgICAgIHRoaXMuX3RtcEl0ZW1zLnNldChpdGVtLCBhY3Rpb24pO1xuICAgIH0gZWxzZSBpZiAoc2hvdWxkUmVtb3ZlKSB7XG4gICAgICB0aGlzLnNob3J0Y3V0cy5yZW1vdmVGcm9tU2VsZWN0aW9uKGV2ZW50KSA/IGl0ZW0uX3NlbGVjdCgpIDogaXRlbS5fZGVzZWxlY3QoKTtcbiAgICAgIHRoaXMuX3RtcEl0ZW1zLmRlbGV0ZShpdGVtKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9mbHVzaEl0ZW1zKCkge1xuICAgIHRoaXMuX3RtcEl0ZW1zLmZvckVhY2goKGFjdGlvbiwgaXRlbSkgPT4ge1xuICAgICAgaWYgKGFjdGlvbiA9PT0gQWN0aW9uLkFkZCkge1xuICAgICAgICB0aGlzLl9zZWxlY3RJdGVtKGl0ZW0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoYWN0aW9uID09PSBBY3Rpb24uRGVsZXRlKSB7XG4gICAgICAgIHRoaXMuX2Rlc2VsZWN0SXRlbShpdGVtKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuX3RtcEl0ZW1zLmNsZWFyKCk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRJdGVtKGl0ZW06IFNlbGVjdEl0ZW1EaXJlY3RpdmUsIHNlbGVjdGVkSXRlbXM6IEFycmF5PGFueT4pIHtcbiAgICBsZXQgc3VjY2VzcyA9IGZhbHNlO1xuXG4gICAgaWYgKCF0aGlzLl9oYXNJdGVtKGl0ZW0sIHNlbGVjdGVkSXRlbXMpKSB7XG4gICAgICBzdWNjZXNzID0gdHJ1ZTtcbiAgICAgIHNlbGVjdGVkSXRlbXMucHVzaChpdGVtLnZhbHVlKTtcbiAgICAgIHRoaXMuX3NlbGVjdGVkSXRlbXMkLm5leHQoc2VsZWN0ZWRJdGVtcyk7XG4gICAgICB0aGlzLml0ZW1TZWxlY3RlZC5lbWl0KGl0ZW0udmFsdWUpO1xuICAgIH1cblxuICAgIHJldHVybiBzdWNjZXNzO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlSXRlbShpdGVtOiBTZWxlY3RJdGVtRGlyZWN0aXZlLCBzZWxlY3RlZEl0ZW1zOiBBcnJheTxhbnk+KSB7XG4gICAgbGV0IHN1Y2Nlc3MgPSBmYWxzZTtcbiAgICBjb25zdCB2YWx1ZSA9IGl0ZW0gaW5zdGFuY2VvZiBTZWxlY3RJdGVtRGlyZWN0aXZlID8gaXRlbS52YWx1ZSA6IGl0ZW07XG4gICAgY29uc3QgaW5kZXggPSBzZWxlY3RlZEl0ZW1zLmluZGV4T2YodmFsdWUpO1xuXG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIHN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgc2VsZWN0ZWRJdGVtcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgdGhpcy5fc2VsZWN0ZWRJdGVtcyQubmV4dChzZWxlY3RlZEl0ZW1zKTtcbiAgICAgIHRoaXMuaXRlbURlc2VsZWN0ZWQuZW1pdChpdGVtLnZhbHVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3VjY2VzcztcbiAgfVxuXG4gIHByaXZhdGUgX3RvZ2dsZUl0ZW0oaXRlbTogU2VsZWN0SXRlbURpcmVjdGl2ZSkge1xuICAgIGlmIChpdGVtLnNlbGVjdGVkKSB7XG4gICAgICB0aGlzLl9kZXNlbGVjdEl0ZW0oaXRlbSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3NlbGVjdEl0ZW0oaXRlbSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfc2VsZWN0SXRlbShpdGVtOiBTZWxlY3RJdGVtRGlyZWN0aXZlKSB7XG4gICAgdGhpcy51cGRhdGVJdGVtcyQubmV4dCh7IHR5cGU6IFVwZGF0ZUFjdGlvbnMuQWRkLCBpdGVtIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfZGVzZWxlY3RJdGVtKGl0ZW06IFNlbGVjdEl0ZW1EaXJlY3RpdmUpIHtcbiAgICB0aGlzLnVwZGF0ZUl0ZW1zJC5uZXh0KHsgdHlwZTogVXBkYXRlQWN0aW9ucy5SZW1vdmUsIGl0ZW0gfSk7XG4gIH1cblxuICBwcml2YXRlIF9oYXNJdGVtKGl0ZW06IFNlbGVjdEl0ZW1EaXJlY3RpdmUsIHNlbGVjdGVkSXRlbXM6IEFycmF5PGFueT4pIHtcbiAgICByZXR1cm4gc2VsZWN0ZWRJdGVtcy5pbmNsdWRlcyhpdGVtLnZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldENsb3Nlc3RTZWxlY3RJdGVtKGV2ZW50OiBFdmVudCk6IFtudW1iZXIsIFNlbGVjdEl0ZW1EaXJlY3RpdmVdIHtcbiAgICBjb25zdCB0YXJnZXQgPSAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5jbG9zZXN0KCcuZHRzLXNlbGVjdC1pdGVtJyk7XG4gICAgbGV0IGluZGV4ID0gLTE7XG4gICAgbGV0IHRhcmdldEl0ZW0gPSBudWxsO1xuXG4gICAgaWYgKHRhcmdldCkge1xuICAgICAgdGFyZ2V0SXRlbSA9IHRhcmdldFtTRUxFQ1RfSVRFTV9JTlNUQU5DRV07XG4gICAgICBpbmRleCA9IHRoaXMuX3NlbGVjdGFibGVJdGVtcy5pbmRleE9mKHRhcmdldEl0ZW0pO1xuICAgIH1cblxuICAgIHJldHVybiBbaW5kZXgsIHRhcmdldEl0ZW1dO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVzZXRSYW5nZVN0YXJ0KCkge1xuICAgIHRoaXMuX2xhc3RSYW5nZSA9IFstMSwgLTFdO1xuICAgIGNvbnN0IGxhc3RSYW5nZVN0YXJ0ID0gdGhpcy5fZ2V0TGFzdFJhbmdlU2VsZWN0aW9uKCk7XG5cbiAgICBpZiAobGFzdFJhbmdlU3RhcnQgJiYgbGFzdFJhbmdlU3RhcnQucmFuZ2VTdGFydCkge1xuICAgICAgbGFzdFJhbmdlU3RhcnQudG9nZ2xlUmFuZ2VTdGFydCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2dldExhc3RSYW5nZVNlbGVjdGlvbigpOiBTZWxlY3RJdGVtRGlyZWN0aXZlIHwgbnVsbCB7XG4gICAgaWYgKHRoaXMuX2xhc3RTdGFydEluZGV4ID49IDApIHtcbiAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RhYmxlSXRlbXNbdGhpcy5fbGFzdFN0YXJ0SW5kZXhdO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG59XG4iXX0=