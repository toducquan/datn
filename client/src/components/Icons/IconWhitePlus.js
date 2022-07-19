import Icon from '@ant-design/icons';

const IconWhitePlusSVG = () => (
    <svg id="プラスのアイコン素材" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
        <path id="Path_42" data-name="Path 42" d="M148.3,144.078h-1.875a.352.352,0,0,1-.352-.352v-1.875a.352.352,0,0,0-.352-.352h-1.3a.352.352,0,0,0-.352.352v1.875a.352.352,0,0,1-.352.352h-1.875a.352.352,0,0,0-.352.352v1.3a.352.352,0,0,0,.352.352h1.875a.352.352,0,0,1,.352.352V148.3a.352.352,0,0,0,.352.352h1.3a.352.352,0,0,0,.352-.352V146.43a.352.352,0,0,1,.352-.352H148.3a.352.352,0,0,0,.352-.352v-1.3A.352.352,0,0,0,148.3,144.078Z" transform="translate(-137.074 -137.078)" fill="#fff"/>
        <path id="Path_43" data-name="Path 43" d="M8,0a8,8,0,1,0,8,8A8,8,0,0,0,8,0ZM8,14a6,6,0,1,1,6-6A6.007,6.007,0,0,1,8,14Z" fill="#fff"/>
    </svg>  
);

export const IconWhitePlus = props => <Icon component={IconWhitePlusSVG} {...props} />;