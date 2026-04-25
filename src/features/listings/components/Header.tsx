import logo from "../../../assets/images/myauto-logo.svg";

const Header = () => {
    return (
        <header className="border-b border-slate-100 bg-white">
          <div className="mx-auto flex h-20 max-w-5xl items-center px-4">
            <a href="/" aria-label="MyAuto homepage">
                <img
                    src={logo}
                    alt="MyAuto"
                    className="w-auto"
                />
            </a>
          </div>
        </header>
      );
}

export default Header
