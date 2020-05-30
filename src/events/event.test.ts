import { Event } from './event';

test('Event/base', () => {
  const name = 'name';
  const event = new Event(name);
  expect(event.name).toBe(name);
  expect(event.payload).toBeUndefined();
  expect(event.emitter).toBeNull();

  const payload = { some: 'value' };
  const event2 = new Event(name, payload);
  expect(event2.name).toBe(name);
  expect(event2.payload).toEqual(payload);
  expect(event2.emitter).toBeNull();
});
