import type { Empresa, Persona, PersonaEmpresa } from "./interfaces";
import { empresaService } from "./empresaService";
import { personaService } from "./personaService";
import { personaEmpresaService } from "./personaEmpresaService";
import dayjs from "dayjs";

/**
 * Datos iniciales de ejemplo para empresas
 */
const empresasEjemplo: Omit<Empresa, "id">[] = [
  { nombre: "TechSolutions S.A." },
  { nombre: "Innovación Digital Ltda." },
  { nombre: "Global Systems Inc." },
  { nombre: "Nexus Technologies" },
  { nombre: "CloudSoft Enterprise" },
  { nombre: "DataDrive Solutions" },
  { nombre: "CyberNet Corp." },
  { nombre: "FutureSoft Industries" },
  { nombre: "Quantum Innovations" },
  { nombre: "SmartCode Systems" },
  { nombre: "Metro Consulting Group" },
  { nombre: "Digital Transformation Co." },
  { nombre: "Agile Development Ltd." },
  { nombre: "SecureNet Services" },
  { nombre: "Apex Business Solutions" },
  { nombre: "Vertex Software" },
  { nombre: "Matrix Enterprises" },
  { nombre: "PrimeTech Solutions" },
  { nombre: "Infinity Tech Corp." },
  { nombre: "Velocity Systems" },
];

/**
 * Genera una fecha aleatoria entre dos años
 */
const generarFechaAleatoria = (anoInicio: number, anoFin: number): dayjs.Dayjs => {
  const ano = Math.floor(Math.random() * (anoFin - anoInicio + 1)) + anoInicio;
  const mes = Math.floor(Math.random() * 12); // 0-11
  const diasEnMes = dayjs(`${ano}-${mes + 1}-01`).daysInMonth();
  const dia = Math.floor(Math.random() * diasEnMes) + 1;
  return dayjs(`${ano}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`);
};

/**
 * Datos iniciales de ejemplo para personas
 */
const personasEjemplo: Omit<Persona, "id">[] = [
  { nombre: "Ana García", email: "ana.garcia@email.com", fechaNacimiento: generarFechaAleatoria(2006, 2046) },
  { nombre: "Carlos Martínez", email: "carlos.martinez@email.com", fechaNacimiento: generarFechaAleatoria(2006, 2046) },
  { nombre: "Laura Fernández", email: "laura.fernandez@email.com", fechaNacimiento: generarFechaAleatoria(2006, 2046) },
  { nombre: "Juan Rodríguez", email: "juan.rodriguez@email.com", fechaNacimiento: generarFechaAleatoria(2006, 2046) },
  { nombre: "María López", email: "maria.lopez@email.com", fechaNacimiento: generarFechaAleatoria(2006, 2046) },
  { nombre: "Pedro Sánchez", email: "pedro.sanchez@email.com", fechaNacimiento: generarFechaAleatoria(2006, 2046) },
  { nombre: "Carmen Ruiz", email: "carmen.ruiz@email.com", fechaNacimiento: generarFechaAleatoria(2006, 2046) },
  { nombre: "Diego Torres", email: "diego.torres@email.com", fechaNacimiento: generarFechaAleatoria(2006, 2046) },
  { nombre: "Sofia Vargas", email: "sofia.vargas@email.com", fechaNacimiento: generarFechaAleatoria(2006, 2046) },
  { nombre: "Miguel Herrera", email: "miguel.herrera@email.com", fechaNacimiento: generarFechaAleatoria(2006, 2046) },
  { nombre: "Elena Jiménez", email: "elena.jimenez@email.com", fechaNacimiento: generarFechaAleatoria(2006, 2046) },
  { nombre: "Roberto Díaz", email: "roberto.diaz@email.com", fechaNacimiento: generarFechaAleatoria(2006, 2046) },
  { nombre: "Patricia Moreno", email: "patricia.moreno@email.com", fechaNacimiento: generarFechaAleatoria(2006, 2046) },
  { nombre: "Javier Muñoz", email: "javier.munoz@email.com", fechaNacimiento: generarFechaAleatoria(2006, 2046) },
  { nombre: "Isabel Gutiérrez", email: "isabel.gutierrez@email.com", fechaNacimiento: generarFechaAleatoria(2006, 2046) },
  { nombre: "Fernando Castro", email: "fernando.castro@email.com", fechaNacimiento: generarFechaAleatoria(2006, 2046) },
  { nombre: "Lucía Ortega", email: "lucia.ortega@email.com", fechaNacimiento: generarFechaAleatoria(2006, 2046) },
  { nombre: "Alejandro Medina", email: "alejandro.medina@email.com", fechaNacimiento: generarFechaAleatoria(2006, 2046) },
  { nombre: "Marta Romero", email: "marta.romero@email.com", fechaNacimiento: generarFechaAleatoria(2006, 2046) },
  { nombre: "Ricardo Morales", email: "ricardo.morales@email.com", fechaNacimiento: generarFechaAleatoria(2006, 2046) },
];

