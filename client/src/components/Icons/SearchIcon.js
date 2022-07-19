import Icon from '@ant-design/icons';

const IconSearchSVG = () => (
    <svg id="検索用の虫眼鏡アイコン素材" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
        <path id="Path_36" data-name="Path 36" d="M97.652,102.4a2.422,2.422,0,0,0-2.419,2.42.335.335,0,1,0,.671,0,1.75,1.75,0,0,1,1.748-1.749.336.336,0,0,0,0-.671Z" transform="translate(-92.257 -99.2)" fill="#acacac"/>
        <path id="Path_37" data-name="Path 37" d="M11.3,9.422A6.129,6.129,0,0,0,2.843.958,6.175,6.175,0,0,0,.958,2.844a6.129,6.129,0,0,0,8.459,8.464A6.175,6.175,0,0,0,11.3,9.422Zm-3.184.585a4.354,4.354,0,0,1-5.86-5.863A4.382,4.382,0,0,1,4.143,2.259,4.353,4.353,0,0,1,10,8.121,4.381,4.381,0,0,1,8.117,10.008Z" fill="#acacac"/>
        <path id="Path_38" data-name="Path 38" d="M331.389,329.662l-3.539-3.532a7.293,7.293,0,0,1-1.885,1.886l3.539,3.532a1.333,1.333,0,1,0,1.885-1.886Z" transform="translate(-315.78 -315.938)" fill="#acacac"/>
    </svg>
);

const IconSearchPrimarySVG = () => (
    <svg id="検索用の虫眼鏡アイコン素材" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
        <path id="Path_36" data-name="Path 36" d="M97.652,102.4a2.422,2.422,0,0,0-2.419,2.42.335.335,0,1,0,.671,0,1.75,1.75,0,0,1,1.748-1.749.336.336,0,0,0,0-.671Z" transform="translate(-92.257 -99.2)" fill="#24a854"/>
        <path id="Path_37" data-name="Path 37" d="M11.3,9.422A6.129,6.129,0,0,0,2.843.958,6.175,6.175,0,0,0,.958,2.844a6.129,6.129,0,0,0,8.459,8.464A6.175,6.175,0,0,0,11.3,9.422Zm-3.184.585a4.354,4.354,0,0,1-5.86-5.863A4.382,4.382,0,0,1,4.143,2.259,4.353,4.353,0,0,1,10,8.121,4.381,4.381,0,0,1,8.117,10.008Z" fill="#24a854"/>
        <path id="Path_38" data-name="Path 38" d="M331.389,329.662l-3.539-3.532a7.293,7.293,0,0,1-1.885,1.886l3.539,3.532a1.333,1.333,0,1,0,1.885-1.886Z" transform="translate(-315.78 -315.938)" fill="#24a854"/>
    </svg>
);

export const SearchIcon = props => <Icon component={IconSearchSVG} {...props} />;
export const IconSearchPrimary = props => <Icon component={IconSearchPrimarySVG} {...props} />;