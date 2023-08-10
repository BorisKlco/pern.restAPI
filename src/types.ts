export type UserDataType = {
  id: number;
  email: string;
  username: string;
  password: string;
  salt: string;
  sessiontoken: string | null;
};

export type UserModelType = {
  rowCount: number;
  rows: UserDataType[];
};
