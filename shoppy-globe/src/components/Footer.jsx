function Footer() {
  return (
    // ================= Footer Section =================
    <footer className="bg-gray-900 h-screen pt-20">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 text-center">

        {/* ---- Brand Section ---- */}
        <div className="flex justify-center items-center text-teal-300  text-2xl font-bold mb-4">
          <img src="../src/assets/brandicon.png" alt="icon" className="h-14 mt-1" />
          <span>ShoppyGlobe</span>
        </div>

        {/* ---- App Description ---- */}
        <p className="mx-auto mt-2 max-w-md text-center leading-relaxed text-gray-400 mb-6">
          ShoppyGlobe is your ultimate online shopping companion, providing a seamless experience
          to explore,  and buy products from around the globe.
        </p>

        {/* ---- Navigation Links ---- */}
        <ul className="flex justify-center gap-8 mb-6 text-white">
          <li>
            <a
              href="/"
              className="transition hover:text-teal-600 dark:hover:text-teal-300"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/Products"
              className="transition hover:text-teal-600 dark:hover:text-teal-300"
            >
              Products
            </a>
          </li>
        </ul>

        {/* ---- Social Media Links ---- */}
        <div className="flex justify-center gap-6 text-2xl mb-6">
          <a
            href="https://github.com/Rathan97"
            target="_blank"
            rel="noreferrer"
            className=" transition hover:text-gray-700/7 text-white dark:hover:text-white/75"
          >
            <span className="sr-only">GitHub</span>
            <i className="fa-brands fa-github"></i>
          </a>

          <a
            href="https://linkedin.com/in/rathnakar-sidramyna"
            target="_blank"
            rel="noreferrer"
            className=" transition hover:text-gray-700/75 text-white dark:hover:text-white/75"
          >
            <span className="sr-only">LinkedIn</span>
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </div>

        {/* ---- Copyright Section ---- */}
        <p className="text-xs text-gray-300">
          &copy; {new Date().getFullYear()} ShoppyGlobe. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
