export interface NavItem {
  title: string;
  href: string;
  description?: string;
  iconName?: string;
  badge?: string;
}

export const marketingNav: NavItem[] = [
  {
    title: 'Features',
    href: '/features',
  },
  {
    title: 'Anonymous Feedback',
    href: '/anonymous-feedback',
  },
  {
    title: 'Meeting Notes',
    href: '/meeting-notes',
  },
  {
    title: 'Resources',
    href: '/resources',
  },
  {
    title: 'Blog',
    href: '/blog',
  },
  {
    title: 'About',
    href: '/about',
  },
];

export const appNav: NavItem[] = [
  {
    title: 'Overview',
    href: '/app',
    iconName: 'LayoutDashboard',
  },
  {
    title: 'Feedback',
    href: '/app/feedback',
    iconName: 'MessageSquare',
  },
  {
    title: 'Meetings',
    href: '/app/meetings',
    iconName: 'Calendar',
  },
  {
    title: 'Resources',
    href: '/app/resources',
    iconName: 'BookOpen',
  },
  {
    title: 'Analytics',
    href: '/app/analytics',
    iconName: 'BarChart2',
  },
  {
    title: 'Settings',
    href: '/app/settings',
    iconName: 'Settings',
  },
];

export const footerNav = {
  product: [
    { title: 'Overview', href: '/' },
    { title: 'Features', href: '/features' },
    { title: 'Anonymous Feedback', href: '/anonymous-feedback' },
    { title: 'Meeting Notes', href: '/meeting-notes' },
    { title: 'Resources', href: '/resources' },
  ],
  company: [
    { title: 'About FeedbackFlow', href: '/about' },
    { title: 'Workplace Blog', href: '/blog' },
    { title: 'Privacy Policy', href: '/privacy' },
    { title: 'Terms of Service', href: '/terms' },
  ],
  tools: [
    { title: 'Sign In', href: '/login' },
    { title: 'Create Account', href: '/signup' },
    { title: 'Open App', href: '/app' },
  ],
};
