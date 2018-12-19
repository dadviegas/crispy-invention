import {
  call, fork, put, take, race,
} from 'redux-saga/effects';
import { delay, eventChannel } from 'redux-saga';

import { constants, actions } from './actions';

const KEYBOARD_DELAY_EVENT_SPEED = [150, 100, 50];
const KEYBOARD_STEP = 2;
const keyboardSpeedInterval = KEYBOARD_DELAY_EVENT_SPEED.map((value, index) => (index + 1) * KEYBOARD_STEP);

let keyboardSpeedIndex = 0;
let timesRunned = 0;

const serializeKeyEvent = (event, speed) => ({
  keyCode: event.keyCode,
  keyName: event.key,
  speed,
});

export const defineSpeed = (timesRunnedLocal) => {
  keyboardSpeedInterval.some((value, index) => {
    if (timesRunnedLocal < value) {
      keyboardSpeedIndex = index;
      return true;
    }

    return false;
  });
};

export function* keyDownEvent() {
  const keyDownChannel = yield call(keyEventHandler, 'keydown');

  while (true) {
    const event = yield take(keyDownChannel);
    yield put(actions.keypressed({
      ...serializeKeyEvent(event),
      speed: keyboardSpeedIndex,
    }));

    defineSpeed(timesRunned + 1);

    yield race({
      wait: call(delay, KEYBOARD_DELAY_EVENT_SPEED[keyboardSpeedIndex]),
      cancel: take(constants.KEY_RELEASED),
    });
  }
}

export function* keyUpEvent() {
  const keyUpChannel = yield call(keyEventHandler, 'keyup');

  while (true) {
    const event = yield take(keyUpChannel);
    timesRunned = 0;
    keyboardSpeedIndex = 0;
    yield put(actions.keyReleased(event));
    yield put(actions.clearKey());
  }
}

export function* keyEventHandler(eventName) {
  return eventChannel((emit) => {
    const listener = (event) => {
      emit(event);
      // event.preventDefault();
    };
    const document = window.document;

    document.addEventListener(eventName, listener);

    return () => {
      document.removeEventListener(eventName, listener);
    };
  });
}

export default function* init() {
  yield fork(keyUpEvent);
  yield fork(keyDownEvent);
}
