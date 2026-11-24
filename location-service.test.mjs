import { describe, it, expect, beforeEach } from 'vitest';
import service from './location-service.js';

const { createLocationService } = service;

describe('US-05: Add Location Record', () => {
  let storage;
  let tracker;

  beforeEach(() => {
    const data = new Map();
    storage = {
      getItem: key => data.get(key) ?? null,
      setItem: (key, value) => data.set(key, value)
    };
    tracker = createLocationService(storage);
  });

  it('saves a valid location with a timestamp', () => {
    const record = tracker.addLocation('cat1', 'Living room');
    expect(record.location).toBe('Living room');
    expect(record.timestamp).toBeTruthy();
    expect(tracker.loadLocations()).toHaveLength(1);
  });

  it('rejects an empty location', () => {
    expect(() => tracker.addLocation('cat1', ' '))
      .toThrow('Please enter a location.');
    expect(tracker.loadLocations()).toHaveLength(0);
  });

  it('rejects a missing cat', () => {
    expect(() => tracker.addLocation('', 'Kitchen'))
      .toThrow('Please select a cat.');
  });

  it('preserves saved location records', () => {
    tracker.addLocation('cat1', 'Bedroom');
    const reloaded = createLocationService(storage);
    expect(reloaded.loadLocations()[0].location)
      .toBe('Bedroom');
  });
});
