import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import {
  BookOpen,
  Users,
  Monitor,
  RefreshCw,
  Sun,
  ArrowRight,
  CheckCircle2,
  Star,
  GraduationCap,
  Clock,
} from 'lucide-react';
import { motion } from 'motion/react';
import { courses, levelLabels, typeLabels, modeLabels } from '../data/courses';

const featuredCourseIds = ['b-mat-reg-pre', 'ms-alg-reg-onl', 'ms-fis-reg-pre', 'b-ing-reg-onl'];

const stats = [
  { value: '500+', label: 'Alumnos atendidos' },
  { value: '32', label: 'Cursos disponibles' },
  { value: '8', label: 'Docentes especializados' },
  { value: '95%', label: 'Tasa de aprobación' },
];

const typeColors: Record<string, string> = {
  regular: 'bg-purple-100 text-purple-800 border-purple-200',
  verano: 'bg-amber-100 text-amber-800 border-amber-200',
  regularizacion: 'bg-rose-100 text-rose-800 border-rose-200',
};

const typeIcons: Record<string, React.ReactNode> = {
  regular: <BookOpen className="h-3.5 w-3.5" />,
  verano: <Sun className="h-3.5 w-3.5" />,
  regularizacion: <RefreshCw className="h-3.5 w-3.5" />,
};

