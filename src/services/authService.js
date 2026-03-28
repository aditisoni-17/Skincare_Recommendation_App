const USERS_KEY = 'mock_users';

function readUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeUsers(users) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    throw new Error('Unable to save account data right now.');
  }
}

function normalizeEmail(email = '') {
  return String(email).trim().toLowerCase();
}

function sanitizeString(value = '') {
  return String(value).trim();
}

function buildUser(payload = {}) {
  return {
    id:
      payload.id ||
      `user_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`,
    name: sanitizeString(payload.name) || 'Noorify User',
    email: normalizeEmail(payload.email),
    phone: sanitizeString(payload.phone),
    skinType: sanitizeString(payload.skinType),
    skinConcerns: sanitizeString(payload.skinConcerns),
    allergies: sanitizeString(payload.allergies),
  };
}

function buildToken(user) {
  return `mock-token-${user.id}`;
}

export async function signup(payload) {
  const email = normalizeEmail(payload?.email);
  const password = String(payload?.password || '');

  if (!email) throw new Error('Email is required.');
  if (!/^\S+@\S+\.\S+$/.test(email)) throw new Error('Enter a valid email address.');
  if (!password) throw new Error('Password is required.');
  if (password.length < 6) throw new Error('Password must be at least 6 characters.');

  const users = readUsers();
  if (users.some((user) => user.email === email)) {
    throw new Error('Email already registered.');
  }

  const user = buildUser(payload);
  writeUsers([...users, { ...user, password }]);

  return {
    token: buildToken(user),
    user,
  };
}

export async function login(payload) {
  const email = normalizeEmail(payload?.email);
  const password = String(payload?.password || '');

  if (!email) throw new Error('Email is required.');
  if (!/^\S+@\S+\.\S+$/.test(email)) throw new Error('Enter a valid email address.');
  if (!password) throw new Error('Password is required.');

  const users = readUsers();
  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    if (existingUser.password !== password) {
      throw new Error('Invalid email or password.');
    }

    const { password: _password, ...user } = existingUser;
    return {
      token: buildToken(user),
      user,
    };
  }

  const fallbackUser = buildUser({
    name: payload?.email?.split('@')[0] || 'Noorify User',
    email,
  });

  writeUsers([...users, { ...fallbackUser, password }]);

  return {
    token: buildToken(fallbackUser),
    user: fallbackUser,
  };
}
