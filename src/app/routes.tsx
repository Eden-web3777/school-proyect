import { createBrowserRouter } from 'react-router';
import { Home } from './pages/Home';
import { Courses } from './pages/Courses';
import { CourseDetail } from './pages/CourseDetail';
import { Enrollment } from './pages/Enrollment';
import { EnrollmentSuccess } from './pages/EnrollmentSuccess';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { AdminPanel } from './pages/AdminPanel';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: '/cursos',
    element: (
      <Layout>
        <Courses />
      </Layout>
    ),
  },
  {
    path: '/cursos/:id',
    element: (
      <Layout>
        <CourseDetail />
      </Layout>
    ),
  },
  {
    path: '/inscripcion/:id',
    element: (
      <Layout>
        <Enrollment />
      </Layout>
    ),
  },
  {
    path: '/inscripcion/exito',
    element: (
      <Layout>
        <EnrollmentSuccess />
      </Layout>
    ),
  },
  {
    path: '/nosotros',
    element: (
      <Layout>
        <About />
      </Layout>
    ),
  },
  {
    path: '/contacto',
    element: (
      <Layout>
        <Contact />
      </Layout>
    ),
  },
   
  {
    path: '/admin/inscripciones',
    element: (
      <Layout>
        <AdminPanel />
      </Layout>
    ),
  },

  {
    path: '*',
    element: (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-primary mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              404
            </h1>
            <p className="text-muted-foreground mb-6">Página no encontrada</p>
            <a href="/" className="text-primary font-semibold hover:underline">
              Volver al inicio
            </a>
          </div>
        </div>
      </Layout>
    ),
  },
]);