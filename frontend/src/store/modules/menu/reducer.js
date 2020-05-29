import produce from 'immer';

const INITIAL_STATE = {
  menuState: 'Encomendas',
};

export default function menu(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@menu/REGISTER_STATE': {
        draft.menuState = action.payload.menuState;
        break;
      }

      default:
        break;
    }
  });
}
