import * as types from '../../constants/Semester'

const initState = {
    semesters: [],
    loading: true,
    messageErr: ''
}

const SemesterReducer = (state = initState, action) => {
    switch(action.type) {
        case types.LOAD_ALL_SEMESTER:
            return {
                ...state,
                loading: false,
                semesters: [
                    ...action.payload
                ]
            }
        default:
            return state;
    }
}

export default SemesterReducer;