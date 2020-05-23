import { argLoader } from "./arg-loader";

test('arg-loader/base', async ()=> {
  const loader = argLoader({
    args: ['-p', '--part', 'lim', '-fa', '-s=34', '-f=hello']
  })
  console.log(loader())
});
