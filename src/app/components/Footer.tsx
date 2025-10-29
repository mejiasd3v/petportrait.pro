export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div>
            © {currentYear} PetPortrait Pro. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Built by</span>
            <a
              href="https://x.com/mejiasdev"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#0052FF] dark:text-[#0052FF] hover:text-[#0040CC] dark:hover:text-[#0040CC] transition-colors duration-200"
            >
              MejiasDev
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}


