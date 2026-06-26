import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Button } from './ui/button';
import {
  GraduationCap,
  Menu,
  X,
  Home,
  BookOpen,
  Sun,
  RefreshCw,
  Users,
  Monitor,
  HelpCircle,
  Phone,
  MapPin,
  Info,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logo from '../../assets/logo_escuela_.jpeg';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: 'Inicio', href: '/', icon: <Home className="h-5 w-5" /> },
  { label: 'Cursos Regulares', href: '/cursos?type=regular', icon: <BookOpen className="h-5 w-5" /> },
  { label: 'Cursos de Verano', href: '/cursos?type=verano', icon: <Sun className="h-5 w-5" /> },
  { label: 'Regularizaciones', href: '/cursos?type=regularizacion', icon: <RefreshCw className="h-5 w-5" /> },
  { label: 'Modalidad Presencial', href: '/cursos?mode=presencial', icon: <Users className="h-5 w-5" /> },
  { label: 'Modalidad En Línea', href: '/cursos?mode=online', icon: <Monitor className="h-5 w-5" /> },
  { label: 'Cómo Inscribirse', href: '/cursos', icon: <HelpCircle className="h-5 w-5" /> },
  { label: 'Contacto', href: '/contacto', icon: <Phone className="h-5 w-5" /> },
  { label: 'Ubicación', href: '/contacto#ubicacion', icon: <MapPin className="h-5 w-5" /> },
  { label: 'Nosotros', href: '/nosotros', icon: <Info className="h-5 w-5" /> },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => {
    const path = href.split('?')[0];
    return location.pathname === path;
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 flex-shrink-0" onClick={() => setOpen(false)}>
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div className="hidden sm:block">
                <span className="text-base font-bold text-primary leading-none block" style={{ fontFamily: 'var(--font-display)' }}>
                  Instituto Tec. de Aprendizaje
                </span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest leading-none">
                  Asesorías Académicas
                </span>
              </div>
            </Link>

            {/* Desktop quick links */}
            <div className="hidden lg:flex items-center gap-1">
              <Link to="/cursos?type=regular" className="px-3 py-1.5 text-sm font-medium text-foreground/70 hover:text-primary hover:bg-secondary rounded-md transition-colors">
                
              </Link>
              <Link to="/cursos?type=verano" className="px-3 py-1.5 text-sm font-medium text-foreground/70 hover:text-primary hover:bg-secondary rounded-md transition-colors">
                
              </Link>
              <Link to="/cursos?type=regularizacion" className="px-3 py-1.5 text-sm font-medium text-foreground/70 hover:text-primary hover:bg-secondary rounded-md transition-colors">
                
              </Link>
              <Link to="/contacto" className="px-3 py-1.5 text-sm font-medium text-foreground/70 hover:text-primary hover:bg-secondary rounded-md transition-colors">
                Contacto
              </Link>
              <Link to="/nosotros" className="px-3 py-1.5 text-sm font-medium text-foreground/70 hover:text-primary hover:bg-secondary rounded-md transition-colors">
                Nosotros
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <Link to="/cursos" className="hidden sm:block">
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Ver Catálogo
                </Button>
              </Link>
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center justify-center w-9 h-9 rounded-md border border-border text-foreground hover:bg-secondary transition-colors"
                aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Slide-out Drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Drawer panel */}
            <motion.aside
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 380, damping: 40 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-72 bg-white shadow-2xl flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5">
                  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary">
                    <img
                      src={logo}
                      alt="Logo"
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-primary leading-none block" style={{ fontFamily: 'var(--font-display)' }}>
                      Instituto Tec. de Aprendizaje
                    </span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                      Asesorías Académicas
                    </span>
                  </div>
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-secondary transition-colors"
                  aria-label="Cerrar menú"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Nav items */}
              <nav className="flex-1 overflow-y-auto py-4">
                <div className="px-3 mb-2">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-2 mb-1">
                    Navegación
                  </p>
                </div>
                <ul className="space-y-0.5 px-3">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        to={item.href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          isActive(item.href)
                            ? 'bg-primary text-primary-foreground'
                            : 'text-foreground hover:bg-secondary hover:text-primary'
                        }`}
                      >
                        <span className={isActive(item.href) ? 'text-primary-foreground' : 'text-muted-foreground'}>
                          {item.icon}
                        </span>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Drawer footer CTA */}
              <div className="p-4 border-t border-border">
                <Link to="/cursos" onClick={() => setOpen(false)}>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Ver Catálogo Completo
                  </Button>
                </Link>
                <p className="text-center text-xs text-muted-foreground mt-3">
                  ¿Dudas? Llámanos al{' '}
                  <a href="tel:+529611234567" className="text-primary font-semibold hover:underline">
                    5579050723
                  </a>
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