/**
 * Cargos disponibles para las relaciones
 */
const cargosEjemplo = [
  "CEO",
  "CTO",
  "CFO",
  "Director de Desarrollo",
  "Gerente de Proyecto",
  "Desarrollador Senior",
  "Desarrollador Junior",
  "Analista de Sistemas",
  "Diseñador UX/UI",
  "Product Manager",
  "Scrum Master",
  "QA Engineer",
  "DevOps Engineer",
  "Marketing Manager",
  "Sales Manager",
  "HR Manager",
  "Contador",
  "Asistente Administrativo",
  "Consultor",
  "Coordinador",
];

/**
 * Inicializa los datos de ejemplo en localStorage
 * Crea 20 empresas, 20 personas y establece relaciones entre ellas
 */
export const inicializarDatosEjemplo = async (): Promise<void> => {
  // Limpiar datos existentes
  localStorage.removeItem("docMockServices_empresas");
  localStorage.removeItem("docMockServices_personas");
  localStorage.removeItem("docMockServices_personaEmpresas");

  // Crear empresas (sin await para crear todas en paralelo, luego esperar)
  const empresasPromesas = empresasEjemplo.map((emp) =>
    empresaService.agregar(emp)
  );
  const empresasCreadas: Empresa[] = await Promise.all(empresasPromesas);

  // Crear personas (sin await para crear todas en paralelo, luego esperar)
  const personasPromesas = personasEjemplo.map((per) =>
    personaService.agregar(per)
  );
  const personasCreadas: Persona[] = await Promise.all(personasPromesas);

  // Crear relaciones (cada persona tiene entre 1 y 3 trabajos)
  const relaciones: PersonaEmpresa[] = [];

  personasCreadas.forEach((persona, indexPersona) => {
    // Cada persona trabaja en al menos 1 empresa y hasta 3 empresas
    const numTrabajos = 1 + (indexPersona % 3); // Entre 1 y 3 trabajos

    // Seleccionar empresas aleatorias sin repetir
    const empresasSeleccionadas: number[] = [];
    for (let i = 0; i < numTrabajos; i++) {
      let empresaIndex;
      do {
        empresaIndex = Math.floor(Math.random() * empresasCreadas.length);
      } while (empresasSeleccionadas.includes(empresaIndex));
      empresasSeleccionadas.push(empresaIndex);
    }

    // Crear relaciones
    empresasSeleccionadas.forEach((empresaIndex) => {
      const cargo =
        cargosEjemplo[
          Math.floor(Math.random() * cargosEjemplo.length)
        ];
      relaciones.push({
        idPersona: persona.id,
        idEmpresa: empresasCreadas[empresaIndex].id,
        cargo,
      });
    });
  });

  // Guardar todas las relaciones (en paralelo)
  const relacionesPromesas = relaciones.map((rel) =>
    personaEmpresaService.agregar(rel)
  );
  await Promise.all(relacionesPromesas);
};

