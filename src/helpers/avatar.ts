import { User } from '../types/user.type';

export const generateImageSrc = ({ facebook_id, image }: User, imageLink?: string) => {
  let imgSrc =
    'https://www.trzcacak.rs/myfile/detail/385-3856300_no-avatar-png.png';
  imgSrc = facebook_id
    ? `http://graph.facebook.com/${facebook_id}/picture?type=large`
    : imgSrc;
  imgSrc = image ? image.link : imgSrc;
  imgSrc = imageLink ? imageLink : imgSrc;

  return imgSrc;
};