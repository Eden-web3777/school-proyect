import { useParams, useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { getCourseById, levelLabels, typeLabels, modeLabels, CourseType } from '../data/courses';
import {
  Monitor,
  Users,
  Clock,
  MapPin,
  Calendar,
  AlertCircle,
  ArrowLeft,
  Laptop,
  Wifi,
  BookOpen,
  Sun,
  RefreshCw,
  GraduationCap,
  CheckCircle2,
} from 'lucide-react';

const typeColors: Record<CourseType, string> = {
  regular: 'bg-purple-100 text-purple-800 border-purple-200',
  verano: 'bg-amber-100 text-amber-800 border-amber-200',
  regularizacion: 'bg-rose-100 text-rose-800 border-rose-200',
};

const typeIcons: Record<CourseType, React.ReactNode> = {
  regular: <BookOpen className="h-4 w-4" />,
  verano: <Sun className="h-4 w-4" />,
  regularizacion: <RefreshCw className="h-4 w-4" />,
};

export function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const course = id ? getCourseById(id) : undefined;

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="max-w-md border">
          <CardHeader>
            <CardTitle>Curso no encontrado</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">El curso que buscas no existe o ha sido eliminado.</p>
            <Button onClick={() => navigate('/cursos')}>Volver al catálogo</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isOnline = course.mode === 'online';

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <Button variant="ghost" size="sm" onClick={() => navigate('/cursos')} className="text-muted-foreground hover:text-foreground -ml-2">
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            Volver al catálogo
          </Button>
        </div>
      </div>

      {/* Hero band */}
      <div className={`py-10 ${isOnline ? 'bg-gradient-to-r from-green-700 to-green-900' : 'bg-gradient-to-r from-blue-700 to-primary'} text-white`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${isOnline ? 'bg-green-100 text-green-800 border-green-200' : 'bg-blue-100 text-blue-800 border-blue-200'}`}>
              {isOnline ? <Monitor className="h-3.5 w-3.5" /> : <Users className="h-3.5 w-3.5" />}
              {modeLabels[course.mode]}
            </span>
            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${typeColors[course.type]}`}>
              {typeIcons[course.type]}
              {typeLabels[course.type]}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            {course.subject}
          </h1>
          <p className="text-white/70 text-lg">{levelLabels[course.level]}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="md:col-span-2 space-y-6">

            {/* Objective */}
            <Card className="border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  Objetivo del curso
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80 leading-relaxed">{course.objective}</p>
              </CardContent>
            </Card>

            {/* Schedule & Duration */}
            <Card className="border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Horarios y duración
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Horario de clases</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm font-medium">{course.schedule.days}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm">{course.schedule.startTime} – {course.schedule.endTime}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Duración</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm">{course.duration.weeks} semanas</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm">{course.duration.totalHours} horas en total</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Modality-specific info */}
            {isOnline ? (
              <Card className="border border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2 text-green-900">
                    <Monitor className="h-5 w-5 text-green-600" />
                    Información — Modalidad En Línea
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {course.platform && (
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-green-700 mb-1.5">Plataforma</h4>
                      <div className="flex items-center gap-2">
                        <Laptop className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-green-800 font-medium">{course.platform}</span>
                      </div>
                    </div>
                  )}
                  {course.technicalRequirements && (
                    <>
                      <Separator className="bg-green-200" />
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-green-700 mb-1.5">Requisitos técnicos</h4>
                        <div className="flex items-start gap-2">
                          <Wifi className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-green-800">{course.technicalRequirements}</span>
                        </div>
                      </div>
                    </>
                  )}
                  {course.digitalMaterials && (
                    <>
                      <Separator className="bg-green-200" />
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-green-700 mb-1.5">Material digital incluido</h4>
                        <p className="text-sm text-green-800">{course.digitalMaterials}</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="border border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2 text-blue-900">
                    <Users className="h-5 w-5 text-blue-600" />
                    Información — Modalidad Presencial
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {course.address && (
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-blue-700 mb-1.5">Dirección</h4>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-blue-800">{course.address}</span>
                      </div>
                    </div>
                  )}
                  {course.classroom && (
                    <>
                      <Separator className="bg-blue-200" />
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-blue-700 mb-1.5">Aula asignada</h4>
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-blue-600" />
                          <span className="text-sm text-blue-800 font-medium">{course.classroom}</span>
                        </div>
                      </div>
                    </>
                  )}
                  <Separator className="bg-blue-200" />
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-blue-700 mb-1.5">Referencia de ubicación</h4>
                    <div className="bg-blue-100 rounded-lg h-36 flex items-center justify-center border border-blue-200">
                      <div className="text-center text-blue-600">
                        <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-xs">Calle Hidalgo 245, Col. Centro</p>
                        <p className="text-xs">Tuxtla Gutiérrez, Chiapas</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Instructor */}
            <Card className="border">
              <CardHeader>
                <CardTitle className="text-lg">Docente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16 border-2 border-border flex-shrink-0">
                    <AvatarImage src={course.instructor.photo} alt={course.instructor.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg font-bold">
                      {course.instructor.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-lg mb-0.5" style={{ fontFamily: 'var(--font-display)' }}>
                      {course.instructor.name}
                    </h3>
                    <Badge variant="outline" className="mb-2 text-xs">
                      {course.instructor.specialty}
                    </Badge>
                    <p className="text-sm text-muted-foreground leading-relaxed">{course.instructor.experience}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What's included */}
            <Card className="border">
              <CardHeader>
                <CardTitle className="text-lg">¿Qué incluye?</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2.5">
                  {[
                    'Atención personalizada del docente',
                    'Material de estudio y ejercicios prácticos',
                    'Seguimiento del avance académico',
                    'Asesoría de dudas fuera del horario de clase (vía WhatsApp)',
                    isOnline ? 'Grabaciones de clases disponibles 48 horas' : 'Acceso a biblioteca de materiales físicos',
                    course.type === 'regularizacion' ? 'Diagnóstico inicial personalizado' : 'Evaluaciones periódicas de avance',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sticky sidebar */}
          <div className="md:col-span-1">
            <Card className="sticky top-24 border shadow-sm">
              <CardContent className="p-6 space-y-5">
                {/* Mode indicator */}
                <div className={`flex items-center gap-3 p-3 rounded-lg ${isOnline ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'}`}>
                  {isOnline ? (
                    <Monitor className="h-5 w-5 text-green-600 flex-shrink-0" />
                  ) : (
                    <Users className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  )}
                  <div>
                    <p className="text-xs text-muted-foreground">Modalidad</p>
                    <p className={`text-sm font-bold ${isOnline ? 'text-green-800' : 'text-blue-800'}`}>
                      {modeLabels[course.mode]}
                    </p>
                  </div>
                </div>

                {/* Quick info */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-start">
                    <span className="text-muted-foreground">Nivel</span>
                    <span className="font-semibold text-right max-w-[160px]">{levelLabels[course.level]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tipo</span>
                    <span className="font-semibold">{typeLabels[course.type]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duración</span>
                    <span className="font-semibold">{course.duration.weeks} semanas</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total de horas</span>
                    <span className="font-semibold">{course.duration.totalHours} hrs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Días</span>
                    <span className="font-semibold text-right max-w-[140px]">{course.schedule.days}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Horario</span>
                    <span className="font-semibold">{course.schedule.startTime}–{course.schedule.endTime}</span>
                  </div>
                </div>

                <Separator />

                {/* Spots */}
                {course.spotsAvailable <= 10 && (
                  <Alert className="border-rose-200 bg-rose-50">
                    <AlertCircle className="h-4 w-4 text-rose-600" />
                    <AlertTitle className="text-rose-800 text-sm">Cupos limitados</AlertTitle>
                    <AlertDescription className="text-rose-700 text-xs">
                      Solo quedan <strong>{course.spotsAvailable}</strong> lugares disponibles
                    </AlertDescription>
                  </Alert>
                )}

                {course.spotsAvailable > 10 && (
                  <p className="text-sm text-green-600 font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4" />
                    {course.spotsAvailable} cupos disponibles
                  </p>
                )}

                {/* CTA */}
                <Button
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold text-base py-6"
                  onClick={() => navigate(`/inscripcion/${course.id}`)}
                >
                  Inscribirme Ahora
                </Button>

                {course.mode === 'presencial' && (
                  <p className="text-center text-xs text-muted-foreground">
                    Cupos limitados. Asegura tu lugar hoy.
                  </p>
                )}

                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">¿Tienes preguntas?</p>
                  <a
                    href="https://wa.me/529611234567"
                    className="text-sm text-primary font-semibold hover:underline"
                  >
                    Escríbenos por WhatsApp
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
