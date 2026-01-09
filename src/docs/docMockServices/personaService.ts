import type { Persona, PersonaConEmpresas, Empresa } from "./interfaces";
import type { PaginationInterface } from "../../components/form-controls/Pagination";
import dayjs from "dayjs";
import { personaEmpresaService } from "./personaEmpresaService";
import { empresaService } from "./empresaService";

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
 * Enriquece una persona con sus empresas relacionadas
 * Optimizado para obtener todas las empresas de una vez
 */
const _enriquecerConEmpresas = async (
  persona: Persona,
  todasLasEmpresas?: Empresa[]
): Promise<PersonaConEmpresas> => {
  const relaciones = await personaEmpresaService.buscarPorPersona(persona.id);
  const empresasIds = relaciones.map((rel) => rel.idEmpresa);

  let empresas: Empresa[] = [];

  if (todasLasEmpresas) {
    // Si ya tenemos todas las empresas, filtrar por IDs
    empresas = todasLasEmpresas.filter((emp) => empresasIds.includes(emp.id));
  } else {
    // Si no, obtener cada empresa individualmente
    for (const idEmpresa of empresasIds) {
      const empresa = await empresaService.buscarPorId(idEmpresa);
      if (empresa) {
        empresas.push(empresa);
      }
    }
  }

  return {
    ...persona,
    empresas,
  };
};

/**
 * Servicio mock para gestionar Personas en localStorage
 */
export const personaService = {
  /**
   * Obtiene personas opcionalmente filtradas por nombre, con sus empresas relacionadas
   */
  async listar(params?: { filtro?: string }): Promise<PersonaConEmpresas[]> {
    await simulateNetworkDelay();
    const todas = _obtenerTodas();
    let personasFiltradas = todas;

    if (params?.filtro) {
      const filtroLower = params.filtro.toLowerCase();
      personasFiltradas = todas.filter((per) =>
        per.nombre.toLowerCase().includes(filtroLower)
      );
    }

    // Obtener todas las empresas de una vez para optimizar
    const todasLasEmpresas = await empresaService.listar();

    // Enriquecer cada persona con sus empresas
    const personasConEmpresas = await Promise.all(
      personasFiltradas.map((p) => _enriquecerConEmpresas(p, todasLasEmpresas))
    );

    return personasConEmpresas;
  },

  /**
   * Obtiene personas paginadas opcionalmente filtradas por nombre y/o idEmpresa, con sus empresas relacionadas
   */
  async listarPaginados(params?: {
    filtro?: string;
    pagina?: string;
    limit?: string;
    idEmpresa?: string;
  }): Promise<PaginationInterface<PersonaConEmpresas>> {
    await simulateNetworkDelay();
    const pagina = params?.pagina ?? 1;
    const limit = params?.limit ?? 20;
    const todas = _obtenerTodas();
    let todasFiltradas = todas;
    // Filtro por nombre
    if (params?.filtro) {
      const filtroLower = params.filtro.toLowerCase();
      todasFiltradas = todasFiltradas.filter((per) =>
        per.nombre.toLowerCase().includes(filtroLower)
      );
    }

    // Filtro por idEmpresa: obtener todas las relaciones de esa empresa
    // y filtrar las personas que tienen esa relación
    if (params?.idEmpresa !== undefined) {
      const relaciones = await personaEmpresaService.buscarPorEmpresa(
        Number(params.idEmpresa)
      );

      const personasIdsConEmpresa = new Set(
        relaciones.map((rel) => rel.idPersona)
      );
      todasFiltradas = todasFiltradas.filter((per) =>
        personasIdsConEmpresa.has(per.id)
      );
    }

    const total = todasFiltradas.length;

    // Obtener todas las empresas de una vez para optimizar
    const todasLasEmpresas = await empresaService.listar();

    // Enriquecer cada persona con sus empresas antes de paginar
    const personasConEmpresas = await Promise.all(
      todasFiltradas.map((p) => _enriquecerConEmpresas(p, todasLasEmpresas))
    );

    const limitNumber = parseInt(limit.toString(), 10);
    const paginaNumber = parseInt(pagina.toString(), 10);
    const totalNumber = parseInt(total.toString(), 10);

    // Si limit es 0, devolver todos los elementos sin paginar
    if (limitNumber === 0) {
      return {
        list: personasConEmpresas,
        limit: 0,
        page: 1,
        pages: 1,
        total,
      };
    }

    const pages = Math.ceil(totalNumber / limitNumber);
    const inicio = (paginaNumber - 1) * limitNumber;
    const fin = inicio + limitNumber;
    const list = personasConEmpresas.slice(inicio, fin);

    return {
      list,
      limit: limitNumber,
      page: paginaNumber,
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
  async eliminar(persona: Persona): Promise<void> {
    await simulateNetworkDelay();
    const personas = _obtenerTodas();
    const index = personas.findIndex((per) => per.id === persona.id);

    personas.splice(index, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(personas));
  },
};
