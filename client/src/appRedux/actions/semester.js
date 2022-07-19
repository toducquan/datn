import * as types from '../../constants/Semester'

export const getAllSemester = (option) => {
    return {
        type: types.LOAD_ALL_SEMESTER,
        payload: option
    }
}
