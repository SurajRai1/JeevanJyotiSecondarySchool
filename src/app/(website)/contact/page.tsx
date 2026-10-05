import { ContactHero } from '@/components/sections/contact/ContactHero';
import { ContactForm } from '@/components/sections/contact/ContactForm';
import { ContactMap } from '@/components/sections/contact/ContactMap';

export default function Contact() {
  return (
    <main>
      <ContactHero />
      <ContactForm />
      <ContactMap />
    </main>
  );
}
