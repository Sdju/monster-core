import { CancelError } from './cancel-error';

test('CancelError/check', ()=> {
  try {
    throw new CancelError();
  } catch (error) {
    expect(error.name).toBe(CancelError.name);
    expect(typeof error.message).toBe('string');
  }
});
