import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  Send,
  CheckCircle2,
  Facebook,
  Instagram,
} from 'lucide-react';
import { motion } from 'motion/react';
import { supabase } from '../../lib/supabase';

const contactInfo = [
  {
    icon: <Phone className="h-5 w-5 text-primary" />,
    label: 'Teléfono',
    value: '5579050723',
    href: 'tel:+525579050723',
    color: 'bg-blue-50 border-blue-200',
  },
  {
    icon: <MessageCircle className="h-5 w-5 text-green-600" />,
    label: 'WhatsApp',
    value: '5579050723',
    href: 'https://wa.me/525579050723',
    color: 'bg-green-50 border-green-200',
  },
  {
    icon: <Mail className="h-5 w-5 text-primary" />,
    label: 'Correo electrónico',
    value: 'contacto@itad.edu.mx',
    href: 'mailto:contacto@itad.edu.mx',
    color: 'bg-blue-50 border-blue-200',
  },
];

const schedules = [
  { day: 'Lunes – Viernes', hours: '8:00 – 20:00' },
  { day: 'Sábados', hours: '9:00 – 14:00' },
  { day: 'Domingos', hours: 'Cerrado' },
];

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  setLoading(true);

  const { error } = await supabase
    .from('contactos')
    .insert([
      {
        nombre: form.name,
        correo: form.email,
        telefono: form.phone,
        asunto: form.subject,
        mensaje: form.message,
      },
    ]);

  setLoading(false);

  if (error) {
    console.error(error);
    alert('No se pudo enviar el mensaje');
    return;
  }

  // Limpiar formulario
  setForm({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary text-white py-14">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
            Contacto y Ubicación
          </h1>
          <p className="text-white/70 text-lg max-w-xl">
            Estamos aquí para resolver tus dudas e inscribirte en el curso que necesitas.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact info + schedule */}
          <div className="space-y-6">
            {/* Contact cards */}
            <div className="space-y-4">
              {contactInfo.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 ${item.color} hover:shadow-sm transition-all block`}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white shadow-sm flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="font-semibold text-foreground">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social */}
            <Card className="border">
              <CardContent className="p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Redes sociales</p>
                <div className="flex gap-3">
                  <a href="#" aria-label="Facebook" className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors">
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-600 text-white">
                      <Facebook className="h-4 w-4" />
                    </div>
                    Facebook
                  </a>
                  <a href="#" aria-label="Instagram" className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors">
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 text-white">
                      <Instagram className="h-4 w-4" />
                    </div>
                    Instagram
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Schedule */}
            <Card className="border">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Clock className="h-4 w-4 text-primary" />
                  Horarios de atención
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {schedules.map((s) => (
                    <div key={s.day} className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">{s.day}</span>
                      <span className={`font-semibold ${s.hours === 'Cerrado' ? 'text-muted-foreground' : 'text-foreground'}`}>
                        {s.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">Envíanos un mensaje</CardTitle>
                <p className="text-muted-foreground text-sm">
                  Completa el formulario y te contactaremos en menos de 24 horas.
                </p>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mx-auto mb-4">
                      <CheckCircle2 className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                      ¡Mensaje recibido!
                    </h3>
                    <p className="text-muted-foreground">
                      Te contactaremos en breve al correo <strong>{form.email}</strong> o al número que proporcionaste.
                    </p>
                    <Button className="mt-6" onClick={() => {
                      setForm({
                        name: '',
                        email: '',
                        phone: '',
                        subject: '',
                        message: '',
                      });

                      setSubmitted(false);
                      }}>
                      Enviar otro mensaje
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="name">Nombre completo <span className="text-destructive">*</span></Label>
                        <Input id="name" name="name" placeholder="Tu nombre completo" required value={form.name} onChange={handleChange} />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="email">Correo electrónico <span className="text-destructive">*</span></Label>
                        <Input id="email" name="email" type="email" placeholder="tu@correo.com" required value={form.email} onChange={handleChange} />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="phone">Teléfono / WhatsApp</Label>
                        <Input id="phone" name="phone" type="tel" placeholder="961 000 0000" value={form.phone} onChange={handleChange} />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="subject">Asunto <span className="text-destructive">*</span></Label>
                        <Input id="subject" name="subject" placeholder="Ej: Inscripción a Álgebra" required value={form.subject} onChange={handleChange} />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="message">Mensaje <span className="text-destructive">*</span></Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Cuéntanos en qué materia necesitas ayuda, el nivel de tu hijo/a, y cualquier detalle que nos ayude a orientarte..."
                        rows={5}
                        required
                        value={form.message}
                        onChange={handleChange}
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full gap-2 font-semibold" disabled={loading}>
                      {loading ? (
                        <>Enviando...</>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Enviar mensaje
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      También puedes escribirnos directamente por{' '}
                      <a href="https://wa.me/529611234567" className="text-primary font-semibold hover:underline">
                        WhatsApp
                      </a>{' '}
                      para respuesta inmediata.
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Location section */}
        <Separator className="my-12" />

        <section id="ubicacion">
          <div className="text-center mb-8">
            <Badge variant="outline" className="mb-3 text-xs uppercase tracking-wider">
              ¿Cómo llegamos?
            </Badge>
            <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              Nuestra ubicación
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Estamos en Ixtapaluca, Estado de México, con acceso en transporte público local y estacionamiento en zonas cercanas.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Address card */}
            <Card className="border">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-1">Dirección</p>
                    <p className="text-sm text-muted-foreground">
                      Ignacio Zaragoza 55<br />
                      José de la Palma<br />
                      56530 Ixtapaluca, Estado de México<br />
                      México
                    </p>
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="font-semibold mb-2 text-sm">Referencias</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Cerca del centro de Ixtapaluca</li>
                    <li>• A pocos minutos del Palacio Municipal</li>
                    <li>• Acceso mediante transporte público local</li>
                  </ul>
                </div>

                <Separator />

                <div>
                  <p className="font-semibold mb-2 text-sm">Estacionamiento</p>
                  <p className="text-sm text-muted-foreground">
                    Estacionamiento disponible en calles aledañas y zonas públicas cercanas.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Map placeholder */}
            <div className="md:col-span-2">
              <div className="w-full h-full min-h-[300px] rounded-xl border-2 border-border bg-secondary flex items-center justify-center overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=900&h=450&fit=crop&auto=format"
                  alt="Mapa de ubicación"
                  className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                  <div className="bg-white rounded-xl shadow-lg p-5 max-w-sm">
                    <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="font-bold text-foreground mb-1">Inst. Tec. de Aprendizaje y Desarrollo</p>
                    <p className="text-sm text-muted-foreground mb-3">
                      Ignacio Zaragoza 55, Col. José de la Palma<br />
                      56530 Ixtapaluca, Estado de México
                    </p>
                    <a
                      href="https://maps.google.com/?q=Ignacio+Zaragoza+55+José+de+la+Palma+Ixtapaluca+Estado+de+México"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="sm" className="gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        Ver en Google Maps
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
