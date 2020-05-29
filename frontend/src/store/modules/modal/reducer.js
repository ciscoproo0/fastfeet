import produce from 'immer';

const INITIAL_STATE = {
  detailsProblem: false,
  detailsOrder: null,
};

export default function modal(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@modal/DETAILS_MODAL': {
        draft.detailsOrder = action.payload.detailsOrder;
        break;
      }

      case '@modal/PROBLEMS_MODAL': {
        draft.detailsProblem = action.payload.detailsProblem;
        break;
      }

      default:
        break;
    }
  });
}
