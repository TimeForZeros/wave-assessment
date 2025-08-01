import type { Route } from './+types/home';
import Dashboard from '~/dashboard/dashboard';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Wave Assessment' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Home() {
  return (
      <Dashboard />
  );
}
