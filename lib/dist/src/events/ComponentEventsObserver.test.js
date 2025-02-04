"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = (0, tslib_1.__importStar)(require("react"));
const renderer = (0, tslib_1.__importStar)(require("react-test-renderer"));
const ComponentEventsObserver_1 = require("./ComponentEventsObserver");
const NativeEventsReceiver_mock_1 = require("../adapters/NativeEventsReceiver.mock");
const Store_1 = require("../components/Store");
describe('ComponentEventsObserver', () => {
    const mockEventsReceiver = new NativeEventsReceiver_mock_1.NativeEventsReceiver();
    const mockStore = new Store_1.Store();
    const willAppearFn = jest.fn();
    const didAppearFn = jest.fn();
    const didDisappearFn = jest.fn();
    const didMountFn = jest.fn();
    const willUnmountFn = jest.fn();
    const navigationButtonPressedFn = jest.fn();
    const searchBarUpdatedFn = jest.fn();
    const searchBarCancelPressedFn = jest.fn();
    const previewCompletedFn = jest.fn();
    const screenPoppedFn = jest.fn();
    let subscription;
    let uut;
    class SimpleScreen extends React.Component {
        render() {
            return 'Hello';
        }
    }
    class UnboundScreen extends React.Component {
        constructor(props) {
            super(props);
        }
        componentDidMount() {
            didMountFn();
        }
        componentWillUnmount() {
            willUnmountFn();
        }
        componentWillAppear() {
            willAppearFn();
        }
        componentDidAppear() {
            didAppearFn();
        }
        componentDidDisappear() {
            didDisappearFn();
        }
        navigationButtonPressed(event) {
            navigationButtonPressedFn(event);
        }
        searchBarUpdated(event) {
            searchBarUpdatedFn(event);
        }
        searchBarCancelPressed(event) {
            searchBarCancelPressedFn(event);
        }
        previewCompleted(event) {
            previewCompletedFn(event);
        }
        screenPopped(event) {
            screenPoppedFn(event);
        }
        render() {
            return 'Hello';
        }
    }
    class BoundScreen extends React.Component {
        constructor(props) {
            super(props);
            subscription = uut.bindComponent(this);
        }
        componentDidMount() {
            didMountFn();
        }
        componentWillUnmount() {
            willUnmountFn();
        }
        componentWillAppear(event) {
            willAppearFn(event);
        }
        componentDidAppear(event) {
            didAppearFn(event);
        }
        componentDidDisappear() {
            didDisappearFn();
        }
        navigationButtonPressed(event) {
            navigationButtonPressedFn(event);
        }
        searchBarUpdated(event) {
            searchBarUpdatedFn(event);
        }
        searchBarCancelPressed(event) {
            searchBarCancelPressedFn(event);
        }
        previewCompleted(event) {
            previewCompletedFn(event);
        }
        screenPopped(event) {
            screenPoppedFn(event);
        }
        render() {
            return 'Hello';
        }
    }
    beforeEach(() => {
        jest.clearAllMocks();
        uut = new ComponentEventsObserver_1.ComponentEventsObserver(mockEventsReceiver, mockStore);
    });
    it(`bindComponent expects a component with componentId`, () => {
        const tree = renderer.create(React.createElement(SimpleScreen, null));
        expect(() => uut.bindComponent(tree.getInstance())).toThrow('');
        const tree2 = renderer.create(React.createElement(SimpleScreen, { componentId: 123 }));
        expect(() => uut.bindComponent(tree2.getInstance())).toThrow('');
    });
    it(`bindComponent accepts an optional componentId`, () => {
        const tree = renderer.create(React.createElement(UnboundScreen, null));
        uut.bindComponent(tree.getInstance(), 'myCompId');
        expect(tree.toJSON()).toBeDefined();
        expect(didAppearFn).not.toHaveBeenCalled();
        uut.notifyComponentDidAppear({
            componentId: 'myCompId',
            componentName: 'doesnt matter',
            componentType: 'Component',
        });
        expect(didAppearFn).toHaveBeenCalledTimes(1);
    });
    it(`bindComponent should use optional componentId if component has a componentId in props`, () => {
        const tree = renderer.create(React.createElement(UnboundScreen, { componentId: 'doNotUseThisId' }));
        uut.bindComponent(tree.getInstance(), 'myCompId');
        expect(tree.toJSON()).toBeDefined();
        uut.notifyComponentDidAppear({
            componentId: 'dontUseThisId',
            componentName: 'doesnt matter',
            componentType: 'Component',
        });
        expect(didAppearFn).not.toHaveBeenCalled();
        uut.notifyComponentDidAppear({
            componentId: 'myCompId',
            componentName: 'doesnt matter',
            componentType: 'Component',
        });
        expect(didAppearFn).toHaveBeenCalledTimes(1);
    });
    it(`bindComponent notifies listeners by componentId on events`, () => {
        const tree = renderer.create(React.createElement(BoundScreen, { componentId: 'myCompId' }));
        expect(tree.toJSON()).toBeDefined();
        expect(didMountFn).toHaveBeenCalledTimes(1);
        expect(didAppearFn).not.toHaveBeenCalled();
        expect(didDisappearFn).not.toHaveBeenCalled();
        expect(willUnmountFn).not.toHaveBeenCalled();
        uut.notifyComponentDidAppear({
            componentId: 'myCompId',
            componentName: 'doesnt matter',
            componentType: 'Component',
        });
        expect(didAppearFn).toHaveBeenCalledTimes(1);
        uut.notifyComponentDidDisappear({
            componentId: 'myCompId',
            componentName: 'doesnt matter',
            componentType: 'Component',
        });
        expect(didDisappearFn).toHaveBeenCalledTimes(1);
        uut.notifyNavigationButtonPressed({ componentId: 'myCompId', buttonId: 'myButtonId' });
        expect(navigationButtonPressedFn).toHaveBeenCalledTimes(1);
        expect(navigationButtonPressedFn).toHaveBeenCalledWith({
            buttonId: 'myButtonId',
            componentId: 'myCompId',
        });
        uut.notifySearchBarUpdated({ componentId: 'myCompId', text: 'theText', isFocused: true });
        expect(searchBarUpdatedFn).toHaveBeenCalledTimes(1);
        expect(searchBarUpdatedFn).toHaveBeenCalledWith({
            componentId: 'myCompId',
            text: 'theText',
            isFocused: true,
        });
        uut.notifySearchBarCancelPressed({ componentId: 'myCompId' });
        expect(searchBarCancelPressedFn).toHaveBeenCalledTimes(1);
        expect(searchBarCancelPressedFn).toHaveBeenCalledWith({ componentId: 'myCompId' });
        uut.notifyPreviewCompleted({ componentId: 'myCompId' });
        expect(previewCompletedFn).toHaveBeenCalledTimes(1);
        expect(previewCompletedFn).toHaveBeenCalledWith({ componentId: 'myCompId' });
        uut.notifyScreenPopped({ componentId: 'myCompId' });
        expect(screenPoppedFn).toHaveBeenCalledTimes(1);
        expect(screenPoppedFn).toHaveBeenLastCalledWith({ componentId: 'myCompId' });
        tree.unmount();
        expect(willUnmountFn).toHaveBeenCalledTimes(1);
    });
    it(`registerComponentListener accepts listener object`, () => {
        const tree = renderer.create(React.createElement(UnboundScreen, null));
        const didAppearListenerFn = jest.fn();
        uut.registerComponentListener({
            componentDidAppear: didAppearListenerFn,
        }, 'myCompId');
        expect(tree.toJSON()).toBeDefined();
        expect(didAppearListenerFn).not.toHaveBeenCalled();
        uut.notifyComponentDidAppear({
            componentId: 'myCompId',
            componentName: 'doesnt matter',
            componentType: 'Component',
        });
        expect(didAppearListenerFn).toHaveBeenCalledTimes(1);
    });
    it(`componentDidAppear should receive component props from store`, () => {
        const event = {
            componentId: 'myCompId',
            componentType: 'Component',
            passProps: {
                propA: 'propA',
            },
            componentName: 'doesnt matter',
        };
        renderer.create(React.createElement(BoundScreen, { componentId: event.componentId }));
        mockStore.updateProps(event.componentId, event.passProps);
        expect(didAppearFn).not.toHaveBeenCalled();
        uut.notifyComponentDidAppear({
            componentId: 'myCompId',
            componentName: 'doesnt matter',
            componentType: 'Component',
        });
        expect(didAppearFn).toHaveBeenCalledTimes(1);
        expect(didAppearFn).toHaveBeenCalledWith(event);
    });
    it(`componentWillAppear should receive component props from store`, () => {
        const event = {
            componentId: 'myCompId',
            componentType: 'Component',
            passProps: {
                propA: 'propA',
            },
            componentName: 'doesnt matter',
        };
        renderer.create(React.createElement(BoundScreen, { componentId: event.componentId }));
        mockStore.updateProps(event.componentId, event.passProps);
        expect(willAppearFn).not.toHaveBeenCalled();
        uut.notifyComponentWillAppear({
            componentId: 'myCompId',
            componentName: 'doesnt matter',
            componentType: 'Component',
        });
        expect(willAppearFn).toHaveBeenCalledTimes(1);
        expect(willAppearFn).toHaveBeenCalledWith(event);
    });
    it(`doesnt call other componentIds`, () => {
        renderer.create(React.createElement(BoundScreen, { componentId: 'myCompId' }));
        uut.notifyComponentDidAppear({
            componentId: 'other',
            componentName: 'doesnt matter',
            componentType: 'Component',
        });
        expect(didAppearFn).not.toHaveBeenCalled();
    });
    it(`doesnt call unimplemented methods`, () => {
        const tree = renderer.create(React.createElement(SimpleScreen, { componentId: 'myCompId' }));
        expect(tree.getInstance().componentDidAppear).toBeUndefined();
        uut.bindComponent(tree.getInstance());
        uut.notifyComponentDidAppear({
            componentId: 'myCompId',
            componentName: 'doesnt matter',
            componentType: 'Component',
        });
    });
    it(`returns unregister fn`, () => {
        renderer.create(React.createElement(BoundScreen, { componentId: '123' }));
        uut.notifyComponentDidAppear({
            componentId: '123',
            componentName: 'doesnt matter',
            componentType: 'Component',
        });
        expect(didAppearFn).toHaveBeenCalledTimes(1);
        subscription.remove();
        uut.notifyComponentDidAppear({
            componentId: '123',
            componentName: 'doesnt matter',
            componentType: 'Component',
        });
        expect(didAppearFn).toHaveBeenCalledTimes(1);
    });
    it(`removeAllListenersForComponentId`, () => {
        renderer.create(React.createElement(BoundScreen, { componentId: '123' }));
        renderer.create(React.createElement(BoundScreen, { componentId: '123' }));
        uut.unmounted('123');
        uut.notifyComponentDidAppear({
            componentId: '123',
            componentName: 'doesnt matter',
            componentType: 'Component',
        });
        expect(didAppearFn).not.toHaveBeenCalled();
    });
    it(`supports multiple listeners with same componentId`, () => {
        const tree1 = renderer.create(React.createElement(SimpleScreen, { componentId: 'myCompId' }));
        const tree2 = renderer.create(React.createElement(SimpleScreen, { componentId: 'myCompId' }));
        const instance1 = tree1.getInstance();
        const instance2 = tree2.getInstance();
        instance1.componentDidAppear = jest.fn();
        instance2.componentDidAppear = jest.fn();
        const result1 = uut.bindComponent(instance1);
        const result2 = uut.bindComponent(instance2);
        expect(result1).not.toEqual(result2);
        uut.notifyComponentDidAppear({
            componentId: 'myCompId',
            componentName: 'doesnt matter',
            componentType: 'Component',
        });
        expect(instance1.componentDidAppear).toHaveBeenCalledTimes(1);
        expect(instance2.componentDidAppear).toHaveBeenCalledTimes(1);
        result2.remove();
        uut.notifyComponentDidAppear({
            componentId: 'myCompId',
            componentName: 'doesnt matter',
            componentType: 'Component',
        });
        expect(instance1.componentDidAppear).toHaveBeenCalledTimes(2);
        expect(instance2.componentDidAppear).toHaveBeenCalledTimes(1);
        result1.remove();
        uut.notifyComponentDidAppear({
            componentId: 'myCompId',
            componentName: 'doesnt matter',
            componentType: 'Component',
        });
        expect(instance1.componentDidAppear).toHaveBeenCalledTimes(2);
        expect(instance2.componentDidAppear).toHaveBeenCalledTimes(1);
    });
    it(`register for all native component events notifies self on events, once`, () => {
        expect(mockEventsReceiver.registerComponentDidAppearListener).not.toHaveBeenCalled();
        expect(mockEventsReceiver.registerComponentDidDisappearListener).not.toHaveBeenCalled();
        expect(mockEventsReceiver.registerNavigationButtonPressedListener).not.toHaveBeenCalled();
        expect(mockEventsReceiver.registerSearchBarUpdatedListener).not.toHaveBeenCalled();
        expect(mockEventsReceiver.registerSearchBarCancelPressedListener).not.toHaveBeenCalled();
        expect(mockEventsReceiver.registerPreviewCompletedListener).not.toHaveBeenCalled();
        uut.registerOnceForAllComponentEvents();
        uut.registerOnceForAllComponentEvents();
        uut.registerOnceForAllComponentEvents();
        uut.registerOnceForAllComponentEvents();
        expect(mockEventsReceiver.registerComponentDidAppearListener).toHaveBeenCalledTimes(1);
        expect(mockEventsReceiver.registerComponentDidDisappearListener).toHaveBeenCalledTimes(1);
        expect(mockEventsReceiver.registerNavigationButtonPressedListener).toHaveBeenCalledTimes(1);
        expect(mockEventsReceiver.registerSearchBarUpdatedListener).toHaveBeenCalledTimes(1);
        expect(mockEventsReceiver.registerSearchBarCancelPressedListener).toHaveBeenCalledTimes(1);
        expect(mockEventsReceiver.registerPreviewCompletedListener).toHaveBeenCalledTimes(1);
    });
});
