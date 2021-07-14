import UserModel from '@/modules/User/user.model';

import AccountModel from '@/modules/Account/account.model';

export default async function load(): Promise<void> {
  const admin = await UserModel.findOne({ role: 'ADMIN' });
  if (!admin) {
    await UserModel.create({
      email: 'admin@mail.com',
      name: 'Super Admin',
      role: 'ADMIN',
    });
  }

  const user = await UserModel.findOne({ email: 'user01@mail.com' });
  const userIns =
    user ||
    (await UserModel.create({
      email: 'user01@mail.com',
      name: 'User - 01',
      role: 'USER',
    }));

  const account = await AccountModel.findOne({ userId: userIns._id });
  if (account) return;
  await AccountModel.create({
    intervalFetching: 1,
    account: '123456789',
    bankName: 'CIB Egypt',
    userId: userIns._id,
  });
}
