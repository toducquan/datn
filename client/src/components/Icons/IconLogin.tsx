import Icon from '@ant-design/icons';

const IconUserSVG = () => (
    <svg id="人物の無料素材" xmlns="http://www.w3.org/2000/svg" width="17.037" height="25.448" viewBox="0 0 17.037 25.448">
        <path id="Path_1" data-name="Path 1" d="M129.95,13.187a6.593,6.593,0,1,0-6.593-6.593A6.593,6.593,0,0,0,129.95,13.187Z" transform="translate(-121.431)" fill="#acacac"/>
        <path id="Path_2" data-name="Path 2" d="M101.579,287.29a12.683,12.683,0,0,0-2.861-5.341.839.839,0,0,0-.969-.071,8.767,8.767,0,0,1-9.227,0,.839.839,0,0,0-.969.071,12.684,12.684,0,0,0-2.861,5.341c-.723,4.341,3.914,5.91,8.443,5.91S102.3,291.632,101.579,287.29Z" transform="translate(-84.617 -267.752)" fill="#acacac"/>
    </svg>
);
const IconPasswordSVG = () => (
    <svg id="カギの閉じた錠のアイコン素材_3" data-name="カギの閉じた錠のアイコン素材 3" xmlns="http://www.w3.org/2000/svg" width="21.567" height="25.777" viewBox="0 0 21.567 25.777">
        <path id="Path_3" data-name="Path 3" d="M60.239,10.71H59.76V7.165a7.164,7.164,0,1,0-14.329,0V10.71h-.479a3.141,3.141,0,0,0-3.14,3.14v8.787a3.141,3.141,0,0,0,3.14,3.14H60.239a3.141,3.141,0,0,0,3.14-3.14V13.85A3.14,3.14,0,0,0,60.239,10.71ZM48.533,7.165a4.062,4.062,0,1,1,8.125,0V10.71H48.533ZM53.5,19.216,54,22.423H51.193l.494-3.207a2.235,2.235,0,1,1,1.816,0Z" transform="translate(-41.812 0)" fill="#acacac"/>
    </svg>
);

export const IconUser = props => <Icon component={IconUserSVG} {...props} />;
export const IconPassword = props => <Icon component={IconPasswordSVG} {...props} />;