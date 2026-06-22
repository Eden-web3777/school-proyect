import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import { Alert, AlertDescription } from '../components/ui/alert';
import { getCourseById, levelLabels, typeLabels, modeLabels } from '../data/courses';
import { ArrowLeft, Loader2, Monitor, Users, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface EnrollmentFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  grade: string;
  school: string;
  notes: string;
}

export function Enrollment() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const course = id ? getCourseById(id) : undefined;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<EnrollmentFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    grade: '',
    school: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<EnrollmentFormData>>({});

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md border">
          <CardHeader>
            <CardTitle>Curso no encontrado</CardTitle>
            <CardDescription>El curso que buscas no existe o ha sido eliminado.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/cursos')}>Volver al catálogo</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const validate = () => {
    const errs: Partial<EnrollmentFormData> = {};
    if (!form.firstName.trim()) errs.firstName = 'El nombre es requerido';
    if (!form.lastName.trim()) errs.lastName = 'Los apellidos son requeridos';
    if (!form.email.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) errs.email = 'Correo inválido';
    if (!form.phone.trim()) errs.phone = 'El teléfono es requerido';
    if (!form.grade.trim()) errs.grade = 'El grado/año es requerido';
    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name as keyof EnrollmentFormData]) {
      setErrors({ ...errors, [e.target.name]: undefined });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Validar campos obligatorios
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // 2. ENVIAR A SUPABASE
      const { error } = await supabase
        .from('inscripciones')
        .insert([
          {
            nombre: form.firstName,
            apellidos: form.lastName,
            correo: form.email,
            telefono: form.phone,
            grado: form.grade,
            escuela: form.school || null,
            notas: form.notes || null,
            curso_id: course.id,
            curso_nombre: `${course.subject} - ${levelLabels[course.level]}`,
            modalidad: course.mode,
          },
        ]);

      if (error) {
        console.error("Error devuelto por Supabase:", error);
        alert(`Error al guardar la inscripción: ${error.message}`);
        setIsSubmitting(false);
        return;
      }

      // 3. ¡EL TRUCO DE LA PANTALLA VERDE! Respaldar en localStorage para la vista de éxito
      localStorage.setItem(
        'enrollmentData',
        JSON.stringify({
          ...form,
          courseId: course.id,
          courseTitle: `${course.subject} — ${levelLabels[course.level]}`,
          courseMode: course.mode,
        })
      );

      // 4. Redireccionar usando el path exacto de tus routes
      setIsSubmitting(false);
      navigate('/inscripcion/exito');

    } catch (err) {
      console.error("Error inesperado en el cliente:", err);
      setIsSubmitting(false);
    }
  };

  const isOnline = course.mode === 'online';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <Button variant="ghost" size="sm" onClick={() => navigate(`/cursos/${course.id}`)} className="text-muted-foreground -ml-2">
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            Volver al curso
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            Formulario de Inscripción
          </h1>
          <p className="text-muted-foreground">
            Completa tus datos para inscribirte. Te contactaremos para confirmar tu lugar.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Form */}
          <div className="md:col-span-2">
            <Card className="border">
              <CardHeader>
                <CardTitle>Datos del alumno</CardTitle>
                <CardDescription>Por favor completa todos los campos marcados con *</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="firstName">Nombre <span className="text-destructive">*</span></Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="Nombre del alumno"
                        value={form.firstName}
                        onChange={handleChange}
                      />
                      {errors.firstName && <p className="text-xs text-destructive">{errors.firstName}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="lastName">Apellidos <span className="text-destructive">*</span></Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Apellidos del alumno"
                        value={form.lastName}
                        onChange={handleChange}
                      />
                      {errors.lastName && <p className="text-xs text-destructive">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="email">Correo electrónico (padre/tutor) <span className="text-destructive">*</span></Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="correo@ejemplo.com"
                      value={form.email}
                      onChange={handleChange}
                    />
                    {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="phone">Teléfono / WhatsApp <span className="text-destructive">*</span></Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="961 000 0000"
                      value={form.phone}
                      onChange={handleChange}
                    />
                    {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="grade">Grado / Año escolar <span className="text-destructive">*</span></Label>
                      <Input
                        id="grade"
                        name="grade"
                        placeholder="Ej: 3° Secundaria"
                        value={form.grade}
                        onChange={handleChange}
                      />
                      {errors.grade && <p className="text-xs text-destructive">{errors.grade}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="school">Escuela de procedencia</Label>
                      <Input
                        id="school"
                        name="school"
                        placeholder="Nombre de la escuela"
                        value={form.school}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="notes">Comentarios adicionales</Label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={3}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring/50 resize-none"
                      placeholder="Horario preferido, temas con más dificultad, necesidades especiales, etc."
                      value={form.notes}
                      onChange={handleChange}
                    />
                  </div>

                  <Separator />

                  {course.spotsAvailable <= 10 && (
                    <Alert className="border-rose-200 bg-rose-50">
                      <AlertCircle className="h-4 w-4 text-rose-600" />
                      <AlertDescription className="text-rose-700">
                        <strong>Cupos limitados:</strong> Solo quedan {course.spotsAvailable} lugares disponibles. Inscríbete pronto.
                      </AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" size="lg" className="w-full font-semibold" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enviando solicitud...
                      </>
                    ) : (
                      'Confirmar Inscripción'
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Al inscribirte aceptas nuestros términos. Recibirás confirmación por correo o WhatsApp en menos de 24 horas.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Summary */}
          <div>
            <Card className="sticky top-24 border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Resumen del curso</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-bold text-lg leading-tight mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                    {course.subject}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">{levelLabels[course.level]}</p>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge
                      className={isOnline ? 'bg-green-100 text-green-800 hover:bg-green-100' : 'bg-blue-100 text-blue-800 hover:bg-blue-100'}
                    >
                      {isOnline ? <Monitor className="h-3 w-3 mr-1" /> : <Users className="h-3 w-3 mr-1" />}
                      {modeLabels[course.mode]}
                    </Badge>
                    <Badge variant="outline">{typeLabels[course.type]}</Badge>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Días</span>
                    <span className="font-medium text-right max-w-[130px]">{course.schedule.days}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Horario</span>
                    <span className="font-medium">{course.schedule.startTime}–{course.schedule.endTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duración</span>
                    <span className="font-medium">{course.duration.weeks} semanas</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Docente</span>
                    <span className="font-medium text-right max-w-[130px] text-xs">{course.instructor.name}</span>
                  </div>
                </div>

                <Separator />

                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">¿Dudas antes de inscribirte?</p>
                  <a href="https://wa.me/529611234567" className="text-sm text-primary font-semibold hover:underline">
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
