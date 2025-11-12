import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';

interface HeaderProps {
  onSearch: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const navItems = [
    { name: 'Ana Sayfa', href: '#home' },
    { name: 'Maç Önizlemeleri', href: '#previews' },
    { name: 'Haberler', href: '#news' },
    { name: 'Takımlar', href: '#teams' },
    { name: 'Etiketler', href: '#tags' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-secondary-900/95 backdrop-blur-sm border-b border-secondary-200 dark:border-secondary-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <i className="bi bi-graph-up text-white text-lg"></i>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-serif text-secondary-900 dark:text-white">
              Match Trends
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-secondary-700 dark:text-secondary-300 hover:text-primary-500 dark:hover:text-primary-400 font-medium transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Maç, takım veya analiz ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-secondary-50 dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-secondary-900 dark:text-white placeholder-secondary-500"
              />
              <i className="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400"></i>
            </form>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="p-2"
            >
              <i className={`bi ${isDark ? 'bi-sun' : 'bi-moon'} text-lg`}></i>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2"
            >
              <i className={`bi ${isMenuOpen ? 'bi-x' : 'bi-list'} text-lg`}></i>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-secondary-200 dark:border-secondary-700">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative md:hidden">
                <input
                  type="text"
                  placeholder="Ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-secondary-50 dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-secondary-900 dark:text-white placeholder-secondary-500"
                />
                <i className="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400"></i>
              </form>

              {/* Mobile Navigation */}
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-secondary-700 dark:text-secondary-300 hover:text-primary-500 dark:hover:text-primary-400 font-medium py-2 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
