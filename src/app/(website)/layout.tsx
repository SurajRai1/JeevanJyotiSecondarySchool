import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LenisProvider } from '@/components/providers/LenisProvider';
import { ScrollRevealProvider } from '@/components/providers/ScrollRevealProvider';
import { LanguageProvider } from '@/context/LanguageContext';

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <LenisProvider />
      <ScrollRevealProvider />
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </LanguageProvider>
  );
}
