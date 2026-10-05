import { StudentLifeHero } from '@/components/sections/student-life/StudentLifeHero';
import { ActivitiesGrid } from '@/components/sections/student-life/ActivitiesGrid';
import { EventsCalendar } from '@/components/sections/student-life/EventsCalendar';

export default function StudentLife() {
  return (
    <main>
      <StudentLifeHero />
      <ActivitiesGrid />
      <EventsCalendar />
    </main>
  );
}
