
import { call, put, fork, takeEvery } from 'redux-saga/effects'
import * as types from '../../constants/NotificationTypes'
import axios from "axios";


//Saga call api
function getAllNotificationApi(option) {
    return axios({
        method: 'GET',
        url: `${process.env.REACT_APP_BE_URL}notification/get?size=10`,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        params: option
    })
}

function getNotificationByIdApi(id) {
    return axios({
        method: 'GET',
        url: `${process.env.REACT_APP_BE_URL}notification/get/${id}`,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
}

function addNewNotificationApi(post) {
    return axios({
        method: 'POST',
        url: `${process.env.REACT_APP_BE_URL}notification/create`,
        data: post,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }).then(res => res.data)
        .catch(err => {
            throw err
        });
}

function updateNotificationApi(post) {
    return axios({
        method: 'PUT',
        url: `${process.env.REACT_APP_BE_URL}notification/update/${post.id}`,
        data: post,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }).then(res => res.data)
        .catch(err => {
            throw err
        });
}

function deleteNotificationApi(id) {
    return axios({
        method: 'DELETE',
        url: `${process.env.REACT_APP_BE_URL}notification/delete/${id}`,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }).then(res => res.data)
        .catch(err => {
            throw err
        });
}


//Saga worker
function* workerGetAllNotification(action) {
    try {
        const response = yield call(getAllNotificationApi, action.payload);
        yield put({
            type: types.LOAD_NOTIFICATION_LIST_SUCCESS,
            payload: response.data
        })
    } catch (err) {
        yield put({
            type: types.LOAD_NOTIFICATION_LIST_FAILED,
            payload: err.message
        })
    }
};

function* workerGetNotificationById(action) {
    try {
        const response = yield call(getNotificationByIdApi, action.payload);
        yield put({
            type: types.GET_NOTIFICATION_BY_ID_SUCCESS,
            payload: response.data
        })
    } catch (err) {
        yield put({
            type: types.GET_NOTIFICATION_BY_ID_FAILED,
            payload: err.message
        })
    }
};

function* workerAddNewNotification(action) {
    try {
        const response = yield call(addNewNotificationApi, action.payload);
        yield put({
            type: types.ADD_NEW_NOTIFICATION_SUCCESS,
            payload: response
        })
    } catch (err) {
        yield put({
            type: types.ADD_NEW_NOTIFICATION_FAILED,
            payload: err.message
        })
    }
};

function* workerUpdateNotification(action) {
    try {
        const response = yield call(updateNotificationApi, action.payload);
        yield put({
            type: types.UPDATE_NOTIFICATION_BY_ID_SUCCESS,
            payload: response
        })
    } catch (err) {
        yield put({
            type: types.UPDATE_NOTIFICATION_BY_ID_FAILED,
            payload: err.message
        })
    }
};

function* workerDeleteNotification(action) {
    try {
        console.log("Delete worker");
        const id = action.payload;
        yield call(deleteNotificationApi, id);
        yield put({
            type: types.DELETE_NOTIFICATION_BY_ID_SUCCESS,
            payload: id
        })
    } catch (err) {
        yield put({
            type: types.DELETE_NOTIFICATION_BY_ID_FAILED,
            payload: err.message
        })
    }
};

//Saga watcher
function* watchGetAllNotification() {
    yield takeEvery(types.LOAD_NOTIFICATION_LIST, workerGetAllNotification);
}

function* watchGetNotificationByID() {
    yield takeEvery(types.GET_NOTIFICATION_BY_ID, workerGetNotificationById);
}

function* watchPostNewNotification() {
    yield takeEvery(types.ADD_NEW_NOTIFICATION, workerAddNewNotification);
}

function* watchPutNotification() {
    yield takeEvery(types.UPDATE_NOTIFICATION_BY_ID, workerUpdateNotification);
}

function* watchDeleteNotification() {
    yield takeEvery(types.DELETE_NOTIFICATION_BY_ID, workerDeleteNotification);
}

//Notification sagas define
const postSagas = [fork(watchGetAllNotification), fork(watchGetNotificationByID), fork(watchPostNewNotification), fork(watchPutNotification), fork(watchDeleteNotification)]

export default postSagas;