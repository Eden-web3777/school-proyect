import { useEffect, useState } from 'react'; // Asegúrate de importar useState
import { useNavigate } from 'react-router';
import { supabase } from '../../lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import { Loader2, RefreshCw, ArrowLeft, Mail, Phone, Calendar } from 'lucide-react';

interface Inscripcion {
  id: string;
  nombre: string;
  apellidos: string;
  correo: string;
  telefono: string;
  grado: string;
  escuela: string;
  notas: string;
  curso_nombre: string;
  modalidad: string;
  fecha_registro: string;
}

export function AdminPanel() {
  const navigate = useNavigate();
  const [inscripciones, setInscripciones] = useState<Inscripcion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInscripciones = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: supabaseError } = await supabase
        .from('inscripciones')
        .select('*')
        .order('fecha_registro', { ascending: false });

      if (supabaseError) throw supabaseError;
      setInscripciones(data || []);
    } catch (err: any) {
      console.error('Error cargando inscripciones:', err);
      setError('No se pudieron cargar las inscripciones.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInscripciones();
  }, []);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Encabezado */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/cursos')} className="text-muted-foreground -ml-2 mb-2">
              <ArrowLeft className="h-4 w-4 mr-1.5" /> Volver al inicio
            </Button>
            <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              Panel de Administración
            </h1>
            <p className="text-muted-foreground">
              Gestiona y visualiza los alumnos inscritos desde la web.
            </p>
          </div>
          
          <Button onClick={fetchInscripciones} disabled={loading} variant="outline" className="w-full sm:w-auto">
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Actualizar datos
          </Button>
        </div>

        <Separator />

        {/* Estado de carga corregido */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground text-sm">Cargando inscripciones desde Supabase...</p>
          </div>
        )}

        {/* Estado de error */}
        {error && (
          <Card className="border-destructive bg-destructive/5 text-center p-6">
            <p className="text-destructive font-medium">{error}</p>
            <Button onClick={fetchInscripciones} size="sm" className="mt-4">Reintentar</Button>
          </Card>
        )}

        {/* Lista de Inscripciones */}
        {!loading && !error && (
          <div className="space-y-4">
            {inscripciones.length === 0 ? (
              <Card className="text-center p-12 border border-dashed">
                <p className="text-muted-foreground">Aún no hay ninguna inscripción registrada en la base de datos.</p>
              </Card>
            ) : (
              <div className="grid gap-4">
                {inscripciones.map((item) => (
                  <Card key={item.id} className="border shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div>
                          <CardTitle className="text-xl font-bold text-foreground">
                            {item.nombre} {item.apellidos}
                          </CardTitle>
                          <CardDescription className="text-xs flex items-center mt-1">
                            <Calendar className="h-3 w-3 mr-1" />
                            Registrado el: {new Date(item.fecha_registro).toLocaleString('es-MX')}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <Badge className="bg-primary/10 text-primary hover:bg-primary/10 font-semibold">
                            {item.curso_nombre}
                          </Badge>
                          <Badge variant="outline" className="capitalize">
                            {item.modalidad}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="text-sm space-y-3">
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-muted-foreground">
                        <a href={`mailto:${item.correo}`} className="flex items-center hover:text-primary transition-colors">
                          <Mail className="h-4 w-4 mr-1.5 text-primary/70" />
                          {item.correo}
                        </a>
                        <a href={`https://wa.me/${item.telefono.replace(/\s+/g, '')}`} target="_blank" rel="noreferrer" className="flex items-center hover:text-primary transition-colors">
                          <Phone className="h-4 w-4 mr-1.5 text-primary/70" />
                          {item.telefono}
                        </a>
                      </div>

                      <Separator className="my-2" />

                      <div className="grid sm:grid-cols-2 gap-2 text-xs">
                        <p><strong className="text-foreground">Grado/Año:</strong> {item.grado || 'No especificado'}</p>
                        <p><strong className="text-foreground">Escuela:</strong> {item.escuela || 'No especificada'}</p>
                      </div>

                      {item.notas && (
                        <div className="mt-2 p-2.5 bg-muted rounded-lg border text-xs">
                          <strong className="block text-foreground mb-1">Notas adicionales:</strong>
                          <span className="text-muted-foreground italic">"{item.notas}"</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}