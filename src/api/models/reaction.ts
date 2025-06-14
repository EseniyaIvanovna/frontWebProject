import { ReactionType } from './reactionType';

export type Reaction = {
  id: number;
  userId: number;
  postId: number;
  type: ReactionType;
};
