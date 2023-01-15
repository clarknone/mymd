export class AuthUser {
  email: string;
  password: string;
}

export let AuthTestData: AuthUser[] = [
  { email: 'testuser1@example.com', password: 'pasword' },
  { email: 'testuser2@example.com', password: 'pasword' },
];
