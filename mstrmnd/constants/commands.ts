export type CommandIcon =
  | 'target'
  | 'search'
  | 'layers'
  | 'chart'
  | 'nodes'
  | 'evolve';

export type Command = {
  id: string;
  title: string;
  blurb: string;
  icon: CommandIcon;
  /** Department pad to focus, or conductor */
  agentId?: string;
  /** In-app route instead of the systems deck */
  href?: '/hub' | '/systems' | '/home';
};

export const COMMANDS: Command[] = [
  {
    id: 'plan',
    title: 'Create Plan',
    blurb: 'Define goals and map strategy.',
    icon: 'target',
    agentId: 'strategy',
  },
  {
    id: 'research',
    title: 'Research',
    blurb: 'Gather insights and intelligence.',
    icon: 'search',
    agentId: 'data',
  },
  {
    id: 'build',
    title: 'Build System',
    blurb: 'Design structures and workflows.',
    icon: 'layers',
    href: '/systems',
  },
  {
    id: 'analyze',
    title: 'Analyze',
    blurb: 'Evaluate data and performance.',
    icon: 'chart',
    agentId: 'data',
  },
  {
    id: 'connect',
    title: 'Connect Tools',
    blurb: 'Integrate and automate.',
    icon: 'nodes',
    href: '/hub',
  },
  {
    id: 'evolve',
    title: 'Evolve',
    blurb: 'Optimize and scale systems.',
    icon: 'evolve',
    agentId: 'conductor',
  },
];
