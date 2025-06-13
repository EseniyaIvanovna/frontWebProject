/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGetAttachmentLinkQuery } from '../api/attachmentsApiSlice';
import { Avatar, Skeleton } from '@mui/material';

interface UserAvatarProps {
  photoAttachmentId?: number | null;
  name: string;
  lastName: string;
  size?: number;
}

export const UserAvatar = ({
  photoAttachmentId,
  name,
  lastName,
  size = 40,
}: UserAvatarProps) => {
  const {
    data: linkData,
    isLoading,
    isError,
  } = useGetAttachmentLinkQuery(photoAttachmentId as number, {
    skip: !photoAttachmentId,
  });

  if (isLoading && photoAttachmentId) {
    return <Skeleton variant='circular' width={size} height={size} />;
  }

  const initials = `${name.charAt(0)}${lastName.charAt(0)}`;
  const avatarUrl = linkData?.url;

  return (
    <Avatar
      sx={{
        width: size,
        height: size,
        bgcolor: '#997F6D',
        fontSize: size * 0.4,
      }}
      src={avatarUrl}
    >
      {!avatarUrl && initials}
    </Avatar>
  );
};
