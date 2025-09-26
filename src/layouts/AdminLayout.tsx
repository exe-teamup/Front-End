interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className='flex min-h-screen bg-gray-50'>
      {/* Sidebar Navigation - placeholder */}
      <div className='w-64 bg-white shadow-lg'>Sidebar</div>

      {/* Main Content */}
      <main className='flex-1'>
        <div className='p-8'>{children}</div>
      </main>
    </div>
  );
}
