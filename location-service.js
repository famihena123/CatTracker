'use strict';

function validateLocation(catId, location) {
  if (!catId) {
    throw new Error('Please select a cat.');
  }
  if (!location.trim()) {
    throw new Error('Please enter a location.');
  }
  return location.trim();
}

function createLocationService(storage) {
  const key = 'cs319-cat-tracker-locations-v1';

  function loadLocations() {
    return JSON.parse(storage.getItem(key) || '[]');
  }

  function addLocation(catId, location) {
    const record = {
      catId,
      location: validateLocation(catId, location),
      timestamp: new Date().toISOString()
    };

    const records = loadLocations();
    records.push(record);
    storage.setItem(key, JSON.stringify(records));
    return record;
  }

  function getLocationHistory(catId) {
    return loadLocations()
      .filter(record => record.catId === catId)
      .reverse()
      .sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  }

  return { loadLocations, addLocation, getLocationHistory };
}

if (typeof module !== 'undefined') {
  module.exports = {
    validateLocation,
    createLocationService
  };
}
