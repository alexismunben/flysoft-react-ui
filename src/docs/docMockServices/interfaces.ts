import type { Dayjs } from "dayjs";

/**
 * Interfaces para los servicios mock de documentación
 */

export interface Empresa {
  id: number;
  nombre: string;
}

export interface Persona {
  id: number;
  nombre: string;
  email: string;
  fechaNacimiento: Dayjs;
}

/**
 * Persona con sus empresas relacionadas
 */
export interface PersonaConEmpresas extends Persona {
  empresas: Empresa[];
}

export interface PersonaEmpresa {
  idPersona: number;
  idEmpresa: number;
  cargo: string;
}

/**
 * Relación Persona-Empresa con la información completa de la Persona
 */
export interface PersonaEmpresaConPersona extends PersonaEmpresa {
  persona: Persona;
}

/**
 * Relación Persona-Empresa con la información completa de la Empresa
 */
export interface PersonaEmpresaConEmpresa extends PersonaEmpresa {
  empresa: Empresa;
}
