import data from '../data/mentors.json';

export const initialState = {
  currentMentor: {},
  mentors: data.mentors,
  tasks: data.tasks,
};

export function mentorsReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_MENTOR':
      return { ...state, currentMentor: action.payload };
    default:
      return state;
  }
}
