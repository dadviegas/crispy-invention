import state from '@dadv/asgard-state-management';
import keyboard from '../logic/KeyboardHandler';
import navigation from '../logic/NavigationHandler';
import theme from '../logic/ThemeHandler';

const storeElements = [
  keyboard,
  navigation,
  theme,
]

const store = state(storeElements);

export default store;

if (module.hot) {
  window.moduleApp = window.moduleApp || {};
  window.moduleApp.store = store
}