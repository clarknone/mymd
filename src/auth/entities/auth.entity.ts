export class AuthTable {
  email: string;
  password: string;
}

export let AuthTestData: AuthTable[] = [
  { email: 'testuser1@example.com', password: 'pasword' },
  { email: 'testuser2@example.com', password: 'pasword' },
];
