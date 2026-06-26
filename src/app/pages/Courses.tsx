import { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Card, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import {
  courses,
  CourseMode,
  CourseLevel,
  CourseType,
  levelLabels,
  typeLabels,
  modeLabels,
} from '../data/courses';
import {
  Monitor,
  Users,
  Clock,
  Filter,
  GraduationCap,
  Sun,
  BookOpen,
  RefreshCw,
  X,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logo from '../../assets/logo_escuela_.jpeg';

const typeColors: Record<CourseType, string> = {
  regular: 'bg-purple-100 text-purple-800',
  verano: 'bg-amber-100 text-amber-800',
  regularizacion: 'bg-rose-100 text-rose-800',
};

const typeIcons: Record<CourseType, React.ReactNode> = {
  regular: <BookOpen className="h-3 w-3" />,
  verano: <Sun className="h-3 w-3" />,
  regularizacion: <RefreshCw className="h-3 w-3" />,
};

const allSubjects = [...new Set(courses.map((c) => c.subject))].sort();

export function Courses() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initMode = searchParams.get('mode') as CourseMode | null;
  const initType = searchParams.get('type') as CourseType | null;

  const [selectedModes, setSelectedModes] = useState<CourseMode[]>(initMode ? [initMode] : []);
  const [selectedLevels, setSelectedLevels] = useState<CourseLevel[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<CourseType[]>(initType ? [initType] : []);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [subjectExpanded, setSubjectExpanded] = useState(false);

  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const modeOk = selectedModes.length === 0 || selectedModes.includes(c.mode);
      const levelOk = selectedLevels.length === 0 || selectedLevels.includes(c.level);
      const typeOk = selectedTypes.length === 0 || selectedTypes.includes(c.type);
      const subjectOk = selectedSubjects.length === 0 || selectedSubjects.includes(c.subject);
      return modeOk && levelOk && typeOk && subjectOk;
    });
  }, [selectedModes, selectedLevels, selectedTypes, selectedSubjects]);

  const toggle = <T,>(arr: T[], setArr: (v: T[]) => void, val: T) => {
    setArr(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  };

  const hasFilters = selectedModes.length > 0 || selectedLevels.length > 0 || selectedTypes.length > 0 || selectedSubjects.length > 0;

  const clearAll = () => {
    setSelectedModes([]);
    setSelectedLevels([]);
    setSelectedTypes([]);
    setSelectedSubjects([]);
  };

  const visibleSubjects = subjectExpanded ? allSubjects : allSubjects.slice(0, 6);

  const FilterPanel = () => (
    <div className="space-y-5">
      {/* Modalidad */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Modalidad</h3>
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <Checkbox
              id="f-online"
              checked={selectedModes.includes('online')}
              onCheckedChange={() => toggle(selectedModes, setSelectedModes, 'online' as CourseMode)}
            />
            <Label htmlFor="f-online" className="flex items-center gap-2 cursor-pointer font-normal">
              <Monitor className="h-4 w-4 text-green-600" />
              En Línea
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="f-presencial"
              checked={selectedModes.includes('presencial')}
              onCheckedChange={() => toggle(selectedModes, setSelectedModes, 'presencial' as CourseMode)}
            />
            <Label htmlFor="f-presencial" className="flex items-center gap-2 cursor-pointer font-normal">
              <Users className="h-4 w-4 text-blue-600" />
              Presencial
            </Label>
          </div>
        </div>
      </div>

      <Separator />

      {/* Nivel */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Nivel</h3>
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <Checkbox
              id="f-basico"
              checked={selectedLevels.includes('basico')}
              onCheckedChange={() => toggle(selectedLevels, setSelectedLevels, 'basico' as CourseLevel)}
            />
            <Label htmlFor="f-basico" className="cursor-pointer font-normal">Nivel Básico</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="f-ms"
              checked={selectedLevels.includes('medio-superior')}
              onCheckedChange={() => toggle(selectedLevels, setSelectedLevels, 'medio-superior' as CourseLevel)}
            />
            <Label htmlFor="f-ms" className="cursor-pointer font-normal">Nivel Medio Superior</Label>
          </div>
        </div>
      </div>

      <Separator />

      {/* Tipo */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Tipo de curso</h3>
        <div className="space-y-2.5">
          {(['regular', 'verano', 'regularizacion'] as CourseType[]).map((t) => (
            <div key={t} className="flex items-center gap-2">
              <Checkbox
                id={`f-${t}`}
                checked={selectedTypes.includes(t)}
                onCheckedChange={() => toggle(selectedTypes, setSelectedTypes, t)}
              />
              <Label htmlFor={`f-${t}`} className="flex items-center gap-2 cursor-pointer font-normal">
                {typeIcons[t]}
                {typeLabels[t]}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Materia */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Materia</h3>
        <div className="space-y-2.5">
          {visibleSubjects.map((subj) => (
            <div key={subj} className="flex items-center gap-2">
              <Checkbox
                id={`f-${subj}`}
                checked={selectedSubjects.includes(subj)}
                onCheckedChange={() => toggle(selectedSubjects, setSelectedSubjects, subj)}
              />
              <Label htmlFor={`f-${subj}`} className="cursor-pointer font-normal text-sm">
                {subj}
              </Label>
            </div>
          ))}
        </div>
        {allSubjects.length > 6 && (
          <button
            onClick={() => setSubjectExpanded(!subjectExpanded)}
            className="flex items-center gap-1 text-xs text-primary mt-2 hover:underline"
          >
            {subjectExpanded ? (
              <><ChevronUp className="h-3 w-3" /> Ver menos</>
            ) : (
              <><ChevronDown className="h-3 w-3" /> Ver todas ({allSubjects.length})</>
            )}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            Catálogo de Cursos
          </h1>
          <p className="text-white/70">
            {filteredCourses.length} {filteredCourses.length === 1 ? 'servicio disponible' : 'servicios disponibles'}
            {hasFilters && ' con los filtros aplicados'}
          </p>
        </div>
      </div>

      {/* Mobile filter toggle */}
      <div className="md:hidden sticky top-16 z-30 bg-white border-b border-border px-4 py-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="gap-2"
        >
          <Filter className="h-4 w-4" />
          Filtros
          {hasFilters && (
            <Badge className="ml-1 bg-primary text-white text-[10px] px-1.5 py-0">
              {selectedModes.length + selectedLevels.length + selectedTypes.length + selectedSubjects.length}
            </Badge>
          )}
        </Button>
        {hasFilters && (
          <button onClick={clearAll} className="ml-3 text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
            <X className="h-3.5 w-3.5" />
            Limpiar
          </button>
        )}
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-6">
          {/* Desktop sidebar */}
          <aside className="hidden md:block md:col-span-1">
            <Card className="sticky top-24 border shadow-sm">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h2 className="font-semibold flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filtros
                </h2>
                {hasFilters && (
                  <button onClick={clearAll} className="text-xs text-primary hover:underline flex items-center gap-1">
                    <X className="h-3 w-3" />
                    Limpiar
                  </button>
                )}
              </div>
              <div className="p-4">
                <FilterPanel />
              </div>
            </Card>
          </aside>

          {/* Mobile filter panel */}
          <AnimatePresence>
            {filtersOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden col-span-full overflow-hidden"
              >
                <Card className="border shadow-sm mb-4">
                  <div className="p-4">
                    <FilterPanel />
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Course grid */}
          <div className="md:col-span-3">
            {filteredCourses.length === 0 ? (
              <Card className="p-12 text-center border">
                <img
                  src={logo}
                  alt="Logo"
                  className="h-5 w-5 object-contain"
                />
                <p className="text-muted-foreground text-lg mb-4">
                  No se encontraron cursos con los filtros seleccionados.
                </p>
                <Button onClick={clearAll}>Limpiar filtros</Button>
              </Card>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredCourses.map((course) => (
                  <motion.div
                    key={course.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    whileHover={{ y: -3 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Card className="h-full flex flex-col border hover:shadow-md transition-shadow">
                      {/* Color accent top bar */}
                      <div className={`h-1 rounded-t-lg ${course.mode === 'online' ? 'bg-green-500' : 'bg-blue-600'}`} />

                      <CardContent className="flex-1 p-5">
                        {/* Badges row */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span
                            className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                              course.mode === 'online'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {course.mode === 'online' ? <Monitor className="h-3 w-3" /> : <Users className="h-3 w-3" />}
                            {modeLabels[course.mode]}
                          </span>
                          <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${typeColors[course.type]}`}>
                            {typeIcons[course.type]}
                            {typeLabels[course.type]}
                          </span>
                        </div>

                        <h3 className="font-bold text-lg leading-tight mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                          {course.subject}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-3">{levelLabels[course.level]}</p>
                        <p className="text-sm text-foreground/70 leading-relaxed line-clamp-3 mb-4">
                          {course.objective}
                        </p>

                        <div className="space-y-1.5 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 flex-shrink-0" />
                            {course.duration.weeks} sem · {course.duration.totalHours} hrs
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Users className="h-3.5 w-3.5 flex-shrink-0" />
                            {course.schedule.days}, {course.schedule.startTime}–{course.schedule.endTime}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <img
                              src={logo}
                              alt="Logo"
                              className="h-5 w-5 object-contain"
                            />
                            <span className="truncate">{course.instructor.name}</span>
                          </div>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className={`text-xs font-medium ${course.spotsAvailable <= 10 ? 'text-rose-600' : 'text-green-600'}`}>
                              {course.spotsAvailable} cupos disponibles
                            </span>
                          </div>
                        </div>
                      </CardContent>

                      <CardFooter className="p-5 pt-0">
                        <Button
                          className="w-full"
                          onClick={() => navigate(`/cursos/${course.id}`)}
                        >
                          Más información
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
