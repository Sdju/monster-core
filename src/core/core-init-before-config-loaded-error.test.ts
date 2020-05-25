import { CoreInitBeforeConfigLoadedError } from './core-init-before-config-loaded-error';

test('CoreInitBeforeConfigLoadedError/check', ()=> {
  try {
    throw new CoreInitBeforeConfigLoadedError();
  } catch (error) {
    expect(error.name).toBe(CoreInitBeforeConfigLoadedError.name);
    expect(typeof error.message).toBe('string');
    expect(error.message.length > 0).toBeTruthy();
  }
});
