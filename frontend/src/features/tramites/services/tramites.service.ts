import type { Tramite, CreateTramiteDto } from "../types/tramite.types";
import { mockTramites } from "../data/mockTramites";
import dayjs from "dayjs";

// Simulated network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class TramitesService {
  private tramites: Tramite[] = [...mockTramites];

  async getTramites(): Promise<Tramite[]> {
    await delay(800); // Simulate network latency
    return [...this.tramites].sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
  }

  async getTramiteById(id: string): Promise<Tramite | undefined> {
    await delay(500);
    return this.tramites.find(t => t.id === id);
  }

  async createTramite(data: CreateTramiteDto): Promise<Tramite> {
    await delay(1200);
    
    const newTramite: Tramite = {
      id: `TRM-${dayjs().year()}-${String(this.tramites.length + 1).padStart(3, '0')}`,
      code: `EXP-${4000 + this.tramites.length + 1}`,
      type: data.type,
      applicant: {
        name: data.applicantEmail.split('@')[0], // Simulated name
        email: data.applicantEmail,
      },
      description: data.description,
      status: 'Registrado',
      priority: data.priority,
      createdAt: dayjs().toISOString(),
      updatedAt: dayjs().toISOString(),
      responsibleArea: data.responsibleArea,
      history: [
        {
          id: `h-${Date.now()}`,
          action: 'Trámite Registrado',
          timestamp: dayjs().toISOString(),
          user: 'Sistema',
          status: 'Registrado'
        }
      ],
      documents: data.files ? data.files.map((file, i) => ({
        id: `d-${Date.now()}-${i}`,
        name: file.name,
        type: file.type || 'application/octet-stream',
        size: file.size,
        uploadedAt: dayjs().toISOString(),
        url: '#' // Simulated URL
      })) : []
    };

    this.tramites = [newTramite, ...this.tramites];
    return newTramite;
  }
}

export const tramitesService = new TramitesService();
