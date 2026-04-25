import React from 'react'

const Header = () => {
    return (
        <header className="border-b border-slate-100 bg-white">
          <div className="mx-auto flex h-16 max-w-6xl items-center px-4">
            <a
              href="/"
              className="inline-flex items-center rounded-full border-2 border-[#ff4b00] bg-white px-2 py-1 shadow-sm"
              aria-label="MyAuto homepage"
            >
              <span className="rounded-l-full bg-white px-2 text-lg font-bold leading-none text-slate-700">
                myauto
              </span>
              <span className="rounded-full bg-[#ff4b00] px-2 py-1 text-sm font-bold leading-none text-white">
                .ge
              </span>
            </a>
          </div>
        </header>
      );
}

export default Header
