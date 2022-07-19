import * as types from '../../constants/NotificationTypes'

export const getAllNotification = (option) => {
    return {
        type: types.LOAD_NOTIFICATION_LIST,
        payload: option
    }
}

export const getNotificationById = (id) => {
    return {
        type: types.GET_NOTIFICATION_BY_ID,
        payload: id
    }
}

export const addNewNotification = (notification) => {
    return {
        type: types.ADD_NEW_NOTIFICATION,
        payload: notification
    }
}

export const updateNotification = (notification) => {
    return {
        type: types.UPDATE_NOTIFICATION_BY_ID,
        payload: notification
    }
}

export const deleteNotification = (id) => {
    return {
        type: types.DELETE_NOTIFICATION_BY_ID,
        payload: id
    }
}