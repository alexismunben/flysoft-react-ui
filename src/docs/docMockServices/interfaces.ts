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
}

export interface PersonaEmpresa {
  idPersona: number;
  idEmpresa: number;
  cargo: string;
}

