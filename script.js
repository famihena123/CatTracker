'use strict';

const STORAGE_KEY = 'cs319-cat-tracker-cats-v1';
const form = document.getElementById('cat-form');
const idInput = document.getElementById('cat-id');
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const breedInput = document.getElementById('breed');
const message = document.getElementById('form-message');
const list = document.getElementById('cat-list');
const emptyState = document.getElementById('empty-state');
const count = document.getElementById('cat-count');
const heading = document.getElementById('form-heading');
const saveButton = document.getElementById('save-button');
const cancelButton = document.getElementById('cancel-button');

function loadCats() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(stored) ? stored.filter(cat => cat && typeof cat.id === 'string' && typeof cat.name === 'string') : [];
  } catch {
    return [];
  }
}

let cats = loadCats();

function saveCats(nextCats) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextCats));
    cats = nextCats;
    return true;
  } catch {
    showMessage('Unable to save. Check your browser storage settings.', true);
    return false;
  }
}

function showMessage(text, error = false) {
  message.textContent = text;
  message.className = 'message ' + (error ? 'error' : 'success');
}

function resetForm() {
  form.reset();
  idInput.value = '';
  heading.textContent = 'Add a cat';
  saveButton.textContent = 'Save cat';
  cancelButton.hidden = true;
}

function renderCats() {
  updateLocationCats();
  updateHistoryCats();
  list.replaceChildren();
  emptyState.hidden = cats.length > 0;
  count.textContent = `${cats.length} ${cats.length === 1 ? 'cat' : 'cats'}`;

  cats.forEach(cat => {
    const card = document.createElement('article');
    card.className = 'cat-card';
    const info = document.createElement('div');
    const title = document.createElement('h3');
    title.textContent = '🐱 ' + cat.name;
    const details = document.createElement('p');
    details.textContent = `${cat.breed} · ${cat.age} ${Number(cat.age) === 1 ? 'year' : 'years'} old`;
    info.append(title, details);

    const actions = document.createElement('div');
    actions.className = 'card-actions';
    const edit = document.createElement('button');
    edit.type = 'button';
    edit.textContent = 'Edit';
    edit.setAttribute('aria-label', `Edit ${cat.name}`);
    edit.addEventListener('click', () => {
      idInput.value = cat.id;
      nameInput.value = cat.name;
      ageInput.value = cat.age;
      breedInput.value = cat.breed;
      heading.textContent = 'Edit cat';
      saveButton.textContent = 'Update cat';
      cancelButton.hidden = false;
      showMessage('Editing ' + cat.name);
      nameInput.focus();
    });

    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'delete';
    remove.textContent = 'Delete';
    remove.setAttribute('aria-label', `Delete ${cat.name}`);
    remove.addEventListener('click', () => {
      if (!confirm(`Delete ${cat.name}'s profile?`)) return;
      if (saveCats(cats.filter(item => item.id !== cat.id))) {
        if (idInput.value === cat.id) resetForm();
        renderCats();
        showMessage('Cat profile deleted.');
      }
    });
    actions.append(edit, remove);
    card.append(info, actions);
    list.append(card);
  });
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const name = nameInput.value.trim();
  const breed = breedInput.value.trim();
  const ageText = ageInput.value.trim();
  const age = Number(ageText);

  if (!name || !breed || !ageText) {
    showMessage('Please enter the cat’s name, age, and breed.', true);
    return;
  }
  if (!Number.isFinite(age) || age < 0 || age > 40) {
    showMessage('Please enter an age between 0 and 40.', true);
    return;
  }

  const id = idInput.value;
  const cat = { id: id || (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random()), name, age, breed };
  const nextCats = id ? cats.map(existing => existing.id === id ? cat : existing) : [...cats, cat];
  if (saveCats(nextCats)) {
    resetForm();
    renderCats();
    showMessage(id ? 'Cat profile updated!' : 'Cat profile saved!');
  }
});

cancelButton.addEventListener('click', () => {
  resetForm();
  showMessage('Editing canceled.');
});


const locationService = createLocationService(localStorage);
const locationCat = document.getElementById('location-cat');
const locationInput = document.getElementById('location-input');
const locationMessage = document.getElementById('location-message');

function updateLocationCats() {
  const selected = locationCat.value;
  locationCat.replaceChildren(new Option('Select a cat', ''));
  cats.forEach(cat => {
    locationCat.add(new Option(cat.name, cat.id));
  });
  locationCat.value = selected;
}

document.getElementById('location-form')
  .addEventListener('submit', event => {
    event.preventDefault();
    try {
      locationService.addLocation(
        locationCat.value, locationInput.value
      );
      locationMessage.textContent = 'Location saved successfully!';
      locationMessage.className = 'message success';
      locationInput.value = '';
      historyCat.value = locationCat.value;
      renderLocationHistory();
    } catch (error) {
      locationMessage.textContent = error.message;
      locationMessage.className = 'message error';
    }
  });


const historyCat = document.getElementById('history-cat');
const historyList = document.getElementById('location-history');

function updateHistoryCats() {
  const selected = historyCat.value;
  historyCat.replaceChildren(new Option('Select a cat', ''));

  cats.forEach(cat => {
    historyCat.add(new Option(cat.name, cat.id));
  });

  historyCat.value = selected;
  renderLocationHistory();
}

function renderLocationHistory() {
  historyList.replaceChildren();

  if (!historyCat.value) {
    historyList.textContent = 'Please select a cat.';
    return;
  }

  const records = locationService.getLocationHistory(historyCat.value);

  if (!records.length) {
    historyList.textContent = 'No location records yet.';
    return;
  }

  records.forEach(record => {
    const card = document.createElement('article');
    card.className = 'history-card';

    const location = document.createElement('strong');
    location.textContent = record.location;

    const time = document.createElement('p');
    time.textContent = new Date(record.timestamp).toLocaleString();

    card.append(location, time);
    historyList.append(card);
  });
}

historyCat.addEventListener('change', renderLocationHistory);

renderCats();
