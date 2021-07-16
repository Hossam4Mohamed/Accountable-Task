import envLoader from './01-env.loader';

describe('Loaders Functions', () => {
  test('env loader', async () => {
    await envLoader();
    expect(process.env.PORT).toEqual('3000');
  });
});
