import { readFileSync, writeFileSync } from 'node:fs';
import { StoredUserType } from '../../types/user';

const getList = () => {
  const usersBuffer = readFileSync('data/users.json');
  const usersString = usersBuffer.toString();
  if (!usersString) {
    return [];
  }

  const users: StoredUserType[] = JSON.parse(usersString);
  return users;
};

const exist = ({ email }: { email: string }): boolean => {
  const users = getList();
  return users.some((user) => user.email === email);
};

const write = (users: StoredUserType[]) => {
  writeFileSync('data/users.json', JSON.stringify(users));
};

export default { getList, exist, write };