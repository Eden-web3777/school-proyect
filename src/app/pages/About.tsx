import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { GraduationCap, Heart, Star, Target, Mail, Phone, Globe, Code2 } from 'lucide-react';
import { motion } from 'motion/react';

const values = [
  { icon: <Star className="h-5 w-5" />, title: 'Excelencia', description: 'Buscamos la mejora continua en cada clase, adaptando nuestros métodos a las necesidades de cada alumno.' },
  { icon: <Heart className="h-5 w-5" />, title: 'Compromiso', description: 'Nos comprometemos con el avance real de cada estudiante, dando seguimiento personalizado durante todo el ciclo.' },
  { icon: <Target className="h-5 w-5" />, title: 'Resultados', description: 'Nuestro enfoque está siempre en que el alumno apruebe, comprenda y gane confianza en la materia.' },
  { icon: <GraduationCap className="h-5 w-5" />, title: 'Vocación', description: 'Cada docente de nuestra academia eligió la enseñanza por convicción, no por conveniencia.' },
];

const teachers = [
  {
    name: 'Mtra. María García López',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&auto=format',
    specialty: 'Matemáticas y Álgebra',
    level: 'Básico y Medio Superior',
  },
  {
    name: 'Prof. Carlos López Mendoza',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format',
    specialty: 'Español y Literatura',
    level: 'Básico y Medio Superior',
  },
  {
    name: 'Mtra. Ana Rodríguez Vega',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&auto=format',
    specialty: 'Inglés',
    level: 'Básico y Medio Superior',
  },
  {
    name: 'Lic. Jorge Hernández Ruiz',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&auto=format',
    specialty: 'Física y Química',
    level: 'Medio Superior',
  },
  {
    name: 'Mtra. Laura Martínez Cruz',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&auto=format',
    specialty: 'Historia, Geografía y Cívica',
    level: 'Básico y Medio Superior',
  },
  {
    name: 'Dr. Roberto Sánchez Pérez',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&auto=format',
    specialty: 'Probabilidad y Estadística',
    level: 'Medio Superior',
  },
  {
    name: 'Prof. Diana Torres Ávila',
    photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&auto=format',
    specialty: 'Biología y Ciencias Naturales',
    level: 'Básico y Medio Superior',
  },
  {
    name: 'Lic. Pedro Ramírez Fuentes',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&auto=format',
    specialty: 'Informática',
    level: 'Medio Superior',
  },
];

export function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Nosotros
            </h1>
            <p className="text-white/70 max-w-2xl text-lg leading-relaxed">
              Somos una academia de asesorías académicas con sede en Ixtapaluca, Estado de México, comprometida con el éxito escolar de cada alumno.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Historia */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Nuestra historia
              </h2>
              <div className="space-y-4 text-foreground/80 leading-relaxed">
                <p>
                  El Instituto Tecnológico de Aprendizaje y Desarrollo nació en 2018 a partir de la necesidad real de los alumnos de la región de contar con asesorías de calidad accesibles. Nuestro fundador, con más de 15 años de experiencia docente, identificó que muchos estudiantes tenían dificultades en materias clave no por falta de capacidad, sino por falta de acompañamiento personalizado.
                </p>
                <p>
                  Lo que comenzó como un pequeño grupo de tutorías en Matemáticas y Español, hoy se ha convertido en una academia completa que atiende más de 500 alumnos por ciclo escolar, con 8 docentes especializados y cobertura en modalidad presencial y en línea.
                </p>
                <p>
                  Desde 2021 ofrecemos servicios en línea para llegar a alumnos de toda la región que no pueden desplazarse hasta nuestras instalaciones.
                </p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg aspect-[4/3] bg-secondary">
              <img
                src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=720&h=540&fit=crop&auto=format"
                alt="Salón de clases de la academia"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Misión, Visión */}
      <section className="py-14 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="border-2 border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary text-xl">
                  <Target className="h-6 w-6" />
                  Misión
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80 leading-relaxed">
                  Brindar asesorías académicas de alta calidad en modalidad presencial y en línea, adaptadas al ritmo de aprendizaje de cada alumno, para que logren sus metas escolares con confianza y preparación sólida.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent/20 bg-accent/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-accent text-xl">
                  <Star className="h-6 w-6" />
                  Visión
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80 leading-relaxed">
                  Ser la academia de referencia en el Estado de México por la calidad de sus docentes, los resultados comprobables de sus alumnos y el uso de metodologías modernas de enseñanza.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Values */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-center" style={{ fontFamily: 'var(--font-display)' }}>
              Nuestros valores
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {values.map((val) => (
                <motion.div key={val.title} whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <Card className="h-full border hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary mb-4">
                        {val.icon}
                      </div>
                      <h3 className="font-bold text-lg mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                        {val.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{val.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Equipo docente */}
      <section id="equipo" className="py-14 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              Equipo docente
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Profesores especializados, con experiencia comprobada y vocación de enseñanza
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {teachers.map((teacher) => (
              <motion.div key={teacher.name} whileHover={{ y: -3 }} transition={{ type: 'spring', stiffness: 300 }}>
                <Card className="h-full border hover:shadow-md transition-shadow text-center">
                  <CardContent className="p-6">
                    <Avatar className="h-20 w-20 mx-auto mb-4 border-2 border-border">
                      <AvatarImage src={teacher.photo} alt={teacher.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">
                        {teacher.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-bold text-sm leading-tight mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                      {teacher.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-2">{teacher.specialty}</p>
                    <Badge variant="outline" className="text-[10px]">
                      {teacher.level}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer section */}
      <section id="desarrollador" className="py-14 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <Separator className="mb-12" />
          <div className="text-center mb-8">
            <Badge variant="outline" className="mb-3 text-xs uppercase tracking-wider">
              Plataforma web
            </Badge>
            <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              Empresa desarrolladora
            </h2>
            <p className="text-muted-foreground">
              El sitio web de Instituto Tecnológico de Aprendizaje y Desarrollo fue diseñado y desarrollado por:
            </p>
          </div>

          <Card className="border-2 border-border">
            <CardContent className="p-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-foreground flex-shrink-0">
                  <Code2 className="h-8 w-8" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                    TechEdu Solutions
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    Empresa especializada en desarrollo de plataformas educativas digitales para instituciones académicas del Estado de México. Creamos soluciones web modernas, accesibles y escalables para escuelas, academias y centros de enseñanza.
                  </p>

                  <div className="flex flex-wrap gap-2 mb-5 justify-center sm:justify-start">
                    {['Plataformas educativas', 'Sistemas de inscripción', 'Catálogos de cursos', 'Sitios institucionales'].map((s) => (
                      <Badge key={s} variant="secondary" className="text-xs">
                        {s}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <a href="mailto:contacto@techedu.mx" className="flex items-center gap-2 text-primary hover:underline">
                      <Mail className="h-4 w-4 flex-shrink-0" />
                      contacto@techedu.mx
                    </a>
                    <a href="tel:+529611110000" className="flex items-center gap-2 text-primary hover:underline">
                      <Phone className="h-4 w-4 flex-shrink-0" />
                      961 111 0000
                    </a>
                    <a href="#" className="flex items-center gap-2 text-primary hover:underline">
                      <Globe className="h-4 w-4 flex-shrink-0" />
                      www.techedu.mx
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Para solicitar una plataforma similar, contacta directamente a TechEdu Solutions.
          </p>
        </div>
      </section>
    </div>
  );
}
