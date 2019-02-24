export const setMentor = mentorNickname => async (dispatch, getState) => {
  const mentor = getState().mentors.find(m => m.nickname === mentorNickname);
  dispatch({ type: 'SET_MENTOR', payload: mentor });
};
