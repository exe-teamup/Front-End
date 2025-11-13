import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn('bg-white text-text-primary', className)}>
      <div className='max-w-7xl mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          <div className='lg:col-span-1'>
            <div className='mb-6'>
              <div className='flex items-center gap-2 mb-3'>
                <img src='/images/logo.svg' alt='Logo' className='h-8 w-8' />
                <span className='text-xl font-bold'>EXE TeamUp</span>
              </div>
              <p className='text-text-primary text-sm mb-4'>
                Nền tảng kết nối sinh viên, tạo nhóm học tập và phát triển dự án
                cùng nhau.
              </p>
            </div>

            {/* Contact Info */}
            <div className='space-y-2 text-sm text-text-primary'>
              <div className='flex items-center gap-2'>
                <Mail className='w-4 h-4' />
                <span>exeteamup.contact@gmail.com</span>
              </div>
              <div className='flex items-center gap-2'>
                <Phone className='w-4 h-4' />
                <span>+84 xxx xxx xxx</span>
              </div>
              <div className='flex items-center gap-2'>
                <MapPin className='w-4 h-4' />
                <span>FPT University, Ho Chi Minh City</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>Liên kết nhanh</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <a
                  href='/about'
                  className='text-text-primary hover:text-primary transition-colors'
                >
                  Về chúng tôi
                </a>
              </li>
              <li>
                <a
                  href='/posts'
                  className='text-text-primary hover:text-primary transition-colors'
                >
                  Tìm nhóm
                </a>
              </li>
              <li>
                <a
                  href='/create'
                  className='text-text-primary hover:text-primary transition-colors'
                >
                  Tạo nhóm
                </a>
              </li>
              {/* <li>
                <a
                  href='/blog'
                  className='text-text-primary hover:text-primary transition-colors'
                >
                  Blog
                </a>
              </li> */}
              <li>
                <a
                  href='/help'
                  className='text-text-primary hover:text-primary transition-colors'
                >
                  Trợ giúp
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>Hỗ trợ</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <a
                  href='/faq'
                  className='text-text-primary hover:text-primary transition-colors'
                >
                  Câu hỏi thường gặp
                </a>
              </li>
              <li>
                <a
                  href='/contact'
                  className='text-text-primary hover:text-primary transition-colors'
                >
                  Liên hệ
                </a>
              </li>
              <li>
                <a
                  href='/privacy'
                  className='text-text-primary hover:text-primary transition-colors'
                >
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a
                  href='/terms'
                  className='text-text-primary hover:text-primary transition-colors'
                >
                  Điều khoản sử dụng
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>Theo dõi chúng tôi</h3>
            <div className='flex gap-3 mb-4'>
              <a
                href='https://facebook.com'
                target='_blank'
                rel='noopener noreferrer'
                className='w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:text-primary hover:bg-primary/10 transition-colors'
              >
                <Facebook className='w-5 h-5' />
              </a>
              <a
                href='https://twitter.com'
                target='_blank'
                rel='noopener noreferrer'
                className='w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:text-primary hover:bg-primary/10 transition-colors'
              >
                <Twitter className='w-5 h-5' />
              </a>
              <a
                href='https://instagram.com'
                target='_blank'
                rel='noopener noreferrer'
                className='w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:text-primary hover:bg-primary/10 transition-colors'
              >
                <Instagram className='w-5 h-5' />
              </a>
              <a
                href='https://linkedin.com'
                target='_blank'
                rel='noopener noreferrer'
                className='w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:text-primary hover:bg-primary/10 transition-colors'
              >
                <Linkedin className='w-5 h-5' />
              </a>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className='text-sm font-medium mb-2'>Đăng ký nhận tin</h4>
              <div className='flex gap-2'>
                <input
                  type='email'
                  placeholder='Email của bạn'
                  className='flex-1 px-3 py-2 bg-white border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-primary'
                />
                <button className='px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors cursor-pointer'>
                  Đăng ký
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='border-t border-gray-800 mt-8 pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <div className='text-sm text-text-primary'>
              © 2024 EXE TeamUp. Tất cả quyền được bảo lưu.
            </div>
            <div className='flex gap-6 text-sm text-text-primary'>
              <a
                href='/privacy'
                className='hover:text-primary transition-colors'
              >
                Bảo mật
              </a>
              <a href='/terms' className='hover:text-primary transition-colors'>
                Điều khoản
              </a>
              <a
                href='/cookies'
                className='hover:text-primary transition-colors'
              >
                Cookie
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
