import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllSemester } from '../../../appRedux/actions/semester';
import {useAuth} from '../../../authentication'
import { httpClient } from '../../../util/Api';

export const semesterProcess = {
    Inprocess: "Đang diễn ra",
    Preparing: "Chuẩn bị",
    Closing: "Sắp kết thúc",
    End: "Kết thúc",

}

export default function TopbarDefault(props) {
    const dispatch = useDispatch();
    const semester = useSelector(({semester}) => semester.semesters);

    useEffect(() => {
        getAllSemesterss()
    }, [])

    const getAllSemesterss = () => {
        httpClient.get('http://localhost:5000/semester')
        .then(res => {
            dispatch(getAllSemester(res.data))
        })
        .catch(err => console.log('err: ', err))
    }

    const { authUser } = useAuth();
    const { value } = props;
    return (
        <div className="topbar-default">
            <div className="topbar-content">
                Học kì: <span className='topbar-content_redd'>{semester[0]?.name}</span> <span style={{ width: 50}}></span>  Trạng thái: <span className='topbar-content_redd'>{semesterProcess[semester[0]?.status]}</span>
            </div>
           
        </div>
    )
}
