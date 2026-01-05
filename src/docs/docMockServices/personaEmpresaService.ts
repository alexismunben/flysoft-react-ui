import type { PersonaEmpresa } from "./interfaces";

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
   * Busca relaciones por ID de persona
   */
  async buscarPorPersona(idPersona: number): Promise<PersonaEmpresa[]> {
    await simulateNetworkDelay();
    const relaciones = _obtenerTodas();
    return relaciones.filter((rel) => rel.idPersona === idPersona);
  },

  /**
   * Busca relaciones por ID de empresa
   */
  async buscarPorEmpresa(idEmpresa: number): Promise<PersonaEmpresa[]> {
    await simulateNetworkDelay();
    const relaciones = _obtenerTodas();
    return relaciones.filter((rel) => rel.idEmpresa === idEmpresa);
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
      (rel) => rel.idPersona === idPersona && rel.idEmpresa === idEmpresa
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
        rel.idPersona === relacion.idPersona &&
        rel.idEmpresa === relacion.idEmpresa
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
      (rel) => rel.idPersona === idPersona && rel.idEmpresa === idEmpresa
    );
    if (index === -1) return null;

    relaciones[index] = { ...relaciones[index], ...datos };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(relaciones));
    return relaciones[index];
  },

  /**
   * Elimina una relación por persona y empresa
   */
  async eliminar(idPersona: number, idEmpresa: number): Promise<boolean> {
    await simulateNetworkDelay();
    const relaciones = _obtenerTodas();
    const index = relaciones.findIndex(
      (rel) => rel.idPersona === idPersona && rel.idEmpresa === idEmpresa
    );
    if (index === -1) return false;

    relaciones.splice(index, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(relaciones));
    return true;
  },

  /**
   * Elimina todas las relaciones de una persona
   */
  async eliminarPorPersona(idPersona: number): Promise<number> {
    await simulateNetworkDelay();
    const relaciones = _obtenerTodas();
    const inicialLength = relaciones.length;
    const nuevasRelaciones = relaciones.filter(
      (rel) => rel.idPersona !== idPersona
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
      (rel) => rel.idEmpresa !== idEmpresa
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevasRelaciones));
    return inicialLength - nuevasRelaciones.length;
  },
};

