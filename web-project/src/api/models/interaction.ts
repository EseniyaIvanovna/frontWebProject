import { Status } from './status';

export type Interaction = {
  id: number;
  user1Id: number;
  user2Id: number;
  status: Status;
};