export function Home() {
  const navigate = useNavigate();
  const featured = featuredCourseIds.map((id) => courses.find((c) => c.id === id)).filter(Boolean) as typeof courses;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary text-white">
        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-white/5 rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-5 bg-white/15 text-white border-white/25 text-xs uppercase tracking-wider">
                Ixtapaluca, Estado de México
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                Asesorías que <em className="not-italic text-blue-300">transforman</em> calificaciones
              </h1>
              <p className="text-lg text-white/75 mb-8 leading-relaxed max-w-lg">
                Clases personalizadas de nivel básico y medio superior en modalidad presencial y en línea.
                Regularizaciones, cursos regulares y cursos de verano.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 font-semibold px-6"
                  onClick={() => navigate('/cursos')}
                >
                  Ver Catálogo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/40 text-white hover:bg-white/10 font-medium px-6"
                  onClick={() => navigate('/contacto')}
                >
                  Más información
                </Button>
              </div>
            </motion.div>

            {/* Hero image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative hidden md:block"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] bg-primary/50">
                <img
                  src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=720&h=540&fit=crop&auto=format"
                  alt="Estudiantes en clase"
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
              </div>

              {/* Floating badges */}
              <div className="absolute -bottom-4 -left-4 bg-white text-primary rounded-xl shadow-lg p-3 flex items-center gap-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-green-100">
                  <Monitor className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Modalidad</p>
                  <p className="text-sm font-bold">Presencial & En Línea</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white text-primary rounded-xl shadow-lg p-3 flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                <div>
                  <p className="text-sm font-bold">95% aprobación</p>
                  <p className="text-xs text-muted-foreground">de nuestros alumnos</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-border">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center px-4">
                <p className="text-2xl md:text-3xl font-bold text-primary" style={{ fontFamily: 'var(--font-display)' }}>
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services overview */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Nuestros servicios
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Ofrecemos tres tipos de servicio para adaptarnos a las necesidades de cada alumno
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Regular */}
            <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300 }}>
              <Card className="h-full border-2 border-purple-200 bg-purple-50 hover:border-purple-400 transition-colors cursor-pointer" onClick={() => navigate('/cursos?type=regular')}>
                <CardHeader>
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-600 mb-4">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-purple-900">Cursos Regulares</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-800/80 mb-4">
                    Clases impartidas durante el ciclo escolar para reforzar los contenidos de cada materia semana a semana.
                  </p>
                  <ul className="space-y-2">
                    {['Nivel Básico y Medio Superior', 'Grupos reducidos', 'Presencial y en línea'].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-purple-700">
                        <CheckCircle2 className="h-4 w-4 text-purple-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="mt-5 w-full border-purple-400 text-purple-700 hover:bg-purple-100">
                    Ver cursos regulares
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Verano */}
            <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300 }}>
              <Card className="h-full border-2 border-amber-200 bg-amber-50 hover:border-amber-400 transition-colors cursor-pointer" onClick={() => navigate('/cursos?type=verano')}>
                <CardHeader>
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-amber-500 mb-4">
                    <Sun className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-amber-900">Cursos de Verano</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-amber-800/80 mb-4">
                    Programas intensivos durante vacaciones para reforzar conocimientos, adelantar materias o prepararse para el siguiente año.
                  </p>
                  <ul className="space-y-2">
                    {['Intensivos de 5 a 6 semanas', 'Horarios matutinos', 'Presencial y en línea'].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-amber-700">
                        <CheckCircle2 className="h-4 w-4 text-amber-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="mt-5 w-full border-amber-400 text-amber-700 hover:bg-amber-100">
                    Ver cursos de verano
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Regularización */}
            <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300 }}>
              <Card className="h-full border-2 border-rose-200 bg-rose-50 hover:border-rose-400 transition-colors cursor-pointer" onClick={() => navigate('/cursos?type=regularizacion')}>
                <CardHeader>
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-rose-600 mb-4">
                    <RefreshCw className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-rose-900">Regularizaciones</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-rose-800/80 mb-4">
                    Clases especializadas para alumnos que necesitan recuperar materias reprobadas o mejorar su calificación final.
                  </p>
                  <ul className="space-y-2">
                    {['Atención personalizada', 'Preparación para extraordinarios', 'Plan de estudio individual'].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-rose-700">
                        <CheckCircle2 className="h-4 w-4 text-rose-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="mt-5 w-full border-rose-400 text-rose-700 hover:bg-rose-100">
                    Ver regularizaciones
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modalidades */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Dos modalidades,<br />
                <span className="text-accent">un mismo resultado</span>
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Elige la modalidad que mejor se adapte a tu horario y estilo de aprendizaje. Ambas opciones cuentan con los mismos contenidos y calidad de enseñanza.
              </p>

              <div className="space-y-4">
                <div
                  className="flex items-start gap-4 p-4 rounded-xl border-2 border-blue-200 bg-blue-50 cursor-pointer hover:border-blue-400 transition-colors"
                  onClick={() => navigate('/cursos?mode=presencial')}
                >
                  <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-blue-600 flex-shrink-0">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-blue-900 mb-1">Modalidad Presencial</h3>
                    <p className="text-sm text-blue-700/80">
                      Clases en nuestras instalaciones en el centro de Tuxtla Gutiérrez. Interacción directa con el maestro y compañeros.
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
                </div>

                <div
                  className="flex items-start gap-4 p-4 rounded-xl border-2 border-green-200 bg-green-50 cursor-pointer hover:border-green-400 transition-colors"
                  onClick={() => navigate('/cursos?mode=online')}
                >
                  <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-green-600 flex-shrink-0">
                    <Monitor className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-green-900 mb-1">Modalidad En Línea</h3>
                    <p className="text-sm text-green-700/80">
                      Clases en vivo por Zoom o Google Meet. Aprende desde cualquier lugar con el mismo nivel de atención personalizada.
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-lg aspect-square bg-secondary">
              <img
                src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=600&fit=crop&auto=format"
                alt="Alumno aprendiendo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured courses */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Cursos destacados</h2>
              <p className="text-muted-foreground">Una muestra de nuestro catálogo completo</p>
            </div>
            <Button variant="outline" className="hidden sm:flex" onClick={() => navigate('/cursos')}>
              Ver todos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((course) => (
              <motion.div key={course.id} whileHover={{ y: -3 }} transition={{ type: 'spring', stiffness: 300 }}>
                <Card
                  className="h-full flex flex-col border hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(`/cursos/${course.id}`)}
                >
                  <CardContent className="flex-1 p-5">
                    {/* Mode badge */}
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                          course.mode === 'online'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {course.mode === 'online'
                          ? <Monitor className="h-3 w-3" />
                          : <Users className="h-3 w-3" />}
                        {modeLabels[course.mode]}
                      </span>
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full border ${typeColors[course.type]}`}>
                        {typeIcons[course.type]}
                        {typeLabels[course.type]}
                      </span>
                    </div>

                    <h3 className="font-bold text-lg text-foreground mb-1 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                      {course.subject}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      {levelLabels[course.level]}
                    </p>
                    <p className="text-sm text-foreground/70 leading-relaxed line-clamp-3 mb-4">
                      {course.objective}
                    </p>

                    <div className="space-y-1.5 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {course.duration.weeks} semanas · {course.duration.totalHours} horas
                      </div>
                      <div className="flex items-center gap-1.5">
                        <GraduationCap className="h-3.5 w-3.5" />
                        {course.instructor.name}
                      </div>
                    </div>
                  </CardContent>
                  <div className="p-5 pt-0">
                    <Button className="w-full text-sm" size="sm">
                      Más información
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Button onClick={() => navigate('/cursos')}>
              Ver todos los cursos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary to-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <GraduationCap className="h-12 w-12 mx-auto mb-6 text-white/60" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            ¿Listo para mejorar tus calificaciones?
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto text-lg leading-relaxed">
            Inscríbete hoy y comienza a ver resultados. Grupos reducidos, maestros especializados y horarios flexibles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-semibold px-8"
              onClick={() => navigate('/cursos')}
            >
              Ver Catálogo Completo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10 px-8"
              onClick={() => navigate('/contacto')}
            >
              Contáctanos
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
