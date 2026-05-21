import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('Navigation');
  const tFooter = useTranslations('Footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 text-[#07142b] pt-16 pb-8 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Column 1: Company Info */}
          <div className="flex flex-col gap-6">
            <div className="bg-white p-3 rounded-md inline-block w-fit">
              <Image
                src="/logisti-k-transparent.png"
                alt="Logisti-K Logo"
                width={120}
                height={120}
                className="h-28 w-28 object-contain"
              />
            </div>
            <p className="font-bold text-[#07142b] text-sm">
              {tFooter('legal_entity')}
            </p>
            <div className="flex gap-4 mt-2">
              <a href="https://www.facebook.com/share/1AzTDjdREe/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:border-[#F05A28] hover:text-[#F05A28] transition-all text-xs font-bold text-[#07142b] hover:-translate-y-1">
                FB
              </a>
              <a href="https://www.linkedin.com/company/logisti-k/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:border-[#F05A28] hover:text-[#F05A28] transition-all text-xs font-bold text-[#07142b] hover:-translate-y-1">
                IN
              </a>
              <a href="https://www.instagram.com/logistik.us?igsh=MWN3Z3lrcDJveDNpOQ==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:border-[#F05A28] hover:text-[#F05A28] transition-all text-xs font-bold text-[#07142b] hover:-translate-y-1">
                IG
              </a>
            </div>
            
            <div className="mt-6">
              <p className="font-bold text-xs tracking-wider text-[#F05A28] mb-3 uppercase">CERTIFIED:</p>
              <div className="flex gap-4 items-center">
                <Image src="/images/USHOMELAND.jpeg" alt="US Homeland Security" width={56} height={56} className="object-contain mix-blend-multiply rounded-full border border-gray-200 bg-white" />
                <Image src="/images/NCBFAA.jpeg" alt="NCBFAA" width={56} height={56} className="object-contain mix-blend-multiply rounded-full border border-gray-200 bg-white" />
              </div>
            </div>
          </div>

          {/* Column 2: Miami Office & Warehouse */}
          <div className="flex flex-col gap-6">
            <div className="text-gray-600 text-sm leading-relaxed space-y-6">
              <div>
                <p className="font-bold text-xs tracking-wider text-[#F05A28] mb-1">{tFooter('hq_label')}</p>
                <p>2598 E SUNRISE BLVD STE 2104<br />FORT LAUDERDALE, FL 33304</p>
                <p className="mt-1">{tFooter('phone_label')} <a href="tel:+17869454199" className="hover:text-[#F05A28] transition-colors">+1 (786) 945-4199</a></p>
              </div>

              <div>
                <p className="font-bold text-xs tracking-wider text-[#F05A28] mb-1">{tFooter('warehouse_label')}</p>
                <p>5141 NW 79TH AVE, UNIT 7<br />MIAMI, FL 33166</p>
              </div>
            </div>
          </div>

          {/* Column 3: Perú Office */}
          <div className="flex flex-col gap-6">
            <div className="text-gray-600 text-sm leading-relaxed space-y-6">
              <div>
                <p className="font-bold text-xs tracking-wider text-[#F05A28] mb-1">{tFooter('peru_label')}</p>
                <p>Av. José Larco 1232, Ste 430<br />Miraflores 15086, Perú</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            &copy; {currentYear} {tFooter('rights')}
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-[#F05A28] transition-colors">{tFooter('privacy')}</Link>
            <Link href="/terms" className="hover:text-[#F05A28] transition-colors">{tFooter('terms')}</Link>
          </div>
          <div className="flex items-center justify-center md:justify-end gap-2 mt-2 md:mt-0">
            <span className="text-gray-500 text-xs">Powered by</span>
            <a 
              href="https://codingsoft.tech" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 group hover:opacity-90 transition-opacity"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px] text-[#3b82f6] group-hover:scale-105 transition-transform duration-200">
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z" clipRule="evenodd" />
              </svg>
              <span className="text-[#3b82f6] text-sm font-semibold tracking-wide">CodingSoft Platform</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
