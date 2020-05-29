export function detailsState(detailsOrder) {
  return {
    type: '@modal/DETAILS_MODAL',
    payload: { detailsOrder },
  };
}

export function problemsState(detailsProblem) {
  return {
    type: '@modal/PROBLEMS_MODAL',
    payload: { detailsProblem },
  };
}
