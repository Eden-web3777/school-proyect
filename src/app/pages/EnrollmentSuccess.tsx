import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { CheckCircle2, Mail, Calendar, Home, BookOpen } from 'lucide-react';
import { Separator } from '../components/ui/separator';

interface EnrollmentData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  courseTitle: string;
  courseMode: string;
}

export function EnrollmentSuccess() {
  const navigate = useNavigate();
  const [enrollmentData, setEnrollmentData] = useState<EnrollmentData | null>(null);

  useEffect(() => {
    const data = localStorage.getItem('enrollmentData');
    if (data) {
      setEnrollmentData(JSON.parse(data));
      // Limpiar datos después de leerlos
      localStorage.removeItem('enrollmentData');
    } else {
      // Si no hay datos, redirigir a la página de cursos
      navigate('/cursos');
    }
  }, [navigate]);

  if (!enrollmentData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
          <CardTitle className="text-3xl">¡Inscripción recibida!</CardTitle>
          <CardDescription className="text-lg">
            Tu solicitud ha sido procesada exitosamente
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-blue-900 mb-1">
                  Revisa tu correo electrónico
                </h3>
                <p className="text-sm text-blue-700">
                  Hemos enviado un email de confirmación a{' '}
                  <strong>{enrollmentData.email}</strong> con todos los detalles de tu
                  inscripción.
                </p>
              </div>
            </div>

            <Separator />

            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-blue-900 mb-1">
                  Próximos pasos
                </h3>
                <p className="text-sm text-blue-700">
                  {enrollmentData.courseMode === 'online'
                    ? 'Recibirás un email con el enlace de acceso a la plataforma y las instrucciones para unirte a las clases en vivo.'
                    : 'Recibirás un email con la confirmación de tu plaza y las instrucciones para asistir a las clases presenciales.'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold mb-4">Resumen de tu inscripción</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Nombre completo:</span>
                <span className="font-semibold">
                  {enrollmentData.firstName} {enrollmentData.lastName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Correo:</span>
                <span className="font-semibold">{enrollmentData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Teléfono:</span>
                <span className="font-semibold">{enrollmentData.phone}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-gray-600">Curso:</span>
                <span className="font-semibold text-right max-w-xs">
                  {enrollmentData.courseTitle}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Modalidad:</span>
                <span className="font-semibold capitalize">
                  {enrollmentData.courseMode === 'online' ? 'En línea' : 'Presencial'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <strong>Importante:</strong> Si no recibes el correo en los próximos 15
              minutos, por favor revisa tu carpeta de spam o correo no deseado.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              size="lg"
              className="flex-1"
              onClick={() => navigate('/cursos')}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Explorar más cursos
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1"
              onClick={() => navigate('/')}
            >
              <Home className="mr-2 h-4 w-4" />
              Volver al inicio
            </Button>
          </div>

          <div className="text-center pt-4">
            <p className="text-sm text-gray-600 mb-2">
              ¿Tienes alguna pregunta sobre tu inscripción?
            </p>
            <Button variant="link" className="text-blue-600">
              Contacta con nuestro equipo de soporte
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
