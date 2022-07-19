import * as types from '../../constants/NotificationTypes'

const initialNotifications = {
  notifications: {
      content: [],
      total: 0,
      page: 1,
      size: 20,
  },
  loading: true,
  messageErr: ''
};

const NotificationReducer = (state = initialNotifications, action) => {
  switch (action.type) {
    //Action send request and wait
    case types.LOAD_NOTIFICATION_LIST:
    case types.GET_NOTIFICATION_BY_ID:
    case types.ADD_NEW_NOTIFICATION:
    case types.UPDATE_NOTIFICATION_BY_ID:
    case types.DELETE_NOTIFICATION_BY_ID: {
        return { 
            ...state,
            loading: true
        }
    }
    //Action success api
    case types.LOAD_NOTIFICATION_LIST_SUCCESS: {
        return {
            ...state,
            loading: false,
            notifications: {
                content: action.payload.content,
                total: action.payload.total,
                page: action.payload.page,
                size: action.payload.size
            }
        }    
    }

    case types.GET_NOTIFICATION_BY_ID_SUCCESS: {
        const notice = action.payload;
        const listNotificationTemp = [...state.notifications.content];
        const indexNotification = listNotificationTemp.findIndex((obj)=>obj.id === notice.id);
        listNotificationTemp[indexNotification] = notice;

        return {
            ...state,
            loading: false,
            notifications: {
                ...state.notifications,
                content: listNotificationTemp
            }
        }    
    }

    case types.ADD_NEW_NOTIFICATION_SUCCESS: {
        const notificationsTemp = [...state.notifications.content];
        notificationsTemp.push(action.payload)
        return {
            ...state,
            loading: false,
            notifications: {
                ...state.notifications,
                content: notificationsTemp,
                total: state.notifications.total + 1
            }
        }    
    }

    case types.UPDATE_NOTIFICATION_BY_ID_SUCCESS: {
        const notificationsTemp = [...state.notifications.content];
        notificationsTemp.splice( notificationsTemp.findIndex((notification) => notification.id === action.payload.id), 1);
        notificationsTemp.push(action.payload)
        return {
            ...state,
            loading: false,
            notifications: {
                ...state.notifications,
                content: notificationsTemp
            }    
        }    
    }

    case types.DELETE_NOTIFICATION_BY_ID_SUCCESS: {
        const notificationsTemp = [...state.notifications.content];
        notificationsTemp.splice( notificationsTemp.findIndex((notification) => notification.id === action.payload), 1);
        return {
            ...state,
            loading: false,
            notifications: {
                ...state.notifications,
                content: notificationsTemp,
                total: state.notifications.total - 1
            } 
        }
    }
    
    //Action request failed
    case types.LOAD_NOTIFICATION_LIST_FAILED:
    case types.GET_NOTIFICATION_BY_ID_FAILED:
    case types.ADD_NEW_NOTIFICATION_FAILED:
    case types.UPDATE_NOTIFICATION_BY_ID_FAILED:
    case types.DELETE_NOTIFICATION_BY_ID_FAILED:
    {
        return {
            ...state,
            loading: false,
            messageErr: action.payload 
        }    
    }
    //Default
    default:
      return state;
  }
};

export default NotificationReducer;
