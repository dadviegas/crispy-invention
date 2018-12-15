export const getNavigation = (state) => state.get('navigation').toJS();
export const getRoute = (state) => state.get('router', {});