import type { Persona } from "./interfaces";
import type { PaginationInterface } from "../../components/form-controls/Pagination";
import dayjs from "dayjs";

const STORAGE_KEY = "docMockServices_personas";

/**
 * Simula un delay de red para hacer más realista el mock
 */
const simulateNetworkDelay = (ms: number = 500) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Obtiene todas las personas del almacenamiento (función helper interna)
 * Convierte las fechas de string ISO a dayjs
 */
const _obtenerTodas = (): Persona[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  const personas = JSON.parse(data);
  // Convertir fechaNacimiento de string ISO a dayjs
  return personas.map((persona: any) => ({
    ...persona,
    fechaNacimiento: dayjs(persona.fechaNacimiento),
  }));
};

/**
 * Servicio mock para gestionar Personas en localStorage
 */
export const personaService = {
  /**
   * Obtiene personas opcionalmente filtradas por nombre
   */
  async listar(params?: { filtro?: string }): Promise<Persona[]> {
    await simulateNetworkDelay();
    const todas = _obtenerTodas();
    if (!params?.filtro) {
      return todas;
    }
    const filtroLower = params.filtro.toLowerCase();
    return todas.filter((per) =>
      per.nombre.toLowerCase().includes(filtroLower)
    );
  },

  /**
   * Obtiene personas paginadas opcionalmente filtradas por nombre
   */
  async listarPaginados(params?: {
    filtro?: string;
    pagina?: number;
    limit?: number;
  }): Promise<PaginationInterface<Persona>> {
    await simulateNetworkDelay();
    const pagina = params?.pagina ?? 1;
    const limit = params?.limit ?? 20;
    const todas = _obtenerTodas();
    let todasFiltradas = todas;

    if (params?.filtro) {
      const filtroLower = params.filtro.toLowerCase();
      todasFiltradas = todas.filter((per) =>
        per.nombre.toLowerCase().includes(filtroLower)
      );
    }

    const total = todasFiltradas.length;

    // Si limit es 0, devolver todos los elementos sin paginar
    if (limit === 0) {
      return {
        list: todasFiltradas,
        limit: 0,
        page: 1,
        pages: 1,
        total,
      };
    }

    const pages = Math.ceil(total / limit);
    const inicio = (pagina - 1) * limit;
    const fin = inicio + limit;
    const list = todasFiltradas.slice(inicio, fin);

    return {
      list,
      limit,
      page: pagina,
      pages,
      total,
    };
  },

  /**
   * Busca una persona por ID
   */
  async buscarPorId(id: number): Promise<Persona | undefined> {
    await simulateNetworkDelay();
    const personas = _obtenerTodas();
    return personas.find((per) => per.id === id);
  },

  /**
   * Agrega una nueva persona
   */
  async agregar(persona: Omit<Persona, "id">): Promise<Persona> {
    await simulateNetworkDelay();
    const personas = _obtenerTodas();
    const nuevoId =
      personas.length > 0 ? Math.max(...personas.map((p) => p.id)) + 1 : 1;
    const nuevaPersona: Persona = {
      id: nuevoId,
      ...persona,
    };
    personas.push(nuevaPersona);
    // Guardar convirtiendo fechaNacimiento a string ISO
    const personasParaGuardar = personas.map((p) => ({
      ...p,
      fechaNacimiento: p.fechaNacimiento.toISOString(),
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(personasParaGuardar));
    return nuevaPersona;
  },

  /**
   * Edita una persona existente
   */
  async editar(
    id: number,
    datos: Partial<Omit<Persona, "id">>
  ): Promise<Persona | null> {
    await simulateNetworkDelay();
    const personas = _obtenerTodas();
    const index = personas.findIndex((per) => per.id === id);
    if (index === -1) return null;

    personas[index] = { ...personas[index], ...datos };
    // Guardar convirtiendo fechaNacimiento a string ISO
    const personasParaGuardar = personas.map((p) => ({
      ...p,
      fechaNacimiento: p.fechaNacimiento.toISOString(),
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(personasParaGuardar));
    return personas[index];
  },

  /**
   * Elimina una persona por ID
   */
  async eliminar(id: number): Promise<boolean> {
    await simulateNetworkDelay();
    const personas = _obtenerTodas();
    const index = personas.findIndex((per) => per.id === id);
    if (index === -1) return false;

    personas.splice(index, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(personas));
    return true;
  },
};
