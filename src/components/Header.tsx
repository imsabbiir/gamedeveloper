export default function Header() {
  const navItems = [
    { label: "_hello", active: true },
    { label: "_about-me", active: false },
    { label: "_projects", active: false },
  ];

  return (
    <header className="w-full border-b border-[#1E2D3D] bg-[#011627] flex items-center justify-between font-mono text-[#607B96] text-sm h-14">
      {/* Left Section: Name */}
      <div className="px-6 border-r border-[#1E2D3D] h-full flex items-center min-w-70">
        michael-weaver
      </div>

      {/* Center Section: Navigation */}
      <nav className="grow flex h-full">
        {navItems.map((item) => (
          <div
            key={item.label}
            className={`px-8 h-full flex items-center border-r border-[#1E2D3D] cursor-pointer transition-colors hover:text-white relative 
              ${item.active ? "text-white" : ""}`}
          >
            {item.label}
            {/* The Active Tab Underline */}
            {item.active && (
              <div className="absolute bottom-0 left-0 w-full h-0.75 bg-[#FEA55F]" />
            )}
          </div>
        ))}
      </nav>

      {/* Right Section: Contact */}
      <div className="px-6 border-l border-[#1E2D3D] h-full flex items-center cursor-pointer hover:text-white">
        _contact-me
      </div>
    </header>
  );
}