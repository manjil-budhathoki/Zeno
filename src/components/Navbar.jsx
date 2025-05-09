import { Home, Wrench, Mail } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const navItems = [
  { to: '/', Icon: Home, label: 'Home' },
  { to: '/services', Icon: Wrench, label: 'Services' },
  { to: '/feedback', Icon: Mail, label: 'Feedback' }
];

export default function Navbar() {
  return (
    <motion.div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.42, 0, 0.2, 1] }}
    >
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 flex gap-5 shadow-2xl text-white w-max">
        {navItems.map(({ to, Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `p-2 rounded-full transition duration-300 ease-in-out hover:bg-white/10 hover:text-purple-400 relative ${
                isActive ? 'text-purple-500 bg-white/10' : ''
              }`
            }
          >
            {({ isActive }) => (
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="relative group"
              >
                <Icon className="w-6 h-6" />
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-full bg-purple-500/10"
                    transition={{ duration: 0.3 }}
                  />
                )}
                {/* Tooltip */}
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {label}
                </span>
              </motion.div>
            )}
          </NavLink>
        ))}
      </div>
    </motion.div>
  );
}
