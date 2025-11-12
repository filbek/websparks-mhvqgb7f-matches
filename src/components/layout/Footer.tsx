import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-900 dark:bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <i className="bi bi-graph-up text-white text-lg"></i>
              </div>
              <h3 className="text-xl font-bold font-serif">Match Trends</h3>
            </div>
            <p className="text-secondary-300 mb-6 max-w-md">
              Veri odaklı futbol analizleri ve maç önizlemeleri. Objektif içgörüler ve taktiksel değerlendirmeler ile futbol severlere güvenilir bilgi kaynağı.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-secondary-400 hover:text-primary-400 transition-colors">
                <i className="bi bi-twitter text-xl"></i>
              </a>
              <a href="#" className="text-secondary-400 hover:text-primary-400 transition-colors">
                <i className="bi bi-instagram text-xl"></i>
              </a>
              <a href="#" className="text-secondary-400 hover:text-primary-400 transition-colors">
                <i className="bi bi-youtube text-xl"></i>
              </a>
              <a href="#" className="text-secondary-400 hover:text-primary-400 transition-colors">
                <i className="bi bi-telegram text-xl"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Hızlı Bağlantılar</h4>
            <ul className="space-y-2">
              <li><a href="#previews" className="text-secondary-300 hover:text-primary-400 transition-colors">Maç Önizlemeleri</a></li>
              <li><a href="#news" className="text-secondary-300 hover:text-primary-400 transition-colors">Haberler</a></li>
              <li><a href="#teams" className="text-secondary-300 hover:text-primary-400 transition-colors">Takımlar</a></li>
              <li><a href="#tags" className="text-secondary-300 hover:text-primary-400 transition-colors">Etiketler</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Kategoriler</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors">Süper Lig</a></li>
              <li><a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors">Avrupa Kupaları</a></li>
              <li><a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors">Taktik Analizleri</a></li>
              <li><a href="#" className="text-secondary-300 hover:text-primary-400 transition-colors">Transfer Haberleri</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-700 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-secondary-400 text-sm mb-4 sm:mb-0">
            © {currentYear} Match Trends. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center space-x-4 text-sm text-secondary-400">
            <span>Powered by</span>
            <a 
              href="https://websparks.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
            >
              Websparks AI
            </a>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 p-4 bg-secondary-800 rounded-lg">
          <p className="text-secondary-300 text-sm text-center">
            <i className="bi bi-info-circle mr-2"></i>
            Bu platform sadece eğitim ve analiz amaçlıdır. Bahis veya şans oyunları teşvik edilmez.
          </p>
        </div>
      </div>
    </footer>
  );
};
