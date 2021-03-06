import 'reflect-metadata';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John Qua',
      email: 'johnqua@example.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: '',
      email: '',
      password: '',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });

  it('should be able to retrieve providers from cache', async () => {
    const findAllProviders = jest.spyOn(
      fakeUsersRepository,
      'findAllProviders',
    );

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await fakeUsersRepository.create({
      name: 'John Qua',
      email: 'johnqua@example.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: '',
      email: '',
      password: '',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    const cachedProviders = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual(cachedProviders);
    expect(findAllProviders).toHaveBeenCalledTimes(1);
  });
});
