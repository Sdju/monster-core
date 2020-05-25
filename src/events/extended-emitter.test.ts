import { EventEmitter } from './extended-emitter';
import { Event } from './event';

test('EventEmitter/base', async () => {
  const emitter = new EventEmitter();
  const test = jest.fn();
  emitter.on('test', test);
  await emitter.emit(new Event('test', 10));
  expect(test).toBeCalled();
});
