import type { Empresa } from "./interfaces";
import type { PaginationInterface } from "../../components/form-controls/Pagination";

const STORAGE_KEY = "docMockServices_empresas";

/**
 * Simula un delay de red para hacer más realista el mock
 */
const simulateNetworkDelay = (ms: number = 500) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Obtiene todas las empresas del almacenamiento (función helper interna)
 */
const _obtenerTodas = (): Empresa[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

/**
 * Servicio mock para gestionar Empresas en localStorage
 */
export const empresaService = {
  /**
   * Obtiene empresas opcionalmente filtradas por nombre
   */
  async listar(params?: { filtro?: string }): Promise<Empresa[]> {
    await simulateNetworkDelay();
    const todas = _obtenerTodas();
    if (!params?.filtro) {
      return todas;
    }
    const filtroLower = params.filtro.toLowerCase();
    return todas.filter((emp) =>
      emp.nombre.toLowerCase().includes(filtroLower)
    );
  },

  /**
   * Obtiene empresas paginadas opcionalmente filtradas por nombre
   */
  async listarPaginados(params?: {
    filtro?: string;
    pagina?: number;
    limit?: number;
  }): Promise<PaginationInterface<Empresa>> {
    await simulateNetworkDelay();
    const pagina = params?.pagina ?? 1;
    const limit = params?.limit ?? 20;
    const todas = _obtenerTodas();
    let todasFiltradas = todas;

    if (params?.filtro) {
      const filtroLower = params.filtro.toLowerCase();
      todasFiltradas = todas.filter((emp) =>
        emp.nombre.toLowerCase().includes(filtroLower)
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
   * Busca una empresa por ID
   */
  async buscarPorId(id: number): Promise<Empresa | undefined> {
    await simulateNetworkDelay();
    const empresas = _obtenerTodas();
    return empresas.find((emp) => emp.id === id);
  },

  /**
   * Agrega una nueva empresa
   */
  async agregar(empresa: Omit<Empresa, "id">): Promise<Empresa> {
    await simulateNetworkDelay();
    const empresas = _obtenerTodas();
    const nuevoId =
      empresas.length > 0 ? Math.max(...empresas.map((e) => e.id)) + 1 : 1;
    // Crear nueva empresa: el id generado siempre sobrescribe cualquier id que venga
    const nuevaEmpresa: Empresa = {
      ...empresa,
      id: nuevoId, // El id siempre se asigna después para sobrescribir cualquier id existente
    };
    empresas.push(nuevaEmpresa);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(empresas));
    return nuevaEmpresa;
  },

  /**
   * Edita una empresa existente
   */
  async editar(
    id: number,
    datos: Partial<Omit<Empresa, "id">>
  ): Promise<Empresa | null> {
    await simulateNetworkDelay();
    const empresas = _obtenerTodas();
    const index = empresas.findIndex((emp) => emp.id === id);
    if (index === -1) return null;

    empresas[index] = { ...empresas[index], ...datos };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(empresas));
    return empresas[index];
  },

  /**
   * Elimina una empresa por ID
   */
  async eliminar(id: number): Promise<boolean> {
    await simulateNetworkDelay();
    const empresas = _obtenerTodas();
    const index = empresas.findIndex((emp) => emp.id === id);
    if (index === -1) return false;

    empresas.splice(index, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(empresas));
    return true;
  },
};
