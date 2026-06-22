import { GraduationCap, Mail, Phone, MapPin, MessageCircle, Facebook, Instagram } from 'lucide-react';
import { Link } from 'react-router';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground/80">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/20">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-base font-bold text-white block leading-none" style={{ fontFamily: 'var(--font-display)' }}>
                  Instituto Tec. de Aprendizaje
                </span>
                <span className="text-[10px] text-primary-foreground/60 uppercase tracking-widest">
                  Asesorías Académicas
                </span>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Asesorías, regularizaciones y cursos de verano para nivel básico y medio superior.
              Modalidad presencial y en línea en Ixtapaluca, Estado de México.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a href="#" aria-label="Facebook" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <Facebook className="h-4 w-4 text-white" />
              </a>
              <a href="#" aria-label="Instagram" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <Instagram className="h-4 w-4 text-white" />
              </a>
              <a href="https://wa.me/525579050723" aria-label="WhatsApp" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <MessageCircle className="h-4 w-4 text-white" />
              </a>
            </div>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Servicios</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/cursos?type=regular" className="hover:text-white transition-colors">
                  Cursos Regulares
                </Link>
              </li>
              <li>
                <Link to="/cursos?type=verano" className="hover:text-white transition-colors">
                  Cursos de Verano
                </Link>
              </li>
              <li>
                <Link to="/cursos?type=regularizacion" className="hover:text-white transition-colors">
                  Regularizaciones
                </Link>
              </li>
              <li>
                <Link to="/cursos?mode=presencial" className="hover:text-white transition-colors">
                  Modalidad Presencial
                </Link>
              </li>
              <li>
                <Link to="/cursos?mode=online" className="hover:text-white transition-colors">
                  Modalidad En Línea
                </Link>
              </li>
            </ul>
          </div>

          {/* Institución */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Institución</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/nosotros" className="hover:text-white transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link to="/nosotros#equipo" className="hover:text-white transition-colors">
                  Equipo Docente
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link to="/contacto#ubicacion" className="hover:text-white transition-colors">
                  Ubicación
                </Link>
              </li>
              <li>
                <Link to="/cursos" className="hover:text-white transition-colors">
                  Catálogo de Cursos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-primary-foreground/60 mt-0.5 flex-shrink-0" />
                <a href="tel:+525579050723" className="hover:text-white transition-colors">
                  557 905 0723
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MessageCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <a href="https://wa.me/525579050723" className="hover:text-white transition-colors">
                  WhatsApp: 557 905 0723
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-primary-foreground/60 mt-0.5 flex-shrink-0" />
                <a href="mailto:contacto@itad.edu.mx" className="hover:text-white transition-colors">
                  contacto@itad.edu.mx
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary-foreground/60 mt-0.5 flex-shrink-0" />
                <span>
                  Ignacio Zaragoza 55, José de la Palma<br />
                  Ixtapaluca, Estado de México
                </span>
              </li>
            </ul>
            <div className="mt-4 text-xs text-primary-foreground/60">
              <p className="font-medium text-primary-foreground/80 mb-1">Horarios de atención</p>
              <p>Lunes – Viernes: 8:00 – 20:00</p>
              <p>Sábados: 9:00 – 14:00</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/50">
          <p>&copy; 2026 Instituto Tecnológico de Aprendizaje. Todos los derechos reservados.</p>
          <p>
            Diseñado por{' '}
            <a href="/nosotros#desarrollador" className="text-primary-foreground/70 hover:text-white transition-colors">
              TechEdu Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
