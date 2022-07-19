import Icon from '@ant-design/icons';
import { IconComponentProps } from '@ant-design/icons/lib/components/Icon';

const IconUploadSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="50.982" height="41.483" viewBox="0 0 50.982 41.483">
    <g id="無料のイメージ画像のアイコン素材" transform="translate(0 -47.702)">
      <path id="Path_63" data-name="Path 63" d="M0,47.7V89.185H50.982V47.7ZM5.066,84.118V52.768H45.916v31.35Z" transform="translate(0 0)" fill="#f0f0f0" />
      <path id="Path_64" data-name="Path 64" d="M171.47,151.167a3.535,3.535,0,1,0-3.535-3.535A3.539,3.539,0,0,0,171.47,151.167Z" transform="translate(-151.213 -86.796)" fill="#f0f0f0" />
      <path id="Path_65" data-name="Path 65" d="M113.685,202.322a2.149,2.149,0,0,0-1.8.99l-4.135,6.332a1.811,1.811,0,0,1-3.073-.011,2.128,2.128,0,0,0-3.613,0l-6.986,10.86H126.7l-11.22-17.18A2.15,2.15,0,0,0,113.685,202.322Z" transform="translate(-84.712 -139.224)" fill="#f0f0f0" />
    </g>
  </svg>
);

const IconUploadPlusSVG = () => (
  <svg id="プラスのアイコン素材" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
    <path id="Path_42" data-name="Path 42" d="M147.45,143.756h-1.64a.308.308,0,0,1-.308-.308v-1.64a.308.308,0,0,0-.308-.308H144.06a.308.308,0,0,0-.308.308v1.64a.308.308,0,0,1-.308.308H141.8a.308.308,0,0,0-.308.308V145.2a.308.308,0,0,0,.308.308h1.64a.308.308,0,0,1,.308.308v1.64a.308.308,0,0,0,.308.308h1.134a.308.308,0,0,0,.308-.308v-1.64a.308.308,0,0,1,.308-.308h1.64a.308.308,0,0,0,.308-.308v-1.134A.308.308,0,0,0,147.45,143.756Z" transform="translate(-137.627 -137.631)" fill="#24a854" />
    <path id="Path_43" data-name="Path 43" d="M7,0a7,7,0,1,0,7,7A7,7,0,0,0,7,0ZM7,12.25A5.25,5.25,0,1,1,12.25,7,5.256,5.256,0,0,1,7,12.25Z" fill="#24a854" />
  </svg>
);

export const IconUpload = props => <Icon component={IconUploadSVG} {...props} />;
export const IconUploadPlus = (props: IconComponentProps & React.RefAttributes<any>) => <Icon component={IconUploadPlusSVG} {...props} />;