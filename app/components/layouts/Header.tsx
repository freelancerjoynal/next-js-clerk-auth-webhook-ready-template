'use client'
import React, { useState, useEffect, useRef } from 'react';
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Menu, Transition } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  Menu as MenuIcon, 
  X,
  Sparkles,
  Home,
  Briefcase,
  Users,
  FileText,
  Globe
} from 'lucide-react';

// ======== COLOR CONFIGURATION ========
// Change these colors to easily customize the theme
const THEME = {
  background: {
    primary: 'bg-black',
    secondary: 'bg-gray-900',
    hover: 'bg-gray-800/50',
    gradient: {
      from: 'from-[#D4AF37]',
      via: 'via-[#FFD700]',
      to: 'to-[#F5DEB3]',
    }
  },
  text: {
    primary: 'text-[#D4AF37]',
    secondary: 'text-[#FFD700]',
    light: 'text-[#F5DEB3]',
    hover: 'text-[#FFD700]',
    gradient: {
      from: 'from-[#D4AF37]',
      to: 'to-[#FFD700]',
    }
  },
  border: {
    primary: 'border-[#D4AF37]/30',
    secondary: 'border-gray-800',
    hover: 'border-[#D4AF37]/50',
  },
  shadow: {
    primary: 'shadow-lg shadow-[#D4AF37]/10',
    hover: 'shadow-xl shadow-[#D4AF37]/20',
  }
} as const;
// ======== END COLOR CONFIGURATION ========

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);

  const navigationItems = [
    {
      name: 'Products',
      icon: <Briefcase className="w-4 h-4 cursor-pointer" />,
      items: [
        { name: 'Web App', description: 'Full-featured web application' },
        { name: 'Mobile App', description: 'iOS and Android apps' },
        { name: 'API', description: 'Developer API' },
      ]
    },
    {
      name: 'Solutions',
      icon: <Sparkles className="w-4 h-4 cursor-pointer" />,
      items: [
        { name: 'For Startups', description: 'Scale your business' },
        { name: 'For Enterprises', description: 'Enterprise solutions' },
        { name: 'For Developers', description: 'Developer tools' },
      ]
    },
    {
      name: 'Resources',
      icon: <FileText className="w-4 h-4 cursor-pointer" />,
      items: [
        { name: 'Documentation', description: 'Complete guides' },
        { name: 'Blog', description: 'Latest updates' },
        { name: 'Tutorials', description: 'Step-by-step guides' },
      ]
    },
    {
      name: 'Company',
      icon: <Users className="w-4 h-4 cursor-pointer" />,
      items: [
        { name: 'About Us', description: 'Our story' },
        { name: 'Careers', description: 'Join our team' },
        { name: 'Contact', description: 'Get in touch' },
      ]
    },
  ];

  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY === 0) {
        // At top of page, always show header
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling UP - show header
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling DOWN and past threshold - hide header
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlHeader, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', controlHeader);
    };
  }, [lastScrollY]);

  return (
    <motion.div
      ref={headerRef}
      initial={{ y: 0 }}
      animate={{ 
        y: isVisible ? 0 : -100,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.5
      }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <header className={`w-full border-b ${THEME.border.secondary} ${THEME.background.primary}/90 backdrop-blur-xl supports-[backdrop-filter]:${THEME.background.primary}/80`}>
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            
            {/* Logo */}
            <div className="flex items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${THEME.background.gradient.from} ${THEME.background.gradient.to} ${THEME.shadow.primary}`}>
                  <Globe className="h-6 w-6 text-white cursor-pointer" />
                </div>
                <span className={`text-xl font-bold bg-gradient-to-r ${THEME.text.gradient.from} ${THEME.text.gradient.to} bg-clip-text text-transparent cursor-pointer`}>
                  YourLogo
                </span>
              </motion.div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <a
                href="#"
                className={`group rounded-lg px-4 py-2.5 text-sm font-medium ${THEME.text.light} hover:${THEME.text.hover} transition-all duration-200 hover:${THEME.background.hover} flex items-center space-x-1 cursor-pointer`}
              >
                <Home className="w-4 h-4 cursor-pointer" />
                <span>Home</span>
              </a>
              
              {navigationItems.map((item) => (
                <Menu key={item.name} as="div" className="relative">
                  {({ open }) => (
                    <>
                      <Menu.Button className={`group rounded-lg px-4 py-2.5 text-sm font-medium ${THEME.text.light} hover:${THEME.text.hover} transition-all duration-200 hover:${THEME.background.hover} flex items-center space-x-1 cursor-pointer`}>
                        {item.icon}
                        <span>{item.name}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''} cursor-pointer`} />
                      </Menu.Button>
                      
                      <Transition
                        as={React.Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Menu.Items className={`absolute left-1/2 -translate-x-1/2 mt-2 w-56 origin-top-right rounded-xl ${THEME.background.secondary} p-2 ${THEME.shadow.primary} ring-1 ring-black/5 focus:outline-none z-50`}>
                          <div className="space-y-1">
                            {item.items.map((subItem) => (
                              <Menu.Item key={subItem.name}>
                                {({ active }) => (
                                  <button
                                    className={`${
                                      active ? `${THEME.background.hover} ${THEME.text.hover}` : THEME.text.light
                                    } group flex w-full items-center rounded-lg px-3 py-2.5 text-sm transition-all duration-200 cursor-pointer`}
                                  >
                                    <div className="flex flex-col items-start">
                                      <span className="font-medium">{subItem.name}</span>
                                      <span className="text-xs text-gray-400 mt-0.5">{subItem.description}</span>
                                    </div>
                                  </button>
                                )}
                              </Menu.Item>
                            ))}
                          </div>
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              ))}
            </div>

            {/* Auth & Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2">
                <SignedOut>
                  <SignInButton>
                    <button className={`px-5 py-2.5 text-sm font-medium ${THEME.text.light} hover:${THEME.text.hover} transition-colors duration-200 cursor-pointer`}>
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative px-6 py-2.5 text-sm font-medium text-black rounded-full bg-gradient-to-r ${THEME.background.gradient.from} ${THEME.background.gradient.to} ${THEME.shadow.primary} hover:${THEME.shadow.hover} transition-all duration-300 overflow-hidden group cursor-pointer`}
                    >
                      <span className="relative z-10">Get Started</span>
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${THEME.background.gradient.to} ${THEME.background.gradient.from}`}
                        initial={{ x: "100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <div className="flex items-center space-x-4">
                    <button className={`px-5 py-2.5 text-sm font-medium ${THEME.text.light} hover:${THEME.text.hover} transition-colors duration-200 cursor-pointer`}>
                      Dashboard
                    </button>
                    <UserButton 
                      appearance={{
                        elements: {
                          avatarBox: `w-10 h-10 ring-2 ring-gray-800 hover:ring-[#D4AF37]/50 transition-all duration-300 cursor-pointer`
                        }
                      }}
                    />
                  </div>
                </SignedIn>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`md:hidden p-2 rounded-lg ${THEME.text.light} hover:${THEME.background.hover} transition-colors duration-200 cursor-pointer`}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6 cursor-pointer" />
                ) : (
                  <MenuIcon className="h-6 w-6 cursor-pointer" />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`md:hidden border-t ${THEME.border.secondary} ${THEME.background.primary}`}
            >
              <div className="px-4 py-6 space-y-4">
                <a
                  href="#"
                  className={`block py-3 px-4 rounded-lg ${THEME.text.light} hover:${THEME.background.hover} hover:${THEME.text.hover} transition-colors duration-200 font-medium cursor-pointer`}
                >
                  Home
                </a>
                
                {navigationItems.map((item) => (
                  <div key={item.name} className="space-y-2">
                    <div className={`flex items-center space-x-2 py-3 px-4 ${THEME.text.light} font-medium cursor-pointer`}>
                      {item.icon}
                      <span>{item.name}</span>
                    </div>
                    <div className="pl-8 space-y-1">
                      {item.items.map((subItem) => (
                        <a
                          key={subItem.name}
                          href="#"
                          className={`block py-2 px-4 rounded-lg text-gray-400 hover:${THEME.background.hover} hover:${THEME.text.hover} transition-colors duration-200 cursor-pointer`}
                        >
                          {subItem.name}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
                
                <div className={`pt-4 space-y-3 border-t ${THEME.border.secondary}`}>
                  <SignedOut>
                    <SignInButton>
                      <button className={`w-full py-3 px-4 text-center font-medium ${THEME.text.light} hover:${THEME.text.hover} transition-colors duration-200 cursor-pointer`}>
                        Sign In
                      </button>
                    </SignInButton>
                    <SignUpButton>
                      <button className={`w-full py-3 px-4 rounded-lg bg-gradient-to-r ${THEME.background.gradient.from} ${THEME.background.gradient.to} text-black font-medium ${THEME.shadow.primary} hover:${THEME.shadow.hover} transition-all duration-300 cursor-pointer`}>
                        Sign Up Free
                      </button>
                    </SignUpButton>
                  </SignedOut>
                  <SignedIn>
                    <div className="space-y-3">
                      <button className={`w-full py-3 px-4 rounded-lg ${THEME.background.secondary} ${THEME.text.light} font-medium hover:${THEME.background.hover} transition-colors duration-200 cursor-pointer`}>
                        Dashboard
                      </button>
                      <div className="flex justify-center">
                        <UserButton />
                      </div>
                    </div>
                  </SignedIn>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </motion.div>
  );
};

export default Header;