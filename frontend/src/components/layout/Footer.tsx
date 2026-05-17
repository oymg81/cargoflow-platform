import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { MapPin, Phone, Mail } from 'lucide-react';
import FooterNewsletterForm from './FooterNewsletterForm';

export default function Footer() {
  const t = useTranslations('Navigation');
  const tFooter = useTranslations('Footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 text-[#07142b] pt-16 pb-8 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand & About */}
          <div className="flex flex-col gap-6">
            <div className="bg-white p-3 rounded-md inline-block w-fit">
              <Image 
                src="/logisti-k-transparent.png" 
                alt="Logisti-K Logo" 
                width={120} 
                height={120} 
                className="h-28 w-28 object-contain"
              />
            <div className="text-gray-600 text-sm leading-relaxed space-y-4">
              <p className="font-bold text-[#07142b]">
                {tFooter('legal_entity')}
              </p>
              
              <div>
                <p className="font-bold text-xs tracking-wider text-[#F05A28] mb-1">{tFooter('hq_label')}</p>
                <p>2598 E SUNRISE BLVD STE 2104<br />FORT LAUDERDALE, FL 33304</p>
                <p className="mt-1">{tFooter('phone_label')} <a href="tel:+17869454199" className="hover:text-[#F05A28] transition-colors">+1 (786) 945-4199</a></p>
              </div>

              <div>
                <p className="font-bold text-xs tracking-wider text-[#F05A28] mb-1">{tFooter('warehouse_label')}</p>
                <p>5141 NW 79TH AVE, UNIT 7<br />MIAMI, FL 33166</p>
              </div>

              <div>
                <p className="font-bold text-xs tracking-wider text-[#F05A28] mb-1">{tFooter('peru_label')}</p>
                <p>Av. José Larco 1232, Ste 430<br />Miraflores 15086, Perú</p>
              </div>
            </div>
            <div className="flex gap-4 mt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:border-[#F05A28] hover:text-[#F05A28] transition-all text-xs font-bold text-[#07142b] hover:-translate-y-1">
                FB
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:border-[#F05A28] hover:text-[#F05A28] transition-all text-xs font-bold text-[#07142b] hover:-translate-y-1">
                IN
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:border-[#F05A28] hover:text-[#F05A28] transition-all text-xs font-bold text-[#07142b] hover:-translate-y-1">
                IG
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-[#07142b]">{tFooter('quick_links')}</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/" className="text-gray-600 hover:text-[#F05A28] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F05A28]"></span>
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-600 hover:text-[#F05A28] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F05A28]"></span>
                  {t('services')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-[#F05A28] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F05A28]"></span>
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link href="/track" className="text-gray-600 hover:text-[#F05A28] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F05A28]"></span>
                  {t('track')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-[#07142b]">{tFooter('contact_us')}</h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 text-gray-600">
                <MapPin className="text-[#F05A28] mt-1 shrink-0" size={20} />
                <span>1234 Logistics Blvd, Suite 100<br/>Miami, FL 33122, USA</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <Phone className="text-[#F05A28] shrink-0" size={20} />
                <a href="tel:+18001234567" className="hover:text-[#F05A28] transition-colors">+1 (800) 123-4567</a>
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <Mail className="text-[#F05A28] shrink-0" size={20} />
                <a href="mailto:info@logisti-k.us" className="hover:text-[#F05A28] transition-colors">info@logisti-k.us</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-[#07142b]">{tFooter('newsletter')}</h3>
            <p className="text-gray-600 text-sm mb-4">
              {tFooter('newsletter_desc')}
            </p>
            <FooterNewsletterForm />
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
          <p className="text-gray-500 text-xs text-center md:text-right mt-2 md:mt-0">
            {tFooter('powered_by')}
          </p>
        </div>
      </div>
    </footer>
  );
}
