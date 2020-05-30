import { EventEmitter } from './event-emitter';
import { Event } from './event';
import { Listener } from './listener';

test('EventEmitter/base', () => {
  const emitter = new EventEmitter();
  expect(emitter.eventListeners).toBeInstanceOf(Map);
  expect(emitter.eventMiddlewares).toBeInstanceOf(Map);
});

test('EventEmitter/on', () => {
  const emitter = new EventEmitter();
  const name = 'test';
  const callback = () => {};
  emitter.on(name, callback);
  expect(emitter.eventListeners.size).toBe(1);
  expect(emitter.eventMiddlewares.size).toBe(0);
  expect(emitter.eventListeners.get(name)).toBe(callback);

  const callback2 = (a: any) => a;
  emitter.on(name, callback2);
  expect(emitter.eventListeners.size).toBe(1);
  expect(emitter.eventMiddlewares.size).toBe(0);
  let listeners = <Set<Listener>>emitter.eventListeners.get(name);
  expect(listeners).toBeInstanceOf(Set);
  expect(listeners.has(callback)).toBe(true);
  expect(listeners.has(callback2)).toBe(true);

  const callback3 = (a: Event) => { console.log(a.name); };
  emitter.on(name, callback3);
  expect(emitter.eventListeners.size).toBe(1);
  expect(emitter.eventMiddlewares.size).toBe(0);
  listeners = <Set<Listener>>emitter.eventListeners.get(name);
  expect(listeners).toBeInstanceOf(Set);
  expect(listeners.has(callback)).toBe(true);
  expect(listeners.has(callback2)).toBe(true);
  expect(listeners.has(callback3)).toBe(true);
});

test('EventEmitter/once', async () => {
  const emitter = new EventEmitter();
  const name = 'test';
  const test = jest.fn();
  emitter.once(name, test);
  expect(emitter.eventListeners.size).toBe(1);

  await emitter.emit(new Event(name, 10));
  expect(test).toBeCalled();
  expect(emitter.eventListeners.size).toBe(0);
});

test('EventEmitter/off', async () => {
  const emitter = new EventEmitter();
  const name = 'test';
  const callback = () => {};
  emitter.on(name, callback);
  emitter.off(name, callback);
  expect(emitter.eventListeners.size).toBe(0);

  const callback2 = () => {};
  emitter.on(name, callback);
  emitter.on(name, callback2);
  emitter.off(name, callback);
  expect(emitter.eventListeners.size).toBe(1);
  let listeners = <Set<Listener>>emitter.eventListeners.get(name);
  expect(listeners).toBeInstanceOf(Set);
  expect(listeners.has(callback)).toBe(false);
  expect(listeners.size).toBe(1);
  emitter.off(name, callback2);
  expect(emitter.eventListeners.size).toBe(1);
  listeners = <Set<Listener>>emitter.eventListeners.get(name);
  expect(listeners).toBeInstanceOf(Set);
  expect(listeners.size).toBe(0);
});

test('EventEmitter/base-usage', async () => {
  const emitter = new EventEmitter();
  const test = jest.fn();
  emitter.on('test', test);
  await emitter.emit(new Event('test', 10));
  expect(test).toBeCalled();
});/**/
