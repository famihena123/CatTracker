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

describe('US-06: View Location History', () => {
  let tracker;

  beforeEach(() => {
    const data = new Map();
    tracker = createLocationService({
      getItem: key => data.get(key) ?? null,
      setItem: (key, value) => data.set(key, value)
    });
  });

  it('shows locations for the selected cat', () => {
    tracker.addLocation('cat1', 'Bedroom');
    tracker.addLocation('cat2', 'Kitchen');
    expect(tracker.getLocationHistory('cat1'))
      .toHaveLength(1);
    expect(tracker.getLocationHistory('cat1')[0].location)
      .toBe('Bedroom');
  });

  it('shows the most recent location first', () => {
    tracker.addLocation('cat1', 'Bedroom');
    tracker.addLocation('cat1', 'Living room');
    expect(tracker.getLocationHistory('cat1')[0].location)
      .toBe('Living room');
  });

  it('returns an empty history for a cat without records', () => {
    expect(tracker.getLocationHistory('cat1'))
      .toEqual([]);
  });
});
