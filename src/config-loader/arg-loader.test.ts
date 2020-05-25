import { argLoader } from './arg-loader';

test('arg-loader/base', async () => {
  const loader = argLoader({
    args: ['-p', '--part', 'lim', '-fa', '-s=34', '-f=hello'],
  })
  expect(await loader({})).toEqual({
    _: [],
    p: true,
    part: 'lim',
    f: [true, 'hello'],
    a: true,
    s: 34,
  })
});
