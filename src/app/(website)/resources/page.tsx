import { ResourcesHero } from '@/components/sections/resources/ResourcesHero';
import { BrowseDepartments } from '@/components/sections/resources/BrowseDepartments';
import { ResourceList } from '@/components/sections/resources/ResourceList';

export default function Resources() {
  return (
    <main>
      <ResourcesHero />
      <BrowseDepartments />
      <ResourceList />
    </main>
  );
}
