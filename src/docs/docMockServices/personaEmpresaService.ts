import type {
  PersonaEmpresa,
  PersonaEmpresaConPersona,
  PersonaEmpresaConEmpresa,
} from "./interfaces";
import { personaService } from "./personaService";
import { empresaService } from "./empresaService";

const STORAGE_KEY = "docMockServices_personaEmpresas";

/**
 * Simula un delay de red para hacer más realista el mock
 */
const simulateNetworkDelay = (ms: number = 500) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Obtiene todas las relaciones del almacenamiento (método interno)
 */
const _obtenerTodas = (): PersonaEmpresa[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

/**
 * Servicio mock para gestionar relaciones Persona-Empresa en localStorage
 */
export const personaEmpresaService = {
  /**
   * Obtiene todas las relaciones
   */
  async listar(): Promise<PersonaEmpresa[]> {
    await simulateNetworkDelay();
    return _obtenerTodas();
  },

  /**
   * Busca relaciones por ID de persona, incluyendo la información completa de la empresa
   */
  async buscarPorPersona(
    idPersona: number
  ): Promise<PersonaEmpresaConEmpresa[]> {
    await simulateNetworkDelay();
    const relaciones = _obtenerTodas();
    const relacionesFiltradas = relaciones.filter(
      (rel) => rel.idPersona.toString() === idPersona.toString()
    );

    // Obtener todas las empresas de una vez para optimizar
    const todasLasEmpresas = await empresaService.listar();

    // Enriquecer cada relación con la información de la empresa
    const relacionesConEmpresas = await Promise.all(
      relacionesFiltradas.map(async (rel) => {
        const empresa = todasLasEmpresas.find((e) => e.id.toString() === rel.idEmpresa.toString());
        if (!empresa) {
          throw new Error(
            `Empresa con id ${rel.idEmpresa} no encontrada para la relación`
          );
        }
        return {
          ...rel,
          empresa,
        } as PersonaEmpresaConEmpresa;
      })
    );

    return relacionesConEmpresas;
  },

  /**
   * Busca relaciones por ID de empresa, incluyendo la información completa de la persona
   */
  async buscarPorEmpresa(
    idEmpresa: number
  ): Promise<PersonaEmpresaConPersona[]> {
    console.log("Busca relaciones por empresa", idEmpresa);

    await simulateNetworkDelay();
    const relaciones = _obtenerTodas();
    const relacionesFiltradas = relaciones.filter(
      (rel) => rel.idEmpresa.toString() === idEmpresa.toString()
    );

    // Obtener todas las personas de una vez para optimizar
    const todasLasPersonas = await personaService.listar();

    // Enriquecer cada relación con la información de la persona
    // PersonaConEmpresas extiende Persona, así que podemos usarlo directamente
    const relacionesConPersonas = await Promise.all(
      relacionesFiltradas.map(async (rel) => {
        const personaConEmpresas = todasLasPersonas.find(
          (p) => p.id.toString() === rel.idPersona.toString()
        );
        if (!personaConEmpresas) {
          throw new Error(
            `Persona con id ${rel.idPersona} no encontrada para la relación`
          );
        }
        // Extraer solo los campos de Persona (sin empresas)
        const persona = {
          id: personaConEmpresas.id,
          nombre: personaConEmpresas.nombre,
          email: personaConEmpresas.email,
          fechaNacimiento: personaConEmpresas.fechaNacimiento,
        };
        return {
          ...rel,
          persona,
        } as PersonaEmpresaConPersona;
      })
    );

    return relacionesConPersonas;
  },

  /**
   * Busca una relación específica por persona y empresa
   */
  async buscarPorPersonaYEmpresa(
    idPersona: number,
    idEmpresa: number
  ): Promise<PersonaEmpresa | undefined> {
    await simulateNetworkDelay();
    const relaciones = _obtenerTodas();
    return relaciones.find(
      (rel) => rel.idPersona.toString() === idPersona.toString() && rel.idEmpresa.toString() === idEmpresa.toString()
    );
  },

  /**
   * Agrega una nueva relación
   */
  async agregar(relacion: PersonaEmpresa): Promise<PersonaEmpresa> {
    await simulateNetworkDelay();
    const relaciones = _obtenerTodas();
    // Verificar que no exista ya la relación
    const existe = relaciones.some(
      (rel) =>
        rel.idPersona.toString() === relacion.idPersona.toString() &&
        rel.idEmpresa.toString() === relacion.idEmpresa.toString()
    );
    if (!existe) {
      relaciones.push(relacion);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(relaciones));
    }
    return relacion;
  },

  /**
   * Edita una relación existente
   */
  async editar(
    idPersona: number,
    idEmpresa: number,
    datos: Partial<Omit<PersonaEmpresa, "idPersona" | "idEmpresa">>
  ): Promise<PersonaEmpresa | null> {
    await simulateNetworkDelay();
    const relaciones = _obtenerTodas();
    const index = relaciones.findIndex(
      (rel) => rel.idPersona.toString() === idPersona.toString() && rel.idEmpresa.toString() === idEmpresa.toString()
    );
    if (index === -1) return null;

    relaciones[index] = { ...relaciones[index], ...datos };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(relaciones));
    return relaciones[index];
  },

  /**
   * Elimina una relación por persona y empresa
   */
  async eliminar(personaEmpresa: PersonaEmpresa): Promise<void> {
    await simulateNetworkDelay();
    const relaciones = _obtenerTodas();
    const index = relaciones.findIndex(
      (rel) => rel.idPersona.toString() === personaEmpresa.idPersona.toString() && rel.idEmpresa.toString() === personaEmpresa.idEmpresa.toString()
    );
    if (index === -1) return;

    relaciones.splice(index, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(relaciones));
  },

  /**
   * Elimina todas las relaciones de una persona
   */
  async eliminarPorPersona(idPersona: number): Promise<number> {
    await simulateNetworkDelay();
    const relaciones = _obtenerTodas();
    const inicialLength = relaciones.length;
    const nuevasRelaciones = relaciones.filter(
      (rel) => rel.idPersona.toString() !== idPersona.toString()
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevasRelaciones));
    return inicialLength - nuevasRelaciones.length;
  },

  /**
   * Elimina todas las relaciones de una empresa
   */
  async eliminarPorEmpresa(idEmpresa: number): Promise<number> {
    await simulateNetworkDelay();
    const relaciones = _obtenerTodas();
    const inicialLength = relaciones.length;
    const nuevasRelaciones = relaciones.filter(
      (rel) => rel.idEmpresa.toString() !== idEmpresa.toString()
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevasRelaciones));
    return inicialLength - nuevasRelaciones.length;
  },
};
